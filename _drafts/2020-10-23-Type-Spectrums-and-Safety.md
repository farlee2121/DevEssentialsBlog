# Correlated Types Spectrums 

I've recently been learning about type systems, and I realized that structural and dynamic typing often pair while nominal and static type system often pair. Why?

First let's ground ourselves with some definitions

## Nominal vs Structural

**Structual typing**: A type system where "compatibility and equivalence are determined by the type's actual structure or definition and not by other characteristics such as its name or place of declaration" ([source](https://en.wikipedia.org/wiki/Structural_type_system))

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
The two json objects can be used interchangably because they have the same properties. It doens't matter if one is intended as a `Person` class and the other a `Robot` class. Javascript is not completely structural though, since equivalence is reference rather than value-based.

Javascript, python, clojure, and other popular dynamic languages lean on a strong helping structural typing.

**Nominal typing**: A type system where "compatibility and equivalence of data types is determined by explicit declarations and/or the name of the types", and not their members ([source](https://en.wikipedia.org/wiki/Nominal_type_system)).

Nominal typing is what users of Java, C#, Haskell, and many static languages are used to. Two classes are not interchangable even if they have the same members.

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

Nominal and structural typing are opposing properties, though they can certainly be comined in a single language. Tuples are a common example of a structural type that appear in most languages.

Checkout [this article](http://wiki.c2.com/?NominativeAndStructuralTyping) for a more thorough explanation. 

## Dynamic vs Static
**Static typing**: types are checked at compile-time.
**Dynamic typing**: types are checked at run-time.

I think this is fairly common concept. If you want to explore it further, checkout [this article](https://hackernoon.com/i-finally-understand-static-vs-dynamic-typing-and-you-will-too-ad0c2bd0acc7).

## Correlation
Back to my realization that these typing choices seem to be correlated. Is there an inherent relationship between structural and dynamic types and nominal and static?

No. It is entirely possible to have a dynamic type system where types are built at run-time but must be explicitly named and inherited. Similarly, it is possible to have a type system where type relationships are inferred by members, but all types must be determined at run time.

So why, then, is there such a strong corrolation?

I believe it has to do with a trade-off is preference for implicit vs explicit design. Though, I think advocates would generally phrase it "flexibility" vs "safety".

Python is an example of the flexibility side. They've dubbed their combo of dynamic and structural typing as "duck" typing. The idea being that if it quacks like a duck it must be a duck. There is a desire to immediately leverage implicit relationships known to the developer without extra syntax.

Both dynamic and structural types lend themselves to this implicit, run-if-you-can style. The danger here is that no warnings will be thrown if an expected method or property name is changed. Failure is put off util the last possible moment.

The safety side prefers to make their decisions explicit. Changes like renaming shouldn't cause unseen side-effects. If an assumption is violated, then the system should tell you right away.

Both static and nominal types lend themselves to explicit fail-early style. The downside is more verbose syntax and less wiggle room for partially-functional systems.

Each style has its ups and downs. I definitely fall on explicit side for programs larger than simple scripts. 


## A Third Way?
Clojure take a unique approach to structural typing with its spec system. Types are 
  - defined without property names
  - may include functional constraints like numeric range, regular expressions, or explicit valid values
  - Aggregate and access properties by type names

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

Rich Hickey is exploring modifications on this system to combat slight variations on types to meet context specific needs. I'm excited to see where it goes.


## Conclusion
In summary, there is no intrinsic property that couples dynamic and structural or static and nominal type systems. Rather the corrolation appears to be based on a preference for explicit vs implicit design.
