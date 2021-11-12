---
layout: post
tags: [Critical Thinking, Best Practice, Integration, Deployment]
---

# Qualities of a Good Dev Environment

I recently tried to explain when a developer should be cautious versus when they should freely experiment. This caused me to realize I never learned this lesson explicitly. It's an intuition I built over time and forgot I had to learn. I believe the answer aligns with what makes a good development environment.

Trying to identify times for caution first led me to answers like
- Any time live data is involved (this tends to be the most powerful flag for caution because it's also usually the hardest to recover from)
- Any time production assets are involved
- Any chance of permanent loss
- Possibility of breaking other people's work 
  - other developers
  - assets used by other workers
  - public API changes that will effect consumers on release


These are all true, but there a bit of a lie. I consider API changes at a design level while coding, but everything else I don't usually consider until pull requesting or other forms of integration (e.g. deployment).

My most basic criteria for caution is that I'm not very cautious until I reach the development stage dedicated to being cautious and verifying shared assumptions about the code.

Stated differently, I feel I can be bold and break things as long as I'm still in my development environment. This means that the development environment can't violate any of the caution indicators listed above. A development environment should 
- never use live data
- never use production assets or risk harming them
- never risk permanent loss of meaningful data or assets
- never risk breaking other contributors workflows


To meet these assumptions a development environment should
- be disposable. Easy to delete and quickly start from scratch again
- should not share stateful resources with any other contributors
  - should not share data stores, limited capacity infrastructure, non-isolated infrastructure, configuration, source code branches, etc
- Require a clear and mandatory step to transition work from development to shared

This is somewhat analogous to why immutability is becoming popular in programming languages. It follows the [principle of least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment). It causes our development environments to more often behave how we naturally expect them to.

As a bonus, these same questions also feed into what risks our deployment and disaster recovery plans should account for. For example,
- We should set ourselves up so permanent significant data loss is never possible. - We should deploy such that consumer workflows are never broken
- We should deploy such that broken production assets are quickly recovered from
- A clear boundary should be set and enforced before production assets can be modified

## Conclusion

Flags for developer caution and properties of a good development environment are two sides of the same question. A development environment should be set up to avoid any need of caution, and draw a clear boundary for when caution becomes necessary.



<!-- - Basics of Governance?
  - essence is decentralizing responsibility... maybe managing levels of trust is a better way of saying it. Flip side is managing levels of risk. It's about how much risk you're willing to accommodate from certain personnel. 
    - example: the company owner in small to medium businesses can generally sink the company if they want to. Therefore, there isn't much additional risk if they can access many assets. There is risk though if they might hand that access to someone else, or mistakenly mismanage an asset. 
  - tools are anything that forces review or multip
  - can generally be forced through some replication with separate ownership
  - feeling a bit meh on this one...
  - 

Turn jack discussion into blog post
- not about who, but what -> guaranteeing a level of quality before integration / ability to impact others. Some kinds of verification may require special expertise. Main path should avoid expertise and set up flags to trigger additional reviews for less frequent or specialized concerns. Else experts become a team bottleneck. Here's my first pass at defining a such a review checklist
- maybe also mention multiple reviewers as process assurance
 -->