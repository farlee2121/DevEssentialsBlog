---
layout: post
tags: [Domain Driven Design]
---

# Value Objects and Reuse

Looking for value objects in entity properties is one of my favorite lessons from Domain Driven Design. Here's a quick overview.


I can't count how many times I've seen types overflowing with properties, and the properties clearly have implicit groups

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

Name and Address are easy spots for related property groups. These implicit groups seem fairly minor, but their cost can add up fast.
Common operations on these concepts are hard to centralize when their components directly live on different parent types.
Explicitly grouping concepts into their own type allows us to build up an operation set on those types. Operations like formatting, validation, handling missing data, comparison, and copying avoid being scattered around the code.

Even for concepts with only a single member, creating a value type is often beneficial. Consider members like phone and email. These members clearly have implicit content expectations (invariants), but we can't guarantee they are enforced. This forces us to validate those invariants defensively every time we use the value. Creating a value type allows us to enforce invariants when the type is created and avoid scattered validation. This scenario is known as the [primitive obsession smell](https://blog.ploeh.dk/2011/05/25/DesignSmellPrimitiveObsession/).

In both cases, representing the concept with a type also allows us to start reasoning about our toolbox of operations on that type. It makes it easier to consider options like, say, verifying all addresses with the postal service. 

Phone, name, and address may be obvious, but I've found that looking for related properties helps me discover domain concepts I hadn't considered before. It primes me to better understand the nature of the problem I'm working on and how users reason about the process.

The astute reader may also recognize that the `User` example constains implied business rules and states. For example, probable authentication flows around phone or email.
Scott Wlaschin explains how to model these implicit rules and other scenarios with types in his book [Domain Modeling Made Functional](https://fsharpforfunandprofit.com/books/#domain-modeling-made-functional). Shorter versions of the idea are available in his blog post series [Designing With Types](https://fsharpforfunandprofit.com/posts/designing-with-types-intro/) or his talk [Domain Modeling Made Functional](https://www.youtube.com/watch?v=Up7LcbGZFuo&ab_channel=NDCConferences).


