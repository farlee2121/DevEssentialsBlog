---
date: 2023-11-18
tags: []
title: Ionide - Merging diverse data sources
---

A key challenge working on the Ionide test explorer was merging data from various sources into one view. It was good example where the fundamental challenge wasn't technical, but defining useful assumptions.

<!--more-->

## Context

For context, I made a number of contributions to the Ionide test explorer. A more thorough explanation can be 
[read here](../posts/2023/2023-12-14-Ionide-test-explorer.md).


In short, the Ionide test explorer originally worked exclusively off of code analysis. That is, it analyzed the structure of the code to determine the tests in a test project (e.g. looking for `[Fact]` annotations).
This allowed a degree of live updates, but meant that the explorer's test tree
didn't always match the results you'd see returned from a test run. I.e. parameterized tests and reused test lists would break the test explorer. This led to a variety of broken behaviors.

Overall, code analysis-based test data led to a testing experience that did not meet my needs, and I decided to try to fix it.

## Key Assumptions

A fundamental challenge the explorer faced was that the code analysis and test result file didn't always agree.

A key decision I made early on was that the test results (i.e. trx file) would be the most fundamental source of truth, not the code analysis or visual explorer view.
The test result file represented the most reliable logical structuring of tests.

This assumption of a base truth source made merging sources easier. 
For one, it meant that all views of the tests should be aiming for the same set (and format) of test ids as the test results.

### Updating from the result file

The most fundamental value provided by this assumption (test results as the truth source) was explorer update stability.

I could assume visual explorer should always agree with the test result file,
so any add/remove/update in the test result file translates into a change in the explorer view. 

This means we can error correct the visual test explorer after every test run and even keep the explorer reasonably up-to-date for langauges we haven't implemented code analysis for (i.e. C#).

The explorer view can also be rebuilt anytime by re-parsing test results, which is relatively cheap and simple compared to restarting code analysis. This improved refresh support and in turn improved the end user's ability to recover from error states on their own. 

### Fewer Responsibilities for Code Analysis

Code analysis also became easier to handle by assuming test results were fundamental. Specifically, code analysis became purely a live update mechanism.

The code analysis sometimes disagrees with the tests results about the exact set of tests or their location in the hierarchy.
But treating code analysis as a supplemental data source side-steps that issue. 

At first, I was able to consider only the matching data between test results and code analysis to add location to tests (i.e. go to test, line lens, run in context) while ignoring any troublesome data. This combined the stability of the result file-based data with most of the benefit of code locations.

With that substantial mainline path supported, I was then able to iterate on more challenging scenarios with a smaller mental scope and overall project risk reduced.

Treating code analysis as supplemental also enabled solutions to more difficult features. For example, I was able to compare code analysis results to the *previous* code analysis results to decide what tests had been added/removed/renamed while still being able to use the results file baseline to ignore tests improperly placed by the code analysis.


## Merging - Core mechanics

A large portion of the test explorer work was figuring out why, when, and with what priority to merge data sources. All the merging led me to notice some interesting underlying patterns.

I realized that each merge had some unique logic but was fundamentally a variation on the same core mechanics.
The core mechanics were [tree traversal](https://en.wikipedia.org/wiki/Tree_traversal)
and sorting tests into added/removed/matched.

Traversal was made relatively easy by mapping different source to one format. This way, the tests were nested and grouped as uniformly as possible. Then the two views could be co-traversed based on id groupings and hierarchy. It's essentially like [Zip](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.zip) is for lists/arrays, but modified for trees. It matches up related tests groups from the two views as best as possible, then all I have to specify is how to merge the matched groups of tests.

Picture something like

```fsharp
let merged = Tree.zip resultFileTestHierarchy codebasedTestHierarchy (fun resultFileTests codeBasedTests ->
    // do stuff with peer tests from similar locations in each two trees
)
```

<!-- Co-traversing the trees was made easy by mapping all the different sources to one format. This allowed me to unify the traversal logic in a function. This co-traversal function  It takes care of matching related groups, and then I can just -->

As for merging each group of tests, the first step was always that I need to know what tests existed in both sets and which existed in only one set.
What I decided to do with each of those categories differed based on the context. 

Sometimes I expanded on this zip-and-diff with more advanced merging rules (e.g. for correcting mis-located tests), but this approach always formed the baseline.

Sorting items into overlap and one-set-only groupings generally looks like this
```fsharp
let set1 = set [...]
let set2 = set [...]
let both = trxTestIds.Intersect()
let set1_only = set1.Except(set2)
let set2_only = set2.Except(set1)
```

This approach is so consistent that I ended up writing what I call `venn` to do all of this in one call

```fsharp
let leftOnly,both,rightOnly = venn left right
```

The real version is a bit more complicated, it allows comparison on differently typed collections.

```fsharp
let leftOnly,both,rightOnly = venn (fun user -> user.Id) (fun purchase -> purchase.Buyer.Id) users purchases
```

Here's the whole venn method
```fsharp
let venn
    (leftIdf: 'Left -> 'Id)
    (rightIdf: 'Right -> 'Id)
    (left: 'Left array)
    (right: 'Right array)
    : ('Left array * ('Left * 'Right) array * 'Right array) =
    let leftIdMap =
        left
        |> Array.map (fun l -> (leftIdf l, l))
        |> dict
        |> Collections.Generic.Dictionary

    let rightIdMap =
        right
        |> Array.map (fun r -> (rightIdf r, r))
        |> dict
        |> Collections.Generic.Dictionary

    let leftIds = set leftIdMap.Keys
    let rightIds = set rightIdMap.Keys


    let intersection = Set.intersect leftIds rightIds

    let idToTuple id = (leftIdMap.[id], rightIdMap.[id])
    let intersectionPairs = intersection |> Array.ofSeq |> Array.map idToTuple

    let leftExclusiveIds = Set.difference leftIds intersection
    let rightExclusiveIds = Set.difference rightIds intersection

    let dictGet (dict: Collections.Generic.Dictionary<'Id, 'T>) id = dict.[id]
    let leftExclusive = leftExclusiveIds |> Array.ofSeq |> Array.map (dictGet leftIdMap)

    let rightExclusive =
        rightExclusiveIds |> Array.ofSeq |> Array.map (dictGet rightIdMap)

    (leftExclusive, intersectionPairs, rightExclusive)
```

## Conclusion

In summary, a key challenge in reworking the Ionide test explorer was merging differing views of existing tests. Much of this work wasn't the mechanics of merging, but choosing useful assumptions for how and when to merge data sets.

In the process, I noticed several consistent tools that made merging easier: getting data in unified format for merging, normalizing data traversal, and a `venn` method for compactly identifying similarities and differences between the sets.
