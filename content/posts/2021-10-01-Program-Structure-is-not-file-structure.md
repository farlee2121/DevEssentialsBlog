---
date: "2021-10-01T00:00:00Z"
tags:
- Clojure
- F#
- Program Structure
title: Program Structure is not File Structure
---

Naming is one of the most important activities in programming. Names are the primary vehicle for communicating intent and making code understandable.
Names haves some sneaky counterparts: scope and context. I argue that our tools for scope and context impact how good our naming can be, and file-based modules force coupling between concerns that inhibit global name organization.

I previously [wrote about](../posts/2021-09-24-Clojure-inhibits-code-grouping.md) a specific encounter with this trouble in Clojure. However, I think the topic deserves a more general exploration.

## Global names

Names broadly split into local names and global names.

Local names are restricted by some scope. For example, names are often local to some function. Any names defined in the function take precedence over the name name in a higher scope, but also are not accessible in any higher scopes. We only have to consider the single function for potential name conflicts. This keeps naming simple and intuitive at the small scale. Renaming is also fairly safe.

Local names don't factor into overall program structure.
```cs
public void ExampleFunction(){
  int localName = 5;
}

public void Example2(){
  int copy = localName; // !!! compilation error, "localName" not defined
}
```



Global names can be accessed by any consumer, in or out of the program. Think of it as an API. Exposing a public endpoint is necessary to let others use it. However, any names in the global namespace must be unique. Not just unique within it's own code base, but unique across all programs that may reference it. Renaming is also unsafe, since changing names could break consumers we don't even know we have.

```cs
public class ExampleClass{

  public int GlobalName = 5;
}

public class OtherClass{
  // "GlobalName" can be access from any consumers of ExampleClass
  private int copy = new ExampleClass().GlobalName;
}
```

## Namespaces

Namespaces are the primary tool for organizing global names. In short, namespaces  define a hierarchy of global contexts. These contexts allow us to lessen the gap with local names. We can provide context and uniqueness via namespace layers, and keep the names within the namespace simple.

For example `System.Text.Json` and `System.Console`. Just by reading the namespace, you can guess what kinds of code lives in each. They both belong to basic system functions, but their code clearly wouldn't always be used together. Both might reasonably contain a `Format` function, but we would expect very different behavior from each.

```
//NOTE: pseudo-code, not a specific language

namespace System.Text.Json{
  public string Format(){
    //...
  }
}

namespace System.Console {
  public string Format(){
    //clearly different than the json format function
  }
}
```

Objective-C is somewhat famous for having only a single global namespace, and it leads to all kinds of long and un-intuitive naming schemes ([source](https://nshipster.com/namespacing/), [source](https://stackoverflow.com/questions/5842017/namespaces-and-objective-c)).

## Global Name Organization is Program Structure

I'd argue the organization of global names *is* the program structure.

A consumer importing code doesn't know about the files. They only know about how the names are organized. Consider the troubles of Objective-C. Programmers split Objective-c code into separate files, but that didn't prevent confusion and conflict. The files don't provide context to consumers.

Moving code between files also shouldn't break consumers. Renaming, however, does.

Consider a API. Consumers of the API shouldn't know the file structure of the program. The organization of endpoints in the API is the only structure that matters to them. 

## File Structure still important

I don't intend to downplay file organization. It effects possible package boundaries for separate deployments. It effects source control conflicts, ease of code location, and possibly even team ownership.

The file division of code is also program structure, but in a very different way. The name organization matters to consumers of code, while the file structure matters to maintainers. Often, the same people both consume and maintain code, which may blur the difference between the two structures.


## File-based Modules Limit program structure

Here's the key point: program structure does not equal file structure.

I [previously explored](../posts/2021-09-24-Clojure-inhibits-code-grouping.md) how file-based module/namespace systems raise the bar for grouping code. This reduces long-term understandability.

The more general view paints a clearer picture. Binding namespaces to file structure forces two concerns together that naturally change for different reasons.
It forces us to trade-off between the best program organization for consumers, and the physical structure needed for maintenance and management.

## Relative Imports and Nested Namespaces are Natural

The previous post also explored how the absence of relative imports inhibits natural code groupings.

In light of this post, I'd say that relative imports are natural to program structure when files aren't considered. The namespaces themselves are contents of higher namespaces. As a namespace, I expect to access my own contents without having to re-specify my own name. Layered namespaces provide a sliding scale of context needed to be clear given the calling context.

Consider F# where namespaces really can be nested syntactically.
```fsharp
module EcommerceApp = 
   module Checkout = 
      module Validation = 
        let validateCard = //...
        let validateCart = //...
        let validate = //...

      module CartMath = 
        let sumProducts = //...

      let submitCart = //..
```
If I had to call sub-components like
```fsharp
module EcommerceApp = 
  module Checkout =
    module Validation = //...

    let isValid = EcommerceApp.Checkout.Validation.validateCart cart

```
It defeats the purpose of nested namespaces. The whole namespace may as well be one unbroken namespace.

Aside, I think Clojure may consider namespaces this way, where the namespaces only appear to be nested by the way we name them. Clojure certainly handles keyword namespaces this way (E.g. `system.text.json` of `system.text.json/format` is actually a single name that happens to have periods). If so, then I definitely prefer namespaces as nestable constructs rather than stand-alone symbols that merely mimic nesting by convention.

## Benefits of File-based namespaces

Many languages do couple their module/namespace structure to files. Python and Clojure are two prominent examples. What are the benefits?

A few I see are
- It forces consistency between code references and file structure for quick location of code without tooling
  - In practice, I'm never going to be writing a system without an editor that has go-to-definition
- Files and modules often do fall on similar lines. Collapsing the two can remove a bit of ceremony

I'd be interested in hearing more opinions on potential benefits.


## Conclusion

Names form the structure of a program for consumers while files structure a program for maintainers. Coupling namespaces to files limits our tools for name context, and forces tradeoffs between two structures that do not change for the same reasons. This may bring some benefits, but it inhibits clarity of naming, thus program structure, program understandability, and long term maintenance. Overall, I find program clarity more important and prefer program structure to be decoupled from file structure.


<!-- TODO: I didn't highlight applications for splitting a namespace between multiple files, like an api client  -->
<!-- 
Some potential cons?
- to keep open, there might be changes that impact a file that are not in the file and are not explicitly referenced (but are in the same namespace)


Enumeration of issues
- wanting to split files, but import together
  - A large client with many actions. Don't want a bunch of almost identical imports, but want actions modularized for easy access
- want to share a file, but group into sub namespaces
  - Often separate out sub-concerns like validation or actions on a particular type in the larger feature. I want them all together though to tell a single story.
-->



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
