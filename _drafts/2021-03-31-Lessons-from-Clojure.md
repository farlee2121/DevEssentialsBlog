---
layout: post
tags: [Clojure, Retrospective, Meta-programming, Functional]
---

# Lessons From Clojure

Fred Brooks once described elegant design as few ideas combined powerfully. Clojure is a language that lives by that idea. Understanding Clojure improved my understanding of language choices in general. Here I'll highlight some of my learnings.

## Macros
<!-- most important realization from clojure -->
My number one take-away is definitely a better understanding of macros, and in turn symbolic programming.

I previously [pondered compile-time meta-programming](./../_posts/2020-11-20-Meta-programming-and-dynamics.md), wondering why C#, Java, and other static languages I knew didn't have such a concept.

Turns out, many have considered this problem before. The core category of compile-time meta-programming is known as *macros*.

I had known about macros, but my perception of them was limited to  text-substitution macros. Those are only the tip of the iceberg. Procedural and syntactic macros offer much more power.

Clojure is a dialect of Lisp, the language that pioneered symbolic programming. The symbolic paradigm treats the program itself like data. It takes meta-programming to the extreme and allows our program to know as much about itself as we do, both at compile or runtime. 

Symbolic programming extends the programming language itself and addresses a category of problems I've long wrestled with in C#. Problems like generating proxies, decorators, or api clients.

I also recommend [Rust for exploring macros](https://doc.rust-lang.org/book/ch19-06-macros.html). Rust leverages macros to shape high-level language conveniences without compromising safety or security.

<!-- Symbolic programming also cemented the value of expressions over statements.  -->


## Set Semantics + Spec

My next lesson from Clojure expanded my concept of type systems.

Clojure idiomatically uses "set semantics" for compound data types. Instead of classes or records, everything is a dictionary using keywords to differentiate properties. Keywords are a primitive type that represent a unique name like `:address`.

```clj
{
    :name "Anders"
    :phone "555-555-5555"
    :email "example@mail.com"
}
```

Set semantics define a predictable structural typing paradigm. Consumers don't care about the type, they only care that it has the right data.

However, just using set semantics leaves completely open. It forces contracts between components to be implicit.

This is where Clojure.spec saves the day. Spec adds constraints onto keywords and functions. It can provide design-time feedback on a components expectations without having to look at code or limit the non-essential properties of the type.

```clj
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

I recommend [Maybe Not by Rich Hickey](https://www.youtube.com/watch?v=YR5WdGrpoug) for more exploration

## Transactions

My final lesson was about transactions.

I've always seen transactions as an infrastructure concept or implicit design pattern. I'd never thought about them as a possible language feature.

However, Clojure bakes transactions right into the language for [handling mutable data](http://clojure-doc.org/articles/tutorials/introduction.html#reference-types).

This makes sense. Clojure manages immutable data transforms under the hood as a series of changes to an original data structure. In essence, the language data structures are a transaction log.

In fact, [Datomic](https://www.datomic.com/) leverages the same idea to turn Clojure data structures into a transactional database.

This approach makes Clojure and datomic a natural fit for [Event Sourcing](https://docs.microsoft.com/en-us/azure/architecture/patterns/event-sourcing) or cases that benefit from a history of changes and not just the latest state.

<!-- TODO: Transducers? -->

## Summary

Clojure is a lovingly crafted language. It is full of high-concepts that pushed my perception of programming. Macros, set semantics, and transactions were merely the most impactful for me. Clojure is worth a look for learning experience, even if doesn't end up in your daily toolbox.
