---
date: "2023-03-02T00:01:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Flexibility Through Data"
aliases:
- /draft/open-closed-by-example/1-OCP-through-data 
---

<!-- TODO: consider a flow more like the callback post. Start with the example, explain problems, show better example, explain benefits -->

This series clarifies the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) with examples. This post will demonstrate how the OCP can be achieved through flexible data. 
<!--more-->

I recommend you read the [series intro post](./2023-03-02-0-Intro-to-OCP.md) if you haven't already. It defines the Open-Closed Principle (OCP) and highlights motivating questions.

In summary, the OCP illuminates how components can offer self-defined flexibility and adapt to caller needs without changing internally. This is much like how parameters
enable functions to be resused by many consumers without changing the function.

One way to achieve this self-defined flexibility is through flexible data.

## Semi-Structured Data
Services offer flexibility by leaving some amount of interpretation up to the callers, but within constraints set out by the service.
This can be as simple as offering an unstructured field for extra data.

<!-- need to define loose shape, but leave interpretation to caller -->

```cs
class Person{
  Guid Id;
  FullName Name;
  PhoneNumber HomePhone;

  string CustomData;
}
```

Most of the `Person` type is well structured. The Id, name, and phone number all use types that enforce expectations on their values.
CustomData, however, can be any string. 

`Person` is "open" because different callers can put any information they want in the CustomData field. It could be simple text, or it could be json or xml.
The caller can do anything they want with the field so long as it fits in a string.

`Person` is also "closed". It knows the outer shape of CustomData is a string, so any internal operations on Person can handle CustomData uniformly.
For example, it can pass the data around or persist it safely as a string. Person only holds on to the data to later return it to the caller as we received it. The inner structure of CustomData doesn't matter to our component.


## Tradeoff: Flexibility vs Operability
Data doesn't need to be completely unstructured to offer flexibility to callers.
There is a gradient between flexibility and operability. 

Decisions about data structure are always made somewhere, but who makes the decision [changes the dynamic](https://blog.ploeh.dk/2018/07/09/typing-and-testing-problem-23/).
The more structure our component defines, the more operations the component can perform on the data, but the less flexibility is left to callers.
Conversely, less structure allows callers to fill in their own structures and enables greater flexibility, but at the cost of reducing what the called component can safely do with the data.

## Implicit Assumptions are Not Flexibility

I want to be very clear that using less structured data, but making assumptions of that data is not an application of the open-closed principle.
It is simply dangerous and unintuitive coupling.

Consider this javascript. Will it work?
```js
// Do I work???
DoSomething({ name: "Bob"})
```
We have no way to know because the function cannot advertise any expectations for it's parameters.

The implementation could easily be
```js
function DoSomething(input){
  return input / 5;
}
```

Passing this function anything but a non-zero integer will throw an exception.
This function has specific expectations about the data it's passed. It just doesn't enforce those expectations upfront.

If a component is going to leave flexibility for callers, it must not make any assumptions beyond what what it enforces.
For example, our earlier `Person` type must only count on `CustomData` being a string and never assume there is some specific structure in the string, like JSON.
These kinds of implicit requirements cause semantic coupling and make a system very difficult to use.

## Tags

Tags are a common and powerful application of the Open-Closed Principle.
They enforce only a little structure, but that bit of structure is enough
for many operations.

For example, we might use an array of strings as tags on a recipe.
Consumers have full control over the meaning of these tags, but recipe service can then filter, sort, or group recipes based on the tags without knowing their meaning.

```cs
class Recipe{
  string Title;
  //...
  string[] Tags;
}

Recipe[] FilterRecipes(string[] tags)
```

## System Example

Let's dig into tags with a deeper example.

### Requirements and Context

First, some context. This example is a messaging/chat system meant to be used as part of a larger system.
Specifically, it's part of a marketing application connecting brands and influencers.

The marketing system requires that message threads are retrievable by 
- campaign
- brand (company)
- influencer


### Threads: First pass

This first implementation does not consider the Open-Closed Principle.
The chat system is only part of the marketing application. So, it's tempting to directly 
model the expected relationships between threads and marketing domain types. 
This manifests as foreign keys on the the `Thread` and as different methods for fetching threads.

```cs
class Thread {
  Guid Id;
  string Title;
  Guid CampaignId;
  Guid InfluencerId;
}

interface IThreadClient{
  void UpsertThread(Thread thread);

  Thread[] GetThreadsForCampaign(Guid campaignId);
  Thread[] GetThreadsForInfluencer(Guid influencerId);
  Thread[] GetThreadsForBrand(Guid brandId);
}
```

This approach has several problems.

First, it's not open-closed. New thread groupings require new code. The thread requires a new foreign key and the client requires a new method for every new relationship. Any intersections between thread groupings also require new code.

Second, the chat library depends on unnecessary ideas. Brands, Campaigns, and Influencers aren't an intrinsic part of chat.
This prevents reuse of the chat sub-system to new needs in our system or results an ever-increasing list of fields only used in certain parts of the system.
In either case, the chat system relies on information about each of its consumers.


### Threads: Using Tags

Tags can focus our chat sub-domain, pushing out external ideas and including only chat-related concepts. In turn, the chat client becomes reusable for any situation that requires chat.

The key is replacing the foreign keys on thread with tags. These particular tags are key-value pairs.

```cs
class Tag {
  string Key;
  string Value;
}

class Thread {
  Guid Id;
  string Title;
  Tag[] Tags;
}

interface IThreadClient {
  void UpsertThread(Thread thread);
  Thread[] GetThreads(Tags[] tags);
}
```

The caller might then define a wrapper to map foreign keys to and from thread tags.

```cs
static class CampaignMessagingTagNames{
  public const string Campaign = "campaignId";
  public const string Influencer = "influencerId";
  public const string Brand = "brandId";

  public static Tag CampaignToTag(Guid campaignId) =>
      new Tag(Campaign, campaignId.ToString());

  public static bool IsCampaignTag(Tag tag) =>
      tag.Key == Campaign;
      
  public static Guid TagToCampaignId(Tag tag) =>
      new Guid (tag.Value);
}
```

To look up a thread, the caller might query by an intersection of tags like
```cs
threadClient.GetThreads(tags: new [
  BrandToTag(brandId), 
  InfluencerToTag(influencerId)])
```

This tag approach separates [essence from accident](https://en.wikipedia.org/wiki/Accident_(philosophy)). It more clearly reflects the chat library's actual nature. This underlying problem nature is often called the domain. 
The chat domain is about managing conversation threads that can be retrieved by various groupings. The groupings themselves are unimportant.

Clarifying the domain has made the chat library simpler and more powerful.
There is now only one function for querying threads by tags. It can query by any set of tags, not just the entity relationships. 
There's also now a clear path for defining more sophisticated behaviors. For example, quering all threads for x campaign *or* y brand.
Plus, these tags aren't just for grouping. They can also be used for metadata.

This tag-based approach is open because different callers can impress their own groupings or metadata into tags, but closed because callers don't need to modify the library to change the groupings or metadata.

## Conclusion

The Open-Closed Principle pushes components to offer self-defined flexibility so callers can adapt behavior without changes to the reused component.

This post explored how flexible data like tags adapt to the needs of different callers without knowing anything about those callers.

However, flexible data is a tradeoff. The less our component enforces, the fewer operations it can safely perform on data. 
The key is separating responsibilities, understanding what knowledge is essential to the component and what can be left to the caller.
