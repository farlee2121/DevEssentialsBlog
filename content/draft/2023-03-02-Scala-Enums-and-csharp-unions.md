---
date: 2023-03-02
tags: [F#, C#, Scala, Union Types]
title: Scala Enums and C# Union Similarity
---

I've been learning Scala lately, and it turns scala union types are sometimes done the same way I discovered for C#.
<!--more-->

For reference, F# has union types that represent a set of strict alternatives.

```fsharp
type PaymentTypes = 
| CreditCard of CardNumber * SecurityCode * Expiration * NameOnCard
| ACH of (AccountNumber * RoutingNumber)
| Paypal of IntentToken
```
A value can be any single value of the alternatives and then unpacked using pattern matching.

```fsharp
let ProcessPayment paymentInfo = 
    match paymentInfo with
    | CreditCard cardInfo -> handleCard (cardInfo)
    | ACH checkInfo -> handleCheck (checkInfo)
    | Paypal paypalInfo -> handlePaypal (paypalInfo)
```

I [previously discovered](../posts/2021-03-26-Unions-in-CSharp.md) I could mimic F# union behavior 
concisely in C# using the new-ish C# features for record types and pattern matching.

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

The core of this Scala example is deriving concrete types from an abstract type that can only be inherited within a limited scope.
This is essentially the same as my C# solution. Scala, however, provides full pattern matching exhaustiveness support and destructuring.

I'm not sure if Scala changed syntax, but I noticed [another example](https://scastie.scala-lang.org/2plItYkVS4enZCFwBIPnZA) that accomplished 
the same using only an enum. The enum-based syntax is closer the F# syntax.

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
Perhaps all C# needs to complete it's union type experience is better static analyzer support.
