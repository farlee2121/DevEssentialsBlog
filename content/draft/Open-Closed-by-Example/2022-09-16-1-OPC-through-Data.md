---
date: 2022-09-16
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Flexibility Through Data"
---

This series clarifies the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) by example. In this post we'll demonstrate ways the OCP can be achieved through flexible data. 
<!--more-->

I recommend you read the [intro post](./2022-09-16-0-Intro.md) if you haven't already. It defines and sets motivations for the Open-Closed Principle.

## Analogy: Parameters

```cs
// wat?
int Add2and2() => 2 + 2;

// :)
int Add(int x, int y)
```


##  Metadata

- Closed implementation
- Open interpretation
<!-- need to define loose shape, but leave interpretation to caller -->

```cs
class Person{
  Guid Id;
  string Name;
  PhoneNumber HomePhone;

  string Metadata;
}
```


## Tags

<!-- 
- still metadata
- slightly stronger contract allows additional behavior
- also filter, sort, group
 -->

```cs
class Recipe{
  string Title;
  //...
  string[] Tags;
}

Recipe[] FilterRecipes(string[] tags)
```

## System Example

### Requirements and Context
<!-- __class: lead invert -->
- Chat/messaging system
- Side-feature of larger system

- Message threads must be retrievable by 
  - campaign
  - brand (company)
  - influencer


### Threads: First pass

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


### Threads: Using Tags

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

## NOT Implicit data assumptions

```js
// Do I work???
DoSomething({ name: "Bob"})
```


## Conclusion