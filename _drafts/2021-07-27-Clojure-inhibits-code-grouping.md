---
layout: post
tags: [Clojure, F#]
# series: 
---

# Clojure Inhibits Code Grouping

I've spent most of this year in Clojure after years of .NET. Much of my F# design skills made the jump, but one language difference has notably changed how I write programs. Specifically, two key choices inhibit my tendency to inclination to explicitly group small sections of related code. I believe this coupling choice has broad implications for program structure and naming.

## No Nested Modules

F# has a very flexible namespace system. Namespaces can contain modules, modules can contain most anything, and modules can be nested. Both namespaces and modules can be extended across multiple files. Both contribute to the full name path to all of their contents.

This system is pretty simple and flexible. It allows quick grouping of definitions most anywhere.
```f#
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

The example is rough, but it gives an idea of how the module structure can quickly tell a story about how the code is organized. Any concern that becomes independent can easily be moved to a separate file without altering the full global name of each symbol (E.g. `ECommerceApp.Checkout.Validation.validateCart` stays `ECommerceApp.Checkout.Validation.validateCart`)

The same cannot be said of Clojure. Clojure conventionally defines one namespace per file. Namespaces cannot be nested within a file.

This leaves me with a few choices. I can leave code grouping implicit, I can use comments, or I can split off a separate file.
- implicit grouping is easy to overlook and reduces understanding by later developers
- comments only group code visually. The same grouping is not made apparent when referencing definitions (e.g importing or calling from a different namespace). Incorrect comments are unlikely to get fixed, as opposed to modules which expose the grouping during access.
- Splitting off a separate file allows a sub-namespace, but reduces how much of the story I can see at once. It requires more jumping around and overall raises the bar to grouping code.


## No Relative imports

Clojure's module imports also raise barriers for grouping. Clojure requires every namespace in a hierarchy to be imported separately. For example,
```clj
(:require [ECommerceApp :as e-app]
          [ECommerceApp.Checkout :as checkout]
          [ECommerceApp.Checkout.Validation :as checkout-validation])
```

Sub-namespaces can't be referenced relatively. For example, `checkout.Validation/validateCart` is not legal.

This has both pros and cons. Dependencies of a file are made very explicit. It is easy to scan and understand exactly what other modules the current file is depending on. It also reduces the likelihood of name collisions.

However, this raises another strike against small groupings for the sake of clarity. Every grouping I make is another import in every file I want to use the code. As such, code that I want to use together pretty much has to exist in the same namespace. In fact, it pretty much has to live in the same file. Namespaces can be split between different files, but it is very awkward. Dependencies become unclear, tooling breaks, and each sub-file has to loaded manually into some main file for the namespace. 

This contrasts to F# and C# where relative namespaces are the norm
```fs
use ECommerceApp

let isValidCart = Checkout.Validation.validateCart cart
```

Relative namespaces aren't just about convenience. The namespace is also part of the context that defines a symbol. Using partial namespace access creates as sliding scale of clear and consistent context for global symbols. Clojure covers symbol context with aliased imports. 

<!-- I feel like a beginner would struggle to get anything out of this article. Too much expectation they understand namespacing -->

## Conclusion

Clojure's lack of nested modules and relative imports significant raise the bar to grouping code. This leads to larger code files and less explicit grouping. 
These choices also have benefits, but I find the overall effect reduces my understanding of author intent. I think these issues belie a more general conceptual framework for code organization which I intent to cover in my next post. That is program structure should not equal it's physical file structure.


