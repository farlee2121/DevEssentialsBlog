---
date: 2022-09-05T00:00:00-00:00
tags: []
title: "Beliefs about Software"
---

<!-- This is a blog post. Beliefs I hold and where they came from. Probably not so much a story, more just a list -->

This is my attempt to enumerate important beliefs I hold about software and trace them to their origins.
<!--more-->

What do I believe about software development? It's a surprisingly difficult question. I believe many things about many facets of development.
When I'm exploring requirements I'll give you a different answer than when when I'm tuning performance or if I'm writing code.
These assumptions shape how I work and think, but many may never be verbalized outside of specific activities. Some have ingrained to the point I forget they aren't universal.

Enumerating these beliefs is important for passing them on and for better improving my own ability. I'll do my best to identify key beliefs here.

## Memorable Beliefs to get started

By list of beliefs ended up pretty long. I thought it'd be good to 

**Camping Rule**: Always leave the campsite cleaner than you found it. The same applies to code. Quality is a continuous effort made by every contributor.
**Tighten the Net**
**Self-Documenting Code**
**What's your duck**
**Stable, Incremental, Additive**: Another term I [coined](../posts/2022-02-25-Stable-Incremental-Additive.md). I see this idea in many writings and critical software processes, but have yet to see a satisfying term for it. The idea is to work in small stable increments. Each unit of work is valuable and complete so the dev can stop or change directions most any time. Together the small units add up to clean systems equipped to evolve over time. This idea shows up many places as emphasis on iterating (like in Code Complete) or to work in short loops (Refactoring, Code That Fits in Your Head). It underlies practices like making small complete commits, keeping pull requests small and focused, TDD's Red-Green-Refactor, Preparatory Refactoring, Strangler refactoring pattern, and Continuous Integration / Continuous Deployment. 

<!-- todo include some links -->

Q: do I know any good rules names for making small increments of progress?
- I don't think so. Maybe mention it's important even if it has no name

## General list
<!-- Todo: try to order these so related ones are together. Maybe group some values -->

I don't have a clear criteria for what beliefs made it in this list and which didn't. 
In general, I tried to include those that regularly effect my decisions and thus shape how I develop software.

What are major beliefs to cover?
- effective quality process / reviews
- Small increments of work. Short test, code, commit cycles (don't think I picked this up from a specific writing, but both refactoring and code that fits cover it)
  - refactoring completed the idea. Making CI/CD fully clear and showing how any work can be done in small functioning increments (preparatory refactoring)
- No construction workers in software. Every step of software is design
- Design tree, spectrum view, clarity
- Self-documenting code: importance of naming, style, clarity, etc (I think this was code complete and Pragmatic programmer)
  - code is the only current source of truth. Code is the best documentation
- Learning different language paradigms is important.
- The console is great. Customizable and adaptable tools often more important that immediate intuition (i.e. guis) / importance of tools that mold to the dev's hand (pragmatic programmer)
  - little hard communicating this one. Has to do with dev ability to compose flows, to adapt the tool (requires interoperability, flexibility). I.e. I use plain text and markdown for docs over word docs because just about any tool works with text. I can source control it, search it, pipe it to different tools, others can use different tool without conflict. Other example, understanding the console. Early in my career I thought the console was arcane and worse than a GUI experience. I came to recognize the power of the console to interoperate and compose automated processes, enabling a dev to improve productivity stably over time.
  - prefer tools that adjust to you over immediate power?
- tighten the net
- camping rule (believed for long time, but given name by refactoring)
- source control is critical (not from reading, from experience)
- BDD / test embody requirements
  - testing is a design activity (early from experience & mentoring)
  - TDD  
  - Tests reflect 
- eventual consistency critical to scale -> language of the system
- good design is most always the better route to good performance (many sources: CC, that one performance video)
- AOP: decorate for cross-cutting concerns (from massive amounts of experimentation, but Mark Seemann also covers it)
- Not sure how to communicate my beliefs revolving around OCP, DI, and ports and adapters
- Program into, not in languages (from mentoring, but also discussed in CC)
- "Hoard of novices" average practice well behind best practice (McConnell, Robert Martin). I do think we're making progress
- Tests are fundamental to maintainability (early experience, but also think refactoring covers this)
- No perfect solution, only "bull's eye" that meets requirements
- Code is a bad measure of progress (I've reduced a system size by 1/3 while increasing functionality)
- Ports and adapters and Functional Core, Imperative Shell are my main architecture choices
  - microservices is a deployment option within these patterns
- Composition over inheritance
- Design stamina hypothesis. Taking time to care for your design and system organization pays off quickly. It overtakes "just code" in productivity in a few days or weeks, not months.

Q: what beliefs about work tracking?
- more impactful if wrong
-  requirements are refined through the whole software process. even as you code and after the code is shipped
- requirements should have clear acceptance criteria a definition of when the story is done
- requirements are written on the user's terms

https://spencerfarley.com/2021/09/10/implicit-fundamentals/


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

