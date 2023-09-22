---
date: 2023-09-22
tags: [Event Sourcing]
title: Datomic vs EventStore
---

Datomic and EventStore are both databases that store data as a series of changes, but they approach that change log with different mindsets. I'd like to explore the tradeoffs between these two mindsets.
<!--more-->

## Datomic's Approach

Datomic stores data as incremental changes, but the developer primarily interacts with the data much like a relational database. There is a schema which defines entities (much like tables) and relationships between them. The stored data increments are usually computed from updates to these entities.

Here's a simple schema for a shopping order.
```clojure
(def orders-schema [
    ;; Order
    {:db/ident :order/id ;; <- Think of this like the field name
     :db/valueType :db.type/uuid ;; <- This is the field type
     :db/cardinality :db.cardinality/one ;; <- One or many values
     :db/unique :db.unique/identity}

    {:db/ident :order/delivery-address
     :db/valueType :db.type/string
     :db/cardinality :db.cardinality/one}

    {:db/ident :order/order-items
     :db/valueType :db.type/ref ;; <- a reference to another type of entity
     :db/isComponent true
     :db/cardinality :db.cardinality/many}
    

    ;; Order Item
    {:db/ident :order-item/item-id
     :db/valueType :db.type/uuid
     :db/cardinality :db.cardinality/one}

    {:db/ident :order-item/quantity
     :db/valueType :db.type/long
     :db/cardinality :db.cardinality/one}])
```

Entities are updated similar to an `INSERT` or `UPDATE` in SQL.
```clojure
(d/transact conn {:tx-data [
    {:order/id (java.util.UUID/randomUUID)
     :order/delivery-address "1600 Pennsylvania Ave NW, Washington DC 20500"
     :order/order-items [
        {:order-item/item-id (java.util.UUID/randomUUID)
         :order-item/quantity 5}
  
        {:order-item/item-id (java.util.UUID/randomUUID)
         :order-item/quantity 5}]}
]})
```

If I save again, Datomic will take care of saving the delta in data and updating the current view of the order.
```clojure

(d/transact conn {:tx-data [
    {:order/id #uuid "20504fa3-b526-43b5-8121-c6ca8f46b91a"
     :order/delivery-address "White House"}
]})
```

I can then query this data pretty much however I'd expect to query a relational database.

```clojure
(defn get-all-orders []
  (d/index-pull (d/db conn) {:index :avet
                             :selector '[*]
                             :start [:order/id]})

(defn get-order-by-address [address]
  (d/q '[:find ?e 
         :in $ ?address
         :where [?e :order/delivery-address ?address]]
       (d/db conn)
       address)
)

(defn get-orders-containing-item [itemId]
    ;;...
)
```

