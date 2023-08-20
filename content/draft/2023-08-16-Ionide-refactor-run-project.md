---
date: 2023-08-16
seriesId: "Ionide Refactor"
tags: [Information Hiding, Refactoring]
title: Refactoring for Information Hiding - Ionide Case Study - Run Project
---

<!-- TODO: intro might need work -->
<!-- TODO: It'd still be nice to cover trying to centralize testRun, but discovering the build needed to be serialized an then retaining sub-methods, but grouped to make their ownership and non-reusability clear -->

Information Hiding is a critical, but tricky principle to get familiar with. I'm working through an exampled based on my [Ionide test explorer contributions](https://github.com/ionide/ionide-vscode-fsharp/pull/1874). The [previous post](./2023-08-14-Ionide-refactor-display-results.md) explored the top scope, now we'll dive into a more complex method.
<!--more-->

The full work is available if you want to explore in more depth. The the [final code diff](https://github.com/ionide/ionide-vscode-fsharp/pull/1874/files) is a bit useless because the extensive changes. It might be better to read [the original code](https://github.com/ionide/ionide-vscode-fsharp/blob/6c485f6f5970dd3aa9e7a0fe17ba061742c70b80/src/Components/TestExplorer.fs) then the [updated version](https://github.com/ionide/ionide-vscode-fsharp/blob/e882c87c13cb55e1f6752da8a42ec41f19540c67/src/Components/TestExplorer.fs).

## Recap
I highly recommend you read the [previous post](./2023-08-14-Ionide-refactor-display-results.md).

We previously discovered that the test explorer responds to test runs through `runHandler`, which orchestrates the high level flow of a test run (find projects, build, test, display results).

Clarifying and isolating the display of test results also revealed that `TestResult` couples a UI TestItem instance with otherwise non-UI information. This happens in `runProject`, which we'll focus on today.


## Exploring runProject

Here's the original `runProject` function.

```fsharp
module DotnetTest =
    let runProject (tc: TestController) (projectWithTests: ProjectWithTests) : JS.Promise<ProjectWithTestResults> =
        logger.Debug("Nunit project", projectWithTests)

        promise {
            // https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test#filter-option-details
            let filter =
                if not projectWithTests.HasIncludeFilter then
                    Array.empty
                else
                    let filterValue =
                        projectWithTests.Tests
                        |> Array.map (fun t ->
                            if t.FullName.Contains(" ") && t.Test.Type = "NUnit" then
                                // workaround for https://github.com/nunit/nunit3-vs-adapter/issues/876
                                // Potentially we are going to run multiple tests that match this filter
                                let testPart = t.FullName.Split(' ').[0]
                                $"(FullyQualifiedName~{testPart})"
                            else
                                $"(FullyQualifiedName={t.FullName})")
                        |> String.concat "|"

                    [| "--filter"; filterValue |]

            if filter.Length > 0 then
                logger.Debug("Filter", filter)

            let! _, _, exitCode =
                Process.exec
                    "dotnet"
                    (ResizeArray(
                        [| "test"
                           projectWithTests.Project.Project
                           // Project should already be built, perhaps we can point to the dll instead?
                           "--no-restore"
                           "--logger:\"trx;LogFileName=Ionide.trx\""
                           "--noLogo"
                           yield! filter |]
                    ))

            logger.Debug("Test run exitCode", exitCode)

            let trxPath =
                node.path.resolve (node.path.dirname projectWithTests.Project.Project, "TestResults", "Ionide.trx")

            logger.Debug("Trx file at", trxPath)
            // probably possible to read via promise api
            let trxContent = node.fs.readFileSync (trxPath, "utf8")
            let xmlDoc = mkDoc trxContent

            let xpathSelector =
                XPath.XPathSelector(xmlDoc, "http://microsoft.com/schemas/VisualStudio/TeamTest/2010")

            let testDefinitions =
                xpathSelector.Select<obj array> "/t:TestRun/t:TestDefinitions/t:UnitTest"
                |> Array.mapi (fun idx _ ->
                    let idx = idx + 1

                    let executionId =
                        xpathSelector.SelectString $"/t:TestRun/t:TestDefinitions/t:UnitTest[{idx}]/t:Execution/@id"

                    let className =
                        xpathSelector.SelectString
                            $"/t:TestRun/t:TestDefinitions/t:UnitTest[{idx}]/t:TestMethod/@className"

                    // This code assumes there will only
                    let test =
                        xpathSelector.SelectString $"/t:TestRun/t:TestDefinitions/t:UnitTest[{idx}]/t:TestMethod/@name"

                    $"{className}.{test}", test, executionId)

            let unmappedTests, mappedTests =
                projectWithTests.Tests
                |> Array.sortByDescending (fun t -> t.FullName)
                |> Array.fold
                    (fun (tests, mappedTests) (t) ->
                        let linkedTests, remainingTests =
                            tests
                            |> Array.partition (fun (fullName: string, _, _) -> fullName.StartsWith t.FullName)

                        if Array.isEmpty linkedTests then
                            remainingTests, mappedTests
                        else
                            remainingTests, ([| yield! mappedTests; (t, linkedTests) |]))
                    (testDefinitions, [||])

            let tests =
                mappedTests
                |> Array.collect (fun (t, testCases) ->
                    testCases
                    |> Array.map (fun (fullName, testName, executionId) ->
                        let outcome =
                            xpathSelector.SelectString
                                $"/t:TestRun/t:Results/t:UnitTestResult[@executionId='{executionId}']/@outcome"

                        let errorInfoMessage =
                            xpathSelector.TrySelectString
                                $"/t:TestRun/t:Results/t:UnitTestResult[@executionId='{executionId}']/t:Output/t:ErrorInfo/t:Message"

                        let errorStackTrace =
                            xpathSelector.TrySelectString
                                $"/t:TestRun/t:Results/t:UnitTestResult[@executionId='{executionId}']/t:Output/t:ErrorInfo/t:StackTrace"

                        let timing =
                            let duration =
                                xpathSelector.SelectString
                                    $"/t:TestRun/t:Results/t:UnitTestResult[@executionId='{executionId}']/@duration"

                            TimeSpan.Parse(duration).TotalMilliseconds

                        let expected, actual =
                            match errorInfoMessage with
                            | None -> None, None
                            | Some message ->
                                let lines =
                                    message.Split([| "\r\n"; "\n" |], StringSplitOptions.RemoveEmptyEntries)
                                    |> Array.map (fun n -> n.TrimStart())

                                let tryFind (startsWith: string) =
                                    Array.tryFind (fun (line: string) -> line.StartsWith(startsWith)) lines
                                    |> Option.map (fun line -> line.Replace(startsWith, "").TrimStart())

                                tryFind "Expected:", tryFind "But was:"

                        if Seq.length testCases > 1 then
                            let ti =
                                t.Test.children.get (
                                    t.Test.uri.Value.ToString()
                                    + " -- "
                                    + Convert.ToBase64String(Encoding.UTF8.GetBytes(testName))
                                )
                                |> Option.defaultWith (fun () ->
                                    tc.createTestItem (
                                        t.Test.uri.Value.ToString() + " -- " + testName,
                                        testName,
                                        t.Test.uri.Value
                                    ))

                            t.Test.children.add ti

                        { Test = t.Test
                          FullTestName = fullName
                          Outcome = !!outcome
                          ErrorMessage = errorInfoMessage
                          ErrorStackTrace = errorStackTrace
                          Expected = expected
                          Actual = actual
                          Timing = timing }))

            return
                { Project = projectWithTests.Project
                  Tests = tests }
        }
```

Oof. That's a lot to sift through.

The function name and module `DotnetTest.runProject` give us a clue to the overall intent.
This function runs a test project.

Next let's see what the function signature tells us.
```fsharp
let runProject (tc: TestController) (projectWithTests: ProjectWithTests) : JS.Promise<ProjectWithTestResults>
```

Makes sense that it returns test results. It's less clear why the `testController` (used for creating test runs and accessing the UI test explorer) is needed. UI state shouldn't be needed to execute tests, we do that in the command line with `dotnet test` all the time. `ProjectWithTests` is also a bit mysterious. Shouldn't we only need to know the project to run?

These arguments reinforce my suspicions that too much is going on here and we could use some Information Hiding.

After analyzing the method body for a while, I see three major sections: building test filters, invoking `dotnet test`, and parsing the test results. But, the method is hard for my brain to engage with even after discerning this. Let's reflect our learnings in the code to make the method more readable. A few goals here are to isolate distinct concerns so we can think only of the returned result, and not how the code works. We also want the individual pieces more focused and are easier to understand, then mentally consolidate as a single action.

## TRX Isolation

The TRX file parsing is the most space consuming, and also a clear reusable concern. Let's start there.

There's actually two parts to the TRX parsing: test definitions and test results.

We'll throw these new functions in their own module. We'll keep the module in the same file for now.

```fsharp
module TrxParser = 

    let parseTestDefinitions (projectWithTests: ProjectWithTests) =
        let trxPath =
            node.path.resolve (node.path.dirname projectWithTests.Project.Project, "TestResults", "Ionide.trx")

        logger.Debug("Trx file at", trxPath)
        // probably possible to read via promise api
        let trxContent = node.fs.readFileSync (trxPath, "utf8")
        let xmlDoc = mkDoc trxContent

        let xpathSelector =
            XPath.XPathSelector(xmlDoc, "http://microsoft.com/schemas/VisualStudio/TeamTest/2010")

        let testDefinitions =
            xpathSelector.Select<obj array> "/t:TestRun/t:TestDefinitions/t:UnitTest"
            |> Array.mapi (fun idx _ ->
                let idx = idx + 1

                let executionId =
                    xpathSelector.SelectString $"/t:TestRun/t:TestDefinitions/t:UnitTest[{idx}]/t:Execution/@id"

                let className =
                    xpathSelector.SelectString
                        $"/t:TestRun/t:TestDefinitions/t:UnitTest[{idx}]/t:TestMethod/@className"

                let testName =
                    xpathSelector.SelectString $"/t:TestRun/t:TestDefinitions/t:UnitTest[{idx}]/t:TestMethod/@name"

                $"{className}.{testName}", testName, executionId)


    type TrxTestResult = 
        { FullTestName: string
          Outcome: TestResultOutcome
          ErrorMessage: string option
          ErrorStackTrace: string option
          Expected: string option
          Actual: string option
          Timing: float }

    let parseTestResults (projectWithTests: ProjectWithTests) executionId fullTestName =

        let trxPath =
            node.path.resolve (node.path.dirname projectWithTests.Project.Project, "TestResults", "Ionide.trx")

        logger.Debug("Trx file at", trxPath)
        // probably possible to read via promise api
        let trxContent = node.fs.readFileSync (trxPath, "utf8")
        let xmlDoc = mkDoc trxContent

        let xpathSelector =
            XPath.XPathSelector(xmlDoc, "http://microsoft.com/schemas/VisualStudio/TeamTest/2010")

        let outcome =
            xpathSelector.SelectString
                $"/t:TestRun/t:Results/t:UnitTestResult[@executionId='{executionId}']/@outcome"

        let errorInfoMessage =
            xpathSelector.TrySelectString
                $"/t:TestRun/t:Results/t:UnitTestResult[@executionId='{executionId}']/t:Output/t:ErrorInfo/t:Message"

        let errorStackTrace =
            xpathSelector.TrySelectString
                $"/t:TestRun/t:Results/t:UnitTestResult[@executionId='{executionId}']/t:Output/t:ErrorInfo/t:StackTrace"

        let timing =
            let duration =
                xpathSelector.SelectString
                    $"/t:TestRun/t:Results/t:UnitTestResult[@executionId='{executionId}']/@duration"

            TimeSpan.Parse(duration).TotalMilliseconds

        let expected, actual =
            match errorInfoMessage with
            | None -> None, None
            | Some message ->
                let lines =
                    message.Split([| "\r\n"; "\n" |], StringSplitOptions.RemoveEmptyEntries)
                    |> Array.map (fun n -> n.TrimStart())

                let tryFind (startsWith: string) =
                    Array.tryFind (fun (line: string) -> line.StartsWith(startsWith)) lines
                    |> Option.map (fun line -> line.Replace(startsWith, "").TrimStart())

                tryFind "Expected:", tryFind "But was:"

        { FullTestName = fullTestName
          Outcome = !!outcome
          ErrorMessage = errorInfoMessage
          ErrorStackTrace = errorStackTrace
          Expected = expected
          Actual = actual
          Timing = timing }
```

For this initial refactor, I tried to change as little as possible. I move the code and then found out what parameters the new functions needed to work.

However, I did make one key change. The `parseTestResults` code originally assigned a bunch of data to names and directly constructed a `TestResult`, but that would require TRX parsing to still know about the UI and results to UI tree items. It was just as easy to just make a new return type for the result without the TestItem, and now the function doesn't need all that UI knowledge. I can leave the UI knowledge at a higher level.

These functions still have some information hiding problems though. They take a `ProjectWithTests` but only really need the project path. That's easy enough to change

```fsharp

let parseTestDefinitions (projectPath: string) =
    let trxPath =
        node.path.resolve (node.path.dirname projectPath, "TestResults", "Ionide.trx")
    //...

let parseTestResults (projectPath: string) executionId fullTestName =
    let trxPath =
        node.path.resolve (node.path.dirname projectPath, "TestResults", "Ionide.trx")
    //...
```

Hmm, but there's still unnecessary information here. A trx file doesn't need to be associated with a project, and we've duplicated our assumption of where a TRX file is located relative to a project. Let's change that

```fsharp

let getTrxPathForProject projectPath =
    node.path.resolve (node.path.dirname projectPath, "TestResults", "Ionide.trx")

let parseTestDefinitions (trxPath: string) =
    //...

let parseTestResults (trxPath: string) executionId fullTestName =
    //...
```

Oh, and we can get the test's fullName based on the executionId, so we don't need the extra argument to `parseTestResults`

```fsharp
let parseTestResults (trxPath: string) executionId =
    // ...
    let className =
        xpathSelector.SelectString
            $"/t:TestRun/t:TestDefinitions/t:UnitTest[t:Execution/@id='{executionId}']/t:TestMethod/@className"

    let testMethodName =
        xpathSelector.SelectString
            $"/t:TestRun/t:TestDefinitions/t:UnitTest[t:Execution/@id='{executionId}']/t:TestMethod/@name"

    let fullTestName = $"{className}.{testMethodName}"
    // ...
```

Now we've got two trx parsing methods that know nothing about our test explorer or it's UI.
We could even them into a Nuget package for others to use. Anyone with a TRX file might benefit from it. 

The `runProject` flow is now quite a bit simpler, but the remaining code is fairly undisturbed.

```fsharp
let runProject (tc: TestController) (projectWithTests: ProjectWithTests) : JS.Promise<ProjectWithTestResults> =
    logger.Debug("Nunit project", projectWithTests)

    promise {
        // https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test#filter-option-details
        let filter =
            if not projectWithTests.HasIncludeFilter then
                Array.empty
            else
                let filterValue =
                    projectWithTests.Tests
                    |> Array.map (fun t ->
                        if t.FullName.Contains(" ") && t.Test.Type = "NUnit" then
                            // workaround for https://github.com/nunit/nunit3-vs-adapter/issues/876
                            // Potentially we are going to run multiple tests that match this filter
                            let testPart = t.FullName.Split(' ').[0]
                            $"(FullyQualifiedName~{testPart})"
                        else
                            $"(FullyQualifiedName={t.FullName})")
                    |> String.concat "|"

                [| "--filter"; filterValue |]

        if filter.Length > 0 then
            logger.Debug("Filter", filter)

        let! _, _, exitCode =
            Process.exec
                "dotnet"
                (ResizeArray(
                    [| "test"
                        projectWithTests.Project.Project
                        // Project should already be built, perhaps we can point to the dll instead?
                        "--no-restore"
                        "--logger:\"trx;LogFileName=Ionide.trx\""
                        "--noLogo"
                        yield! filter |]
                ))

        logger.Debug("Test run exitCode", exitCode)

        let trxPath = TrxParser.getTrxPathForProject projectWithTests.Project.Project

        let testDefinitions = TrxParser.parseTestDefinitions trxPath

        let unmappedTests, mappedTests =
            projectWithTests.Tests
            |> Array.sortByDescending (fun t -> t.FullName)
            |> Array.fold
                (fun (tests, mappedTests) (t) ->
                    let linkedTests, remainingTests =
                        tests
                        |> Array.partition (fun (fullName: string, _, _) -> fullName.StartsWith t.FullName)

                    if Array.isEmpty linkedTests then
                        remainingTests, mappedTests
                    else
                        remainingTests, ([| yield! mappedTests; (t, linkedTests) |]))
                (testDefinitions, [||])

        let tests =
            mappedTests
            |> Array.collect (fun (t, testCases) ->
                testCases
                |> Array.map (fun (fullName, testName, executionId) ->
                    let trxResult = TrxParser.parseTestResults trxPath executionId

                    if Seq.length testCases > 1 then
                        let ti =
                            t.Test.children.get (
                                t.Test.uri.Value.ToString()
                                + " -- "
                                + Convert.ToBase64String(Encoding.UTF8.GetBytes(testName))
                            )
                            |> Option.defaultWith (fun () ->
                                tc.createTestItem (
                                    t.Test.uri.Value.ToString() + " -- " + testName,
                                    testName,
                                    t.Test.uri.Value
                                ))

                        t.Test.children.add ti

                    { Test = t.Test
                        FullTestName = trxResult.FullTestName
                        Outcome = trxResult.Outcome
                        ErrorMessage = trxResult.ErrorMessage
                        ErrorStackTrace = trxResult.ErrorStackTrace
                        Expected = trxResult.Expected
                        Actual = trxResult.Actual
                        Timing = trxResult.Timing }))

        return
            { Project = projectWithTests.Project
                Tests = tests }
    }
```


### Refactor Filters

Filter expression building also seems like a separable problem. We don't need all the details of how it works in the root `runProject` function. We can separate the details into their own function to improve the readability of `runProject` and possibly even reuse the filter expression building.

Let's try approach similar to what we did before. First, move out the filter expression builder as-is and figure out what it needs.

```fsharp

let buildFilterExpression projectWithTests = 
    if not projectWithTests.HasIncludeFilter then
        Array.empty
    else
        let filterValue =
            projectWithTests.Tests
            |> Array.map (fun t ->
                if t.FullName.Contains(" ") && t.Test.Type = "NUnit" then
                    // workaround for https://github.com/nunit/nunit3-vs-adapter/issues/876
                    // Potentially we are going to run multiple tests that match this filter
                    let testPart = t.FullName.Split(' ').[0]
                    $"(FullyQualifiedName~{testPart})"
                else
                    $"(FullyQualifiedName={t.FullName})")
            |> String.concat "|"

        [| "--filter"; filterValue |]
```

Hmm. I don't really understand the decision to check `if not projectWithTests.HasIncludeFilter`. That doesn't seem like a typical concern I'd consider if I was making a filter expression for `dotnet test`. Normally I'd just create a matching clause for every test or test group I want to run. 

I'm going to do what I normally do with concerns that don't seem like they don't fit: push it up a layer. I can worry about if it fits in the parent later. If it doesn't, I can usually keep pushing the concern up until it find a layer where it fits.

That *almost* leaves* us with an filter builder that only needs to know about the names of the tests we want to run, but we still have that NUnit check... I'll settle for passing a ProjectWithTests for now, since it seems simplifying requires more knowledge than I can reasonably attain for now.

### Refactor `dotnet test` invocation

The last major section to refactor was the invocation of `dotnet test`.

Again, let's move it into a function and see what it needs to run.

```fsharp
let private _dotnetTest projectWithTests filterExpression =
    Process.exec
        "dotnet"
        (ResizeArray(
            [| "test"
                projectWithTests.Project.Project
                "--no-restore"
                "--logger:\"trx;LogFileName=Ionide.trx\""
                "--noLogo"
                yield! filterExpression |]
        ))

```

Ah, but it doesn't need a full `projectWithTests`, just the project path. There's also a sneaky assumption about the trx output path.
Fixing those, we have a generic wrapper for invoking the `dotnet test` cli method that anyone might use. 

```fsharp
let private _dotnetTest (projectPath:string) (filterExpression:string) (trxOutputPath: string option)  =
    Process.exec
        "dotnet"
        (ResizeArray(
            [| "test"
                projectPath
                "--no-restore"
                $"--logger:\"trx;LogFileName={trxOutputPath}\""
                "--noLogo"
                yield! filterExpression |]
        ))
```


## Clarified purpose 

Now the `runProject` function looks like this.

```fsharp
let runProject (tc: TestController) (projectWithTests: ProjectWithTests) : JS.Promise<ProjectWithTestResults> =
    logger.Debug("Nunit project", projectWithTests)

    promise {
        // https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test#filter-option-details
        let filter = buildFilterExpression projectWithTests
        if filter.Length > 0 then
            logger.Debug("Filter", filter)

        let trxPath = TrxParser.getTrxPathForProject projectWithTests.Project.Project

        _dotnetTest projectWithTests.Project.Project filter trxPath

        logger.Debug("Test run exitCode", exitCode)

        let testDefinitions = TrxParser.parseTestDefinitions trxPath

        let unmappedTests, mappedTests =
            projectWithTests.Tests
            |> Array.sortByDescending (fun t -> t.FullName)
            |> Array.fold
                (fun (tests, mappedTests) (t) ->
                    let linkedTests, remainingTests =
                        tests
                        |> Array.partition (fun (fullName: string, _, _) -> fullName.StartsWith t.FullName)

                    if Array.isEmpty linkedTests then
                        remainingTests, mappedTests
                    else
                        remainingTests, ([| yield! mappedTests; (t, linkedTests) |]))
                (testDefinitions, [||])

        let tests =
            mappedTests
            |> Array.collect (fun (t, testCases) ->
                testCases
                |> Array.map (fun (fullName, testName, executionId) ->
                    let trxResult = TrxParser.parseTestResults trxPath executionId

                    if Seq.length testCases > 1 then
                        let ti =
                            t.Test.children.get (
                                t.Test.uri.Value.ToString()
                                + " -- "
                                + Convert.ToBase64String(Encoding.UTF8.GetBytes(testName))
                            )
                            |> Option.defaultWith (fun () ->
                                tc.createTestItem (
                                    t.Test.uri.Value.ToString() + " -- " + testName,
                                    testName,
                                    t.Test.uri.Value
                                ))

                        t.Test.children.add ti

                    { Test = t.Test
                        FullTestName = trxResult.FullTestName
                        Outcome = trxResult.Outcome
                        ErrorMessage = trxResult.ErrorMessage
                        ErrorStackTrace = trxResult.ErrorStackTrace
                        Expected = trxResult.Expected
                        Actual = trxResult.Actual
                        Timing = trxResult.Timing }))

        return
            { Project = projectWithTests.Project
                Tests = tests }
    }
```

There's still some gnarly mapping going on here. But, the distinct steps are overall much clearer. The simplification has also made the purpose of `runProject` much clearer. It doesn't just invoke `dotnet test` and return results. It does a good bit of work to merge test results with the known tests in the explorer UI. This changes my understanding of the function as a whole and where it belongs. Rather than a `DotnetTest` module, it probably belongs in some UI-focused module.


## Information Hiding

I could keep going with these refactoring for a long time, but I think the core trend is already well demonstrated. 

Each of these refactorings had a similar flow. 
- Meet the problem where it is
- Find separable sub-problems
- Isolate that sub-problem, using limited parameters and custom data types as necessary so the sub-problem only knows about he information it independently would want to know. Both for input and output
- Map the parent into the parameters of this separated sub-problem

Following this flow repeatedly allows us to create small functions that were easier to understand in isolation and could be reused in many contexts. This flow also clarified the original functions by focusing them on their overall goal rather than the details of certain steps. The consistent abstraction creates shorter, more readable, and more focused functions.

Aggressively definging the sub-problem based on it's own view of input and output (and not using mutable data or stateful actions) also allows us to mentally consolidate the sub-problem. We don't have to know how it works, only what output it provides.

These are all aspects of [Information Hiding](https://en.wikipedia.org/wiki/Information_hiding).
Information Hiding is the programming principle that tells us this kind of selfish separation is the primary way to decide how to split up code. Not by problem steps, not by data type, not by implementation approach, etc. Whatever lines allow us to hide information about how something works and just accept it as focused high-level operation, that's how code should be factored.

## Dependency Inversion

Astute readers might be wondering why the callers always have to conform to their dependencies. Doesn't that break information hiding for the caller and limit it's flexibility.

Indeed. That's why we have [Dependency Inversion](../posts/2022/2022-07-03-Dependency-injection-vs-Dependency-Inversion.md).
In this case, we can have our cake and eat it too. It's possible for the caller and called code to be defined on their own terms without knowledge of each other. But that's a [different blog post](../posts/2022/2022-07-03-Dependency-injection-vs-Dependency-Inversion.md).

## Conclusion

Information Hiding is very powerful, and we've seen it in action for several problems here. Done well, it creates both reusable actions that are easier to understand on their own. The caller also benefits from well defined steps that can can be read at a consistent abstraction, focusing the purpose of the composing function too.

We've also seen how information hiding can be accomplished incrementally ([including last post](./2023-08-14-Ionide-refactor-display-results.md)), creating pockets of well ordered code, stepping the overall code toward a larger goal, but without snowballing into wide-spread changes. 

