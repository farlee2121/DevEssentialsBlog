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

## Mental Model
- Current best hierarchy of software knowledge [is roughly like this diagram](../../posts/2021/2021-08-27-SWEBOK-Modified-topic-diagram.md)
- There is no routine stage of software development. Every step of software is design. 
  - Source: Fred Brooks, especially Design of Design. More clearly stated in What is Software Design
  - The house / construction model of development is harmful
    - Source: experience, stated well by Code That Fits in Your Head
- Design tree, clarity spectrum view
  - Source: Design of Design
- All stages of development refine the requirements
  - source: SWEBOK stated it clearly, but influenced by many sources like DDD, What is Software, Design of Design
- No perfect solution, only "bull's eye" that meets requirements
  - Source: my mentor
- Going Fast is about understanding the problem, not code written
  - Corollary: Code is a bad measure of progress (I've reduced a system size by 1/3 while increasing functionality)
  - Source: Robert Martin is where the verbiage comes from. Believed this since my first team's failed "just code" mentality
- Learning different language paradigms is important.
  - Source: F# for Fun and Profit. Especially Four Languages from Forty Years Ago and Designing With Types
- There is no general solution to expressing yourself clearly, and thus no general mechanization of programming
  - Finding the right problem is usually the hard part
  - source: No silver bullets
- Software lifecycle phases overlap significantly

## Requirements
- Requirements are stated in terms of user need, not potential implementations/solutions
  - source: unknown
- Errors in requirements are disproportionately impactful
  - source: originally code complete. echoed by many
- Work items estimated for 2 weeks or more should be broken down
  - Source: apprenticeship
- requirements are refined through the whole software process. even as you code and after the code is shipped
  - source: many. clearly stated by SWEBOK
- requirements should have clear acceptance criteria a definition of when the story is done 
  - source: unknown
- Change in requirements is unavoidable and actually good
  - if the problem no longer changes, the project is dead. It's no longer growing or responding to market forces.
  - source: I known Code Complete was an early source. I think Fred Brooks covers it too...
- Cheapest feature is the one you don't write (from better understanding why)

## Design /Construction

- Design stamina hypothesis. Taking time to care for your design and system organization pays off quickly. It overtakes "just code" in productivity in a few days or weeks, not months.
- Self-documenting code: importance of naming, style, clarity, etc (I think this was code complete and Pragmatic programmer)
  - code is the only current source of truth. Code is the best documentation
  - Source: Code Complete and Pragmatic Programmer
- Program into, not in languages 
  - Frameworks and languages come and go. Focus on the underlying patterns.
  - Source: from mentoring, but also discussed in CC
- Databases, any data store, and frameworks should be unimportant/subservient to the system architecture
  - in general business logic should not know about concrete dependencies
  - source: most clearly stated by A Little Architecture
- Unit of reuse is the unit of release 
  - Source: [Agile Principles, Practices, and Patterns](https://www.amazon.com/dp/0131857258/)
- Composition over inheritance
  - Source: apprenticeship, but given specific wording by an unknown later source
- eventual consistency critical to scale
  - Source: language of the system
- AOP: decorate for cross-cutting concerns 
  - Source: from massive amounts of experimentation, but Mark Seemann also covers it 

- Ports and adapters and Functional Core, Imperative Shell are my main architecture choices
  - Source: Years of looking for architectural patterns
  - microservices is a deployment option within these patterns
    - Source: Believed it before, but given clear communication by Robert Martin's post on the subject
  - Layers & slices are generally insufficient to be an architecture in themselves. Can be burdensom and cause lots of pass-through code if not paired with some dependency approach (i.e port & adapters).
    - source: experience
- Open-closed principle is necessary for creating decoupled collaboration between services
  - source: Working through Paul's feedback on my chat library
- Callers should own their abstractions
  - This is necessary to break semantic coupling. 
  - Implementations owning interfaces causes a false decoupling and leads to sneaking semantic coupling
  - source: Dependency Inversion Principle
- The more generic our code becomes, the fewer kinds of errors we should be able to introduce
  - this applies to tests. This also applies to good abstracted dependencies
  - source: https://blog.ploeh.dk/2018/07/09/typing-and-testing-problem-23/
- Domain-driven everything
  - related to fundamental views that programming is stages of clarifying and representing the problem
  - Source: overall picture from SWEBOK. Domain-driven Design also very influential
- Metrics should be monads (logs too)
  - source: wlaschin post on F# for fun and profit 
- Ports and adapter systems (and functional core) are trimable. Old code can be decommissioned incrementally
- Cleverness is the bane of maintainable software
  - Source: apprenticeship
  - What we can fit in our heads is our main limiting factor in design
    - source: humble programmer

performace
- good design is most always the better route to good performance (many sources: CC, that one performance video)
- Never optimize performance without measuring
  - Related, Premature optimization is a leading source of design issues
  - performance optimization is unintuitive and hard work. Results change based on environment and often don't match expectations
  - Source: hard to say. Echoed by many sources (F# for fun and profit, Code that fits, Code Complete, ...)

- TODO: Not sure how to communicate my beliefs revolving around OCP, DI, and ports and adapters


## Testing / Quality
- Good reviews should focus on identifying defects, that is failure to meet objectives, and leave everything else.
  - Source: [Peer Reviews in Software](https://www.amazon.com/dp/0201734850/)
- tighten the net
  - Source: Pragmatic Programmer
- Unit tests should be independent(don't effect each other), predictable, and self-contained (no implicit context)
- camping rule (believed for long time, but given name by refactoring)
- source control is critical. Source control everything you can
  - Leveraging source control for traceability, versioning, collaboration, repeatability, etc is a big motivator behind the push for *-as-code
  - Source: experience, but back up by readings like Code That Fits and many others
- Tests are the first client of our system
  - Source: Apprenticeship, Robert Martin blog? Pretty sure it's echoed in Mark Seemann's early blog posts
- tests embody requirements
  - testing is a design activity (early from experience & mentoring)
  - source: Stop Corrupting Yourself, BDD
- Tests are fundamental to maintainability 
  - Source: My first professional project. Reiterated my many books. [Refactoring](https://martinfowler.com/books/refactoring.html) is a good example.
- Unit tests should read clearly, even if you have to factor out work (Test Data pattern is helpful here)
  - source: lots of experimentation. Good testing was a focus of my early career. This idea + test independence was most of my first conference presentation.
- Tests suites require design, maintenance, and refactoring like any other code
  - source: unknown. Stated clearly by Refactoring and Code That Fits
- Test first or at least include tests in same (small) commit as the code you're testing.
  - source: TDD
- Obsess over verifiability. It changes the way you build your system
- QA are not manual testers, they oversee the bigger quality picture, ensuring activities by different parties add up to achieve quality goals
  - this includes acceptance test, developer tests, system tests
  - source: many. Brought into focus by SWEBOK
- Property tests can generally replace example-based tests, and are a stronger guarantee. 
  - they prevent coding to test data. Can truly defeat adversarial implementations (meaning ignorant implementations too)
  - source: introduced by Wlaschin, expanded by Mark Seemann's blog
- TestAPI group of beliefs
  - Test to abstractions (in debate of testing abstractions vs concrete implementations)
  - this might mean you make your own abstractions (TestApi)
  - Test suites should generally be usable between implementations.
    - The different implementations should have consistent external expectations in regards to a given caller, and tests are written from that perspective of the caller against the abstraction
  - Unit and integration tests are just different configurations of the same test suite
  - Source: Stop Corrupting Yourself
- As tests get more specific, the system should become more general
  - this is informs what we should see from good design
  - This relates to why tests should be requirements and against abstractions. Testing against implementations exposes us to all kinds of potential implementation details, making our tests fragile. If we test against an abstraction then we don't have access to those details. Our tests are pushed to only verify externally observable behavior, become more robust, and can be reused between implementations
  - source: [Robert Martin](http://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html), but introduced via https://blog.ploeh.dk/2018/07/09/typing-and-testing-problem-23/


## Team / 
- A high [bus factor](https://en.wikipedia.org/wiki/Bus_factor) is critical to a healthy team 
  - All code should be collectively owned. At least two people should work in a given part of the code.
  - Source: unknown
- Pairing produces higher quality code and only takes 40% more time, if that 
  - Pairing greatly improves bus factor and overall knowledge sharing / growth
  - source: peer reviews in software? Maybe also code complete
-  


## Process?

- Small increments of work. Short test, code, commit cycles (don't think I picked this up from a specific writing, but both refactoring and code that fits cover it)
  - refactoring completed the idea. Making CI/CD fully clear and showing how any work can be done in small functioning increments (preparatory refactoring)
  - Source: unknown, evolved over time from exposure to many ideas. TDD and Refactoring were clearly important sources.
- Different classes of problems require different amounts and kinds of process
  - source: I think Code Complete
- Threat matrixes are effective for making decisions
- Better Wrong than Vague
  - Source: Brooks
- 

## Tooling?

- The console is great. Customizable and adaptable tools often more important that immediate intuition (i.e. guis) / importance of tools that mold to the dev's hand (pragmatic programmer)
  - little hard communicating this one. Has to do with dev ability to compose flows, to adapt the tool (requires interoperability, flexibility). I.e. I use plain text and markdown for docs over word docs because just about any tool works with text. I can source control it, search it, pipe it to different tools, others can use different tool without conflict. Other example, understanding the console. Early in my career I thought the console was arcane and worse than a GUI experience. I came to recognize the power of the console to interoperate and compose automated processes, enabling a dev to improve productivity stably over time.
  - prefer tools that adjust to you over immediate power?
  - Source: Pragmatic Programmer
- Few tools combined powerfully make elegant systems
- Source control and work tracking are the most fundamental tools for managing a quality process
  - Source: thinking about my experience at Kana

## State of industry 

- "[Horde of novices](https://blog.cleancoder.com/uncle-bob/2013/11/19/HoardsOfNovices.html)" average practice well behind best practice (I do think we're making progress)
  - Source: my apprenticeship, Various McConnell Writings, Many of Robert Martin's writings, Mythical Man-Month, Juval Lowey


## Languages

- again, learning language paradigms is important. It expands ways we think and solve problems
- Desirably qualities: Immutability, no null, static types
- Aim for totality 




<!-- Previous related lists
https://spencerfarley.com/2021/09/10/implicit-fundamentals/
https://github.com/farlee2121/SoftwareFieldGuide/issues/22 
-->

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
