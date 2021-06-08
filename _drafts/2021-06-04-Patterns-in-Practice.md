---
layout: post
tags: []
---

# My most used patterns in practice

What is my motivation
- patterns get discussed a lot, but usually in pretty isolated scenarios
- I was thinking about patterns I use and realized that many of them compliment each other and interact in non-additive ways

What do I want to achieve 
- show how a set of patterns come together into a actual design system


what are the patterns I use most? (and what does each usually accomplish for me)
- state machine
  - can model whole programs. Good for UIs, business rules
- specifications
- strategy
- factory
- adapter 
    - mostly in ports and adapters (combines strategies and adapters)
    - don't generally think of it consciously
- metadata?
- interpreter? (actions represented as datastructures)
  - overlaps with state machine
- entity/ value-type
- dependency inversion? (both a pattern and a principle, wrapped up in ports and adapters) (link to wlaschin post on dependency strategies)
- decorator / proxy
...