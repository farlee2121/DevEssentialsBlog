---
date: "2020-08-28T00:00:00Z"
tags: [Design thinking, Case Study, SOLID, Open-Closed Principle]
title: "Chat Library Case Study: Open-Closed Application"
---

This is a throw back to one of my earlier wrestlings with the Open-Closed principle and writing extensible frameworks. The goal is to shed some light on an important realization that let me to understanding the Open-Closed Principle.
<!--more-->

## The Problem

I was trying to make a chat system for a company I was consulting with. The goal was for users of our app to be able to communicate with individual that may not have an account on our system.

Requirements
 - App users should send the messages from within the app
 - Recipient should not need to create an account
 - Recipient should receive the message via email
 - Recipient should be able to respond via email
 - Recipient contact information should not be exposed
 - Both app and email should maintain conversation thread
 - Must accommodate attachments on messages in both directions
 - A sender and receiver can have multiple conversations
 - Conversations are segmented by certain in app entities. The app should be able to display conversations by these entity divisions
 - We needed to store some specific information on users and conversations to be displayed in the UI. These extra properties were not generally chat related.
   - May also search or filter on those extra properties.

This problem just felt like a distinct and reusable domain. Yet, I couldn't find any libraries that cleanly met these requirements. It seemed silly to me that a few specific filters and display properties would prevent the code from being reusable.

## First Solution

My first response to these specific properties was inheritance and generics. 

I explored two main applications. My approaches here were inspired by the Asp.NET Membership and ViewBag.

**Option 1:** Have the chat library internally refer to User and Conversation interfaces that defined the properties needed internally. Functions requiring these objects would have a generic type parameter. This way
  - Library consumers could define their own types with the extra properties
  - Consumers could work with strongly typed entities
  - Type information was preserved so that components like the accessors could use reflection to deal with extra properties, or custom implementations could be made with knowledge of the concrete types

**Option 2:** Essential the same as option 1, but the extra properties are put into a generically typed property of a User or Conversation (a bit like viewbag). This allows Users and conversations to be concrete types within the chat library.

## Why These Are Bad

Adding generics to core library entities caused changes through just about every component. Most of the functions didn't even utilize the generic type. The few that did became very complicated because I was operating on completely unknown data. Just storing the data in sql required jumping through hoops. Performance optimization would be a no-go.

The short of it comes down to complexity and a misrepresentation of the problem. I was trying to shape my library internals around the unknowable needs of consumers.

## The Good Solution

Fortunately, I have some smart friends who are willing to talk sense into me. One such friend realized that what really needed was tags, and it only took a few minutes of listening to my problem.

Tags. Nothing more than a collection of strings pairs associated with the entity. 

My friend commented that accommodating every unknown case increases complexity too much (if it's even possible). The library should know about the flexibility it offers.

That is the key difference between my earlier solutions an tags. My solutions were trying to invite consumers concerns into my system. The nature of extension was hidden from my library and thus uncontrollable. Tags, however, are fully known to my system. I can reason about and act on them in predictable ways. 

The library consumer also doesn't loose any flexibility. They can keep any referential information they want in the tags, be it filters, display information, metadata, etc. The consumer is responsible for it's interpretation of the provided extension points.

I was able to accomplish a clean separation of the chat and core domains. Emails, entity filters, and display properties all fit nicely in tags. I was also later able to accommodate special SMTP headers for threading without making changes to the chat library.

## The Open-Closed Principle

The heart of this issue is the Open-Closed Principle.
>  "software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification" -Meyer Bertrand

In other words, code should expose ways for consumers to customize their usage without changing the underlying code. Tags are a very powerful expression of the Open-Closed principle.

This experience was a concrete example of the OCP in action. It helped me realize the power of the principle and that the mechanisms and limits of extension mechanisms belong to the code being extended.