---
date: 2022-10-02
tags: []
title: SOLID vs SPNC
---

I previously enumerated a [set of properties](../draft/2022-09-25-Properties-of-self-documenting-code.md) that drive self-documenting code.
Is there really a need for another set of properties?
<!--more-->

## Value of minimal sets

First off, I think sets of properties with a memorable handle are incredibly useful.
[SOLID](https://en.wikipedia.org/wiki/SOLID) has achieved wide-spread recognition where many of it's components or inspirations did not.

Second, I know many principles but very few collected sets of principles. SOLID is by far the most prominent. Individual principles are useful, but it can be hard to understand which are most important and how they relate to each other. It can be overwhelming as a learner. Collecting a minimal set of principles to address an aspect of software sets an attainable roadmap of the most important aspects. This both enables discussion if said set of principles is really most important, and focuses educational efforts.

<!-- There are some really good books on construction, but a book is too long when you're trying to advise someone in the flow of work. I think we can do better for an outline of construction knowledge then a whole book. It will likely still take one or more books to understand the variety and nuance of construction decisions but we can set the road map with a shorter list and provide a tool for remembering and organizing construction concepts -->

## Value of SPNC

Principle sets are valuable, but does my specifc set of scope, proximity, naming, and consistency have value?

I think so.

I will call this set SPNC (pronounced spunk) for ease of reference. The name and property set might change, but I'll run with the name for now.

## Uncollected Common Concepts

SOLID, to my understanding, is a set of *design* principles. It collects the core ideas of Object-oriented design for easy reference.

SPNC is the result of considering software construction and self-documenting code. These are certainly related to design, but not quite the same. 

Construction ranges further into details of code style: naming, proximity, and consistency. Construction principles need to cover activities that SOLID does not. For example,
- how to organize the internals of a function
- how to make code readable
- what file should a piece of code live in
- how files should be grouped into assemblies

SPNC collects key ideas that I've heard echoed in many sources. It provides a compact and ready-made reference to explain construction decisions instead of referencing disparate resources.

## Complementary Collections

SPNC covers concepts that SOLID does not, but the two principle sets do overlap.

On the surface, naming and consistency are as important to design as they are to construction. Good design tools also enable conceptual clarity, thus better names and proximity of related concepts.

Going deeper, comparing SOLID and SPNC helped me realize that [conceptual scope is the central theme of SOLID](../draft/2022-10-02-SOLID-is-about-scope.md). This makes sense. SOLID, as I understand it, is a distillation of design principles. Managing complexity through conceptual scope is the essence of software design.

I actually find it relieving that SOLID and SPNC overlap. Construction and design overlap significantly. It would be weird if a set of construction principles and a set of design principles didn't address some of the same concerns. Even better, I think SOLID and SPNC clarify each other. Scope is the most abstract member of SPNC, and SOLID is a compact toolbox to clarify scope. On the other side, I didn't realize the uniting theme of SOLID until I considered SPNC. I think identifying scope as the central theme of SOLID improves understanding of the whole set of principles.


## Conclusion

I think scope, proximity, naming, and consistency (SPNC) is a valuable set of principles.
It collects key concepts I've heard repeated across many sources into a focused set. It covers common development activities not covered by SOLID (or other principle sets). Even better, SOLID and SPNC clarify each other.