---
date: "2021-09-17T00:00:00Z"
tags: [Clojure, Meta-programming]
title: Macros are not a clear win
aliases:
- /2021/09/17/macros-not-a-clear-win
---

I've been working in Clojure for the better portion of a year now. I came to Clojure very excited to learn more about macros and symbolic programming.
I learned some powerful concepts, but the takeaways were not what I expected. Overall, I found that macros are not a clear win.
<!--more-->

## What are Macros

There are many kinds of macros. The kind I'm talking about in clojure are syntactic macros. In short, this kind of macro is like a function that takes code as input and returns code as output. These code-modifying functions run at compile time instead of runtime. Macros effectively allow language users to extend the language's syntax without modifying the language itself.

The Rust docs have a nice general [introduction to macros](https://doc.rust-lang.org/stable/book/ch19-06-macros.html). A Clojure-specific introduction can be found [here](http://clojure-doc.org/articles/language/macros.html).

## Special syntax is a Double-edged Sword

Macros are very cool. They are a powerful tool, and that both helps and hurts.

On the good side, it allows powerful expression of ideas. Developers can setup their own syntax to communicate their thoughts just the way they want to. This even scales up to adding new features to a language. For example, logic programming is not a natural part of Clojure. However, the logic programming paradigm can be added as a package reference!

The downside, developers can setup their own syntax to communicate their thoughts just the way they want to, even when it isn't sensible. The accumulation of specialized syntaxes adds up to a lot of additional concepts to remember. Adding libraries in clojure is sometimes scary because it means I have to remember yet another specialized syntax for some specific scenario.  Fewer total concepts can be easier to understand than an optimal syntax for each problem. It also hurts that similar syntax can hold different meaning in different contexts.

Clojure is a language founded on the the idea of a few core concepts combined powerfully. It surprises me the ecosystem as a whole has such a tendency toward specialized syntaxes.

In short, procedural macros can dilute syntactic meaning and hurt program understandability.


## Constraints can be Good

Macros also hurt understanding buy raising the ceiling for cleverness. Code that writes code can solve problems that can't be solved otherwise, but it comes at the cost of increased indirection. It also comes with the temptation to write unnecessarily generic code. Both the indirection and deeply abstract problems lead to code that is very difficult to understand and maintain.

The vast options created by macros are also not always a good thing. Constraints sometimes lead to better solutions.

One example is my experience with Clojure unit tests versus F# unit tests. Clojure test libraries lean on macros to define tests like functions and expand them with fixtures and other niceties. The global approach to defining tests pushes the macros to register tests in a global hidden variable to maintain the abstraction. Tests can be reused and operated on with additional macros, but it gets complicated very quickly.

F# doesn't have macros. Libraries, like [Expecto](https://github.com/haf/expecto), instead represent tests as data structures. Tests are defined as lists. Test lists and can be operated on, reused, and aggregated like any other list of data structures. This made [test api](../../posts/2021/2021-02-26-TestApi-in-FSharp.md) rather simple to setup for standard unit tests in F#. It's very easy to reason about how the tests are being reused for all future contributors.

## Conclusion

I am glad to have explored macros. I do think that some amount of compile-time meta-programming is an invaluable tool and boost to productivity. However, macros can hurt understandability by diluting syntax and enabling cleverness. I think understandability is one of the most critical concern for system longevity, and thus would avoid macros unless I absolutely have to use them.

My exposure to different macro systems is still limited. I'd like to explore other macro systems in-depth to see if different constraints or techniques can contain the negative side-effects.
