---
date: 2023-06-01
tags: [F#, C#, Scala, Union Types]
title: Scala and C# Approaches to Union Types
---

I've been learning Scala lately, and it turns out that scala union types are sometimes implemented the same way I discovered unions could be imitated in C#.
<!--more-->

For context, union types represent a set of alternative values. They're sometimes known as an OR type or a sum type.

Consider this F# example defining different payment methods 
```fsharp
type PaymentType = 
| CreditCard of CardNumber * SecurityCode * Expiration * NameOnCard 
| ACH of (AccountNumber * RoutingNumber)
| Paypal of IntentToken
```
A `PaymentType` value can be any *single* value of the defined alternatives. We don't know which option we'll be handed, so the value is handled using pattern matching.
For example, this code demonstrates calling a different function for each of the possible payment options

```fsharp
let ProcessPayment paymentInfo = 
    match paymentInfo with
    | CreditCard cardInfo -> handleCard (cardInfo)
    | ACH checkInfo -> handleCheck (checkInfo)
    | Paypal paypalInfo -> handlePaypal (paypalInfo)
```

I [previously discovered](../posts/2021-03-26-Unions-in-CSharp.md) I could mimic F# union behavior 
concisely in C# using the new-ish C# features for [positional record types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record#positional-syntax-for-property-definition) and pattern matching.

Here's a quick C# translation of the previous example
```cs
record PaymentType{
    public record CreditCard(CardNumber CardNumber, SecurityCode CVV, Expiration ExpirationDate, NameOnCard Name) : PaymentType();
    public record ACH(AccountNumber AccountNumber, RoutingNumber RoutingNumber) : PaymentType();
    public record Paypal(IntentToken Token) : PaymentType();

    private PaymentType(){} // a private constructor can prevent derived cases from being defined elsewhere
}

public void HandlePayment(PaymentType paymentInfo){
    paymentInfo switch {
        CreditCard cardInfo => handleCard (cardInfo),
        ACH checkInfo => handleCheck (checkInfo),
        Paypal paypalInfo => handlePaypal (paypalInfo),
    };
}
```

It turns out a similar approach is used in Scala. [This tutorial](https://www.scala-exercises.org/scala_tutorial/structuring_information)
linked from the official Scala site demonstrates a union type as follows.

```Scala
sealed trait Symbol
case class Note(name: String, duration: String, octave: Int) extends Symbol
case class Rest(duration: String) extends Symbol

def symbolDuration(symbol: Symbol): String =
  symbol match {
    case Note(name, duration, octave) => duration
    case Rest(duration) => duration
  }
```

The core of this Scala example is deriving concrete alternative types from an abstract type that can only be inherited within a limited scope.
This is essentially the same as my C# solution. Scala, however, provides full support for destructuring the data and static analysis of pattern matching exhaustiveness (ensuring all cases are covered, e.g. every `PaymentType` is handled).

I'm not sure if Scala changed syntax, but I noticed [another example](https://scastie.scala-lang.org/2plItYkVS4enZCFwBIPnZA) that accomplished 
the same goal by using an enum. The enum-based syntax is closer the F# syntax.

```scala
enum Payment:
  case Card(name: String, digits: Long, expires: Date)
  case PayPal(email: String)

def process(kind: Payment) = kind match
  case Card(name, digits, expires) =>
    s"Processing credit card $name, $digits, $expires"
  case PayPal(email) =>
    s"Processing PayPal account $email"
```

This is facinating and a bit validating. I'm glad my C# approach is good enough that Scala teaches it. 
Perhaps all C# needs to complete its union type experience is better static analyzer support.
