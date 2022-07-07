---
date: "2021-09-24T00:00:00Z"
tags:
- Clojure
- F#
title: Clojure Namespaces Inhibit Code Grouping
---

I've spent most of this year in Clojure after years of .NET. Much of my F# design skills made the jump, but one language difference has notably changed how I write programs. Specifically, two namespacing choices inhibit my inclination to explicitly group small sections of related declarations. This broadly impacts both program structure and naming.

## No Nested Modules

F# has a very flexible namespace system. Namespaces can contain modules and types, modules can contain most anything, and modules can be nested. Both namespaces and modules can be extended across multiple files. Both contribute to the full name of all their contents.

This system is pretty simple and flexible. It allows quick grouping of definitions most anywhere.
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

The example is rough, but it gives an idea of how the module structure can quickly tell a story about how the code is organized. Any concern that becomes independent can easily be moved to a separate file without altering the full global name of each symbol/declaration (E.g. `ECommerceApp.Checkout.Validation.validateCart` stays `ECommerceApp.Checkout.Validation.validateCart`)

The same cannot be said of Clojure. Clojure conventionally defines one namespace per file. Namespaces cannot be nested within a file.

This leaves me with a few choices. I can leave code grouping implicit, I can use comments, or I can split off a separate file.
- implicit grouping is easy to overlook and reduces understanding by later developers
- comments only group code visually. The same grouping is not made apparent when referencing definitions (e.g importing or calling from a different namespace). Incorrect comments are unlikely to get fixed, as opposed to modules which enforce the grouping when accessing definitions.
- Splitting off a separate file allows a sub-namespace, but reduces how much of the story I can see at once. It requires more jumping around and overall raises the bar to grouping code.


## No Relative imports

Clojure's module imports also raise barriers for grouping. Clojure requires every namespace to be imported separately. For example,
```clojure
(:require [ECommerceApp :as e-app]
          [ECommerceApp.Checkout :as checkout]
          [ECommerceApp.Checkout.Validation :as checkout-validation])
```

Sub-namespaces can't be referenced relatively. For example, `checkout.Validation/validateCart` is not legal.

This has both pros and cons. File dependencies are very explicit. It is easy to scan and understand exactly what other modules the current file is depending on. It also reduces the likelihood of name collisions.

However, this raises another strike against small groupings for the sake of clarity. Every grouping is another import in every file I want to use the code. As such, code that I want to use together pretty much has to exist in the same namespace. In fact, it pretty much has to live in the same file. Namespaces can be split between different files, but it is very awkward. Dependencies become unclear, tooling breaks, and each sub-file has to be loaded manually from a file with the primary namespace declaration.

This contrasts to F# and C# where relative namespaces are the norm
```fsharp
use ECommerceApp

let isValidCart = Checkout.Validation.validateCart cart
```

Relative namespaces aren't just about convenience. The namespace is part of the context for understanding each definition. Using relative namespace access creates a sliding scale of clear and consistent context for global declarations. Clojure covers symbol context with aliased imports, but the alias must be independently set for every file. 

<!-- I feel like a beginner would struggle to get anything out of this article. Too much expectation they understand namespacing -->

## Upside of Clojure Technique

I do want to give Clojure some credit. Explicit non-relative imports of all dependencies does simplify dependency tracing, especially when tooling doesn't support conveniences like find all references and go to definition. Namespaces can be changed with high confidence simply through find and replace. I would almost certainly prefer the clojure approach if I expected to be working with primitive editors.

## Conclusion

Clojure's lack of nested modules and relative imports significantly raise the bar for grouping code. This leads to larger code files and less explicit grouping. 
These choices also have benefits, but I find the overall effect reduces my understanding of author intent. I think these issues belie a more general conflation between program structure and physical file structure, which I intend to write about later.


