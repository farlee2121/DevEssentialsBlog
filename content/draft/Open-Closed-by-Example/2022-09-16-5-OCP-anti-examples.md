---
date: "2022-09-16T00:05:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Anti-Examples"
---

This series clarifies the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) with examples. This post describes some approaches that may look like the OCP, but don't deliver the expected value.
<!--more-->

<!-- TODO: the other anti-examples all seemed to best belong with their related good examples
    This one would pair well as a bad version of metadata. I should explore replacing a dedicated anti-example post with a new post that covers a metadata example
    FsCheck custom constraints would be a good example. 
    Not sure where this fits in the flow. Maybe last since it requires an example change?

    I think I still keep this separate. It doesn't fit the data post flow. I'm not sure i'll take time to show the FsSpec example in this series.
    I can always link to from the misc examples post. 
 -->

## Previous Examples
Previous post in this series covered [Implicit data assumptions](./2022-09-16-1-OPC-through-Data.md#implicit-assumptions-are-not-flexibility) and [externally-owned abstractions](./2022-09-16-4-OCP-as-architecture.md#anti-example-externally-owned). Those are common traps to avoid, but I won't reproduce them here. 



## Anti-Example: Abstract Thread

The focus of this post is a hard fail I managed early in my journey to understand the Open-Closed Principle.

This example brings us back to the chat library. Before I tried tags, I tried to use generics to allow for caller-defined additional data.

For example,
```cs
interface IThread {
  Guid Id;
  string Title;
}

class CampaignThread : IThread{
  Guid CampaignId;
  Guid InfluencerId;
}

interface IThreadClient{
  void UpsertThread(IThread thread);

  T[] GetThreads<T>(Func<T, bool> filter) where T : IThread;
}
```

This approach was a hot mess. The complexity of the chat library exploded. Generics cascaded through the functions and data.
The library couldn't instantiate any of its own types because my functions didn't use concrete types. I was allowing the 
caller to decide what derivative I passed back to them.

Data store operations like saving and querying became a nightmare. I had to store some fields separately so I could query them, but then also had to serialize the whole object in order to restore object state. Querying based on custom fields like `CampaignId` required translating arbitrary predicates into sql queries. I didn't know what data might exists or where it might live on the type, so predicates were about my only option.

## Key problem
This generic-based approach to custom data tries to invite the caller's domain into its own. It tries to become flexible as a whole rather than defining contained flexibility on it's own terms.

Contrast this with the tag-based approach.

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
// In the caller
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
//...
threadClient.GetThreads(tags: new [BrandToTag(brandId), InfluencerToTag(influencerId)])
```


The tag based approach contains uncertainty to the tags field. Even in there it defines the outer shape of that flexibility.
This allows the thread client to deal with tags confidently. Callers haven't lost any of the desired functionality, and the library is much easier to work with.


## Conclusion

Focusing too much on flexibility can undermine the Open-Closed Principle. Remember that the contract for extension belongs to the component offering flexibility.
That flexibility should be contained and modeled as part of the component's domain. Require callers to adapt within your terms, don't invite the caller's domain into your own.