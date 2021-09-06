---
layout: post
tags: [Testing, BDD, Open-Closed Principle]
---

# BDD Pushes the right extensibility

I recently read Mark Seemann's post on how [Testability is the Open-Closed Principle](https://blog.ploeh.dk/2009/06/05/TestabilityIsReallyTheOpenClosedPrinciple/). This helped me realize the approach to testing directs the kinds of flexibility in our system, and behavior-based testing pushes the right kind of flexibility.

Consider this visual on volatility analysis ([from this post on IDesign](../_posts/2020-07-03-iDesign-Visual-Summary.md)). 

![Spectrum of volatility](../post-media/IDesign-System/iDesignSolutionScubbing.png)


Software can choose an almost unlimited number of ways to be flexible, but not every kind of flexibility is relevant for a given project. Adding too much flexibility actually bogs down the system with unnecessary complexity. The most stable and high-return decompositions stem from understanding the fundamental nature of the problem we are solving. 

Behavior-Driven testing writes tests in terms of the problem without worrying about details of the system being tested. This means the points of extension most needed by the real-world problem get encoded in the test api abstraction. This in turn impacts how our system tries to map into the test suite. A mismatch in flexibility choices will make this mapping difficult. Over time, this pain causes us to refactor our code to map more neatly into the test suite's needs.

In short, behavioral-driven tests push our system to have the extensibility most suited for the problem we are solving.

<!-- 
Potential extra post. I love test api because it hits key concerns across most lifecycle phases. The singular technique combines
- understanding requirements
- driving design from understanding the problem  
- incremental, stable progress (of requirements and code)
- Self-documenting code
- progressive design
  - pushes problem-based extensibility
  - tests are stable across implementations so we can minimally implement and expand later as new expectations arise
- (De)Composability: Since tests aren't coupled to implementations, I can refactor out expectations that are common to many components without compromising test quality
- Scales to multi-team systems

Maybe a bit more effort upfront than other ways of testing, but the single effort covers so many outcomes and is stable under so many changes that the efficiency is much higher even in the short-term

Q: maybe keep it more focused on lifecycle stages
 -->
