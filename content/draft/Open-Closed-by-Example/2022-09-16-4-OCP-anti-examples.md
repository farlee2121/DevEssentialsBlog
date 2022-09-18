---
date: "2022-09-16T00:04:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Anti-Examples"
---

This series clarifies the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) by example. This post describes some approaches that may look like the OCP, but don't deliver the expected value.
<!--more-->

<!-- TODO: the other anti-examples all seemed to best belong with their related good examples
    This one would pair well as a bad version of metadata. I should explore replacing a dedicated anti-example post with a new post that covers a metadata example
    FsCheck custom constraints would be a good example. 
    Not sure where this fits in the flow. Maybe last since it requires an example change?

    I think I still keep this separate. It doesn't fit the data post flow. I'm not sure i'll take time to show the FsSpec example in this series.
    I can always link to from the misc examples post. 
 -->

## Anti-Example: Abstract Thread

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