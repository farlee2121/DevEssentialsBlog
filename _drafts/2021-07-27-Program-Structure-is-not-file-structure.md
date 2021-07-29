---
layout: post
tags: [Clojure, F#, Program Structure]
---

# Program Structure is not File Structure

Naming is one of the most important activities in programming. Names are the primary vehicle for communicating intent and making code understandable.
Names haves some sneaky counterparts: scope and context. I argue that our tools for scope and context impact how good our naming can be, and file-based modules are not a sufficient tool for organizing global names.

I previously [wrote about](./TODO) a specific encounter with this trouble in Clojure. However, I think the topic deserves a more general exploration.

## Global names

<!-- 
NOTE: I like all this, but It ended up being too much for this post

To understand what's really going on here we need to understand names, and how they relate to our programs.

Names are really about human interaction with a program.
- Names allow us to refer to data, types, actions, or any other component
- These references weave together into larger concepts, which we might also name for building even larger concepts
- Names communicate intent without digging into the details.

Computers, however, don't understand intent. Names in a program must be unambiguous to the compiler. If they aren't, we can't predict how a program would run, and that's bad. 

However, ensuring no two variables, functions, types, or other names conflict in a program is not reasonable. Objective-C is somewhat famous for for having a single global namespace, and it leads to all kinds of un-intuitive naming schemes ([source](https://nshipster.com/namespacing/), [source](https://stackoverflow.com/questions/5842017/namespaces-and-objective-c)). 

Fortunately, we have a variety of tools for resolving conflicts to keep naming easy. Two key categories are global and local names.
-->

Names broadly split into local and global names.

Local names are restricted by some scope. For example, names are often local to some function. Any names defined in the function take precedence over the name name in a higher scope, but also are not accessible in any higher scopes. We only have to consider the single function to understand if there are conflict. This keeps naming simple and intuitive at the small scale. Local names don't factor into overall program structure.

Global names can be accessed by any consumer, in or out of the program. Think of it like an API. Exposing a public endpoint is necessary to let others use it. However, any names in the global namespace must be unique. Not just unique within it's own code base, but unique across all programs that may reference it.

## Namespaces

Namespaces are the primary tool for organizing global names. In short, namespaces  define a hierarchy of global contexts. These contexts allow us to lessen the gap with local names. We can provide context and uniqueness via namespace layers, and keep the names within the namespace simple.

For example `System.Text.Json` and `System.Console`. Just by reading the namespace, you can guess what kinds of code lives in each. They both belong to basic system functions, but their code clearly wouldn't always be used together. Both might reasonably contain a `Format` function, but we would expect very different behavior from each.

Objective-C is somewhat famous for having only a single global namespace, and it leads to all kinds of long and un-intuitive naming schemes ([source](https://nshipster.com/namespacing/), [source](https://stackoverflow.com/questions/5842017/namespaces-and-objective-c)).

## Global Name Organization is Program Structure

I'd argue the organization of global names *is* the program structure.

A consumer importing code doesn't know about the files. They only know about how the names are organized. Consider the troubles of Objective-C. Programmers split Objective-c code into separate files, but that didn't prevent confusion and conflict. The files don't provide context to consumers.

Consider an API. Consumers of the API shouldn't know the file structure of the program. The organization of endpoints in the API is the only structure that matters to them. 

## File-Structure still important

I don't intend to downplay file organization. It effects possible package boundaries for separate deployments. It effects source control conflicts, easy of code location, and possibly even team ownership.

The file division of code is also program structure, but in a very different way. The name organization matters to consumers of code, while the file structure matters to maintainers. Often, the same group both consumes and maintains code, which may blur the difference between the two structures.


## File-based Modules Limit program structure
- as discussed before. It interferes

- lack of relative access destroys the context of a name. (Though clojure alias system can recover it. the imports are just annoyingly verbose )


<!-- I can use Objective-C as an example. The file split didn't matter, what made it hard to reuse code was the single global namespace -->


<!-- less flexible namespacing really translates to less flexible naming, less control over context, less flexible programs. Let computers handle the reference tracking. They're good at it. I'd rather have tools for communicating semantics and intent as clearly as possible -->


- consider talking about lack of namespacing in objective-c and the horrid mess it created for iOS development
  - no shortage of complaints out there , https://stackoverflow.com/questions/5842017/namespaces-and-objective-c
- need to setup enough understanding of naming to get my problem
  - broadly: global or "public" names that can be accessed by anyone and names that are limited to some kind of scope. Mostly determined by code blocks like the internals of a function, internals of a class.
  - scope-limited names can be less formal. Potential name collisions are less likely, easier to notice, and we can rename symbols without worrying about missed usages.
  - Global names need to consider conflicts with all code in the program. Names must be changed carefully. It is much more difficult to ensure all uses are renamed because uses might live in completely separate programs. Renaming is often handled with a multi-phase deprecation.
  - Objetive-C somewhat famous for having only a single global namespace (no global sub-spaces like MyCompany.component), so every 
- I come from .net with pretty robust namespacing
- working in file-based module systems like python and clojure worsens my code
  - higher barrier to creating the divisions I see
  - less control over the story my code tells.
- F# the best I've experienced so far is F#
- Good namespace paradigms lower the challenge gap between local and global names (let us define the names clearly without trying to guess every context the name will be used)
  - the namespace layers may be part of a good name. The context may require more or less of the full name in order to stay clear and readable

todo: also want relative references, access sub-namespaces of imported namespaces or at least under a namespace alias (that would reduce collisions). 

Some potential cons?
- to keep open, there might be changes that impact a file that are not in the file and are not explicitly referenced (but are in the same namespace)

Summary conceptual program structure != file structure. File-based module systems force these concepts together artificially.


Python is also file-based modules, but does have * importing



Context determines how we interpret names, and how flexible naming can be.


Key point: I love the module system of F#. I really miss it in clojure
I want minimal inhibition to mimic my mental divisions in the code structure.

The module system provides an open way to categorize code within a file.

The way namespaces are tied to files in clojure forces me to 


May be possible, but haven't been clear so far. Haven't seen these values in use in clojure

Enumeration of issues
- wanting to split files, but import together
  - A large client with many actions. Don't want a bunch of almost identical imports, but want actions modularized for easy access
- want to share a file, but group into sub namespaces
  - Often separate out sub-concerns like validation or actions on a particular type in the larger feature. I want them all together though to tell a single story.



C# is similar to f# but not as good. The conciseness and expression focus, and immutability of F# code makes it much easier to tell a story in a single file without overwhelming the reader than C#.