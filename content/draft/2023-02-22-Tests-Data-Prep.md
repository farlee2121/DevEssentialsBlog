---
date: 2023-02-22
tags: [testing]
title: Evolving Test Data Arrangement
---

This post recounts my journey to understand tests data arrangement from before my blogging days. This exploration cemented key lessons in reusability and composition.
<!--more-->

Up front, this does not reflect my current views on test data arrangement.
[TestApi](./TODO.md) renders this approach unnecessary.

However, this was great learning experience both in testing and for general code reuse and composition. It's also one of the more intensive lines of exploration I pursued before I started blogging and i'd like to record it


- separating out shared functions
- moving repeated functions into shared files
- dealing with dependencies between prep functions
  - also, what about config differences between tests. some will want to persist data to a real store, some to a mock store, or perhaps you support multiple stores
- Redundancy between preps, but will want any given data prep to support custom prep scenarios.
- trying to keep a convenient handle for discovering data prep / not creating a bunch of individual preps each test
- making use of existing libraries (bogus, autoFixture)


Reflecting on why this isn't relevant anymore
- This still biases toward data all living in generally the same place, which is a design smell. The system is probably experiencing implicit coupling through relationships expected to be managed at the datastore level. 
- It also assumes enough data contracts are shared between services such that we get worth-while reuse from our data prep classes. But services should own their own abstractions, otherwise we're violating Dependency Inversion and the services will end up leaking needs to each other via data contracts. This greatly reduces composability, but thats a [different series](./TODO)
- TestAPI achieves a similar goal, but in a much more Stable, incremental, additive way. TestAPI focuses on externally observable behaviors. For example, if we save then we should be able to retrieve or the total number of listed items should increase. This means we can lean more into the system to create state or generate data. The system doesn't need to support all the data generation or operations we need though. We can backfill methods in the TestApi adapter. Data prep can live here if it's complicated, or our tests can directly use data generators and lean into the testApi's method to create side-effects with the generated data. There isn't the need to create magically ready data stores or for tests to directly deal with gaps in system ability.
  - TODO: need to revisit how I explain this