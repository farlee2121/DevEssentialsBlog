---
date: 2023-05-07
tags: [Event Storming]
title: Differentiating Commands and Events
---

I've been refining my knowledge of [Event Storming](http://ziobrando.blogspot.com/2013/11/introducing-event-storming.html) 
and I've found the contrast between commands and events an effective tool for explaining the process.
<!--more-->

First off, event storming is a tool for modeling business domains. Particularly business process flows.
Event storming focuses on finding "events".

The typical flow for an event storm is to get a bunch of the domain experts (e.g. representatives from different parts of the business process)
together in a room. Then have everyone start putting up sticky notes of events they look for across the process in a rough timeline order. 
The group can then pick an event and ask "What causes this?". This may surface more events, or it might surface a command.

Now let's dig into that contrast
- Events are facts. They represent something that definitely happened that other parts of the process may need to know about
- Commands are intents. They represent some actor's intent to change the state of the system, but that change could fail.

This difference is critical and part of event storming's value comes from this difference.

Commands invite us to ask "How can this fail?" and breaks up our bias toward happy paths. How failures are handled is often critical to how the business runs
and may involve stakeholders in multiple parts of the company. Bringing these assumptions to the surface lets us discuss them and coordinate.

Events as facts set stable assumptions for considering individual scenarios. 
Then the ambiguity of alternative success and error cases is worked out by commands. Then each case can be considered with relatively clear and small scope.
There's no ambiguity to what situation we're discussing at any given time, so stakeholders can iron out what they need from each other in that scenario.

Together commands and events cover the breadth and depth of possible scenarios in a way that is repeatable, focused, and fairly intuitive.

In summary, the difference between commands and events drives the discovery loop of event storms.
Events are easy to start discovering, events lead us to a minimal set of commands, commands invite us to discover alternative outcomes, 
then returning to events irons out the details with focused expectations.