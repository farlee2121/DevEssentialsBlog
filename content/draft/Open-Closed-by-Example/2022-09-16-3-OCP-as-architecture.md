---
date: 2022-09-16
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: OCP as Architecture"
---

This series clarifies the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) by example. This post applies OCP to the system level with architecture patterns like ports and adapters.
<!--more-->


<!-- TODO: either cite this or find a license-free image -->
[image of ports and adapters](../../../static/post-media/Open-closed-by-example/ports-and-adapters.png)

[chat system diagram](../../../static/post-media/Open-closed-by-example/messaging-diagram.drawio.svg)
[general ports and adapters diagram](../../../static/post-media/Open-closed-by-example/messaging-diagram.drawio.svg)


<!-- 
- This structure is what happens when you apply SOLID principles at the architectural level. Especially OCP and DI. Unfortunately this approach has many names, but they all boil down to the same key design drivers.
- I like the ports and adapters analogy. I think it best describes how the pattern works
- Link to some external references. Definitely Mark Seemann. Maybe Clean Arch
- Maybe talk about trimability, phased adoption, feature-flag friendliness, 
- Probably mention decorators for cross-cutting concerns. Do I have a good post I can link to?
- Idea: admit this takes some experimentation to understand. I've got several blog posts on my discovery journey in case they help you along

 -->
