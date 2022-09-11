---
date: 2022-09-05T00:00:00-00:00
tags: []
title: "Some Beliefs about Software"
draft: true
---

<!-- NOTE: note sure I actually want to publish this -->

<!-- What's holding me up? 
The five fundamental beliefs posts emerged from this and stole it's thunder. I'm wondering how valuable this post is and if the same framing still makes sense.
 -->

This is my attempt to enumerate important beliefs I hold about software and trace them to their origins.
<!--more-->

What do I believe about software development? It's a surprisingly difficult question. I believe many things about many facets of development.
When I'm exploring requirements I'll give a different answer than when when I'm tuning performance or if I'm writing code.
These assumptions shape how I work and think, but many may never be verbalized outside of specific activities. Some have ingrained to the point I forget others might not believe the same.

I don't have a clear criteria for what beliefs made it in this list and which didn't. 
In general, I tried to include those that regularly effect my decisions and thus shape how I develop software.

I'm sure some of these will change in the future. It's also a bit of a jumble, but I'll do my best to identify impactful beliefs here.

<!-- Todo: try to order these so related ones are together. Maybe group some values -->


- Good reviews should focus on identifying defects, that is failure to meet objectives, and leave everything else.
  - Source: [Peer Reviews in Software](https://www.amazon.com/dp/0201734850/)
- A high [bus factor](https://en.wikipedia.org/wiki/Bus_factor) is critical to a healthy team 
  - All code should be collectively owned. At least two people should work in a given part of the code.
  - Source: unknown
- Small increments of work. Short test, code, commit cycles (don't think I picked this up from a specific writing, but both refactoring and code that fits cover it)
  - refactoring completed the idea. Making CI/CD fully clear and showing how any work can be done in small functioning increments (preparatory refactoring)
  - Source: unknown, evolved over time from exposure to many ideas. TDD and Refactoring were clearly important sources.
- There is no routine stage of software development. Every step of software is design. 
  - Source: Fred Brooks, especially Design of Design. More clearly stated in What is Software Design
- Design tree, spectrum view, clarity
  - Source: Design of Design
- Self-documenting code: importance of naming, style, clarity, etc (I think this was code complete and Pragmatic programmer)
  - code is the only current source of truth. Code is the best documentation
  - Source: Code Complete and Pragmatic Programmer
- Learning different language paradigms is important.
  - Source: F# for Fun and Profit. Especially Four Languages from Forty Years Ago and Designing With Types
- The console is great. Customizable and adaptable tools often more important that immediate intuition (i.e. guis) / importance of tools that mold to the dev's hand (pragmatic programmer)
  - little hard communicating this one. Has to do with dev ability to compose flows, to adapt the tool (requires interoperability, flexibility). I.e. I use plain text and markdown for docs over word docs because just about any tool works with text. I can source control it, search it, pipe it to different tools, others can use different tool without conflict. Other example, understanding the console. Early in my career I thought the console was arcane and worse than a GUI experience. I came to recognize the power of the console to interoperate and compose automated processes, enabling a dev to improve productivity stably over time.
  - prefer tools that adjust to you over immediate power?
  - Source: Pragmatic Programmer
- tighten the net
  - Source: Pragmatic Programmer
- camping rule (believed for long time, but given name by refactoring)
- source control is critical (not from reading, from experience)
- BDD / test embody requirements
  - testing is a design activity (early from experience & mentoring)
  - TDD  
  - Tests reflect 
- eventual consistency critical to scale -> language of the system
- good design is most always the better route to good performance (many sources: CC, that one performance video)
- AOP: decorate for cross-cutting concerns (from massive amounts of experimentation, but Mark Seemann also covers it)
- TODO: Not sure how to communicate my beliefs revolving around OCP, DI, and ports and adapters
- "[Horde of novices](https://blog.cleancoder.com/uncle-bob/2013/11/19/HoardsOfNovices.html)" average practice well behind best practice (I do think we're making progress)
  - Source: my apprenticeship, Various McConnell Writings, Many of Robert Martin's writings, Mythical Man-Month, Juval Lowey
- Tests are fundamental to maintainability 
  - Source: My first professional project. Reiterated my many books. [Refactoring](https://martinfowler.com/books/refactoring.html) is a good example.
- No perfect solution, only "bull's eye" that meets requirements
  - Source: my mentor
- Code is a bad measure of progress (I've reduced a system size by 1/3 while increasing functionality)
- Ports and adapters and Functional Core, Imperative Shell are my main architecture choices
  - microservices is a deployment option within these patterns
- Composition over inheritance
- Design stamina hypothesis. Taking time to care for your design and system organization pays off quickly. It overtakes "just code" in productivity in a few days or weeks, not months.
- Unit tests should be independent(don't effect each other), predictable, and self-contained (no implicit context)
- Unit tests should read clearly, even if you have to factor out work (Test Data pattern is helpful here)
- Tests suites require design, maintenance, and refactoring like any other code
- Test first or at least include tests in same (small) commit as the code you're testing.
- Unit of reuse is the unit of release 
  - Source: [Agile Principles, Practices, and Patterns](https://www.amazon.com/dp/0131857258/)
- Never optimize performance without measuring
  - Related, Premature optimization is a leading source of design issues
  - Source: ???
- Databases, any data store, and frameworks should be unimportant/subservient to the system architecture
  - in general business logic should not know about concrete dependencies
  - source: most clearly stated by A Little Architecture
- Program into, not in languages 
  - Frameworks and languages come and go. Focus on the underlying patterns.
  - Source: from mentoring, but also discussed in CC
- 


Q: what beliefs about work tracking?
- more impactful if wrong
-  requirements are refined through the whole software process. even as you code and after the code is shipped
- requirements should have clear acceptance criteria a definition of when the story is done
- requirements are written on the user's terms

https://spencerfarley.com/2021/09/10/implicit-fundamentals/

<!-- https://github.com/farlee2121/SoftwareFieldGuide/issues/22 -->

Angles to think about
- Requirements
- Maintenance
- Testing
- Construction
- SCM
- Tooling
- how to learn
- responsibilities of different roles
  - social responsibilities 


<!-- TODO: Ask other devs about their beliefs. Maybe create a follow up post with additions from other devs, including any dissentions. -->
