---
date: 2023-12-21
seriesId: "Ionide Refactor"
tags: [Information Hiding, Refactoring]
title: Refactoring for Information Hiding - Ionide Case Study - Getting Acquainted
---

Information Hiding is a critical, but tricky principle to get familiar with. My work on the [Ionide Test Explorer](https://github.com/ionide/ionide-vscode-fsharp/pull/1874) presented some good examples of refactoring to limit scope (Information Hiding). I'll try to recreate them as worked examples.
<!--more-->

<!-- TODO: make sure I'm really clear about information hiding -->
Up front, I want to be clear that I'm not trying to bash the code that came before.
The previous author was exploring many new concepts while trying hash out a viable product, graciously giving their time to help the community. They did a good job keeping the explorer contained and creating reusable code analysis. Many of these methods I'll refactor likely started small and grew past their original scope, as methods do. 
Code and our own understanding change, and that's why refactoring is a continual effort.

## Exploring The Existing Code

I set out to make some underlying changes to the Ionide test explorer (specifically, to use test results as the source of truth instead of code analysis). But first I needed to understand the existing explorer.

After some poking, I found that the whole test explorer was contained in [components/TestExplorer.fs](https://github.com/ionide/ionide-vscode-fsharp/blob/6c485f6f5970dd3aa9e7a0fe17ba061742c70b80/src/Components/TestExplorer.fs). Great, a fairly limited scope.

A bit more poking, and I found the method that VS Code calls when the user requests a test run, `runHandler` (show below).

```fsharp
let runHandler
    (tc: TestController)
    (moduleTypes: Collections.Generic.Dictionary<string, string>)
    (req: TestRunRequest)
    (_ct: CancellationToken)
    : U2<Thenable<unit>, unit> =
    logger.Debug("Test run request", req)
    let tr = tc.createTestRun req

    if tc.items.size < 1. then
        !! tr.``end`` ()
    else
        let projectsWithTests = getProjectsForTests tc moduleTypes req
        logger.Debug("Found projects", projectsWithTests)

        projectsWithTests
        |> Array.iter (fun { Tests = tests } ->
            Array.iter (fun (test: TestWithFullName) -> tr.enqueued test.Test) tests)

        logger.Debug("Test run list in projects", projectsWithTests)

        promise {
            let! successfulProjects, failedProjects = buildProjects projectsWithTests

            failedProjects
            |> Array.iter (fun project ->
                project.Tests
                |> Array.iter (fun t -> tr.errored (t.Test, !^ vscode.TestMessage.Create(!^ "Project build failed"))))

            let! completedTestProjects = runTests tr tc successfulProjects

            completedTestProjects
            |> Array.iter (fun (project: ProjectWithTestResults) ->
                project.Tests
                |> Array.iter (fun (test: TestResult) ->
                    match test.Outcome with
                    | TestResultOutcome.NotExecuted -> tr.skipped test.Test
                    | TestResultOutcome.Passed -> tr.passed (test.Test, test.Timing)
                    | TestResultOutcome.Failed ->
                        test.ErrorMessage
                        |> Option.iter (fun em ->
                            let ti = test.Test

                            let fullMsg =
                                test.ErrorStackTrace
                                |> Option.map (fun stackTrace -> sprintf "%s\n%s" em stackTrace)
                                |> Option.defaultValue em

                            let msg = vscode.TestMessage.Create(!^fullMsg)
                            msg.location <- Some(vscode.Location.Create(ti.uri.Value, !^ti.range.Value))
                            msg.expectedOutput <- test.Expected
                            msg.actualOutput <- test.Actual
                            tr.failed (ti, !^msg, test.Timing))))

            tr.``end`` ()
        }
        |> unbox
```

I can quickly see from method calls that `runHandler` finds projects, builds projects, and runs test projects. 

The next bit is long and hard to decipher at a glance.
After a bit of reading. I can tell that this is setting test outcome statuses in the UI.

## Clarifying Intent with Methods

Ok, so let's change the code to make this newfound knowledge more immediately apparent. We're looking for a consistent level of abstraction in `runHandler` and a separable UI updating method that's as independent as possible.

Let's start by moving the status setting code to it's own method and seeing what it requires to compile.

```fsharp
let displayTestResultInExplorer (testRun: TestRun) (testResult: TestResult)
    match test.Outcome with
    | TestResultOutcome.NotExecuted -> testRun.skipped testResult.Test
    | TestResultOutcome.Passed -> testRun.passed (testResult.Test, testResult.Timing)
    | TestResultOutcome.Failed ->
        test.ErrorMessage
        |> Option.iter (fun em ->
            let ti = testResult.Test

            let fullMsg =
                test.ErrorStackTrace
                |> Option.map (fun stackTrace -> sprintf "%s\n%s" em stackTrace)
                |> Option.defaultValue em

            let msg = vscode.TestMessage.Create(!^fullMsg)
            msg.location <- Some(vscode.Location.Create(ti.uri.Value, !^ti.range.Value))
            msg.expectedOutput <- testResult.Expected
            msg.actualOutput <- testResult.Actual
            testRun.failed (ti, !^msg, testResult.Timing))
```


This reveals the UI state is controlled by the TestRun, which requires an instance of a TestItem (the visual explorer item instance) to set a status. We also need the test outcome (i.e. pass/fail) along with potential error messages and such. 

## Unnecessary Coupling Revealed

Refactoring the map from test outcomes to visual state into its own method reveals some unnecessary coupling.

Specifically, our TestItem instance is a member of TestResult. That seems like a violation of information hiding. TestItem is a UI-specific type. I might want to know the outcome of a test without needing to know about the UI element it ties back to. For example, if I just want to log the test's name and result in a console (which I later did). Dragging the UI element along adds unnecessary complexity.

Further, I checked how TestResults are constructed and, sure enough, including a TestItem was dragging UI knowledge down the call chain. Specifically into the test result parsing code under `runProject`. 

Extracting test results from a TRX file shouldn't require knowledge of the UI, that's a violation of Information Hiding. Parsing a test result file is an independent concern. In fact, it's not hard to imagine it as a stand-alone library that many applications would use, let alone other uses in our own project. But, the TestItem coupling prevents the TRX parser from being reused at all and makes the code more difficult to understand.


## Finding a Gradual Refactor

Ok. So we can see this is moving in a direction where TestItem unbundles from TestResult, but that could be a wide-reaching change that forces us into a snowball of changes. We want small and complete commits that don't force wide-reaching changes, but that eventually add up to the desired decoupling.

A good strategy for this is to push the concern up another level. In our case, our new visual state mapping method can pretend like TestResult doesn't contain a TestItem and require the TestItem to be passed separately.
This is one way to apply the Strangler Fig refactoring pattern.

```fsharp
let private displayTestResultInExplorer (testRun: TestRun) (testItem: TestItem, testResult: TestResult) =
    match testResult.Outcome with
    | TestResultOutcome.NotExecuted -> testRun.skipped testItem
    | TestResultOutcome.Passed -> testRun.passed (testItem, testResult.Timing)
    | TestResultOutcome.Failed ->
        let fullErrorMessage =
            match testResult.ErrorMessage with
            | Some em ->
                testResult.ErrorStackTrace
                |> Option.map (fun stackTrace -> sprintf "%s\n%s" em stackTrace)
                |> Option.defaultValue em
            | None -> "No error reported"

        let msg = vscode.TestMessage.Create(!^fullErrorMessage)

        msg.location <- TestItem.tryGetLocation testItem
        msg.expectedOutput <- testResult.Expected
        msg.actualOutput <- testResult.Actual
        TestRun.showFailure testRun testItem msg testResult.Timing
```

Now we're back to the level we started with, but `runHandler` is more concise and readable.

```fsharp
let runHandler
    (tc: TestController)
    (moduleTypes: Collections.Generic.Dictionary<string, string>)
    (req: TestRunRequest)
    (_ct: CancellationToken)
    : U2<Thenable<unit>, unit> =
    logger.Debug("Test run request", req)
    let tr = tc.createTestRun req

    if tc.items.size < 1. then
        !! tr.``end`` ()
    else
        let projectsWithTests = getProjectsForTests tc moduleTypes req
        logger.Debug("Found projects", projectsWithTests)

        projectsWithTests
        |> Array.iter (fun { Tests = tests } ->
            Array.iter (fun (test: TestWithFullName) -> tr.enqueued test.Test) tests)

        logger.Debug("Test run list in projects", projectsWithTests)

        promise {
            let! successfulProjects, failedProjects = buildProjects projectsWithTests

            failedProjects
            |> Array.iter (fun project ->
                project.Tests
                |> Array.iter (fun t -> tr.errored (t.Test, !^ vscode.TestMessage.Create(!^ "Project build failed"))))

            let! completedTestProjects = runTests tr tc successfulProjects

            completedTestProjects
            |> Array.iter (fun (project: ProjectWithTestResults) ->
                project.Tests
                |> Array.iter (fun (testResult: TestResult) ->
                   displayTestResultInExplorer testRun testResult.Test testResult))

            tr.``end`` ()
        }
        |> unbox
```

This change is pretty safe. It didn't change any behavior and it's small enough in scope that it's easy to understand and review. Yet it meaningfully improved the understandability of the code and stepped us closer to some wide-scale refactors.

We also identified that `runProject` has some mixed responsibilities, and some better information hiding could potentially create more reusable components.
I'll dig into that [next post](../../draft/2023-08-16-Ionide-refactor-run-project.md).

## Full Code Links

Note, the full Ionide test explorer work is available if you want to explore in more depth. The the [final code diff](https://github.com/ionide/ionide-vscode-fsharp/pull/1874/files) is a bit useless because the extensive changes. It might be better to read [the original code](https://github.com/ionide/ionide-vscode-fsharp/blob/6c485f6f5970dd3aa9e7a0fe17ba061742c70b80/src/Components/TestExplorer.fs) then the [updated version](https://github.com/ionide/ionide-vscode-fsharp/blob/e882c87c13cb55e1f6752da8a42ec41f19540c67/src/Components/TestExplorer.fs).
<!-- 

- recreate trying to trawl code to understand
- maybe shortcut and after first level show how deep certain high-level args (like tc or rc) are passed
- refactor some simple things to improve consistency in abstraction and portion off self-contained bits of understanding
- show my oops needing to move serialized build out again and moving buildProject into scope to make it clear it doesn't really have independent use

still want to come back to the depth that certain arguments are passed to if I can

split into two posts if it gets long
 -->