Datomic has a nice [getting started tutorial](https://docs.datomic.com/pro/getting-started/brief-overview.html) if you want to dig deeper.


## EventStore

EventStore takes a rather different approach than Datomic. EventStore expects developers to primarily interact with the incremental changes themselves, not some canonical view of current entity state. 

EventStore has no schema. There is no overall specification of what the data looks like or how entities relate to each other. Instead it has *streams* of *events*. A stream often represents an entity (like the example Order), and the events are semantic changes to the entity over time. 

Consider this shopping order example. 

The developer defines semantic reasons an Order might change.

```cs
public interface OrderEvent{}

public record AddressEdited(string street, string city, string state, string zip) : OrderEvent;

public record AddressUndeliverable(string street, string city, string state, string zip) : OrderEvent;

public record ItemAdded(Guid itemId, int quantity) : OrderEvent;

public record ItemReturned(Guid itemId, int quantity) : OrderEvent;
```

When a change occurs, events are appended to that entity's stream.
```cs
await client.AppendToStreamAsync(
    streamId,
    StreamState.Any,
    new OrderEvent[]{
        new AddressEdited("1600 Pennsylvania Ave NW", "Washington", "DC", "20500"),
        new AddressEdited("Totally not the white house","Washington", "DC", "20500"),
    }.Select(ToDbEvent)
);
```

<!-- TODO: should this be shortened? -->
These events can then be replayed to create different views of the data, like if we want to compute the final shipping manifest (goods in the box, where it's going, etc). 

The playback is really just a function that maps each event into the desired view, potentially overwritting information from previous events.

```cs
await client.SubscribeToStreamAsync(streamId,
    subscriptionId, // <- Event store can keep track of what events you've processed
    async (_, eventRecord, retryCount, cancellationToken) => {
        eventRecord.EventType switch {
            "AddressEdited" => // ...
            "AddressUndeliverable" => //...
            // TODO: do something for each relevant event type
            //   E.g. update the current order state in a sql table
        }
    });
```


Unlike Datomic, there is not one canonical schema for the current state of an entity (in this case an order). The series of semantic events is treated as the primary view of the data and any "current state" views are treated as disposable computations from the events. EventStore provides various subscription and projection approaches for maintaining these computed views of an event stream.


I should highlight that different events might change the same data, but communicate different reasons for change. In the example above, `ItemAdded` and `ItemReturned` might both effect how we tabulate item quantities. 

Because events communicate *why* data changed, different usecases can interpret the events differently. For example, the logic for recommending products might interpret `ItemReturned` quantities differently than the logic for managing inventory.

The interpretation of events can also change over time since we know the intent of each event. Today the sales report might deduct returned items from the total items sold, but later decide to include them as sold items and account for returns separately. No data is lost, it's just reinterpreted.

It's also possible to support advanced decisions based on the order of events. Decisions based on event order don't lose context over time, unlike decisions based on a set of state flags.

EventStore has a good [overview of concepts](https://www.eventstore.com/event-sourcing). If you want to experiment, here's an [install guide](https://developers.eventstore.com/server/v22.10/installation.html#quick-start) then jump over to the [library's guide](https://developers.eventstore.com/clients/grpc/).



## Key differences

Both Datomic and EventStore use increments of data as the primary source of truth.
The key difference is how they view the increments of data.

Datomic treats these deltas as (usually) anonymous artifacts of updating entities.  The developer primarily interacts with the current view of data within a defined schema.

EventStore takes the inverse assumption. There is no primary "current state" view for entities. The developer primarily interacts with the increments of change themselves. 
The data increments (or *events*) should communicate the meaning behind changes. Any "current state" is computed from the events. It's expected that there may be many different views computed from the same events and none of them get special treatment.

## Tradeoffs Between Mindsets

The upside of Datomic's approach is the familiar feel. It can deliver the capabilities we generally expect from a relational database (i.e. querying a bunch of entities based on fields) while delivering substantial improvements in data safety and observability. 

The downside of Datomic's approach is that the data updates are stored without context. We don't know the intended meaning of the change, which limits how the changes can be reinterpreted over time. 

EventStore is the reverse of this tradeoff. EventStore does not have the familiar feel of a relational database. It can take some trial and error to use it correctly, and EventStore probably won't be the right tool for all capabilities we expect of a relational database. Some queries might require computing a view of the data and persisting it to a data store more suited to that kind of query.

*Disclaimer:* I have limited production experience with EventStore itself. Rather, I worked with had a homebrew system with the same philosophy as EventStore (it was written before EventStore grew in prominence). 

## Semantic Events Deliver Whole-Business Value

While EventStore's approach is more disruptive, it also holds tremendous business value. 

My experience at a recent job suggested that storing changes as *semantic* events and not just anonymous deltas was the primary value to the business as a whole. 
Events logs could be exposed to customer service representatives to better diagnose customer issues. The data team could leverage the series of events for an in-depth analysis of shopping trends or hangups in customer experience. 
All the technical benefits of better observability and data safety are there too, plus developers were less tied to one read model of the data. The benefit extended across the whole business.

Let me put it this way. The business team would probably have thrown a fit and intervened if the tech team ever tried to move away from storing semantic events. I think it's rare for a whole business to be so invested in a development paradigm. That general buy-in indicates that persistent semantic events deliver unique value.


I do think it'd be possible to attach semantic descriptors to changes in Datomic (the transaction meta is very flexible), but it's not an expectation like it is in EventStore. Such broad value is worth making a default.

## Conclusion

Both Datomic and EventStore are awesome database technologies.
They both store data as a series of changes, and both provide significant benefits to data safety, observability, auditing, and more.

However, the two databases treat the series of changes differently.
Each approach has it's benefits, but I think EventStore's emphasis on semantically named increments of change holds tremendous value for the whole business. Recording the intent of changes over time preserves a new dimension of understanding about the data, and that depth is useful far beyond technical development.