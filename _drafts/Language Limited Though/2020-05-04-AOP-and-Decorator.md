---
layout: post
tags: [Languages, Functional Programming, Design Thinking,
        Pivotal Insights]
excerpt: null
series: Language-Limited Thought
series_description: Exploring how different languages equip us to solve different design problems
---
- to be clear, not strictly a limitation of OO. Ruby can handle this with it's loose type system, and C#/Java have language extensions for it (but IL/bytecode rewriting is a bit spooky).

key root of issue here is that composition is hard in most oo, requiring manual proxy wiring. Any genericism relies on explicity inheritance. FP was meant for composition, so it has implicit interchangeability (based on types in F#)

- AOP-ish decorators
  - currying/partial application, composition & unbound arguments

