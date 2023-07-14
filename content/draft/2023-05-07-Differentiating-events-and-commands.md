---
date: 2023-07-13
tags: [Event Storming]
title: Differentiating Commands and Events
---

I've been refining my knowledge of [Event Storming](http://ziobrando.blogspot.com/2013/11/introducing-event-storming.html) 
and I found the contrast between commands and events an effective tool for explaining the process.
<!--more-->

First off, event storming is a tool for modeling business processes.
Event storming focuses on finding "events" in those processes.

The typical flow for an event storm is to get a bunch of the domain experts (e.g. representatives from different parts of the business process)
together in a room. Then have everyone start putting up sticky notes of events they look for across the process in a rough timeline order. 
The group can then pick an event and ask "What causes this?". This may surface more events, or it might surface a command.

Events and commands can be clarified by their contrast.
- Events are facts. They represent something that definitely happened that other parts of the process may need to know about
- Commands are intents. They represent some actor's intent to change the state of the system, but that change could fail.

This difference is critical, and part of event storming's value comes from this difference.

Events as facts reduce ambiguity. The event has surely happened, so we can identify and discuss the state of the process clearly. 

Commands invite us to ask "How can this fail?" and breaks up our bias toward happy paths. How failures are handled is often critical to how the business runs
and may involve stakeholders in multiple parts of the company. Bringing these assumptions to the surface lets us discuss them and coordinate.

Events are clearer and often easier to discuss than commands, so getting then down creates a general schema with more focus. You could say there are fewer key results than there are paths to those key results.
Then, alternative success and error cases are worked out with commands. Any ambiguity probably means there's a new command or command outcome to consider. It separates the enumeration of alternative outcomes from the details of specific outcomes. Untangling these two scopes focuses consideration at each step. Stakeholders can iron out what they need from each other in one unambiguous scenario at a time, knowing other paths they care about are represented and will come around.

Together commands and events cover the breadth and depth of possible scenarios in a way that is repeatable, focused, and fairly intuitive.

It's also [stable, incremental, and additive](../posts/2022-02-25-Stable-Incremental-Additive.md). Each event, command, or refinement brings value in small increments that add up, yet there are many stopping points where we can say "that's enough" and not lose any value already gained.

In summary, the difference between commands and events drives the discovery loop of event storms.
Events are easy to start discovering, events lead us to a minimal set of commands, commands invite us to discover alternative outcomes, 
then returning to events irons out the details with focused expectations.