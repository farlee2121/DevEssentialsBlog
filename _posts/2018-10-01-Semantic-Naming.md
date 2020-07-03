---
layout: post
tags: [Construction, Dev Essentials, Naming, Code Style, Readability]
excerpt: "Who do we write code for? This question is not often 
considered, and so the answer is usually nobody. Thus, nobody is about who can understand and change the code."
---
# Semantic Naming

*There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors. - Phil Karlton*

Who do we write code for? This question is not often not
considered, and so the answer is usually nobody. Thus, nobody is who understands the code.

Naming doesn’t seem like a complicated activity at first blush. However, maintainability and comprehensibility are core concerns of software development (Parnas, On the Criteria for Decomposition...) and naming is deeply tied to how we understand our programs.

If you need evidence, studies show code is significantly more difficult to understand than it is to write. Humans can only understand about 400 lines of code per hour (Smart Bear Study).

Further, programs are (usually) changed by many collaborators over time. In a system with a non-trivial life span, code only gets one fresh write, but  will be edited many times. Thus, we aren’t writing code for the compiler, **we write code for future contributors** (Patricia Aas, .NET Rocks 1586).

Bad Names
---------

Bad names and bad code go hand in hand. Code is hard to name when it does too much or has muddled purpose.

Bad names also stem from a mis-prioritization of shortness over clarity. Shortness is good, but a name should never be more short than clear.

You’ve probably seen names like

| **Examples**            | **Flaw**                                                                                                                                       |
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| ManageController, Count | The name is ambiguous. What is being managed? What is being counted?                                                                           |
| x, l, or mc, aoc        | The name has no meaning. Only the writer or, possibly, someone very familiar with the problem has any idea what these mean                     |
| AliasEngine             | This could be good if aliasing has a clear definition in your system. In my case, it was actually normalizing data, which makes it a bad name. |
| dim, std, exe           | These abbreviations have multiple meanings and could be misleading.                                                                            |

In general, bad names tend to be

-   Vague

-   Inconsistent

-   Misleading

Good names
----------

Fortunately, a lot of work has been put into studying good names and creating naming conventions.

**Semantic**: The most important purpose of a name is to convey meaning. The name should clearly convey the purpose of the component. Think about how outsiders would read your code. Any reader should be able to intuit purpose with little or no explanation.

An especially egregious enemy of understandability is variable reuse. If an operation changes the use of a variable, then its meaning has changed, and it should have a new name. For example, if you have a list of users and you order it by name, it now serves different purpose and needs a new name.

**Be consistent**: The human brain loves patterns. It loves them so much that it invents them when there are none. Style in names can mean casing, prefixes, ordering, terms for a concept, and more. Consistency is also about how names relate. If you have a method named ‘On’, you should probably have one named ‘Off’.

Give your brain what it wants, consistent naming style will mean less time spent parsing code.

**Don’t be afraid of long(ish) names**: Programs with average name lengths between 10-16 characters take the least time to debug. Those in the 8-20 char range are nearly as good. However, problems arise with shorter names (Code Complete p. 262-263).

**Consider your scale**: Names should be clear for the level of abstraction. For example, a variable is a value and might care about order or type. A function, however, is focused on the action accomplished and a module is concerned about the high-level design decision it centralizes.

E.g.

Variable: usersByName, pageRowCount

Method: GetActiveUsers, AddRow,

Module: UserDirectoryService, TableFacade

**Mind special names**: Many names carry special meaning, such as language keywords or established patterns. Respect the original intent as much as possible and avoid naming conflicts.

E.g. foreach isn’t a valid variable name

E.g. Id should only be used as a unique identifier  
DoThingCommand should follow the Command pattern  
FK_name indicates a foreign key

**Units**: If you are storing a value with a type that doesn’t convey units, specify the units in the name. (E.g. int lengthInInches)

### Common Patterns

There are many good naming styles, what matters is that you pick one and stick with it. Here are some common styles.

Pascal Casing: Every word is capitalized (e.g. MethodName). Often used for class and method names.

Camel Casing: Every word, except the first is capitalized (e.g. variableName). Often used for variable names.

Underscores: Leading or double underscores (e.g. \_privateVariable, \__privateMethod__) are often used to indicate private or internal members

Underscore or Dash Separation: some languages prefer to separate words with a delimiter rather than with casing (e.g. python_name, css-class-name)

I Prefix: often used to indicate an interface

Boolean Names: Start Boolean names with Is or Can (e.g. IsMapAvailble, CanDeleteUser)

TL;DR
-----

Understandable code is a primary concern of programmers and naming is at its core. There are many established tricks and styles. Whatever your preference, pick a consistent style where clarity (not shortness) is the most important factor.

Further Reading / Resources
---------------------------

- Code Complete, Steve McConnell (especially Ch 11 The Power of Variable Names, Ch 9 Pseudocode Programming Process)

- .NET Rocks episode 1586 <https://www.dotnetrocks.com/?show=1586>

- Smart Bear Study
    <https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/>
