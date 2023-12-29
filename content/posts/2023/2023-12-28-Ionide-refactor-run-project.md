---
date: 2023-12-28
seriesId: "Ionide Refactor"
tags: [Information Hiding, Refactoring]
title: Refactoring for Information Hiding - Ionide Case Study - Run Project
---

<!-- TODO: It'd still be nice to cover trying to centralize testRun, but discovering the build needed to be serialized an then retaining sub-methods, but grouped to make their ownership and non-reusability clear -->

Information Hiding is a critical, but tricky principle to master. This post continues a worked example of Information Hiding based on my [Ionide test explorer contributions](https://github.com/ionide/ionide-vscode-fsharp/pull/1874). 
<!--more-->

The [previous post](../../posts/2023/2023-12-21-Ionide-refactor-display-results.md) explored the top-level flow, now we'll dive into a more complex method.

The full work is available if you want to explore in more depth. The the [final code diff](https://github.com/ionide/ionide-vscode-fsharp/pull/1874/files) is a bit useless because the extensive changes. It might be better to read [the original code](https://github.com/ionide/ionide-vscode-fsharp/blob/6c485f6f5970dd3aa9e7a0fe17ba061742c70b80/src/Components/TestExplorer.fs) then the [updated version](https://github.com/ionide/ionide-vscode-fsharp/blob/e882c87c13cb55e1f6752da8a42ec41f19540c67/src/Components/TestExplorer.fs).

## Recap
I recommend reading the [previous post](../../posts/2023/2023-12-21-Ionide-refactor-display-results.md) before this one.

Last post, we discovered that the test explorer responds to test runs through `runHandler`, which orchestrates the high level flow of a test run (find projects, build, test, display results).

Many of those top-level steps were easily readable from the series of method calls, but displaying test results was not. Factoring out the result display code clarified the top level method and revealed that `TestResult` couples UI object instances with otherwise non-UI information. 

Previously, we mitigated the UI and test result data coupling in the display method. This post will explore the origin of that coupling in `runProject`.


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

The function name and module `DotnetTest.runProject` give us a clue to the overall intent:
this function runs a test project.

Next let's see what the function signature tells us.
```fsharp
let runProject (tc: TestController) (projectWithTests: ProjectWithTests) : JS.Promise<ProjectWithTestResults>
```

Makes sense that running a test project returns test results. It's less clear why the `testController` (used for creating test runs and accessing the UI test explorer) is needed as a parameter. UI state shouldn't be needed to run test projects, we do that in the command line with `dotnet test` all the time. `ProjectWithTests` is also a bit mysterious. Shouldn't we only need to know the test project to run?

These arguments reinforce my suspicions that too much is going on here and we could use some Information Hiding.

After analyzing the method body for a while, I see three major sections: 
- building test filters
- invoking `dotnet test`
- parsing the test results

But, the method is hard for my brain to engage with even after discerning this. As Mark Seemann might say, this code doesn't fit in my head. Let's reflect our learnings in the code to make the method more readable. 

A key way to reflect our learnings and make the code more readable is to isolate distinct concerns (information hiding). 

## Factorizing Rules of Thumb

Isolating concerns isn't just about factoring out a method and giving it a nice name (though that helps). It's important that each sub-concern stands on it's own.

Some rules of thumb
- Our understanding of the original flow should be improved. Usually this is from replacing low-level details with a single conceptual action so the original flow reads more smoothly.
- We should be able to work effectively with the factored code, even if we couldn't view it's implementation.
- The factored code should make sense on it's own. How it works and what it achieves should be clear without examining callers. It's a self-contained sub-problem.
- The factored method, including it's input and output, should be equally natural if we used the function in a different context. 


Consider test result parsing. Parsing test results would also be used in flows to generate test reports or analyze trends across test runs. If our result parsing code is implemented with good information hiding, it should feel as comfortable in those application as in the test explorer.


## Isolating TRX Parsing

Back to `runProject`. The TRX (Test Result XML) file parsing consumes the most space in `runProject`, and is also a clear reusable concern. Let's start there.

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

For this initial refactor, I tried to change as little as possible. I moved the code and then found out what parameters the new functions needed to work.

However, I did make one key change. The `parseTestResults` code originally directly constructed a `TestResult`, but `TestResult` is what couples TRX parsing to UI-specific `TestItem` instances. It was just as easy to just make a new return type for the result without the TestItem, and now `parseTestResults` doesn't need any UI knowledge. I can leave the UI knowledge at a higher level.

These functions still have some information hiding problems though. They take a `ProjectWithTests` but really only need the project path. That's easy enough to change

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

Hmm, there's still unnecessary information here. A trx file doesn't need to be associated with a project. Plus, both parsing functions replicate the same assumption about where trx files live relative to projects. 

Let's change the parse functions to work on a trx file path and create a separate function for getting a trx path from a project path.

```fsharp

let getTrxPathForProject projectPath =
    node.path.resolve (node.path.dirname projectPath, "TestResults", "Ionide.trx")

let parseTestDefinitions (trxPath: string) =
    //...

let parseTestResults (trxPath: string) executionId fullTestName =
    //...
```

Oh, and we can get the test's fullName based on the executionId we already take as a parameter, so we don't need the extra `fullTestName` argument to `parseTestResults`

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

Now we've got two TRX parsing methods that know nothing about our test explorer or it's UI.
We could even publish this TRX parsing as a Nuget package for others to use. Anyone with a TRX file might benefit from it. 


### Isolating Filter Building (Mostly)

Filter expression building also seems like a separable problem. We don't need all the details of how it works in the root `runProject` function. We can separate the details into their own function to improve the readability of `runProject` and possibly even reuse the filter expression building.

Let's try an approach similar to what we did before. First, move out the filter expression builder as-is and figure out what it needs.

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

Hmm. I don't really understand the decision to check `if not projectWithTests.HasIncludeFilter`. That doesn't seem like a something I'd usually consider if I was making a filter expression for `dotnet test`. Normally I just need to know the names of the tests or test groups I want to run.


My first intuition is to push the `HasIncludeFilter` check up a level.
The parent is usually more context-specific. If it doesn't fit the parent, they can push it up again until it finds a fit.

```fsharp
let buildFilterExpression testItems = 
    let filterValue =
        testItems
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

Oh. This helped me realize that `buildFilterExpression` isn't just building the filter expression. It's setting up the `--filter` cli argument.

We can move the cli arg mapping. I'll also separate out the individual testItem to filter string from the overall filter expression building for clarity.

```fsharp
let buildFilterExpression testItems = 
    let testItemToFilterString testItem =
        if testItem.FullName.Contains(" ") && testItem.Test.Type = "NUnit" then
            // workaround for https://github.com/nunit/nunit3-vs-adapter/issues/876
            // Potentially we are going to run multiple tests that match this filter
            let testPart = testItem.FullName.Split(' ').[0]
            $"(FullyQualifiedName~{testPart})"
        else
            $"(FullyQualifiedName={testItem.FullName})") 

    let filterValue =
        testItems
        |> Array.map testItemToFilterString
        |> String.concat "|"

    filterValue
```



That *almost* leaves* us with a filter builder that only needs to know about the names of the tests we want to run, but we still have that NUnit check... I'll settle for passing TestItems for now. It seems simplifying further requires more knowledge than I can reasonably attain for now.

### Clarifying Dotnet Test Invocation

The last major section to refactor was the invocation of `dotnet test`.

Again, let's copy the code into a function and see what it needs to run.

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

A few things to clean up
- It doesn't need a full `projectWithTests`, just the project path
- There's a sneaky hard-coded trx output path
- Mapping the filter expression to a cli argument also should be included here, not in the parent flow.

Fixing those, we have a generic wrapper for invoking the `dotnet test` CLI command that is more reusable. It also moves process invocation and CLI argument formatting details out of the larger `runProject` flow.

```fsharp
let private _dotnetTest (projectPath:string) (filterExpression:string option) (trxOutputPath: string option)  =
    let filterArg =
        match filterExpression with
        | None -> Array.empty
        | Some filterExpression -> [| "--filter"; filterExpression |]

    Process.exec
        "dotnet"
        (ResizeArray(
            [| "test"
                projectPath
                "--no-restore"
                $"--logger:\"trx;LogFileName={trxOutputPath}\""
                "--noLogo"
                yield! filterArg |]
        ))
```


## Revisiting runProject

Let's update `runProject` to use our newly factored methods. Really, I would have done these after each factoring, but it's a lot of code to re-read in a blog post. The updated `runProject` is below.

```fsharp
let runProject (tc: TestController) (projectWithTests: ProjectWithTests) : JS.Promise<ProjectWithTestResults> =
    logger.Debug("Nunit project", projectWithTests)

    promise {
        // https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-test#filter-option-details
        let filterExpression = 
            if projectRunRequest.HasIncludeFilter then
                Some(buildFilterExpression projectRunRequest.Tests)
            else
                None

        let trxPath = TrxParser.getTrxPathForProject projectWithTests.Project.Project

        _dotnetTest projectWithTests.Project.Project filterExpression trxPath

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


## Refactor Flow & Information Hiding

I could keep going with these refactoring for a while, but I think the core trend is already decently demonstrated. 

Each of these refactorings had a similar flow. 
- Meet the problem where it is
- Find a separable sub-problem
- Isolate that sub-problem. 
  - Copy target code to factor. See what input/output it currently needs
  - Use sub-problem-oriented parameters and custom data types as necessary so the factored code only knows about the information it independently would want to know. Both for input and output. 
  - Push up concerns that seem out of place
- Update the parent function to use the factored sub-problem

Following this flow repeatedly allows us to create small functions that were easier to understand in isolation and could be reused in many contexts. This flow also clarified the original functions by focusing them on their overall goal rather than the details of certain steps. The consistent abstraction creates shorter, more readable, and more focused functions.

From another view, striving for code that can naturally be reused in many contexts (maybe even different systems) required us to define the sub-problem on it's own terms. The inputs, outputs, and units of work are all oriented to the sub-problem itself. 
When done well, we can understand and use the sub-problem code even without access to it's implementation. The sub-problem becomes a single unit of work in our minds. This clean separation greatly reduces the scope of code we need to understand at one time.  

These are all aspects of [Information Hiding](https://en.wikipedia.org/wiki/Information_hiding) (and a review of the [rules of thumb](#factorizing-rules-of-thumb) outlined earlier).

Information Hiding is the programming principle that tells us this kind of selfish separation is the [primary criteria for deciding how to split up code](https://dl.acm.org/doi/10.1145/361598.361623). Not by problem steps, not by data type, not by implementation approach, etc. Whatever split allow us to hide information about how something works and just accept it as focused high-level operation, that's how code should be factored.



## Bonus - Dependency Inversion

Astute readers might be wondering why the callers always have to conform to their dependencies. Doesn't that break information hiding for the caller and limit it's flexibility.

Indeed. That's why we have [Dependency Inversion](../../posts/2022/2022-07-03-Dependency-injection-vs-Dependency-Inversion.md).
In this case, we can have our cake and eat it too. It's possible for the caller and called code to be defined on their own terms without knowledge of each other. But that's a [different blog post](../../posts/2022/2022-07-03-Dependency-injection-vs-Dependency-Inversion.md) ([or two](../../posts/Open-Closed-by-Example/2023-03-02-3-Interchangable-Dependencies.md)).

<!-- ## Conclusion
TODO: This conclusion is a bit awkward. Maybe I just ditch it for the section above Dependency inversion 

Information Hiding is about limiting the amount of code that must be understood together and is the [primary criteria for deciding how to split up code](https://dl.acm.org/doi/10.1145/361598.361623). 

Done well, Information Hiding creates reusable components that are also understandable independently. Callers of such components also benefit from well defined steps that can can be read at a consistent abstraction, focusing the purpose of the composing function too.

This post and the [previous post](../posts/2023/2023-12-21-Ionide-refactor-display-results.md) walked through several examples from my [work on Ionide](https://github.com/ionide/ionide-vscode-fsharp/pull/1874). These examples demonstrated discovery of separable concerns and how information hiding can be accomplished incrementally. This incremental approach to information hiding created pockets of clear code while stepping the overall code toward a larger goal, but without snowballing into wide-spread changes.  -->

