---
date: "2022-01-07T00:00:00Z"
tags:
- Critical Thinking
- Best Practice
- Integration
- Deployment
title: Qualities of a Good Dev Environment
---

I recently tried to explain when a developer should be cautious versus when they should freely experiment. This caused me to realize I never learned this lesson explicitly. It's an intuition I built over time and forgot I had to learn. I believe the answer aligns with what makes a good development environment.

Trying to identify times for caution first led me to answers like
- Any time live data is involved (this tends to be the most powerful flag for caution because it's also usually the hardest to recover from)
- Any time production assets are involved
- Any chance of permanent loss
- Possibility of breaking other people's work 
  - other developers
  - assets used by other workers
  - public API changes that will effect consumers on release


These are all true, but there a bit of a lie. I consider API changes at a design level while coding, but everything else I don't usually consider until pull requesting or other forms of integration (e.g. deployment). My most basic criteria for caution is a workflow stage: pull requests (or code integration in genreal). 

Stated differently, I feel I can be bold and break things as long as I'm still in my development environment. This means that the development environment can't violate any of the caution indicators listed above. A development environment should 
- never use live data
- never use production assets or risk harming them
- never risk permanent loss of meaningful data or assets
- never risk breaking other contributor's workflows


To meet these assumptions a development environment should
- be disposable. Easy to delete and start from scratch again
- should not share stateful resources with any other contributors
  - should not share data stores, limited capacity infrastructure, non-isolated infrastructure, configuration, source code branches, etc
- require a clear and mandatory step to transition work from development to shared

This is somewhat analogous to why immutability is becoming popular in programming languages. It follows the [principle of least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment). It causes our development environments to more often behave how we naturally expect them to.

As a bonus, these same questions also feed into deployment and disaster recovery factors. For example,
- We should ensure permanent data loss is never possible
- We should deploy such that consumer workflows are never broken
- We should deploy such that broken production assets are quickly recovered from
- Modifying production assets should require authorization, intention, and predictable process (controlled access, no accidental modification)

## Conclusion

Flags for developer caution and properties of a good development environment are two sides of the same question. A development environment should avoid any need for caution and draw a clear boundary before caution becomes necessary.

