---
date: "2020-12-04T00:00:00Z"
tags:
- Language properties
- Type systems
title: Predictability and Correlated Type Systems 
---

I've recently been learning about type systems, and I realized that structural and dynamic typing often pair while nominal and static type system often pair. Why?

First let's ground ourselves with some definitions

## Nominal vs Structural

**Structural typing**: A type system where "compatibility and equivalence are determined by the type's actual structure or definition and not by other characteristics such as its name or place of declaration" ([source](https://en.wikipedia.org/wiki/Structural_type_system))

A familiar example of structural typing would be JSON. Consider 
```json
{
  "name": "bob",
  "age": 30
}

{
  "name": "Gigatron",
  "age": 5
}
```
The two json objects can be used interchangeably because they have the same properties. It doesn't matter if one is intended as a `Person` class and the other a `Robot` class.

Javascript is not completely structural though, since equivalence is reference-based rather than structure-based.

Javascript, python, clojure, and other popular dynamic languages lean on a strong helping structural typing.

**Nominal typing**: A type system where "compatibility and equivalence of data types is determined by explicit declarations and/or the name of the types", and not their members ([source](https://en.wikipedia.org/wiki/Nominal_type_system)).

In nominal typing two classes are not interchangeable even if they have the same members. This is what users of Java, C#, Haskell, and many static languages are used to.

```cs
class Person{
  string Name;
  int Age;
}
class Robot{
  string Name;
  int Age;
}

// typeof(Person) != typeof(Robot)
```

Nominal and structural typing are opposing properties, though they can certainly be combined in a single language. For example, tuples are a common structural type that appears in most languages.

Checkout [this article](http://wiki.c2.com/?NominativeAndStructuralTyping) for a more thorough explanation. 

## Dynamic vs Static
**Static typing**: types are checked at compile-time.

**Dynamic typing**: types are checked at run-time.

I think this is fairly common concept. If you want to explore it further, checkout [this article](https://hackernoon.com/i-finally-understand-static-vs-dynamic-typing-and-you-will-too-ad0c2bd0acc7).

## Correlation
Back to my realization that these typing choices seem to be correlated.

Is there an inherent relationship between structural and dynamic types and nominal and static?

No. It is entirely possible to have a dynamic type system where types are built at run-time but must be explicitly named and inherited. Similarly, it is possible to have a type system where type relationships are inferred by members, but all types must be determined at compile-time.

So why, then, is there such a strong correlation?

I believe it has to do with a trade-off is preference for minimal specification vs predictability. Though, I think advocates would generally phrase it "flexibility" vs "safety".

Python is an example of the "flexibility" side. Python dubbed their combo of dynamic and structural typing as "duck" typing. The idea being that if it quacks like a duck it must be a duck. There is a desire to immediately leverage implicit relationships known to the developer without extra syntax.

Both dynamic and structural types lend themselves to this implicit, run-if-you-can style. The danger here is that no warnings will be thrown if an expected method or property name is changed. Failure is put off util the last possible moment. This make it hard to discover partially mis-specified system, but means you can still run all the other paths even if something is broken.

The predictability side prefers to make their decisions explicit. Changes like renaming shouldn't cause unseen side-effects. If an assumption is violated, then the system should tell you right away.

Both static and nominal types lend themselves to explicit fail-early style. The downside is more verbose syntax and less wiggle room for partially-functioning systems.

Each style has its ups and downs. I definitely fall on explicit side for programs larger than simple scripts. 

## Predictability and General Type Properties
Inspired by a [Scott Wlaschin talk](https://youtu.be/KPa8Yw_Navk?t=1862), I realized that this relationship extends to many language properties

| More Predictable | Less Predictable |
|------------------|---------------- |
| Nominal typing | Structural typing
| Strong typing | Weak typing
| Static typing | Dynamic Typing
| Immutability | Mutability
| Managed Memory | pointers and memory allocation
| Structured programming | gotos 

## Another Way?
Clojure take a unique approach to structural typing with its spec system. 
  - Types are defined without property names
  - Each type may include functional constraints like numeric range, regular expressions, or explicit valid values
  - Values are aggregated and accessed by their type names

```clojure
;; lat is a float between -90 and 90 
(s/def ::lat (s/and float? #(<= -90 %) #(<= % 90))) 
;; lon is a float between -180 and 180
(s/def ::lon (s/and float? #(<= -180 %) #(<= % 180)))
;; a coordinate should have a lat and a lon 
(s/def ::coordinate (s/keys :req [::lat ::lon]))

(def yosemiteCoords {::lat 37.748837 ::long -119.58723})

;; print the latitude
(print (::lat yosemiteCoords)) 
```

This is both structural and rigorously communicates contractual assumptions and guarantees. It eliminates the sneakiest error of structural typing by eliminating property names and referencing values by type. While Clojure validates these constraints dynamically, there is no reason it the same system couldn't work statically.

The Clojure team is exploring modifications on this system to combat the proliferation of types, where many slight variations on types are created to meet context specific needs. I'm excited to see where it goes.


## Conclusion
In summary, there is no intrinsic property that couples dynamic and structural or static and nominal type systems. Rather the correlation appears to be based on a preference for predictable vs implicit design, and the duality can be applied to many language properties.


<!-- the predictability verbiage was inspired by Scott Wlaschin https://youtu.be/KPa8Yw_Navk?t=1862 -->