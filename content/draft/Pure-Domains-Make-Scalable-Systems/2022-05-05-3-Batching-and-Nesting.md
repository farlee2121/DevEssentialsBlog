---
date: "2022-05-05T04:00:00Z"
tags: [Event Streaming, Dependency Rejection, Event-based Architecture, Domain Modeling Made Functional]
title: "Pure Domains Make Scalable Systems: Batching and Nesting"
seriesId: Pure Domains Make Scalable Systems
---

This series explores the scalability benefits of pure domains. This post explores how pure domains reduce the rigidity of request and response timing and structure, enabling more control over our API experience.
<!--more-->

Batching and nesting commands is the consequence of pure domains that surprised me most. I'll do my best to explain.

Consider that the domain rules are deterministic. They always give the same result given the same input. The rules don't care about where the data comes from. The identity of the operation is the same no matter how the data arrives or when.

Similarly, the full change of system state is contained in the event response from the domain rule. There's no assumptions about persistence or timing within the domain rule input or output.

All together, this means that we can batch and nest domain commands safely without effecting outcomes of the event.

## Batching and Offline State

First consider batching.

Suppose we have a system that supports offline editing. All the edits made while the client is offline can be stored as their domain events. When the client is back online, these events can be sent serverside and replayed. The server state will match the client state just as if the client had never been offline. There is no need to diff client and server storage and no information about intermediate state is lost. 

This approach also avoids potential conflicts between client and server changes while the client was disconnected. We have each state delta and the time each state change was made. Therefore we can deterministically decide which change should take precedence. Any conflicts that require user attention can be stored without loss of context until the user manually resolves the conflict. The conflict resolution itself could be an event that preserves all previous state, allowing any conflict resolution to be reviewed or altered at a later time without loss of context.

## Nesting

We don't have to be offline to batch, we can also send a group of requests together simply because it's convenient. Consider the common scenario of an entity with child entities. Like a user profile that contains a gallery of images.

```fsharp
let AddGalleryImageCommand = { ProfileId: ProfileId; ImageRef: ImageRef}
let RemoveGalleryImageCommand = { ProfileId: ProfileId; ImageRef: ImageRef}

let AddProfileCommand = let UpdateProfile = {
  UserId: UserId
  Title: string
  Bio: string
  Name: FullName
}

let UpdateProfileCommand = {
  ProfileId: ProfileId
  Title: string
  Bio: string
  Name: FullName
}
```

As demonstrated, one would assume that a profile must exist before images can be added or removed, and the images are updated in a separate call from updating the profile.

However, our domain commands don't rely on the profile request committing first. The commands could be sent as a batch, broken up into their respective domain commands, executed, and then aggregated back into a batched response. Batched requests don't have to be batched as a sequence. They could also be batched as a hierarchy of events and achieve the same result.

Such batching or nesting gives us flexibility over request and transaction size. We can lump requests to reduce calls (e.g. transmit a profile and add image in one request) or request them individually. Similarly, we can fail a request group as a whole, or we can allow partial success. Such transactional behaviors could even be decided as parameter in the request (i.e.`{transaction-behavior: "allow-partial", events: []}`).

