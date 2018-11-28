---
title: Self-Documenting Code
---

>   “There are two ways of constructing a software design: One way is to make it
>   so simple that there are obviously no deficiencies and the other way is to
>   make it so complicated that there are no obvious deficiencies.” – C.A.R.
>   Hoare

Last time we established the importance of understandability, and thus naming.

To recap

-   Code is harder to understand than to write

-   Understandability affects system lifespan

-   We write code for future contributors

However, there is more to understanding code than readability and more to
readability than naming. We want our code to be self-documenting.

Self-documenting code contains sufficient information to understand the code
without external knowledge.

The code is the one guaranteed source for how the program operates, everything
else is out of date the moment the code changes. Good programmers hate repeating
themselves, so the code should be made a sufficient document to avoid
documentation catchup.

Bus Factor
----------

**Bus Factor**: the number of programmers that can get hit by a bus before your
software stops shipping.

The bus factor is a direct result of how many programmers can understand
different parts of the system.

Consider this common scenario, Average Joe wrote the reporting system 5 years
ago. No one understands it or wants to work with it. That is “Joe’s” code. This
makes your bus factor 1. If Joe leaves, that part of the system is dead. Maybe
Joe can train someone... if his departure is foreseen.

Small bus factors are bad, bad for business stability, bad for peaceful
vacations, and bad for ever moving to a new position. On the other hand, any dev
can adopt a self-documented system.

Code Style
----------

Style is consistency in how decisions of the same kind are made throughout the
design (Brooks, Design of Design p. 147). Style reduces time to understanding by
setting consistent expectations.

Naming is important to code style, but we also need to consider choices like

-   Spacing

-   In-code documentation (readmes, comments, doc generator annotations,...)

-   Comment placement

-   Reason for comments

-   File structure

-   Argument and return types

-   Type usage

The list goes on.

Here are some common questions to consider

-   Do you assign types implicitly or explicitly?

-   How do you use white space to convey separation?

-   Does your language use braces? What line do they fall on?

-   If your language doesn’t have encapsulation, how do you indicate internals?

-   We all find answers on the internet, so where do you record sources (I
    usually leave a comment with a link)

-   When do you use getters and setters?

-   Tabs or spaces? (real answer, have the editor handle it)

Whatever you choose, be consistent. I recommend setting up a .editorconfig. It
is a community standard for style rule definition and many editors will enforce
it for you.

Cleverness
----------

Programmers tend to be smart people and like to feel clever.

Stop it.

Cleverness is another word for hard to understand. Djikstra is famous for saying
our greatest limit in programming is the size of our skulls. Your program won’t
run any better if you have the shortest method or cram everything in one line.
Always favor understandability over cleverness.

Tests and Docs
--------------

Sometimes the core code just isn't the best way to understand a problem. Tests,
doc generation decorators, and readmes can be powerful for filling in info.

Tests convey the intended use and expected behavior of the code. A solid testing
suite lets contributors learn by example and interact with the code one piece at
a time.

Doc generation decorators excel at filling in usage clarifications. Many
languages support extending auto-completion tips with info on your own types via
decorators or comments.

Readmes can be a bit dangerous. Don’t be tempted to explain low-level details.
Specifics change quickly and the readme will become misleading. Rather, readmes
excel at helping people get oriented. They provide a starting point or a broad
picture.

TL;DR
-----

Self-documenting code contains sufficient information to understand the code
without external knowledge.

We make code self-documenting with

-   Semantic Naming

-   Consistent Style

-   Tests

-   Clarity over cleverness

Self-documenting code makes teams more flexible, companies more robust, and
vacations more peaceful.

Further Reading
---------------

-   Design of Design, Fred Brooks, Chapter 12

-   Code Complete, Steve McConnell, Most of the book (especially part VII)

-   The Pragmatic Programmer, Andrew Hunt & David Thomas, Section 44: It’s All
    Writing, Section 34: Code that’s easy to test, Section 21: Design by
    Contract

-   The Humble Programmer, Edsger Dijkstra  
    (<https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html>)
