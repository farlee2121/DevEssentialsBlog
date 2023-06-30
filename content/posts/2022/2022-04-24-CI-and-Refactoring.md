---
date: "2022-04-24T00:00:00Z"
tags: [Continuous Integration, Refactoring]
title: "Continuous Integration and Refactoring: How to constructively develop against a single branch"
aliases:
- /2022/04/24/ci-and-refactoring
---

Continuous Integration (CI) is a hot buzzword. I've had a general sense of it for a while, but [Refactoring](https://refactoring.com/) chapter two brought its place into sharp focus, mainly through Preparatory Refactoring.
<!--more-->

Martin Fowler is approaching CI from how it relates to refactoring. Specifically, CI minimizes the inhibition to refactor, even at a large scale, by avoiding as much merging pain as possible. This leads to more frequent refactoring and a healthier code base. A healthier code base is easier to understand and easier to keep healthy.


However, the main revelation for me was *preparatory refactoring*. Preparatory refactoring suggests we first refactor to make adding a feature easy, and then we add the feature.

This approach turns every code change into a minimal change. All works is accomplished in small steps that are mergable. Refactoring improves the code in small steps that don't break behavior. Thus, we should be able to integrate our refactorings into the main branch as they happen without affecting others or releasability. The feature is then added in a small step, which we can then also integrate with small disruption.

Preparatory refactoring, then adding the feature, reduces code base disruption to the point where developers on a team can all be working against the main branch. In fact, it is possibly best for them to do so they can react to changes fast. *This is true Continuous Integration*.

This blew my mind. I've long got the idea of integrating often, even daily. However, I didn't really think it possible for developers to constructively all work off the same branch. However, this mature development approach makes it both possible and beneficial!

I've experienced how wide refactorings can become hard to merge even after a few days. I can see how reducing that pain would encourage more frequent refactoring. Plus, this scheme meshes delightfully with my process filter: [stable, incremental, additive](../../posts/2022/2022-02-25-Stable-Incremental-Additive.md).

However, this method does not come with out some caveats. It requires
- mature and trusted contributors
- a mature test suite
- feature flags to control rollout of features separate from deployment of the code

Martin Fowler also mentions that open source and cross-team scenarios should probably still use feature branches. Many CI users also integrate daily instead working on the same branch. He doesn't say why, but I'd guess it allows for a bit of experimental buffer.

## Conclusion

Refactoring clarified the place and value of Continuous Integration in a way that had never quite connected before. Preparatory refactoring keeps every unit of work small and complete such that developers can even work against the same branch. This minimizes integration pain and minimizes barriers to refactoring.

I'm excited to apply preparatory refactoring and explore the benefits for myself!