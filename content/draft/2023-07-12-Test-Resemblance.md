---
date: 2023-07-12
tags: [Testing, Design Patterns]
title: Resemblance and Likeness Testing Patterns
---

<!-- Todo: need to think more about my narrative -->
The Resemblance and Likeness patterns increases the readability and observability of developer tests.
<!--more-->

I've been using the [Resemblance](https://blog.ploeh.dk/2012/06/21/TheResemblanceidiom/) and [Likeness](https://blog.ploeh.dk/2012/06/22/ResemblanceandLikeness/) patterns for several years to clarify up my developer tests. They've earned a permanent spot in my toolbox and I use them frequently. Thanks to Mark Seemann for introducing the patterns!

## Pattern Explanations

In short, the Resemblance pattern creates a data structure with the whole context of what's expected from a developer test. Then the test can have a single assertion between the expected and actual versions of that resemblance data structure.

For example, we might expect that creating some data allows us to both fetch that data *and* raises some notification.
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

The similar Likeness pattern creates some standard equality for data that isn't in the right form to compare for the test.

For example, if you want to copy data from one structure to the other but the overall structure isn't the same.
Like if we want to create a reserveration for a list of customers and then check that there is a reservation under each customer
(with a customer Id since these customers have accounts).

```cs

public class Customer{
    public Guid Id;
    public string FirstName;
    public string LastName;
    public ContactInfo PrimaryContact;
    //...
}

public class Reservation {
    public Guid? CustomerId;
    public string ReservedUnderName;
    public DateTime ReservationTime;
    //...
}

public record CustomerReservationLikeness
{
    public Guid CustomerId;
    public string CustomerName;
}

//...
public CustomerReservationLikeness LikenessFromCustomer(Customer customer){
    return new (){
        CustomerId = customer.Id,
        CustomerName = $"{customer.FirstName} {customer.LastName}"
    };
}

public CustomerReservationLikeness LikenessFromReservation(Reservation reservation){
    return new (){
        CustomerId = reservation.CustomerId,
        CustomerName = reservation.ReservedUnderName
    };
}
```

Likeness can also be used for structures that don't compare easily by default.
For example, ordering lists that aren't necessarily ordered.

```csharp
var getLikeness = (list) => list.OrderBy(x => x.Id)

//...
Assert.Equal(getLikeness(expected), getLikeness(actual))
```

One trick I often use is mapping properties I want to compare into a tuple or string.

```cs
var dataToLikeness = (data) => (data.Id, data.Name);
var otherDataToLikeness = (otherData) => (otherData.SomethingId, otherData.DisplayName);

//...
Assert.Equal(dataToLikeness(data), otherDataToLikeness(otherData));
```

[Records](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record) and tuples work really well for resemblances because they use value-based equality. If the structures contain the same values, they're considered equal. F# users can similarly use [anonymous records](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/anonymous-records). Regular C# classes can still be used in a resemblance or likeness when compared with a [deep comparision library](https://www.nuget.org/packages/CompareNETObjects). 

Note that this data standardization version of likeness may not be what Mark originally intended, but it seems to be in the same spirit.

## Value Gained

Resemblance and likeness are both useful because they 
- clarify what the test author was focused on when creating the assertion
- Allow the whole context of expectations for a test to be expressed in one assertion

Expressing all the expectations for a test in one data structure and one assertion improves the reader's understanding
of the design forces at work with the test. It also improves error messages when the test fails.
Instead of just getting whatever data the first failed assertion gives us, we have access to all the differences. 
This reduces the time needed to reproduce and fix errors, especially for flaky failures or failures that vary by environment (i.e. works locally but fails on the build server).

Checking all data in one assertion also applies some pressure toward simpler code. The incentive is to write code where it's easy to get all the context instead of relying on mocks that need to intercept and assert based on calls to the mocks.

It may seem like a lot of extra effort to add data structures just for an assertion in a test. 
However, my experience is the opposite. Many resemblance or likeness structures can be created ad-hoc using structures like tuples.
Many others can be reused between a series of related tests. 
In any case, the reduced complexity of the assertion pays for itself. Reading and modifying the test becomes much faster and less error-prone since the test assertion is clear and clean.

## Conclusion

The Resemblance and Likeness patterns improve test readability and observability by normalizing all the factors of a test assertion into a data structure.
Using this normalized data structure highlights all the factors considered when evaluating test success.
This both improves clarity to the reader, but also ensures we have the full context if the test ever fails. Especially for the most time-consuming errors like flaky tests
or environment-based test failures.