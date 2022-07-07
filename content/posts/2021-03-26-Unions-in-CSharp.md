---
date: "2021-03-26T00:00:00Z"
tags:
- Functional Programming
- C#
- Union Types
title: Union Types in C#
---

Union types are common in functional languages, but have yet to make it to C# and similar. These types solve a simple and very common problem, data that is one of a finite set of possibilities. Here's we'll look at how to accomplish the same in C#.

## Short version
Record types provide value equality semantics and short definitions. Pattern matching improvements in recent versions make for concise handling.

Example
```cs
record Color{
    public record Red() : Color();
    public record Green() : Color();
    public record Blue() : Color();

    public (int, int, int) ToRGB(){
        return this switch{
            Red r => (255,0,0),
            Green g => (0, 255, 0),
            Blue b => (0,0,255),
        };
    }

    private Color() {} // private constructor can prevent derived cases from being defined elsewhere
}
```

## Unions in F#
First, a short rundown of union types. They're also called sum types and "or" types. They represent a limited set of alternatives. This could be enum-like 

```fsharp
type Particles = 
| Protons
| Neutrons
| Electrons
```

but cases can also come with different data
```fsharp
type PaymentTypes = 
| CreditCard of CardNumber * SecurityCode * Expiration * NameOnCard
| ACH of (AccountNumber * RoutingNumber)
| Paypal of IntentToken
```

The "cases" are all acceptable alternatives from some view. The union type allows us to treat them as one type, and break out cases only when it is important.

Typically the union types is handled with pattern matching.
```fsharp
let ProcessPayment paymentInfo = 
    match paymentInfo with
    | CreditCard cardInfo -> handleCard (cardInfo)
    | ACH checkInfo -> handleCheck (checkInfo)
    | Paypal paypalInfo -> handlePaypal (paypalInfo)
```

## Object-Oriented Equivalent 

The motivation of unions may sound familiar. Unions types are really about polymorphism. 

Polymorphism in OO is usually achieved through inheritance. For example
```cs
class PaymentType{}

class CreditCard : PaymentType{
    public CardNumber CardNumber {get; set;}
    public SecurityCode CVV {get; set;}
    public Expiration ExpirationDate {get; set;}
    public NameOnCard Name {get; set;}
}

class ACH : PaymentType{
    public AccountNumber AccountNumber {get; set;}
    public RoutingNumber RoutingNumber {get; set;}
}
class Paypal : PaymentType{
    public IntentToken Token {get; set;}
}
```

This works, but it has several downsides. 
- We can't limit the number of cases, causing potentially unhandled data
  - UPDATE: We actually can limit the number of cases by making the base class's constructor internal or private. Pattern matching in C# currently will not recognize that limitation, but we can prevent unhandled data and unexpected extension.
- The intent as a set of alternatives isn't as clear
- We can't prevent methods and behavior from being mixed with the data
- Classes have reference equality, but unions usually want value semantics

Some of those cons are really just misplaced features. Interchangeable behaviors is a great design goal, but those are usually driven by interfaces these days. Allowing unforeseen cases can also be a feature, though how it should be handled depends on the situation. 

Overall, the inheritance approach holds little benefit over unions, now that we know coupling data and behavior is a recipe for rigid designs. I find that union types eliminate the vast majority of non-interface inheritance.

## Improvements in C#

C# added pattern matching as of version 7. This makes the inheritance-based union from the last section tenable

```cs
    switch (paymentInfo){
        case CreditCard cardInfo:
            //...
            break;
        case ACH checkInfo:
            //...
            break;
        case Paypal paypalInfo:
            //...
            break;
    }
```

C# 8 improves pattern matching
```cs
paymentInfo switch {
    CreditCard cardInfo => //...
    ACH checkInfo => //...
    Paypal paypalInfo => //...
};
```

C# 9 improves the union definition with positional record definitions, which also include value equality semantics by default
```cs
record PaymentType{
    public record CreditCard(CardNumber CardNumber, SecurityCode CVV, Expiration ExpirationDate, NameOnCard Name) : PaymentType();
    public record ACH(AccountNumber AccountNumber, RoutingNumber RoutingNumber) : PaymentType();
    public record Paypal(IntentToken Token) : PaymentType();
}
```

As of C# 9, that makes the full example code shorter than the original type definition.

```cs
record PaymentType{
    public record CreditCard(CardNumber CardNumber, SecurityCode CVV, Expiration ExpirationDate, NameOnCard Name) : PaymentType();
    public record ACH(AccountNumber AccountNumber, RoutingNumber RoutingNumber) : PaymentType();
    public record Paypal(IntentToken Token) : PaymentType();

    private PaymentType(){} // private constructor can prevent derived cases from being defined elsewhere
}

public void HandlePayment(PaymentType paymentInfo){
    paymentInfo switch {
        CreditCard cardInfo => //...
        ACH checkInfo => //...
        Paypal paypalInfo => //...
    };
}
```

## Summary

There is no true equivalent to union types in C#. However, approximating them with inheritance has greatly improved in recent versions. As of C#9, a combination of positional records and pattern matching make for a concise and pleasant approximation.

