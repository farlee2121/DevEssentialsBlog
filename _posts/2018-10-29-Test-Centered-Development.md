---
title: Test-Centered Development
layout: post
tags: [Construction, Dev Essentials, Testing]
excerpt: "In the words of Pragmatic Programmer, “We want to
start testing as soon as we have code.”
Testing changes the way we write code. It forces us to see the code from the
point of the consumer. This makes our code easier to understand and to use."
---

>   “Coding ain’t done ‘til the tests run” - The Pragmatic Programmer

>   “The act of writing a unit test closes a remarkable number of feedback
>   loops, the least of which is the one pertaining to verification of the
>   function” – Robert Martin

Test-Centered Development? Yeah. Test-Driven Development may be a popular term,
but writing tests first is a bit controversial. However, testing as a central
part of development is not. In the words of Pragmatic Programmer, “We want to
start testing as soon as we have code.”

Testing changes the way we write code. It forces us to see the code from the
view of the consumer. This makes our code easier to understand and to use. By
considering usage, we are also confronted with design questions much earlier.
Rigorous testing causes us to clearly confront these design questions and
document them for later users. In the words of Fred Brooks, “An articulated
guess beats an unspoken assumption.” A wrong explicit decision may be checked, a
vague one won’t be.

Testing also pushes better practices. Since we write with intent to test, we are
incentivized to minimize responsibilities and dependencies. This makes testing
easier and is just good design.

Thus, testing is a not a tack-on to make sure you coded correctly, it is an
integral part of the development process.

Development Freedom
-------------------

Writing code to be tested pushes a decoupled design, which also decouples the
way that you code.

Code no longer needs to be written in dependency order. You can start coding at
any level of the call chain. For example, you could start with the top-level
process, mocking out all dependencies and verifying with tests. Now, every
dependency has a clear purpose. Naming, writing, and testing the dependencies
will be easier. There is also less back tracking because the design is verified
incrementally.

However, you don’t have to start with the top-level process. If there is an
especially risky component, write it first. Tests allow you verify it in
isolation before filling in the rest.

Kinds of tests
--------------

A good test suite will lean on many kinds of tests. Here is a quick list of
common testing types.

-   **Unit**: Test as single code component in isolation. They are the bulk of a
    good test suite and the most used while coding.

-   **Integration**: Test multiple code components together. Focused on testing
    aggregated behavior.

-   **Regression**: Verify that all expected behaviors are still present and
    working (have not ‘regressed’). A regression suite may be composed of
    multiple test types.

-   **UI / Behavior**: Script interactions with the GUI to verify expected
    behavior

-   **Performance**: Test the system for metrics such as response times or
    resource usage (memory, storage, etc)

-   **Stress**: Test the system under extreme conditions like low memory, too
    many users, or heavy load.

-   **Usability**: Typically performed as interviews with users. Focused on
    testing ease of use. While not an automated test, but it is essential all
    the same. Frequency of contact between designers/developers and users is a
    major factor of project success.

Automation
----------

The typical commercial software system is too large for one person to
understand, let alone test regularly. Automated testing allows frequent and
thorough testing without major resource investment.

Unlike manual tests, automated tests can, and should, be run daily and with any
code integration. Bugs will be found earlier and be cheaper to fix.

Tighten the net
---------------

A good programmer should only find bugs once. When an error is found, add it to
your test suite. The bug will be caught automatically and never make it to
production again.

This both improves the documentation of your system and ‘tightens the net’.
Essentially, it increases the minimum quality of your software. Over time, the
net gets tighter and tighter until the bugs have no escape.

TL;DR
-----

Testing is a core activity of development. Any time there is code, there should
be tests. They change our perspective to bring clearer and better designed code.
They also set a standard for quality and document the system for future users.

Further Reading
---------------

-   Agile Principles, Patterns, and Practices, Robert Martin, Ch 4

-   The Three Rules of TDD, Robert Martin,
    <https://www.youtube.com/watch?v=AoIfc5NwRks>

-   The Pragmatic Programmer, Andy Hunt and David Thomas, Sections 34, 43

-   Code Complete, Steve McConnell, Ch 22, Ch 5.3
