---
date: "2021-01-01T00:00:00Z"
tags: [Software Architecture, SOLID Structure, IDesign, Clean Architecture]
title: "Accessors: Services, Not Servants"
aliases:
- /2021/01/01/accessors-services-not-servants
---

I've been on a long journey of meshing IDesign with Clean Architecture. Managers, engines, and utilities fit nicely, but accessors seemed too substantial for an adapter and not independent enough for a true service. At last, I've realized the place of accessors by building off [their relationship to utilities](../../posts/2020/2020-12-25-Incremental-Accessors.md). Accessors are independent services, not servants to managers.
<!--more-->

## The problem
IDesign separates domain services into several layers. Were concerned with
- Managers: encapsulate the system use cases and all sequential coupling of domain activities
- Accessors: hide resources like frameworks and databases from managers by providing an abstraction layer

So far, I viewed accessors as a tool for the managers to directly fetch the entities they needed without knowing about the concrete storage mechanism. This meant
- shared contracts between accessors and managers
- accessors were responsible for entity relationships
  - includes queries that needed to return hierarchies 
- new manager requirements often led to changes in accessors
- different requirements of different managers cause similar, but separate accessor operations

These qualities seemed natural and unavoidable under iDesign. However, the same properties are not allowed in Clean Architecture.
Each service should define their own abstractions, both operations and data contracts. It is also wrong that changes in my manager services regularly propagate to the accessors. Services are meant to stand on their own.

This left accessors in a gray area. Did they belong as services anymore? I considered many options, but they mainly fell into two camps
- Accessors may just be adapters for manager contracts, but that prevents a lot of data access reuse
- Accessors may just be common contracts between manager services, but that violates services owning their own dependencies

## New Paradigm

Then I realized accessors [could be incrementally refactored from adapters just like utilities](../../posts/2020/2020-12-25-Incremental-Accessors.md). This led me to think about cases I would do so and how an accessor could obey the Open-Closed Principle by accommodating specific constraints with generic extension options.

This led me to realize that my previous concept of accessors were not services at all. They were simply exporting the responsibility of data access and relationship management from the managers. My accessors were intrinsically tied to the needs of my managers. They implicitly required the same entity relationship assumptions.

