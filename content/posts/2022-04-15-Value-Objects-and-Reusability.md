---
date: "2022-04-15T00:00:00Z"
tags: [Domain Driven Design]
title: Value Objects and Reuse
aliases:
- /2022/04/15/value-objects-and-reusability
---

Looking for value objects among entity members is one of my favorite lessons from Domain Driven Design. Here's a quick overview.
<!--more-->


I can't count how many times I've seen types overflowing with members, and the members clearly form implicit groups or concepts. Spend a moment identifying implicit concepts in the following `User` example.

```cs
class User{

    string PhoneNumber;
    bool IsPhoneVerified;
    DateTime LastPhoneValidation;

    string Email;
    bool IsEmailVerified;
    DateTime LastEmailValidation;
    
    bool ShouldVerifyMFAWithEmail;
    bool ShouldVerifyMFAWithPhone;


    string FirstName;
    string MiddleName;
    string LastName;
    
    string Street;
    string City;
    string State;
    string Zip;

    float Latitude;
    float Longitude;

    string EmergencyPhone;
}
```

Name, coordinates, and address are easy spots for related property groups. There are also types with implicit expected constraints like phone and email.

The astute reader may also recognize that the `User` example constains implied business rules and states. Namely, probable authentication flows around phone or email.

A fully refactored `User` might look like
```cs
class User{
    VerifiedAuthenticationMethod[] MFAMethodsInPriorityOrder;
    UnverifiedAuthenticationMethod[] PendingAndExpiredMFAMethods;
    
    FullName Name;
    PostalAddress Address;
    PhoneNumber EmergencyPhone;
}
```

The refactored example certainly reads better, but it includes many other benefits.

## Simplified and Centralized Operations

These implicit value groups, like address, maybe seem fairly minor, but their cost can add up fast.

These implicit groups are one conceptual whole. Splitting them across multiple members of a parent harms understanding. 

Conceptual units are also likely to be modified together and passed together. Common operations on these concepts are hard to centralize when their components directly live on various parent types. Explicitly grouping related fields into a semantic type improves understanding and simplifies operations on the conceptual unit.

Concepts given their own type are easier to operate on and more likely to grow their own set of operations. Operations like formatting, validation, handling missing data, comparison, and copying can be centralized instead of littered around the code.

## Reduced defensive programming

Creating a value type is beneficial even for concepts with only a single member.

Consider members like phone and email. These members clearly have implicit content expectations (invariants), but we can't guarantee they are enforced when they're stored in a primitive type like string. This forces defensive validation every time the value is used. This scenario is known as the [primitive obsession smell](https://blog.ploeh.dk/2011/05/25/DesignSmellPrimitiveObsession/). 

Creating a value type for these concepts allows us to enforce invariants when the type is created and avoid scattered validation. We can work with values, like phone numbers, never worrying if their contents meet expectations.

```cs
class PhoneNumber{
    private string phoneNumber;

    private PhoneNumber(string phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    public static Result<PhoneNumber, PhoneValidationError> ParseFromString(string phoneNumber){
        PhoneValidationError? validationResult = Validate(phoneNumber);
        if(validationResult != null) return Result.Fail(validationResult);
        else return Result.Ok(new PhoneNumber(lat, long));
    }

    private PhoneValidationError? Validate(string phoneNumber){
        // probably some regex...
    }

    public string GetAreaCode(){
        // ...
    }
    public string GetCountryCode(){
        // ...
    }
}
```

## Domain reasoning

Some concepts will be obvious like phone, name, or address. However, others may not be. I've found analyzing entity properties for sub-concepts leads me to discover domain concepts I hadn't considered before. It primes me to better understand the nature of the problem I'm working on and how users reason about the process I'm encoding in software. 

Calling out domain concepts has a cumulative effect. The added clarity surfaces new domain concepts that couldn't be seen through the details before. It also allows us to start reasoning about our toolbox of operations on each domain concept separate from its parents. It makes it easier to consider options like, say, verifying all addresses with the postal service or managing eventual need for phone numbers country codes. 


## Enforcing implicit rules

Domain concepts aren't limited to simple data values. Value types can also encode values with associated domain state.

For example, the `User` example constains authentication flows around phone or email.

The original `User` sample spreads these rules over a series of values and flags 

```cs
string Email;
bool IsEmailVerified;
DateTime LastEmailValidation;

bool ShouldVerifyMFAWithEmail;

string PhoneNumber;
bool IsPhoneVerified;
DateTime LastPhoneValidation;
bool ShouldVerifyMFAWithPhone;
```

The refactored example clarifies and enforces these rules with only two members
```cs
VerifiedAuthenticationMethod[] MFAMethodsInPriorityOrder;
UnverifiedAuthenticationMethod[] PendingAndExpiredMFAMethods;
```

The new representation is clearer, less prone to error, and is more flexible to support new types of verification.


Scott Wlaschin explains how to model these implicit rules and other scenarios with types in his book [Domain Modeling Made Functional](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional). Shorter versions of the idea are available in his blog post series [Designing With Types](https://fsharpforfunandprofit.com/posts/designing-with-types-intro/) or his talk [Domain Modeling Made Functional](https://www.youtube.com/watch?v=Up7LcbGZFuo&ab_channel=NDCConferences).

## Conclusion

Domain Driven Design encourages us to collect latent concepts in our entity properties into explicit types. This practice clarifies code, reduces defensive programming, increases code reuse, and clears the way for deeper domain understanding. The most common targets for this practice are semantically grouped values, values with semantic invariants, and even values with associated domain states.

I highly recommend further exploration with Scott Wlaschin's works
- [Domain Modeling Made Functional](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional) (book)
- [Designing With Types](https://fsharpforfunandprofit.com/posts/designing-with-types-intro/) (blog post) 
- [Domain Modeling Made Functional](https://www.youtube.com/watch?v=Up7LcbGZFuo&ab_channel=NDCConferences) (presentation)


<!-- ```cs
class GeoCoordinate{

    float Latitude;
    float Longitude;

    private GeoCoordinate(double lat, double long){
        // !!! constructor is private
        this.Latitude = lat;
        this.Longitude = long;
    }
    public static Result<GeoCoordinate, FooError> FromLatLong(double lat, double long){
        FooError? validationResult = Validate(lat, long);
        if(validationResult != null) return Result.Fail(validationResult);
        else return Result.Ok(new GeoCordinate(lat, long));
    }
    public FooError? Validate(double lat, double long){
        // validation here...
    }
}

class PostalAddress{
    string Street;
    string City;
    string State;
    string Zip;

    // similar validation, construction, etc

    public static GeoCoordinate ToCoordinates(PostalAddress address){
        // some implementation...
    }
}
``` -->