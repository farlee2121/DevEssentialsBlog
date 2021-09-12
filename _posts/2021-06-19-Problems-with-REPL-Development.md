---
layout: post
tags: [Clojure, Testing, REPL]
---
# Pros and cons of REPL-centered development

I've been working on Clojure lately, and the Clojure community tends to center their development around the REPL. While often useful, this approach also comes with some unforeseen downsides.

## Pros
Clojure has some top-tier REPL tooling with write-time assistance and smooth cycles between code files and the REPL. The result is easy experimentation with language and system components.

One benefit I didn't expect was simplified administrative tasks. Instead of a task runner or script files, scripts can be written just about anywhere and executed by sending them to the REPL with the right hotkey.

## Cons

The low barrier to executing code in the REPL leads to testing code manually where I would usually write unit tests. This creates a false sense of quality, because my curiosity is satisfied but the experiment is not preserved for repeated validation.
It takes greater discipline to transfer REPL tests into the permanent test suite.

Another danger is sticky REPL state. The REPL (sensibly) maintains definitions and loaded assemblies while running. However, this causes a growing difference between the REPL state and the actual system state.

I've often found my system is broken after I restart my REPL or try to run tests via the command-line. These errors would have been easy to find if they'd broken my environment right away, instead, it takes time to sift through of all the changes made during a REPL session.


## Conclusion
The REPL is a powerful tool, but not a clear win for me. It requires a different set of personal disciplines than I am used to. While more productive for learning a language or framework, I don't think there is an overall productivity improvement from a test-driven approach. 




