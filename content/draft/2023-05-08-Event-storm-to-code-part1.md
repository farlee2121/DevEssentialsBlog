---
date: 2023-05-07
tags: [Event Storming]
title: Event Storm To Software Design Part 1 - Data Model
---

<!-- todo: probably rename the file or title so the url and title align -->
<!-- TODO: this should probably be split into two posts. One is data model, the other is the from data model to code design -->

Continuing the event storm explorations, I tested out several approaches for translating event storms into system designs. 
<!--more-->

But first we'll demonsrate how to further clarify the events and commands.

## Event Storming Review

For those who are unfamiliar, event storming is a technique for mapping out processes. It's often used to create a shared picture between people of many different roles. 

An event storm is primarily composed of events. Events represent something that happened that other parts of the business might need to know about. Some examples from an ecommerce site might include `OrderCanceled`, `OrderPacked`, and `OrderShipped`.

Alberto published an [excellent and brief introduction](http://ziobrando.blogspot.com/2013/11/introducing-event-storming.html) to event storming. You can also
checkout [Awesome Event Storming](https://github.com/mariuszgil/awesome-eventstorming) for more materials and examples.

## Problem Context


I've been exploring event storming with some other developers, and now we want to translate the event storm into a high-level system design. 

I've experimented with event storms in the past, but always in a functional programming context. 
Functional design seemed like too much learning to pile on for others in the current experiment. So, I explored with a few other approaches for refining event storms into designs. 

## Example Workflow for Design 

![Event storm stickies described below](../../static/post-media/Event-Storm/2023-05-07-storm-stickies.png)

The portion of the event storm I'll be translating to a high-level design is shown in the picture above.

This flow consists of one command and the events that follow it. Specifically, the command is Cancel Order Request.

If the command succeeds, then the Shopper Order Canceled event is raised and the Fulfillment Canceled event is also raised. Fulfillment Cancelled could, in the future, be subject to more sophisticated flows that follow from an order cancel. For simplicity, it fulfillment is assumed canceled if the order succeeds in canceling. 

If the Cancel Order Request fails, an Order Cancel Failed event is thrown with the reason for failure. 
There aren't multiple failure events in this case because different modes of failure wouldn't be handled differently by the business.


## Data Modeling

With this event storm model in place (the sticky notes), the next steps would be working with stakeholders to identify the data needed on each command and event. 

This would be done as part of the early exploration, before code is considered, as part of both clarifying and validating the event storm.

I first learned about event storms from Scott Wlaschin's [Domain Modeling Made Functional](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional), and this process largely follows his example.

Data exploration starts by choosing a high-level workflow, like the one we demonstrated [above](#example-workflow-for-design). We bootstrap our data model by encoding the workflow with the command as input and the events as output.

A simple syntax might stub the workflow like this
```
workflow CancelOrder =
  input: CancelOrderRequest
  output: 
    | Shopper Order Canceled
    | Order Cancel Failed
```

Then, start asking what data each of those inputs and outputs include. Stub out child types until you've reached the bottom or decided enough detail has been covered. 

All of this communicated in some semi-formal language to balance readability with enough clarity to expose gaps in understanding.

```
workflow CancelOrder =
  input: CancelOrderRequest
  output: 
    | ShopperOrderCanceled
    | OrderCancelFailed

data CancelOrderRequest = {
  OrderId: OrderId
  Reason: ShopperCancelReason 
}

data OrderId = 
  constraints: Should be unique. Doesn't need to be human readable.

data ShopperCancelReason = // TODO

data ShopperOrderCanceled = // TODO
data OrderCancelFailed = // TODO
```

This simple syntax is intuitive enough for non-developers to read and rigorous enough that there's little room for ambiguity and misaligned understanding. 

A few choices might need a bit of explanation.
- `|` means alternatives. Like `type Answers = | Yes | No` 
- Data inside brackets lives together `type Person = {Name: FullName; Address: PostalAddress}`

These data models aren't primarily for coding. They dig into dependencies between parts of the business process with greater detail. They're an effective way to find gaps in the higher-level sticky note model and avoid programmers unhappily rewriting code to fit what business people knew all along, but didn't know to share.

I was surprised [how much this data phase reveals about the business](../posts/2023/2023-07-13-Differentiating-events-and-commands.md), and how much it led to rework of the overall event storm.

This approach benefits from several types of incremental progress. Each workflow stands on its own (out of the larger event storm), and the data is also progressively clarified from the top-down. This means the team can work in complete chunks, prioritize the chucks most likely to effect the big picture, and stop whenever they feel confident that overall risk to the model is low enough.

