---
date: "2022-09-16T00:02:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Callbacks & Handlers"
---

This series clarifies the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) with examples. This post will demonstrate how the OCP can be achieved through flexible data. 
<!--more-->

I recommend you read the [series intro post](./2022-09-16-0-Intro-to-OCP.md) if you haven't already. It defines the Open-Closed Principle (OCP) and highlights motivating questions.
In summary, the OCP illuminates how components can set defined flexibility so the component can adapt to caller needs without changing internally. This is much like how parameters
enable functions to be resused by many consumers without changing the function.

One way to achieve defined flexibility is through flexible data.


<!-- Show UI component
- http version is giving a url
functional langauges make extensive use of this approach, generally calling them continuations 
 -->