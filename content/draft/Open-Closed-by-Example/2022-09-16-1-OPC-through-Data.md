---
date: "2022-09-16T00:01:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Flexibility Through Data"
---

This series clarifies the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) by example. In this post we'll demonstrate ways the OCP can be achieved through flexible data. 
<!--more-->

I recommend you read the [intro post](./2022-09-16-0-Intro-to-OCP.md) if you haven't already. It defines and sets motivations for the Open-Closed Principle (OCP).
In particular, the OCP pushes components to offer defined flexibility to callers, much like how function parameters allow flexible use within a contract owned by the function.

One way to achieve defined flexibility is through flexible data.

## Semi-Structured Data
The general way services offer flexibility is by leaving some amount of interpretation up to the callers.
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
CustomData however is left to be any string. 

`Person` is "open" because different callers can put any information they want in the CustomData field. It could be simple text, or it could be json or xml.
The caller can do anything they want with the field so long as it fits in a string. For

`Person` is also "closed". It knows the outer shape of CustomData is a string, so any operations on Person can handle CustomData uniformly for any caller.
It can pass the data around and save it safely because it knows the outer shape is a string. The inner structure of CustomData doesn't matter to our component,
we only save the data to later return it to the caller as we received it. 

## Tradeoff: Flexibility vs Operability
Data doesn't need to be completely unstructured to offer flexibility to callers.
There is a gradient between flexibility and operability. 

Decisions about data structure are always made somewhere, but who makes the decision [changes the dynamic](https://blog.ploeh.dk/2018/07/09/typing-and-testing-problem-23/).
The more structure our component defines, the more operations we can safely perform on the data. 
Less structure allows callers to fill in their own structures and enables greater flexibility, but at the cost of reducing what the called component can do with the data.

## Implicit Assumptions are Not Flexibility

I want to be very clear that using less structured, but assuming stronger properties of that data is not an application of the open-closed principle.
They are simply dangerous and unintuitive coupling.

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
This function has specific expectations about the data it's passed, it's just not enforcing them.

If a component is going to leave flexibility for callers, it must not make any assumptions beyond what what it enforces.
For example, our earlier `Person` type must only count on `CustomData` being a string and never assume there is some specific structure in the string, like json.
These kinds of implicit requirements cause semantic coupling and make a system very difficult to use.

## Tags

Tags are a common and powerful application of the Open-Closed Principle.
They enforce only a little structure, but that bit of structure is enough
for many operations.

For example, we can use an array of strings as tags on a recipe.
We can then filter, sort, or group recipes based on this tags.
Yet consumers have full control over the meaning of these tags.
They can classify recipes however they wish.

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

First, some context. This example is a messaging system meant to be used as part of a larger system.
Specifically, it's part of a marketing application.

The marketing system requires that message threads must be retrievable by 
- campaign
- brand (company)
- influencer


### Threads: First pass

This first implementation does not consider Open-Closed Principle.
The chat system is only part of the marketing application, so it's tempting to directly 
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

First, it's not open-closed. Adding a new relationship to a chat thread requires a new foreign key and a new method. 
Querying any intersection of relationships (like threads between a brand and influencer) also requires a new method.

Second, the chat library depends on unnecessary ideas. Brands, Campaigns, and Influencers don't inherently have anything to do with chat.
This prevents reuse of the chat system to new needs in our system, or an ever-increasing list of fields only used in certain situations.
The chat system relies on information about each of its consumers.


### Threads: Using Tags

Tags can isolating our chat sub-system to care only about chat concepts and enable reuse in any situation that requires chat.

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
threadClient.GetThreads(tags: new [BrandToTag(brandId), InfluencerToTag(influencerId)])
```

This tag approach separates [essence from accident](https://en.wikipedia.org/wiki/Accident_(philosophy)). It more clearly reflects the chat library's actual nature, often called it the domain. 
The chat domain is about managing conversation threads that can be retrieved by various groupings. The groupings themselves are unimportant.

Clarifying th domain has made the chat library simpler and more powerful.
There is now only one function for querying threads by tags. It can query by any set of tags, not just the entity relationships. 
There's also now a clear path for defining more sophisticated behaviors. For example, we could offer unions between tags (i.e. has any of the given tags).

This tag-based approach is open because different callers can impress their own groupings or metadata into tags, but closed because callers don't need to modify the library to accomplish new
and tailored behavior.

## Conclusion

The Open-Closed Principle pushes components to offer defined flexibility. To enable adapted behavior without changing for each consumer.
In this post we've seen how flexible data like tags enable components to adapt to then needs of different callers without knowing anything about those callers.
However, flexible data is a tradeoff. The less our component enforces, the fewer operations it can safely perform on data. 
The key is separating responsibilities, understanding what knowledge is essential to the component and what can be left to the caller.
