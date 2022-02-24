---
layout: post
tags: [Refactoring, Monitoring]
---

# Safe Refactoring with Scientist

Agile and DevOps have pushed faster and more frequent releases. Techniques like integration test, feature flags, canary tests, and monitors evolved to keep this pace while keeping services reliable. But some code paths are so critical that they cannot fail even once. This is where [Scientist](https://github.com/github/scientist) comes in.

[Scientist](https://github.com/github/scientist), and ports like [Scientist.net](https://github.com/scientistproject/Scientist.net), enable safe refactoring of critical code paths. The strategy is 
1. Create an "experiment" that knows both the new and old code paths
2. Deploy the code
3. Scientist runs the old behavior. It also silently runs the new behavior, keeping track of performance and any discrepancies in return values
4. Analyze the collected data. If new behavior meets expectations, then the experiment can be replaced with just the new code path.

Experiments are easy to define. Here's an example
```cs
var returnValue = Scientist.Science<ReturnType>("experiment-name", experiment =>
{
    experiment.Use(() => OldPath(arg)); // old way
    experiment.Try(() => NewPath(arg)); // new way
});
```

This is much like canary testing, but proactive and more narrowly focused. Canary tests react after a code path already failed, but can respond to exceptions from any source. Scientist exchanges a narrow focus for catching errors before they effect the customer.

Stripe has a nice post about how they [use the library for migrations](https://stripe.com/blog/online-migrations).

I don't believe this pattern Scientist defined has a name yet. However, it seems clear that this approach is a valuable and distinct add to our change control toolbox!
