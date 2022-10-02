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

## Value of SPNC

Principle sets are valuable, but does my specifc set of scope, proximity, naming, and consistency have value?

I think so.

I will call this set SPNC (pronounced spunk) for ease of reference. The name and property set might change, but I'll run with the name for now.

<!-- main ideas cnst vs design -->

Comparing SOLID and SPNC helped me realize that [conceptual scope is the central theme of SOLID](../draft/2022-10-02-SOLID-is-about-scope.md). This makes sense. SOLID, as I understand it, is a design focused set of principles and managing complexity through conceptual scope is the essence of software design.

SPNC is the result of considering software construction and self-documenting code. These are certainly related to design, but not quite the same. SPNC ranges further down into details of code style: naming, proximity, and consistency. These are all factors developers must consider at any level of development from variables to whole systems. 
SPNC collects all in one place key ideas that I've heard echoed in many readings. It provides a compact and ready-made reference to explain construction decisions instead of referencing disparate resources.

SPNC also covers critical decisions that SOLID does not. For example, how to organize the internals of a function, how to make code readable, what file should a piece of code live in, and how files should be grouped into assemblies. 

I actually find it relieving that SOLID and SPNC overlap. Construction and design overlap significantly. It would be weird if a set of construction principles and a set of design principles didn't address some of the same concerns. Even better, I think SOLID and SPNC clarify each other. Scope is the most abstract member of SPNC, and SOLID provides a compact toolbox to clarify it. On the other side, I didn't realize the uniting theme of SOLID until I considered SPNC. I think identifying scope as the central theme of SOLID improves understanding of the whole set of principles.


## Conclusion