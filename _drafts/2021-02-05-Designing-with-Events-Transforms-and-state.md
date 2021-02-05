# Progressive Modeling with Events, Transforms, and State

I just finished reading [Domain Modeling Made Functional](). Wow, the technique in this book just feels right. It wraps up a bunch of development values I already had in a technique that is clear, thorough, and fluid. Here I'll overview the method and recount a bit of my experience applying it.

I'm a software design nut. I love trying different mental models for approaching problem solving. Here are some of my core values that also motivate this approach
- Understand a problem before coding
- Design to the problem and not the implementation
- Design is a spectrum: progressively uncovering knowledge of the problem
  - Coding is just the last mile design phase
- Self-documenting code
- Core code should be infrastructure-agnostic
- Orient the api around verbs, not nouns

You can probably tell that this technique starts with problem (domain) modeling. So, we will too. First we'll talk about understanding a high-level problem with domain experts, encoding that knowledge, filling in more detail, and lastly translating it to code.

## Event Storming
Event storming is a technique that has quickly rooted itself in the DDD community and the first step of this process. 

Event storming is a pretty simple process. Get experts from different parts of the company in a room with a bunch of sticky notes. Then
1. Use orange sticky notes to create a timeline of domain *Events*. Past-tense verbs that represent important things that happen in the business
2. Identify triggers
   - use blue stickies for *Commands*: imperatively phrased words for user actions that trigger events
   - use purple stickies for triggers based on time or external systems
3. Group related events together to find *workflows* of closely related events
4. Identify *sub-domains* or places where workflows need to be independent
   - often along department boundaries


Event storming is meant to ease communication between many people. I, however, was working on this alone. Instead of stickies I just type it all out in a text document. Here's a sample

```txt
sample goes here
```


## Storm to Design
The event storm outputs a collective understanding of the business process at a high level. The next step is to start working out details of each part of the process with the experts who own it.

This can be done with just talking and note-taking. However, it's much more powerful to have some shared representation that both parties understand and can comment on.

Some might use UML or diagrams, but let's take a simple text-based approach. 

A few quick rules for understanding the text model
- `|` represents alternative values
- `{}` are bundled values
- `->` is a transform from data on the left to data on the right

The workflows from before become transforms, which take the related command as input and return the related events. This makes for an easy translation of the event storm into a format where we can start filling in details.

```fs
```

## Refining the design: Values, State Machines, & Contraints

The text representation of events and commands gives us a template to start filling in details like  
- what information do they need to execute a command (still thinking in terms of manual process)
- what different routes can a task take and why
- how do they break down their work into smaller steps
- What can go wrong and how is it handled

Some of this might happen in the original event storm. In fact, some of it should when failure behaviors and other conditions concern multiple parties.


In any case, we can represent all of this information in our text format. Different paths, including errors, in the process usually mean different states. We can represent each of these states with a type. Then we can name a collection of alternative states, marking the sub cases with `|`.

We can also represent the actions that happen for each state with `state -> handled state` transforms

```fs
```

## Design To Code

Now here's the best part. All those examples above are actually F# code. 

Using events, transforms, and state as the basis of our design captures domain requirements in a way that both parties can understand right up to the point where it becomes the high-level code design.

This approach also isn't limited to funcational languages. Changes in C# 9 make many of these techniques quite pleasant. 
- For alternative values, see [my post on union types in c#]()
    - enable reasonable state machines and compositional polymorphism (wrap rather than inherit)
- see my [post on result types in c#]()
    - big step toward total functions
- Positional records as simple types

## Personal Take
This technique is amazing. I've never used a modeling paradigm that encoded the domain with such ease and clarity. So much domain information can be encoded just in type signatures that many more issues can be detected before coding ever starts, and the gap to code is so much smaller once coding actually starts. Most domain rules are enforced by the type signatures, which reduces the errors that developers can make from misunderstanding or accident.

I think much of the power comes from focusing on events, transforms, and states rather than data, services, or other programming-focused constructs.

The approach definitely takes some adjustment to how you think, but in a very good way. It disentangles bad habits accumulated from accomodating limited type systems, storage, and the like.

## Summary

This event, transform, and state oriented design is an all around winner. It is easier to model the domain, more information is uncovered during modeling, and the resulting code is both safer and easier to write.

If you want more in-depth info, then read [Domain Modeling Made Functional](). It describes the process accessibly and with lots of concrete examples.