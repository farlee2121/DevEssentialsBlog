---
date: 2023-09-10
tags: [Event Storming]
title: Event Modeling and Business Differentiation
---

This is my first time event storming a different system in an industry I've worked with previously.
I'm surprised how effective the second layer modeling has been for differentiating businesses within the same industry.
<!--more-->

## Event Storm Recap
For those who are unfamiliar, event storming is a technique for mapping out processes. It's often used to create a shared picture between people of many different roles. Alberto published an [excellent and brief introduction](http://ziobrando.blogspot.com/2013/11/introducing-event-storming.html).

For example, an e-commerce event storm might identify a Submit Order command (an action that could fail) with subsequent events (things that happened that people might need to know about) of Order Accepted or failure events like Credit Card Authorization Failed, Malformed Order, or Inventory Back Ordered.

![Submit order flow](../../static/post-media/Event-Storm/event-storm-submit-order.png)

This is just a tiny portion of an event storm. The storming process itself focuses on events first, and builds a larger picture of critical events before using commands to consider success/failure cases. 

Scott Wlaschin [demonstrates](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional) how to refine a model like above into more detailed models and then into software.

Working with stakeholders relevant to the chosen flow, you start asking questions about what information is needed for the command and events.
To start, the workflow input is the command and where the possible outputs are the events. 
From there, the group keeps digging into what data looks like until everyone is satisfied the groups shares a clear picture of the workflow and could carry it out (perhaps manually, not necessarily via software).

Such a data model for our previous event storm sticky notes could look like this.
```
workflow Submit Order = 
  input: PaymentInfo * FullCart
  output: 
    | Order Accepted of AcceptedOrder
    | Credit Card Authorization Failed of PaymentAuthorizationFailureReason
    | Malformed Order of Order Validation Error
    | Inventory BackOrdered

data FullCart = {
  line items of CartLineItem list
  coupon code of Coupon?
  billing of Address
  shipping of Address
  customer identifier of CustomerIdentifier
  seller identifier of Seller ID
}

data Accepted Order = {
  OrderId of OrderId
  OrderAcceptedDate of TimeStamp
  PaymentAuthorization of PaymentAuthorization
  OrderDetails of FullCart
}
  data PaymentAuthorization = 
    note: some kind of token
    constraint: should be capable of being uniform across payment providers
  
  data OrderId = 
    constraint: unique *and sequential*. Should be human readable, probably numeric
      will be read aloud. So probably need to mind ambiguous characters


data PaymentAuthorizationFailureReason = 
  NOTE: Leaving undefined pending more knowledge of payment system
  Pretty confident we could fit reasons into a normal form

```


## The Second Layer is Gold for Business Differentiation

This is my first time creating an event storm for a different system in an industry I've previously worked with, specifically ecommerce.
I'm quite surprised how much business differentiation has come out in the second layer of modeling (data model). 

The top-level event storm sticky notes felt quite familiar to the flows I'd previously seen in ecommerce. There were some key differentiations in how some processes like returns were handled, but the overall structure felt very familiar.

However, the specifics of inputs and outputs for command and event workflows have uncovered a lot of ways this ecommerce system is different from others. 
For example, 
- Carts are per seller because the system mostly acts as a customizable online store front for businesses rather than a unified shopping experience across vendors
- The packing process sends employees with a box/bin to fetch items off particular shelf locations because the orders are relatively small and can span a wide variety of goods. My previous experience centered on a picking line for filling many orders with relatively little product variety on tight schedule.
- Payment authorizations may need to be kept across multiple charges if, for example, an order needs to be fulfilled in multiple shipments. We only want to charge for the portion of the purchase that already shipped.


I knew that the data model phase was useful for uncovering details that get overlooked in the more broadly focused storm.
However, this exercise has been a clear example of even greater value: extending the storm to data models uncovers how the business is unique from similar businesses.
This unique value proposition is critical to businesses, and often the focal point of a business strategy. Perhaps event storms could be used to help a business looking for new ways to differentiate.

If nothing else, it's reassuring that the company's differentiators come across clearly in the event modeling process. This increases opportunities to align the system and company on these differentiators from early on.