---
date: "2022-04-08T00:00:00Z"
tags:
- Refactoring
- Monitoring
- Migrations
title: Safe Refactoring with Scientist
---

Agile and DevOps have pushed faster and more frequent releases. Techniques like integration test, feature flags, canary tests, and monitors evolved to maintain service reliability without slowing that pace. But some code paths are so critical that they cannot fail even once. This is where [Scientist](https://github.com/github/scientist) comes in.

[Scientist](https://github.com/github/scientist), and language ports like [Scientist.net](https://github.com/scientistproject/Scientist.net), enable safe refactoring of critical code paths. The strategy is 
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

This is much like canary testing, but proactive and more narrowly focused. Canary tests react after a code path already failed, but they can respond to exceptions from any source. Scientist exchanges a narrow focus for catching errors before they effect the customer.

Stripe has a nice post about how they [use Scientist for migrations](https://stripe.com/blog/online-migrations).

I don't believe the pattern Scientist defines has a name yet. However, it seems clear that this approach is a valuable and distinct add to the change control toolbox!
