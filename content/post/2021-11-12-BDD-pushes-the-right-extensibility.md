---
date: "2021-11-12T00:00:00Z"
tags:
- Testing
- BDD
- Open-Closed Principle
---

# BDD Pushes the right extensibility

I recently read Mark Seemann's post on how [Testability is the Open-Closed Principle](https://blog.ploeh.dk/2009/06/05/TestabilityIsReallyTheOpenClosedPrinciple/). This helped me realize the approach to testing directs the kinds of flexibility in our system, and behavior-based testing pushes the right kind of flexibility.

Consider this visual on volatility analysis ([from this post on IDesign](../_posts/2020-07-03-iDesign-Visual-Summary.md)). 

![Spectrum of volatility](../post-media/IDesign-System/iDesignSolutionScubbing.png)


Software can choose an almost unlimited number of ways to be flexible, but not every kind of flexibility is relevant for a given project. Adding too much flexibility actually bogs down the system with unnecessary complexity. The most stable and high-return decompositions stem from understanding the fundamental nature of the problem we are solving. 

Behavior-Driven testing writes tests in terms of the problem without worrying about details of the system being tested. This means the points of extension most needed by the real-world problem get encoded in the test api abstraction. This in turn impacts how our system tries to map into the test suite. A mismatch in flexibility choices will make this mapping difficult. Over time, this pain causes us to refactor our code to map more neatly into the test suite's needs.

In short, behavioral-driven tests push our system to have the extensibility most suited for the problem we are solving.

<!-- 
Q: maybe keep it more focused on lifecycle stages
 -->
