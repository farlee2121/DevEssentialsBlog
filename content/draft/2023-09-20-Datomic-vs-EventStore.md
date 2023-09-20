---
date: 2023-09-20
tags: [Event Sourcing]
title: Datomic vs EventStore
---

Datomic are EventStore are databases that both store data as a series of changes, but they approach that change log with different mindsets. I'd like to explore the tradeoffs between these two mindsets.
<!--more-->


First off, a disclaimer. I have limited production experience with EventStore itself. Rather, a company I worked with had a homebrew system with the same philosophy as EventStore, but written before EventStore grew in prominence.

Also, I should be clear that I like both of these technologies.
In general, I think treating the history of data changes over time as a first-class database concept is a powerful advancement. This approach [greatly improves auditability, observability, and data safety](../posts/2021/2021-05-28-Transaction-Databases.md). Defects are easier to diagnose with change history, restoring mistaken changes is much easier, and loosing customer data is much harder.

## Datomic's Approach

Datomic stores data as a series of changes in data over time, but Datomic does the data delta management for you. The developer primarily interacts with the data much like a relational database. There is a schema which defines entities (much like tables) and relationships between them. 

<!-- TODO: align this example with the eventstore example -->
Here's a simple schema for a cooking recipe
```clojure
(def recipe-schema [{:db/ident :recipe/id
                     :db/valueType :db.type/uuid
                     :db/cardinality :db.cardinality/one
                     :db/unique :db.unique/identity
                     :db/doc "Unique recipe Id"}

                    {:db/ident :recipe/title
                     :db/valueType :db.type/string
                     :db/cardinality :db.cardinality/one
                     :db/doc "The recipe title"}

                    {:db/ident :recipe/instructions
                     :db/valueType :db.type/string
                     :db/cardinality :db.cardinality/one
                     :db/doc "A sanitized markdown string of recipe instructions"}

                    {:db/ident :recipe/ingredients
                     :db/valueType :db.type/string
                     :db/cardinality :db.cardinality/one
                     :db/doc "A sanitized markdown string of recipe ingredients"}])
```

Then data can be saved
```clojure
(d/transact conn {:tx-data [
    {:recipe/id (java.util.UUID/randomUUID)
     :recipe/title "Do the thing"
     :recipe/instructions "- pour it \n - mix it \n - cook it \n - done"
     :recipe/ingredients "- 4 food \n - 1 stuff \n - 1/2 yogurt"}
]})
```

If I save again, Datomic will take care of saving the change in data and updating the current view of the recipe.
```clojure
(d/transact conn {:tx-data [
    {:recipe/id ;; assume the correct Id is here
     :recipe/title "I CHANGED" ;; <- Only this changed
     :recipe/instructions "- pour it \n - mix it \n - cook it \n - done"
     :recipe/ingredients "- 4 food \n - 1 stuff \n - 1/2 yogurt"}
]})
```

I can then query this data pretty much however I'd expect to query a relational database.

```clojure
(defn get-all-recipes []
  ;;https://docs.datomic.com/on-prem/query/indexes.html#EAVT
  (d/index-pull (d/db conn) {:index :avet
                             :selector '[*]
                             :start [:recipe/id]})

(defn get-recipe-by-title [title]
  (d/q '[:find ?e 
         :in $ ?title
         :where [?e :recipe/title ?title]]
       (d/db conn)
       title)
)

(defn get-recipes-with-ingredient [ingredient]
    ;;...
)
```