The new paradigm elevates accessors to true services. The new rules are
- There is one accessor for one core domain entity
- The accessor manages all data types that are naturally owned by the core type (e.g. a message naturally owns its attachments and they don't belong to anything else)
- All access to the entity sub-domain must go through the accessor
  - The accessor must expose the complete set of operations for the data sub-domain
  - Do not split entity logic across multiple accessors or provide "side-access" from another accessor
- The accessor owns all of it's own contracts
- Relationships to non-owned entities must be achieved through a generic mechanism such as tags
  - In effect, an accessor portions off a small data-oriented sub-domain
  - Relationship management between these sub-domains is a orchestration decision, which belongs managers. 
  - Adapters bridge the gap between a manager's relationship assumptions and the accessor's generic relationship paradigm
- All operations are defined relative to the entity, not the caller
  - All operations are "atomic actions" that represent a complete conceptual action
- Accessors may have dependencies of their own


It isn't immediately obvious how these rules play out. The design approach and practical results are very different. I'll get into benefits and examples, but first lets ensure it the paradigm can still meet key needs.

## Addressing Capability Concerns
It wasn't obvious to me that accessors as true services were capable of all operations that direct-to-resource accessors could accomplish.

- Could this paradigm execute a query and fetch related entities without looped database calls?
  - Yes. By exposing a method such as `GetEntityWithTag(Tag[])` the tags effectively act as a join and we can fetch a consistent data set in only two database calls (or one extra call per related type)
- Can we page a list of entities and reliably associate related data? 
  - Yes. The same tag system works. The relationship query only cares about the given parent entity list, not the query that produced it.  
- Can we query the parent entities by properties of their relationships?
  - Yes. The tags system still works, and much like the database query would. We start with the type we want to match on and use the tags to fetch parent entities with a method like `ParentEntity[] GetById(Id[])`
- Can we query based on properties of multiple levels of the relationship hierarchy?
  - Yes, but it can get tricky. Adding tags with all necessary query properties on a single entity reduces this case to the same number of calls as any other query at the cost of more complex tags. You may consider if some of the properties should actually be represented in the sub-domain even if there is a bit of data duplication. 

In short, all the same queries can be performed with a constant number of a database calls without returning excess records. The relationship behavior is moved to up into business logic over tag- and id-based calls. The resultant accessor methods are also generically useful for many other cases.

That said, is this style of access sufficiently performant? The main differences that could slow it down are 
- excess remote calls
- excess records returned
- excess data per-record

Our previous query exploration showed that the first two are not major concerns. We can achieve a constant number of calls without excess records.

But the excess data per-record and hot-path performance are not addressed. In fact, if you always query the data from the database this new method will likely be slower. However, [well factored systems are performant because they are cache-friendly](https://www.infoq.com/presentations/top-10-performance-myths/). The true-service paradigm is much more cache-friendly because each manager defines only the data it needs and an external component is responsible for assembling it. This new paradigm could even add caching as a generic decorator, allowing simple and exact caching for most any path in the system.

## Consequences (Pros/Cons)
We've established that accessors as true services are theoretically capable of completely replacing servant accessors without destroying performance. Now, let's consider if and how the paradigm is actually better

Pros:
- More natural and complete responsibility separation
  - It is less tempting to to share contracts between services. The high-level relationships aren't exposed in a low-level component.
  - Managers can change entity relationships and usage without changing the accessors. Managers no longer push part of the orchestration decisions into entity management
  - Engines are likely to be even more pure (not tempted to re-use existing accessor entity mixes)
  - Much easier to reason about accessors independently, they represent a complete operation set
  - Less testing overlap between accessors and managers
  - Accessors become portable. Since it's a self-contained sub-domain it could be dropped into a different application without change
- Can more faithfully reflect the domain 
  - E.g. Entity can belong to x, y, and z rather than there are XEntity, YEntity, and ZEntity as separate variations)
- Unified growth
  - As different consumers require more of the entity, it pushes generalization rather than more specific paths. The added features can be optionally enrich all the connected systems rather than making them fall out of sync
- Reduce sneaky coupling at the resource layer.
  - Each store is easier to migrate and update (in old model it wasn't really practical to put most data anywhere but the database because all the relationships depended on it)
  - Don't have to separate owned data just because of separate resource needs (i.e. attachments prefer a blob-type store while messages and threads prefer something more queryable. This storage separation is a choice internal to the accessor now) 
- Forces you to actually make relational behavior decisions
  - before deletion could be an implicit decision. Now you have to make it explicit, but you make the decision instead of letting the store make the decision for you
- More scalable
  - pushes the important synchronization to the manager where they should be so you can handle things like eventual consistency and distributed error states
  - Can't assume global transactional consistency, which is one of the most disruptive performance blocks later on

Cons: 
- Easier to forget behaviors like deletion and let entities get out of sync
- Pushes you into that larger system mindset of events and distributed error handling, which is more complex.
  -  May not be worth it if you don't plan for your system to scale, but little architecture is needed for such systems anyway.
- Lack of familiarity
  - we are used to relational queries in SQL, but not at a system level
- Local behaviors are easier to understand, but the emergent behaviors are more complex (i.e. fewer relationships are hard-coded and visible by looking at data) 


## Example
<!-- I think i should just do this as one case with two code examples -->
Let's make the difference concrete and see how the two paradigms hold under changing requirements.

Suppose we're interested in social posts. The initial requirements are
- posts belong to a social platform user, we'll call them influencers
- we are currently only interested in engagement metrics
- we want to compute aggregate metrics for an influencer based on individual post metrics

*Servant Accessor*

Relationships are managed at the Accessor level. An influencer must be represented so we don't hesitate to bake it into contracts.
```cs
class Post{
    public PostId Id {get; set;}
    public InfluencerId InfluencerId {get; set;}

    public DateTime PublicationDateTime {get; set;}
    public int Likes {get; set;}
    public int Shares {get; set;}
    public int Comments {get; set;}
}
interface PostAccessor{
    Post[] ListByInfluencer(InfluencerId influencerId);
    PostId CreateOrUpdate(Post post); 
}
```
We'll assume aggregate metrics are calculated elsewhere for now.

*Service Accessor*

First off, is a post intrinsically owned by an influencer in our domain? No, a post could reasonably belong to a brand, or to an advertising campaign without needing to know the associated influencer. There are likely future cases where posts naturally belong to other entity types, so it does not belong under the influencer accessor. We must represent the influencer relationship generically. In this case, with tags.
```cs
class Post{
    public PostId Id {get; set;}
    public Tag[] Tags {get; set;}

    public SocialPlatform Platform {get; set;} 
    public DateTime PublicationDateTime {get; set;}
    public int Likes {get; set;}
    public int Shares {get; set;}
    public int Comments {get; set;}
}
interface PostAccessor{
    Post[] ListByTag(Tag[] requiredTags);
    PostId CreateOrUpdate(Post post); 
}
```
Notice the addition of `Platform`. Without a guaranteed influencer we cannot rely fetching this information from the relationship. Instead of worrying about duplicating that data we are focused on whether or not it is intrinsic to a post.

The manager for the influencer flow defines a dependency much like the servant accessor's contract. 
```cs
interface InfluencerPostProvider{
    InfluencerPost[] ListByInfluencer(InfluencerId influencerId);
    PostId CreateOrUpdate(InfluencerPost post); 
}
```
The adapter then creates some tag for influencerIds.


### New Requirement: Ad Campaign Tracking
Now we want to let companies track posts for an ad campaign. We do not want to require an influencer to be associated with the post. The influencer may not be in the system or the post may not be associated with a specific person at all. 

*Servant Accessor*

The data and operations are still simple. The usecases share little in common, so we split interfaces to hide their methods from each other.
```cs
class Post{
    public PostId Id {get; set;}

    public DateTime PublicationDateTime {get; set;}
    public int Likes {get; set;}
    public int Shares {get; set;}
    public int Comments {get; set;}
}
interface InfluencerPostAccessor{
    Post[] List(InfluencerId influencerId);
    PostId CreateOrUpdate(InfluencerId influencerId, Post post); 
}
interface CampaignPostAccessor{
    Post[] List(CampaignId campaignId);
    PostId CreateOrUpdate(CampaignId campaignId, Post post); 
}
```

*Service Accessor*

No change to the accessor. Instead, the campaign manager defines its own contract and an adapter that uses the post tags to map relationships
```cs
interface CampaignPostProvider{
    CampaignPost[] ListByInfluencer(CampaignId campaignId);
    PostId CreateOrUpdate(CampaignPost post); 
}
```

### New Requirement: Campaign Notes
Now brands want to be able to take notes about posts in a campaign, but no such requirement exists for influencers and their posts.

*Servant Accessor*

Right now the accessor uses a single Post data contract. We have a choice. We can split the contracts to prevent exposing unnecessary info to other use cases or leave them together and hope the notes field doesn't get misused.

Splitting contracts creates a safer system, but it a very expensive refactor. It also means that any shared properties need to be added to many multiple contracts from now on. We could also use inheritance, but that gets complex fast and couples the two accessors.

```cs
class InfluencerPost {
    //...
}
class CampaignPost {
    //...
    public string Notes {get; set;}
}
interface InfluencerPostAccessor{
    InfluencerPost[] List(InfluencerId influencerId);
    PostId CreateOrUpdate(InfluencerId influencerId, InfluencerPost post); 
}
interface CampaignPostAccessor{
    CampaignPost[] List(CampaignId campaignId);
    PostId CreateOrUpdate(CampaignId campaignId, CampaignPost post); 
}
```

*Service Accessor*

Notes seem like a reasonable general feature for a post. We can add it to the core PostAccessor. The InfluencerManager and its adapter remain unchanged. The CampaignManager updates its data contract and the adapter appropriately maps the new field.
```cs
// PostAccessor
class Post {
    //...
    public string Notes {get; set;}
}
// CampaignManager
class CampaignPost {
    //...
    public string Notes {get; set;}
}
```

### New Requirement: Post Media
Posts in all use cases should now allow media, like images, to be attached to a post.

*Servant*

The posts are all being stored in SQL, but that is not an effective way to store large binary files. There are also multiple concrete accessor implementations. The choices are to split post media as a separate accessor, duplicate post media between accessors, or add another layer where a shared accessor services backs the use-case specific ones (hmm, sounds familiar). The last two are a lot of work and the third one appears to violate the iDesign layering rules.

Historically, I found myself choosing a separate media accessor.

```cs
interface IPostMediaAccessor{
    PostMedia[] Get(PostId postId);
    void Save(PostId postId, PostMedia media); 
}
```
Hmm, this is sneaky and it assumes that all the post accessors use interoperable ids. The other services now cannot independently change their ids without causing painful refactoring.

It also fragments the post type. Media conceptually only belongs to a post yet is only available through a separate accessor. Composing the two accessors gets pushed up into the managers and is likely to become duplicate code across managers.

*Service*

The post media clearly belongs to a post and to nothing else. It is an owned type of a post. This means it belongs in the same accessor as posts. This also gives us the freedom to group media with post operations if it makes sense.

Since the accessor is a proper service, it isn't weird that it defines its own dependencies. The Post accessor can define a dependency abstraction for managing posts if it wants to enable separate storage mediums. 

```cs
interface PostAccessor{
    Post[] ListByTag(Tag[] requiredTags, bool includeMedia);
    PostId CreateOrUpdate(Post post, PostMedia[] media); 

    // alternatively
    //PostMedia[] Get(PostId postId);
    //void Save(PostId postId, PostMedia media); 
}
```

The manager provider contracts need to change too, but only require a pass-through implementation in the adapter.

```cs
interface InfluencerPostProvider{
    InfluencerPost[] ListByTag(InfluencerId influencerId);
    PostId CreateOrUpdate(InfluencerPost post, PostMedia[] media); 
}
interface CampaignPostProvider{
    CampaignPost[] ListByTag(CampaignId campaignId, bool includeMedia);
    PostId CreateOrUpdate(CampaignPost post, PostMedia[] media); 
}
```

### New Requirement: Complete post update history
Both advertisers and influencers want to track posts over time and see how they change. Especially their engagement metrics.

*Servant*

Just keeping track of history can be kept internal to the accessor, but every implementation must change. Every implementation must also be tested and monitored to ensure change don't break history tracking.

Allowing users to see the history requires new methods on every contract.

*Service* 

Just tracking update history can be kept internal to the accessor. Tests only need to be added for the one service and the feature will be maintained for all current and future consumers of posts.

Making the history available to consumers requires exposing a new operation and pass-throughs on all managers that want the functionality.

### New Requirement: Campaign Management took off, tune performance for higher throughput 

*Servant*

The accessors are not supposed to be tied to one manager. They are open for any manager to use. Thus, caching is a bit of a hard decision.
- We can cache results from the CampaignPostAccessor, but it will apply to all consumers.
  - Some consumers may not tolerate eventual consistency and require the latest data all the time.
- We can cache as part of the manager, but that muddies our business logic
- We can get creative with our dependency injection to try to only decorate the accessor with a cache for certain consumers.

*Service*

We clearly decorate the `CampaignPostProvider` that belongs only to the usecase's manager. Future contributors know where the caching occurs and it is clear when changes impact the cache. The cache contains exactly the data needed for the use case. Invalidation policies and optimizations only need to cater to one scenario.

### Volatility Analysis

I didn't include implementations because this example would get enormous. Still there is a substantial difference between the invisible details of these two cases. They have a relatively similar number of abstract contracts in each case. However, the servant accessor is prone to implementation churn, widespread contract changes, and hard decisions. The service accessor with adapters keeps volatile decisions as local as possible, has little implementation churn, and generally has a clear decision path for extension. 

From another view, the servant solutions *diverge* over time, while the service solutions *converge* over time.

It is also interesting that the servant-type accessor eventually wants to become the service-type accessor, but it can't because the refactoring cost at any point is too high.


## Conclusion
Accessors as a service are conceptually better than servant accessors in almost every case. The cases where I've implemented them lived up to the theory as well. While there are certainly details to iron out through practical application, the results are more than enough to lock service accessors as the basis for my designs going forward.