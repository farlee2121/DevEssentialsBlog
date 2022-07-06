---
date: "2021-05-14T00:00:00Z"
tags:
- Clojure
- Retrospective
- Meta-programming
- Functional
---

# Lessons From Clojure

Fred Brooks once described elegant design as few ideas combined powerfully. Clojure is a language that lives by that idea. Understanding Clojure improved my understanding of language choices in general. Here I'll highlight some of my learnings.

## Macros

My number one take-away is a better understanding of macros, and in turn symbolic programming.

I previously [pondered](./../posts/2020-11-20-Meta-programming-and-dynamics.md), why C#, Java, and other languages I knew didn't have compile-time meta-programming.

Turns out, many have considered this problem before. The core category of compile-time meta-programming is known as *macros*.

I had known about macros, but my perception was limited to text-substitution macros. Those are only the tip of the iceberg. Procedural and syntactic macros offer much more power.

Clojure is a dialect of Lisp, the language that pioneered symbolic programming. Symbolic programming treats the program itself like data. It takes meta-programming to the extreme and allows our program to know as much about itself as we do, both at compile or runtime. 

Symbolic programming extends the programming language itself and addresses a category of problems I've long wrestled with in C#. Problems like generating proxies, decorators, or api clients.

I also recommend [Rust for exploring macros](https://doc.rust-lang.org/book/ch19-06-macros.html). Rust leverages macros to shape high-level language conveniences without compromising safety or security.

<!-- Symbolic programming also cemented the value of expressions over statements.  -->


## Set Semantics + Spec

My next lesson from Clojure expanded my concept of type systems.

Clojure idiomatically uses "set semantics" for compound data types. Instead of classes or records, everything is a dictionary using keywords to differentiate properties. Keywords are a primitive type that represent a unique name like `:address`.

```clojure
;; a dictionary of data
{
    :name "Anders"
    :phone "555-555-5555"
    :email "example@mail.com"
}
```

Set semantics define a predictable structural typing paradigm. Consumers don't care about the type, they only care that it has the right data.

However, set semantics alone leaves our typing completely open. It forces contracts between components to be implicit.

This is where Clojure.spec saves the day. Spec adds constraints onto keywords and functions. It can provide design-time feedback on component expectations without having to look at code or limit the non-essential properties of the type.

```clojure
;; phone must match regex
(s/def :phone #(re-matches #"[\d{3}-\d{3}-\d{4}" %))
;; email must match regex
(s/def :email #(re-matches #"\w+@\w+\.[a-zA-Z]+" %))
;; name must be a string between 0 and 100 characters
(s/def :name (s/and 
    string?
    #(< 0 (count %))
    #(< (count %) 100)
))
(s/def :person (s/keys :req [
    :name
    :phone
    :email
]))
```

This is true design-by-contract and also follows the Open-Closed principle. It allows each component to guarantee it's expectations clearly without restricting callers to bespoke types.

These ideas are flexible enough to also power the edn data format and Datomic database system.

I recommend [Maybe Not by Rich Hickey](https://www.youtube.com/watch?v=YR5WdGrpoug) for more exploration.

## Transactions

My final lesson was about transactions.

I've always seen transactions as an infrastructure concept or an implicit design pattern. I'd never thought about them as a possible language feature.

However, Clojure bakes transactions right into the language for [handling mutable data](http://clojure-doc.org/articles/tutorials/introduction.html#reference-types).

This makes sense. Clojure manages immutable data transforms under the hood as a series of changes to an original data structure. In essence, clojure's data structures are a transaction log.

In fact, [Datomic](https://www.datomic.com/) leverages the same idea to turn Clojure data structures into a transactional database.

This approach makes Clojure and datomic a natural fit for [Event Sourcing](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) or cases that benefit from a history of changes and not just the latest state.

<!-- TODO: Transducers? -->

## Summary

Clojure is a lovingly crafted language. It is full of high-concepts that pushed my perception of programming. Macros, set semantics, and transactions were merely the most impactful for me. Clojure is worth a look for learning experience, even if doesn't end up in your daily toolbox.



<!-- 
Secret Bonus: Downsides of clojure
- I spend a lot of time wresting with errors that would immediately raise type errors in a static language.
  - the system feels kinda like building with sand. I'm never quite sure when something will stay in place and I'm never quite sure if i've satisfied the needs of what i'm calling. 
  - Admittedly, this could be address with a different tooling approach around spec
- I don't like the style conventions
  - i've spent less time counting parentheses in the whole rest of my career than in my bit with clojure
  - It's like the clojure community read ch 31 of code complete and chose all the styles it recommends against: aligning continuations a variable amount aligning right side of statements, piling up expression end markers on one line
    - It makes it hard to read and edit
- Arcane and short naming is conventional
- The community seems to like cleverness more than clarity
- There is a tendency to rebuild things
  - this is partially because the macro system is powerful enough to make building significant extensions easy (which is cool)
  - It also means there are a lot of different ways to do one thing. For example, it took me so long to figure out the different project management paradigms
- Tooling and documentation are loose
  - repl drives a lot of the tooling, but the repl is not a substitute for tests. REPL state can build up not reflecting the real system state. It also provide safety as the system changes, and clojure already has reduced safety because there is no type checking. It's easy to make small changes that cause subtle breaks  


I think that the use of commands and events reduces the benefit of set semantics. The commands and events act like selection from the schema. A global schema is a bit of a lie anyway. There are only local selections. The actual data could be split across multiple sources
- It is definitely easier to validate fully qualified key maps
  - maybe type providers can fix this for me in F#? Avoid runtime cost but still use type reflection instead of manual mapping
 -->