---
date: 2023-01-18
tags: []
title: Concise Notation Matters
---

Of all things, a sci-fi novel recently got me thinking about the importance of notation and how it influences our thinking.
In short, syntax length impacts the kinds and sophistication of ideas.
<!--more-->

The sci-fi book was [Canticle for Leibowitz](https://en.wikipedia.org/wiki/A_Canticle_for_Leibowitz). Some characters discover an ancient document with [sum notation](https://en.wikipedia.org/wiki/Summation#Notation).
They marvel at the concise representation of so much information and wonder at all the ideas that hadn't even considered that might be explored.

I've long learned that we should program *into* langauges in not *in* them. In other words, create your design based on your needs and figure out how the language can achieve it instead of basing your design on available language features. I also have long loved static language. Popular static languages like Java and C# have developed a reputation of lots of "ceremony" or unnecessary syntax to express an idea.
Many have turned to dynamic languages because of this. This is a false dichotomy, however. Static languages can also have low ceremony. [F#](https://fsharp.org/) is a great example.

Still, the concern over ceremony is valid. 

The longer or more effortful an idea is to express, the less likely we are to express it.
Just look at natural languages. Most anything we say often quickly gets a shortened form.
However, programmers can't abbreviate syntax like we do words. Long ideas just don't get expressed as often.
Longer syntax can also take more time to understand, and understandability is one of the most important factors for long-term maintainability of a system.


The [Sapir-Whorf hypothesis](https://en.wikipedia.org/wiki/Linguistic_relativity) suggest that the language we use influences and may be limit the thoughts humans have.

This certainly seems to be important in math and scientific fields. The effectiveness of notation is often related to the growth of ideas.
Ideas can grow more complex by reducing current ideas into more terse communication. I'm thinking of examples like chemical notation. Describing the states and relationships of atoms is much less efficient than the [notation](https://en.wikipedia.org/wiki/Chemical_formula) we use to show elements and bonds. This itself requires the terse shared notation of the periodic table. We've taken chemical notation further with special representations for common combinations, like [Benzine rings](https://en.wikipedia.org/wiki/Benzene). Each of these steps in notation cemented a shared concept in a way that enables more efficient communication, which in turn enables us to reason about more complex ideas.

To clarify, I don't think shorter is always better. Many code understandability violations are made in the name of conciseness. Understandability is of first importance. Conciseness can be an aid understandability, and clear concise notation can lead to new ideas and expressions. However, never be more concise than clear.

<!-- TODO: Give examples of ideas I can express that I couldn't before. Perhaps records for union-likes, unions. Also passing functions and all the typing complexity in c# vs F# -->


## Programming Samples
Here are a few examples where short syntax has effected how I program.

### Unions
F# has union types, which represent a set of alternatives that don't necessarily have the same data.

```fsharp
type PaymentTypes = 
| CreditCard of CardNumber * SecurityCode * Expiration * NameOnCard
| ACH of (AccountNumber * RoutingNumber)
| Paypal of IntentToken
```

C# has no such concept, and the intent of the alternatives is not very clear with traditional class syntax.
Thus, I rarely used union types in my C# even though I like using them in F#.

```cs
class PaymentType{}

class CreditCard : PaymentType{
    public readonly CardNumber CardNumber {get; init;}
    public readonly SecurityCode CVV {get; init;}
    public readonly Expiration ExpirationDate {get; init;}
    public readonly NameOnCard Name {get; init;}

    // constructor isn't strictly necessary, but it helps with concise initialization later on
    public CreditCard(CardNumber cardNumber, SecurityCode cvv, Expiration expirationDate, NameOnCard name){
      //...
    }
}

class ACH : PaymentType{
    public readonly AccountNumber AccountNumber {get; init;}
    public readonly RoutingNumber RoutingNumber {get; init;}
    
    public ACH(AccountNumber accountNumber, RoutingNumber routingNumber){
      //...
    }
}
class Paypal : PaymentType{
    public readonly IntentToken Token {get; init;}

    public Paypal(IntentToken token){
      Token = token;
    }
}
```

However, C# introduced positional records which allow a clear approximation of union types.
Now I often use union-like records in C#.

```cs
record PaymentType{
    public record CreditCard(CardNumber CardNumber, SecurityCode CVV, Expiration ExpirationDate, NameOnCard Name) : PaymentType();
    public record ACH(AccountNumber AccountNumber, RoutingNumber RoutingNumber) : PaymentType();
    public record Paypal(IntentToken Token) : PaymentType();

    private PaymentType(){} // private constructor can prevent derived cases from being defined elsewhere
}
```

Effective pattern matching is also key to concisely consuming union-likes. C# previous would have required a bunch of type checks and casting.
Now it can be done like this
```cs
public void HandlePayment(PaymentType paymentInfo){
    paymentInfo switch {
        CreditCard cardInfo => //...
        ACH checkInfo => //...
        Paypal paypalInfo => //...
    };
}
```

I have a [whole post](https://spencerfarley.com/2021/03/26/unions-in-csharp/) about unions in C#.

### Function Composition

In F#, there is an operator for composing two functions. That is, to create a new function that take the input of a function, passes the output to the next function, and returns the result of the second function.

```fs
let aToB (param: A) : B = //...
let bToC (param: B) : C = //...
let cToD (param: C) : D = //...

let aToD = aToB >> bToC >> cToD
```

Achieving just that last line in C# looks like

```cs
public D AToD(A param){
  return CToD(BToC(AToB(param));
}
```

### Passing functions

F# uses a sophisticated type inference system. As such, function parameters often don't need any explicit typing but remain strongly typed.

This makes it very simple to write functions that compose other functions.

```fsharp
let tryWithFallback fSuccess fError input = 
    try 
        fSuccess input
    with 
    | e ->
        fError input e
```

C# can pass functions as parameters, but infers far fewer types. As such, functions that take other functions tend to be verbose and difficult to read.
As such, it takes a much more compelling case for me to write higher-order functions in C#.

```cs
public TOut TryWithFallback<TIn,TOut>(Func<TIn,TOut> fSuccess, Func<TIn, Exception, TOut> fError, TIn input)
{
    try
    {
        return fSuccess(input);
    }
    catch (Exception e)
    {
        return fError(input, e,);
    }
}
```

This function doesn't make much sense in C#. It's not really better than directly using a try-catch.

However in F#, functions like these [can be composed into very clean and readable pipelines](https://fsharpforfunandprofit.com/rop/).


## Conclusion
In summary, syntax length matters. Ideas that take more effort to express are less likely to be expressed. 
This directly impacts what design concepts we leverage. Advances in clear and concise notation also level up our ability to explore new and even more complex ideas.

<!-- - still believe program into a language not in a language
- Language syntax still matters
- I have a math background. there are no compilers or computers, just symbols and other mathematicians who need to understand what you've written.
  - I've heard said that advances in math often require advances in notation
  - makes sense, since  -->

<!-- - sum notation: clear visual grouping, all info at a glance, puts pattern identity in a way we can do math on it much like we do normal math. Enables a whole new world of reasoning about series. E.g. I can't imagine understanding [generating functions](https://en.wikipedia.org/wiki/Generating_function) without sum notation (one of the tools we can use for finding closed forms of sequences like the fibonacci sequence)

https://en.wikipedia.org/wiki/Linguistic_relativity

Do I reference canticle for leibowitz and how the 


Hmm, maybe make a connection to diminutions and abbreviations. If something is too long, we're less likely to say it.
Things we say often get shortened.

In programming, if there's too much syntax to express an idea, then we won't express it often. It's also more costly to grasp an idea that requires a longer explanation. 



Maybe connect to dynamic programmer complaints about ceremony. I love static typing, but there is a good point about ceremony.
Space and keystrokes have cost. -->

