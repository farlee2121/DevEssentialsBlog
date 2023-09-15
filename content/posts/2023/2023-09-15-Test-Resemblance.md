---
date: 2023-09-15
tags: [Testing, Design Patterns]
title: Resemblance and Likeness Testing Patterns
---

The Resemblance and Likeness patterns improve the readability and diagnosability of developer tests.
<!--more-->

I've been using the [Resemblance](https://blog.ploeh.dk/2012/06/21/TheResemblanceidiom/) and [Likeness](https://blog.ploeh.dk/2012/06/22/ResemblanceandLikeness/) patterns for several years to clarify my developer tests. They've earned a permanent spot in my toolbox and I use them frequently. Thanks to Mark Seemann for introducing the patterns!

Here I'll explain the patterns and they value they deliver.

## Resemblance Example

Consider this common scenario: saving some data and alerting subscribers about the new data. 

This scenario contains at two expectations: The saved data should be retrievable as saved *and* that a notification was sent.

The immediate intuition would be to test the scenario with separate assertions for each expectation.
```cs
Assert.Equal(saved, fetched);
Assert.Equal(notificationSent, notificationIntercepted);
```

But multiple assertions lead to problems. The test's error message will only include information from the first failing assertion.

In the previous example, if the retrieved data is incorrect, then we don't know if the notification was sent. 

```cs
Assert.Equal(saved, fetched);
// ! We never get here if the saved data is wrong
Assert.Equal(notificationSent, notificationIntercepted);
```

Flipping the order doesn't solve the problem, it just changes what information we might miss out on.

The Resemblance pattern creates a data structure with the whole context of what's expected from a developer test. Collecting all expectations into one data structure allows a single assertion with all the context we might want about the final test state.

Here's a relatively complete example including a faked dependency.
```cs
public record CreateDataResemblance {
    public CreatedNotification[] RaisedNotifications { get; init; }
    public SomeData DataAfterUpdate { get; init; }
}

[Fact]
public void CreateThrowsNotification(){
    var spyNotifier = new SpyNotifier();
    var sut = new SomeDataAccess(spyNotifier);

    var dataToCreate = GenerateSomeData();
    sut.Create(dataToCreate);

    var expected = new CreateDataResemblance() {
        RaisedNotifications = new []{new CreatedNotification(dataToCreate.Id)},
        DataAfterUpdate = dataToCreate
    };

    var actual = new CreateDataResemblance(){
        CreatedNotification = spyNotifier.Messages,
        DataAfterUpdate = sut.GetById(dataToCreate.Id)
    };

    Assert.Equal(expected, actual);
} 

```


## Likeness Example

The likeness pattern provides a similar value. It standardizes an unruly comparison into a single operation. However, the purpose is different. Resemblance focuses on collecting the whole context of test expectations but likeness focuses on simplifying comparision for data that's awkward to compare. 

A simple example is collections. 
I often write a simple likeness to standardize sneaky assumptions about collections, like the sort order.

```csharp
var getLikeness = (list) => list.OrderBy(x => x.Id)

//...
Assert.Equal(getLikeness(expected), getLikeness(actual))
```

Sorting by Id may seem too simple for a separate method, but the method communicates the intent behind the sort and centralizes changes if the comparison becomes more sophisticated in the future. 

For example, the expected and returned data structures might not be the same, but we still want to compare them in some way

Consider this simple online order example.
```cs
class OrderRequest{
    PaymentInfo paymentInfo;
    CustomerName customerName;
    Address address;
    //...
}
class ConfirmedOrder{
    CustomerName customerName;
    Address address;
    Guid confirmationId;
    //...
}
```

We might want to test that every OrderRequest we place results in a ConfirmedOrder for the same customer, address, etc.

We can simplify this comparison with a likeness
```cs
record OrderDestinationLikeness {
    CustomerName customerName {get; init;}
    Address address {get; init;}

    public static OrderDestinationLikeness FromOrderRequest(OrderRequest request){
        //...
    }
    public static OrderDestinationLikeness FromConfirmedOrder(ConfirmedOrder request){
        //...
    }
}

//...

// Now we can write a simple comparision
Assert.Equal(
    orderRequests.Select(FromOrderRequest), 
    confirmedOrders.Select(FromConfirmedOrder)
);
```

Likenesses can often be reused across many tests too.

### Ad-hoc likeness structures

Creating dedicated types (like `OrderDestinationLikeness`) may still feel too heavy for simple comparisions. For simple comparisions, I often use ad-hoc structures like a tuple or string.

```cs
var dataToLikeness = (data) => (data.Id, data.Name);
var otherDataToLikeness = (otherData) => (otherData.SomethingId, otherData.DisplayName);

//...
Assert.Equal(dataToLikeness(data), otherDataToLikeness(otherData));
```

C#'s positional records also provide a concise syntax for creating likeness types.

```cs
public record OrderDestinationLikeness(CustomerName customerName, Address address);
```

[Records](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record), tuples, and strings work really well for resemblances and likenesses because they use value-based equality. If the structures contain the same values, they're considered equal (as opposed to reference-based equality that check if the object is the same instance). F# users can similarly use [anonymous records](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/anonymous-records). Regular C# classes can still be used in a resemblance or likeness when compared with a [deep comparision library](https://www.nuget.org/packages/CompareNETObjects). 


## Likenesses to build Resemblances

I should note that this approach to likeness using standard data structures (as opposed to `.Equals` overrides) may not be what Mark originally intended, but it seems to be in the same spirit of simplified comparision.

Plus, this data-based approach has a distinct advantage: the data can be used for more than direct comparision. For example, the data can be used to build resemblances. Unlike a boolean equality, the data structures retain their full context when compared in the resemblance or displayed in the test error message.

Likenesses can also optimize their data output for additional outcomes, like improving the readability of test error messages.


## Conclusion

The Resemblance and Likeness patterns improve test readability and error diagnosis by normalizing all the factors of a test assertion into a data structure.
These normalized data structures highlight the author's understanding of the factors considered when evaluating test success.
This improves code clarity and ensures the test error includes the full failure context. This greatly simplifies error diagnosis, especially for the most time-consuming errors like flaky tests or environment-based test failures.