# Progressive Design

Choosing the right amount of process is an art. Too much process is smothering and too little is a mess. However, I think [incremental, stable, and additive processes](TODO) naturally start simple and mature *progressively* with our demands.
<!-- todo: maybe this is a separate post. I want to give examples demonstrating progressive design -->

Progressive value is a guarantee if our system isn't deeply affected by change (stable), changes in small complete chunks (incremental), and the increments mostly build on each other (additive).

All these properties together enable **Progressive Design**. We can design to what we know right now with minimized complexity, but adjust to change without massive rework.


This progressive value must be backed up by a structure that enables it. Consider these corollaries.
- stable + incremental -> contained
  -  components are naturally self-contained because each component provides it's own value and is rarely changed by outside forces
- contained + stable + additive -> external integration
  - Components integrations are external to the components themselves because new components add value without significantly effecting existing services and without exposing themselves to external sources of change.
- contained + external integration -> component-defined boundaries
  - To be externally composed and remain contained, a component must define contracts for how it expects to work with the outside world (both incoming and outgoing information). Some third party may be needed to map these contracts between self-contained components 

These boundaries give us both simplicity and flexibility. The internals of the service will be as complex as needed to satisfy their focused set of requirements. This is unavoidable.

Complexity from integrating with external dependencies, however, is controllable.

With each service controlling it's own outbound contracts, simple outbound needs can be satisfied simply without compromising other components. Complex and repeated external needs become responsibilities of their own, a new component is formed and the connector is simplified again.

In this way we can choose the amount of complexity for each component at the time of action. That is, we can choose the least complexity based on the smallest amount of requirements possible. Later we can change those decisions by changing connections, not components themselves.

## Examples with Architecture

To make this a bit more concrete. Lets consider a design flow with [Ports and Adapters architecture](https://spencerfarley.com/2020/12/19/ports-and-adapters) and other plugin-style architectures.

Start with the top-level use case. The workflow is our first component.

Design only to the need of the workflow and in terms of the workflow. 
- Need some data? Define the data structure and dependency interface that delivers it to you.
- Have a behavior that could change? Accept an interface to accomplish it

This builds up your list of ports.

The second phase comes when fulfilling the ports with adapters. We can always opt for the simplest solution that fits our need.
- If an existing service fits, use it
- No precedent? we can just map to a 3rd party service or make a simple implementation ourselves
- Is a need repeated between multiple services or complex? Make a new service to centralize the behavior

In this way, our services stay stable, and dependency complexity is minimized for the current state of the service and system. We don't design to for any reuse we don't know we need. We don't require overarching system layers or roles for workflows that don't need it. Overall system structure is discovered over time and services can adapt to changes in the system at their own pace. 

Further, code-related processes like code ownership, quality measurement, approvals, and similar concerns can be ramped up for individual components of the system without changing the overall structure.

In short, system complexity and process formality progressively grow as demands on our system grow.

## Examples with Companies

<!-- TODO: I think I need to focus more on reduction of communication complexity, reduction of team dependencies, formation of new teams or co-ownership as needed.

Consider fit with overall message (current need without effecting company as a whole) -->
[Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law) states that systems structures reflect the organizations that built them.

In software, this has also move the other direction. Better knowledge of software has enabled more independent teams. The growth of devops has pushed teams that own their entire feature verticals from requirements to production.

This aligns with the self-contained services of plugin-style architectures. Each team owns some number of services, and communicates with the teams that satisfy needs for their services. Process formality can vary for individual teams and for each relationship between teams.
<!-- 
Management is simplified because ownership of outcomes is very clear (which team ships the feature). Teams have the control to mitigate uncooperative upstream dependencies without diluting their own code base with temporary implementations that can be swapped if another team decides to take ownership -->

A product could start with a single team, and then role out new teams as services within the system become complex. Such teams are almost guaranteed to have mostly independent and focused work. The company can discover it's minimal and well-divided set of teams overtime without guesswork. 

## Example with testing
I've [previously explored](TODO) how behavior-driven acceptance tests might be used to progressively formalize testing process without restructuring tests.

## Conclusion
Choosing the right amount of process is hard. However, incremental, stable, and additive processes naturally lead to progressive systems that allow us to minimize immediate process and granularly increase process as needed without restructuring our systems. This is true for code, for organizations, and probably also for tests!

<!-- 
I think of Plugin-style architectures. We start with the workflow. The workflow makes abstract dependencies for all it's needs. Those dependencies start simple. Once other workflows have similar needs, then we combine them into shared services. We don't waste time on degrees of complex services we don't need. We discover the domain concepts of our system over time. -->

<!-- TODO: emphasize discovery of concepts over time. Not designing for resuse we don't know we need. No layers or overall structure we don't know we need -->