---
layout: post
tags: [Clojure, F#]
---

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