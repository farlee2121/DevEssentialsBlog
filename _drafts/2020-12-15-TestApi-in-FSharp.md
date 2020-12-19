---
layout: post
tags: [Testing, Test Api, F#]
---

# Test Api in F#

Just like OO answer to everything is polymorphism and another class. Functional answer is a parameterized function

- the test api is a set of functions passed to the test suite (could be individual or grouped with records/tuples)
- the function that runs the test fills dependencies/ manages mutable state
- Use expecto
  - easy to make lists of tests in a function
  - use (figure out which library actually matters) adapter and the lists will show up like normal tests. Can even go to definition
    - can also mix in property tests
- Actually better because lists can be combined, and types are generic. 
  - can reuse behavior tests across many components, composing the right behavior tests into a full Spec
    - like tag filter

!! need to pass api as a provider to make control lifecycle (no side-effects between tests), which is a bummer
- could also use fixture, but then I have to define every test as a partial, which doesn't seem better...  
- !!.. nevermind, I could still use this with testProperty, I just need to next it in the lambda (testProperty inside a test)