---
layout: post
tags: [Database, Event Sourcing]
---

# Event Stores: An Advance in Data Safety

I've been working with [Datomic](https://www.datomic.com/) on a recent project. Datomic, and stores like it, solve a fundamental class of development issues: data safety.

[Datomic](https://www.datomic.com/), [EventStore](https://www.eventstore.com/), and similar databases don't appear to have an established category name. The best I've found is [event stores](https://en.wikipedia.org/wiki/Event_store) or event databases. However, they share one key quality: they store data as a series of changes rather than as some mutable current state. Current state may be queried, but it is an index built from the stored differences rather than the definitive representation.

I've been surprised the significant practical difference this simple idea makes. It boils down to improved data safety and transparency.

**Migrations**: Migrations are no longer never racking experiences. The migration can be a single update to the database. If something goes wrong the migration can be rolled back with a single command, even long after the transaction was committed.

This is much faster than a reverse data transform, much faster than restoring a backup, doesn't require any duplication or transition period, *has no risk of data loss and doesn't interfere with any other updates that may have happened while the migration was applied*! I want to highlight again, this solves data loss and migration consistency issues! 

**Maintenance**: Manual data maintenance enjoys similar benefits. There is no worry of accidentally losing customer data (which generally irreparably damages the customer's trust)

**Diagnostics**: Diagnosing issues is also much easier because we can see all the states that led up to an error, rather than just the current state. The database shows us a play-by-play, which often preempts any need to reproduce and observe an error in action.


Other benefits include
- auditing and change tracking is pretty much included by default
- friendly to high-scale systems with concurrency needs (no locking, concurrent updates leave a clear trail to current state)
- simple offline sync
  - don't have to compare state with the current database
  - At simplest, keep all pending transactions in some persistent queue. Then push them when available and pull latest state

Obviously it isn't all up sides. Theses databases require a lot of storage. That doesn't matter in the cloud, but is restrictive for embedded scenarios. Keeping all past data also means keeping old schema. In practice, many companies already don't remove data or schema for the sake of safety. Still, this kind of store wouldn't be a fit for data that changes shape frequently.

I've otherwise struggled to find downsides. In fact, most ACID-compliant databases must implement this differential paradigm to some degree, else concurrent transactions would be impossible and every change would be a locking change.

## Practical Adoption

It is difficult to compete with the maturity of SQL databases. SQL generally comes with advanced backups, replication, cheap hosting, near-universal platform support, and many other benefits.

Both [Datomic](https://www.datomic.com/) and [EventStore](https://www.eventstore.com/) offer reasonably mature cloud offerings, but that still may not be a good fit for every use case.

Fortunately, .NET users don't have to make a binary choice. [Equinox](https://github.com/jet/equinox) offers a event store wrapper over many mature storage options, including EventStore, SQLServer, MySql, and PostGres. In this way users can leverage the maturity of SQL hosting and tools while also benefiting from event store data safety. 

Similar libraries may exist for other languages, but I haven't checked.

## Conclusion

Event stores represent the current state of the system as a series of changes. This simple conceptual shift results in solutions to some of the most fundamental challenges with managing data. Most importantly, it solves data safety.
- It benefits the business by almost eliminating a whole class of the most catastrophic operational failures
- It benefits developers by reducing risk around routine operations, reducing stress and improving agility

Just the improvement to data safety is enough to make event stores my default storage choice moving forward.