Datomic has a nice [getting started tutorial](https://docs.datomic.com/pro/getting-started/brief-overview.html) if you want to dig deeper.


## EventStore

EventStore takes a rather different approach than Datomic.

EventStore has no schema. There is no overall specification of what the data looks like or how pieces relate to each other.
Instead, the focus is on streams of events. A stream is often an entity (like a the recipe in the previous example), and the events are semantic changes to the entity over time. 

```cs
public interface OrderEvent{}

public record AddressEdited(string street, string city, string state, string zip) : OrderEvent;

public record AddressUndeliverable(string street, string city, string state, string zip) : OrderEvent;

public record ItemAdded(Guid itemId, int quantity) : OrderEvent;

public record ItemReturned(Guid itemId, int quantity) : OrderEvent;



await client.AppendToStreamAsync(
    streamId,
    StreamState.Any,
    new OrderEvent[]{
        new AddressEdited("1600 Pennsylvania Ave NW", "Washington", "DC", "20500"),
        new AddressEdited("Totally not the white house","Washington", "DC", "20500"),
    }.Select(ToDbEvent)
);
```

These events can then be replayed to create different views of the data, like if we want to know the current shipping and item details of an order. 
The playback is really just a function that maps events into a certain shape, potentially overwritting information from previous events.

Unlike Datomic, there is not one canonical schema for the current state of an entity (in this case an order). The series of semantic events is treated as the primary view of the data and any "current state" views are treated as disposable computations from the events. EventStore provides various subscription and projection approaches maintaining these computed views of an event stream.

I should highlight that different events might change the same data, but communicate different reasons for change. In the example above, `ItemAdded` and `ItemReturned` might both effect how we tabulate item quantities. 

The interpretation of events can change over time since we know the intent of each event. For example, the system might be removing returned items from the total items sold, but decide to pivot to including them as sold items and accounting for returns separately later on. Different usecases can similarly interpret the events differently. For example, the logic for recommending products might interpret return quantities differently than the logic for managing inventory.

It's also possible to support advance decisions based on the order of events. Decisions based on event order don't lose context over time, unlike decisions based on a set of state flags.

<!-- TODO: Call out how the same data can change for different reasons. 
-->


## Key differences

Both Datomic and EventStore use increments of data as the primary source of truth.
The key difference is how they view the increments of data.

Datomic treats these deltas as largely anonymous artifacts of updating entities.  The developer primarily interacts with the current view of data within a defined schema.

EventStore takes the inverse assumption. There is no primary "current state" view for entities. The developer primarily interacts with the increments of change to the data. 
The data increments (events) should communicate the meaning behind changes. Any "current state" is computed from the events. It's expected that there may be many different views computed from the same events and none of them get special treatment.

## Tradeoffs Between Mindsets

Datomic's approach feels familiar and it can deliver the capabilities we generally expect from a relational database (i.e. querying a bunch of entities on fields). 

The downside of Datomic's relational-like approach is that the state changes is stored without context. We don't know the intended meaning of the change.

EventStore's approach is weak where Datomic is strong. EventStore does not have the familiar feel of a relational database. It can take some trial and error to use it correctly, and EventStore probably won't be the right tool for all capabilities we expect of a relational database. Some queries might require computing a view of the data and persisting it to a data store more suited to the kind of query.

While the EventStore approach is more disruptive, it also holds tremendous business value. My experience at a recent job suggested that storing changes as *semantic* events and not just data deltas was the primary value to the business as a whole. Events logs could be exposed to customer service representatives to better diagnose customer issues. The data team could analyze the series of events for an in-depth analysis of shopping trends or hangups in customer experience.
All the technical benefits of better observability and data safety are there too, but the benefit extended across the whole business.

Let me put it this way. The business team would probably have thrown a fit and intervened if the tech team ever tried to move away from storing semantic events. I think it's rare for a whole business to be so invested in a development paradigm choice.

I do think it'd be possible to attach semantic descriptors to changes in Datomic (the transaction meta is very flexible), but it's not a expectation and facilitated approach like it is in EventStore.

## Conclusion

Both Datomic and EventStore are awesome database technologies.
They both store data as a series of changes, and both provide significant benefits to data safety, observability, auditing, and more.

However, the two databases treat the series of changes differently.
Each approach has it's benefits, but I think EventStore's emphasis on semantically named increments of change hold tremendous value for the whole business. Recording the intent of changes over time preserves a new dimension of understanding about the data, and that depth is useful far beyond technical development.