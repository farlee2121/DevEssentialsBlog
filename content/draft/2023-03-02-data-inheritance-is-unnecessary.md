---
date: 2023-03-02
tags: [F#, Scala, Inheritance]
title: Data Inheritance is Unnecessary
---

In short, I've been using F# for several years now and didn't realize that F# record types can't be inherited. 
I think that says inheritance with data members is unnecessary.
<!--more-->

This revelation was triggered by a [Scala tutorial](https://www.scala-exercises.org/scala_tutorial/classes_vs_case_classes)
which pointed out that case classes, the Scala equivalent to record types, can't be inherited. I then checked F# and found the 
same to be true for records.

I've use F# pretty heavily the last few years and never noticed. My designs were never impeded.
Granted, I was separating action and data contracts in C# for about 10 years before I started in F#.

I think languages have latched on to the value of separating actions from data state. Scala, Go, Rust, and other rising languages
support traits, which are basically method-only interfaces which, because of their lack of data and state, can be inherited by a type
ad-hoc and not just when the type is defined.

I also notice that languages splitting action and data contracts aren't featuring inheritance for data types.
Records, case classes, and similar don't support inheritance. There isn't a need. It's easy and simpler to just map data from
one type to another than to deal with statefulness across a hierarchy.

In short, separating data and actions renders data inheritance unnecessary while improving composition for both data and actions. 
"Favor composition over inheritance" led to improvements in our languages themselves. 