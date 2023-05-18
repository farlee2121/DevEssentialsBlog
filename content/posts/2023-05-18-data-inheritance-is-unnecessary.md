---
date: 2023-05-18
tags: [F#, Scala, Inheritance]
title: Data Inheritance is Unnecessary
---

In short, I've been using F# for several years now and didn't realize that F# record types can't be inherited. 
I think this demonstrates that inheritance for data types is unnecessary when actions and data are separated, and it may hint at a larger trend in programming languages.
<!--more-->

This revelation was triggered by a [Scala tutorial](https://www.scala-exercises.org/scala_tutorial/classes_vs_case_classes)
which pointed out that case classes, the Scala equivalent to record types, can't be inherited. I then checked F# and found the 
same to be true for records.

I've use F# pretty heavily the last few years and never noticed. My designs were never impeded.
Granted, I was separating actions and data contracts in C# for almost 10 years before I started in F#.

I think languages have latched on to the value of separating actions from data state. Scala, Go, Rust, and other rising languages
support traits, which are basically method-only interfaces. Because traits lack state, they can be inherited by a type
ad-hoc and not just when the type is defined (though some limitations still apply).

Similarly, more languages are also featuring data-only types that don't allow inheritance.
F# records and case classes are prime examples. Based on my experience, I'd say these types don't support inheritance because there isn't a need. 
It's usually easier and clearer to just map values from one data type to another than to deal with statefulness across an inheritance hierarchy.

Actions, however still benefit from some degree of inheritance or polymorphism. Here I think langauges are also trending to minimized inheritance depth
and eliminating stateful inheritance. Tools like traits and interfaces are strictly type signatures, they include no implementations. 
Langauges also increasingly support pleasent syntax for first-class functions, where functions can be passed as values and any function that fits the type
signature is a valid value. All of these approaches allow interchangable actions without concrete (and stateful) inheritance. 
Traits and first-class functions particularly favor a more compositional style for swapping different actions.

Notice that separating data and actions leads to improved composability for both.

We've seen this kind of language evolution before. [Structured programming](https://en.wikipedia.org/wiki/Structured_programming) eliminated GOTO. The [iterator pattern](https://en.wikipedia.org/wiki/Iterator_pattern) removed indexing issues from loops and eventually folded into language features (i.e. C# `foreach` loops). Some newer languages like Go don't even include traditional for loops. Separating data and actions while limiting inheritance (especially stateful inheritance) could be langauges integrating lessons from "favor composition over inheritance".

In summary, I think langauges are trending toward separated data and actions. Separating data and behavior renders data-type inheritance unnecessary while improving composition for both data and actions. 
This could be part of a larger initiative to "favor composition over inheritance" by restricting inheritance (especially stateful inheritance) through the programming language itself.
