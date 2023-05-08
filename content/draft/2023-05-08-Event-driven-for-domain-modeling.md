---
date: 2023-05-07
tags: [Event Storming]
title: 
---

<!-- TODO: I might have to ask doug if I can publish this -->

Continuing my event storm explorations, I tested out several approaches for translating event storms into system designs.
The clear winner was based on the functional core pattern.
<!--more-->


## Problem Context

This post discusses [Event storming](https://www.eventstorming.com/), which is a technique for modeling the flow of business processes. Generally with the intent of creating a shared high-level understanding of the business between different roles, though other variations exist.  
If you're not familiar with event storming, you can read [this brief introduction](http://ziobrando.blogspot.com/2013/11/introducing-event-storming.html) or
checkout [Awesome Event Storming](https://github.com/mariuszgil/awesome-eventstorming) for more materials and examples.

Now for context. I've been exploring event storming with some other developers, and now we want to translate the event storm into a high-level system design in order to understand the flow from discovery to code. 

I've experimented with event storms in the past, but always in a functional programming context. 
Functional design seemed like too much learning to pile on for others in the current experiment. So, I explored with a few other approaches for refining event storms into designs. 

## Example workflow

![Event storm stickies described below](../../static/post-media/Event-Storm/2023-05-07-storm-stickies.png)

The portion of the event flow I'll be translating to design is shown in the picture.
It consists of one command and the events that follow it. Specifically, the command is Cancel Order Request.
If the request succeeds the Shopper Order Canceled event is raised, it notifies the user of the cancel, and the Fulfillment Canceled event is also raised.
If the request fails an Order Cancel Failed event is thrown with the reason for failure. 
There aren't multiple failure events in this case because different modes of failure wouldn't be handled differently by the business.

The next modeling steps would be working with stakeholders to identify 
- the data needed on each command and event
- data needed to decide command outcomes that isn't present in the command. In other words, dependencies

## Original process

I first learned about event storms from Scott Wlaschin's [Domain Modeling Made Functional](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional).

Exploration would start with the high level workflow that maps the command to a result. The result being any, and possibly multiple, of the events.
Then start asking what each of those look like and stub out for child types until you've reached the bottom or decided enough detail has been covered.

A model in his style might look like

```fsharp

```

Surprise! This is nearly valid F# syntax. I made a few light tweaks to make it more generally intuitive, but nothing that couldn't be fixed algorithmically.
F# can be used as a fairly intuitive semi-formal convention to refine the event storm with non-developers, but then it is already a valid set of types modeling the domain.

The code design approach here is called Functional Core or Event-Driven Architecture. The idea is that the business rules are [pure functions](https://en.wikipedia.org/wiki/Pure_function), 
they don't cause any observable state change. Instead they return values, in this case the events, which represent state changes that can be enacted by simple mapping functions.

This approach is very intersting, but I won't go deeper here. [Domain Modeling Made Functional](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional) is excellent resource for futher exploration.
The book is a fantastic introduction to domain modeling, event storming, or just a thoughtful requirements-driven development process. 
The book is very approachable and I highly recommend it, but you can also check out his free [presentation](https://fsharpforfunandprofit.com/video/#domain-modeling-made-functional) or his related [Designing with Types series](https://fsharpforfunandprofit.com/series/designing-with-types/). His work is where I learned many of the ideas discussed in this post.
Or content by other authors like Mark Seemann ([book](https://www.amazon.com/Code-That-Fits-Your-Head/dp/0137464401), [blog](https://blog.ploeh.dk/2016/03/18/functional-architecture-is-ports-and-adapters/)).

The main thing to know for now is that this approach is my reference point for how well event storms can map to code.

## Translating to C#

I thought I might be able to use C# to formalize these data and dependencies in a similar way. I could use interfaces to translate commands into function signatures, and classes to represent the inputs and outputs.
Perhaps a constructor listing dependencies would do for modeling side-effects or state that workflow might need. 

Also key, I wasn't going to use a functional core model, but a [Ports and Adapters-style model](https://spencerfarley.com/2023/03/02/4-ocp-as-architecture/) where the workflows might enact state instead of returning events (i.e. using [Dependency Inversion](https://spencerfarley.com/2023/03/02/3-interchangable-dependencies/)).

This devolved quickly for several reasons. First, C# anonymous functions are not intuitive to read, and interfaces require a name. This prematurely pressures us toward
grouping command flows into modules or services. It also more clearly makes our model seem like code.

```cs
// show some ugly code
```

Second, C# doesn't have a concise syntax for alternative data cases. We can model the command just fine, but the events would all have to inherit from a base class.
It clearly becomes code

```cs
//show some ugly code
```

In C#, we have to use a constructor (or currying) if we don't want to pass dependencies on every function call. This starts pulling us into concrete types and draws more code-specific concerns into the picture.

Overall, C# doesn't work well as a semi-formal specification. There are too many concerns that force a compromise between C# syntax and avoiding code-specific concerns.

## Translating to F# with stateful dependencies

I thought perhaps a Ports and Adapters-style model would fair better in F# because F# has unions, readable anonymous function types, and can partially apply functions to handle dependency management.

However, this style of modeling still didn't feel good in F#. The translation from events to types is less direct and functions have way more dependencies which decreases readability.
Most importantly, the concerns added to the process don't have any benefit for domain modeling, they are purely code design concerns. Non-developer don't care how or where state in enacted.

## Conclusion: Event-Driven Modeling  Wins

My conclusion was that event-driven modeling is still the winner for refining event storms into high level models.
The translation is clear and it can be done with non-technical stakeholders. There is no loss of information if the code is actually implemented in a different style.
The important details needed from stakeholders are all still there. The translation to other styles is purely a coding concern that can be fairly intuitively 
mapped from the event-based model.




<!-- - The difference I experienced translating event storm to C# vs pure & event-based
  - Context, Translating event storm into software design. A lot of extra detail we're digging into here is what data is needed. For commands, for events, but also some data is needed for the workflows that never shows up in the command or events. Those are dependencies.
  - trying to use C# and ports and adapters quickly surfaced some issues. Can't express alternatives without it clearly becoming code syntax. Value types are a bit messy. Dependencies are a no-go
  - F# trying to consider distributed state enaction (find better way to describe this) failed in F# too. It's an improvement since we can partially apply in the signature without requiring us to decide an enclosing class for a set of workflows or dip into implementations (constructors) to show dependencies 
  - TODO: need to explain and contrast the two approaches (inversion of control -> flow enacts state through abstract dependencies running the flow means changing system state, functional-core/pure event-based -> running the workflow doesn't change system state. The workflow returns data structures that can be interpreted into state changes)
  - F# with a type-driven / functional-core approach can map the events pretty directly into types without any implementations or awkward translations
    - The F# itself can almost express all of our domain ideas without it obviously being code. It reads more like a semi-formal specification convention. It's simple enough to be easy to read, but formal enough that we're unambiguous about what we're expressing and detailed enough that we can expose gaps in our understanding.
    - F# has a few aspects that can be confusing (like -> between parameters, single-pass requiring root types/flows you start with to come last). can make it pretty intuitive to read if you're willing to tweak a few things for f# inspired pseudocode. Doesn't take much tweaking though. 
      - Brief syntax explanation (unions as alternatives/OR, records as AND, aliases/value types, function signature aliases -> workflows)
      - example of my pseudocode
  - Don't have to use a pure event-based model for the code, but use it for the model. It keeps unnecessary coding concerns out of the discussion and enables a fair bit of detailed design in collaboration with less technical stakeholders. The pure event-based model can always be translated to other patterns by developers later.
  - cross: [concise syntax matters](../posts/2023-04-16-concise-notation-matters.md) -->



