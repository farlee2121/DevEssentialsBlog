---
layout: post
tags: [Documentation, Process]
---

<!-- TODO: Reconsider the title -->
# Levels of Documentation

A friend has been struggling with under-documented projects (\*cough\* [zoo software](https://blog.ploeh.dk/2012/12/18/RangersandZookeepers/)). This raised the question, what makes good documentation? And what is a good documentation system? Here's my opinion backed with some sources.

## Good documentation

Good documentation includes various kinds of code
- Code that communicates it's intent well is the best documentation
  - This is largely driven by structure and names
- Tests document code use and expectations

Non-code documentation
- Shouldn't repeat the code
- Explains what code can't explain: motivations, trade-offs, considered alternatives, reasoning
- Infrequently changes when code changes

All documentation
- Should be discoverable when and where you need it
  - should generally live in the code base and in source control

## My Documentation Guides
Here is my rule of thumb for how I document common types of information. The table is formatted as 

`info to document -> documentation technique`

- sources, gotchas, explanations of non-obvious decisions -> code comments
- requirements -> tests (usually [Test Api](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/) or [Gherkin-named tests](../_posts/2021-12-12-Gherking-Test-Names.md))
- domain concepts -> Code structure and names (class, function, parameter, etc), [Ubiquitous Language](https://www.martinfowler.com/bliki/UbiquitousLanguage.html) glossary
- motivations and trade-offs -> most typically in [ducks](../_posts/2021-05-21-Duck-Structure.md) or [Architectural Decision Records](https://adr.github.io/)
- Overviews, getting started, high-level design pattern, project contacts -> readme

Project documentation should live in the project source control. 

Often also helpful to have some team or company landing page of projects. Each has a quick summary, location of resources, the project owner, and maybe a project status.

## Sources
My opinion on documentation is largely based on the following sources, plus experience.
- [Code Complete](https://www.amazon.com/Code-Complete-Developer-Best-Practices-ebook/dp/B00JDMPOSY). Especially Chapter 32: Self-Documenting Code
  - informed naming strategies, low-level design strategies, code as the only up-to-date document, granularity of comments, etc
- [The Pragmatic Programmer](https://en.wikipedia.org/wiki/The_Pragmatic_Programmer)
  -  Documentation discussed throughout with themes of explaining tradeoffs, motivations, assumptions, investigations.
- [Design of Design](https://en.wikipedia.org/wiki/The_Design_of_Design)
  -  The source of [Duck Doc](../_posts/2021-05-21-Duck-Structure.md) [key items](../_posts/DevEssentials/2018-12-08-Spec-Docs.md)
- [Domain Driven Design](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215). Especially Ch 2
  -  Inspired capturing domain concepts in code, term glossaries. Reinforced non-code documents as overview and motivation-level documents.
- Robert Martin was my exposure to tests as documentation
  - [Gherkin](https://specflow.org/learn/gherkin/), [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development), and [Test Api](https://codewithspoon.com/2019/12/stop-corrupting-yourself-test-against-abstractions/) for how to encode requirements in tests
- [Tool Support For Project Tracking](https://stevemcconnell.com/articles/tool-support-for-project-tracking/)
  - documents belong in source control


TODO: link ADRS, UL, ducks, sources