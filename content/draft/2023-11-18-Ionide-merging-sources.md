---
date: 2023-11-18
tags: []
title: Ionide - Merging diverse data sources
---

A key challenge working on the Ionide test explorer was merging data from various sources into one view.

<!--more-->

## Context

For context, I made a number of contributions to the Ionide test explorer. A more thorough explanation can be 
[read here](./2023-08-11-Ionide-test-explorer.md).

## Key Assumptions

The Ionide test explorer originally worked exclusively off of code analysis.
This allowed a degree of live updates, but meant that the explorer's test tree
didn't always match the results you'd see returned from a test run (i.e. parameterized tests, reused test lists).

Reworking the explorer to merge these views was challenging, since the code analysis and test results didn't always align.

A key decision I made early on was that the test results (i.e. trx file) would be the most fundamental source of truth, not the code analysis or visual explorer view.
The test results represented the most reliable logical structuring of tests.

This assumption of a base view made it easier to handle merging. 
For one, it meant that all views of the tests should be aiming for the same set (and format) of ids as the test results.

The explorer should always agree with the test results,
so any add/remove/update in the tests results translates into a change in the explorer view. 
Any tests added or removed since the last test run could be reflected in the explorer when updating pass/fail statuses
It also means I could rebuild the explorer view anytime by re-parsing test results.

Code analysis also became easier to handle by assuming test results were fundamental. 
I didn't even try to initially fill the test explorer using code analysis. 
Instead, code analysis became purely a live update mechanism.
The code analysis sometimes disagrees with the tests results about the exact set of tests or their location in the hierarchy.
But that's no issue, ids different from the test results can be ignored. 
But if we ignore every different id, then code analysis can't provide live update to the explorer. A renamed or added/removed test is by its very nature going to differ from the last test run results.
Instead, we can compare code analysis results to the *previous* code analysis results. 
This way we can tell when tests update and change the explorer if that previous test exists, 
but avoid tests incorrectly placed by the code analysis

## Merging - Lots of variation on the same mechanic

A large portion of the test explorer work was figuring out how to merge different test data sources for different purposes.
I realized that each situation had some unique logic but was fundamentally a variation on the same core mechanics.

The core mechanics were [tree traversal](https://en.wikipedia.org/wiki/Tree_traversal) (i.e. merging each nested grouping of tests) 
and sorting tests into added/removed/matched.

Traversal was made relatively easy by mapping different source to one format. This way tests were nested and grouped as uniformly as possible. Then the two views could be co-traversed based on id groupings and hierarchy. It's essentially like [Zip](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.zip) is for lists/arrays. It matches up related tests groups from the two views as best as possible, then all I have to provide is how to merge each grouping of tests.

<!-- Co-traversing the trees was made easy by mapping all the different sources to one format. This allowed me to unify the traversal logic in a function. This co-traversal function  It takes care of matching related groups, and then I can just -->

As for merging each group of tests, the first step was always that I need to know what tests existed in both sets and which existed in only one set.

What I decided to do with each of those categories differed based on the sourced, and I sometimes perform more advanced matching rules if the basic match doesn't align tests between views, but this was always the starting point

.NET has set functions for differentiating sets. You might write code like
```fsharp
let set1 = set [...]
let set2 = set [...]
let both = trxTestIds.Intersect()
let set1_only = set1.Except(set2)
let set2_only = set2.Except(set1)
```

This gets pretty cumbersome. So I ended up writing what I call `venn` to do all of this in one call

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

In summary, a key challenge reworking the Ionide test explorer was merging differing views of existing tests.
In the process, I noticed several consistent tools that made merging easier: getting data in unified format for merging, normalizing data traversal, and a `venn` method for compactly identifying similarities and differences between the sets.

With these tools in place, the main challenge was deciding when views should be compared and what to do for each kind of misalignment.