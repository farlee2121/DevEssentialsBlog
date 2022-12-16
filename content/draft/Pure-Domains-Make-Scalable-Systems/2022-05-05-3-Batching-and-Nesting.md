---
date: "2022-05-05T04:00:00Z"
tags: [Event Streaming, Dependency Rejection, Event-based Architecture, Domain Modeling Made Functional]
title: "Pure Domains Make Scalable Systems: Batching and Nesting"
seriesId: Pure Domains Make Scalable Systems
---

This series explores the benefits of pure domains for scalability. This post explores how pure domains reduce the rigidity of request and response timing and structure, enabling more control over our API experience.
<!--more-->

I think batching and nesting commands is the most surprising benefit of pure domains.

The domain rules are deterministic. They always give the same result given the same input. The rules don't care about where the data comes from. The identity of the operation the same no matter how the data arrives or when.

Similarly, the full change of system state is contained in the response of the domain rule. There's no assumptions about persistence or timing within the domain rule.

All together, this means that we can batch and nest domain commands safely without effecting outcomes of the event.

## Batching and Offline State

First consider batching. Suppose we have a system that supports offline editing. All the edits made while the client is offline can be stored as their domain events. When the client is back online, these events can be sent serverside and replayed. The server state will match the client state just as if it had never been offline. There is no need to diff client and server storage and no information about intermediate state is lost. 

This approach also avoids potential conflicts with changes made on the server while the client was disconnected. We have each state delta and the time each state change was made. Therefore we can deterministically decide which change should take precedence.


## Nesting

We don't have to be offline to batch, we can also send a group of requests together simply because it's convenient. Consider the common scenario of an entity with child entities. Like a profile that contains a gallery of images 

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

However, our domain commands don't rely on the profile request coming first. The commands could be sent as a batch, broken up into their respective domain commands, executed, and then aggregated back into a batched response. Batched requests don't have to be batched as a sequence, they could also be batched as a hierarchy of events and achieve the same result.

Such batching or nesting gives us flexibility over request and transaction size. We can lump requests to reduce calls (e.g. a profile and add image request as one) or request them individually. Similarly, we can fail the group as a whole, or we can allow partial success. Such decisions could even be decided as parameter in the request (i.e.`{transaction-behavior: "allow-partial", events: []}`).

