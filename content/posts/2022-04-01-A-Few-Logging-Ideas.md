---
date: "2022-04-01T00:00:00Z"
tags:
- Logging
- Monitoring
title: A Few Logging Ideas
---

This post is mostly a self-reminder to think more on a few logging ideas I encountered. I figured others might benefit from them too.
<!--more-->


## Canonical Log Lines

The first is [canonical log lines](https://stripe.com/blog/canonical-log-lines). [Stipe](https://stripe.com/) had the idea to
output a summative log line per unit of work. This allows quick adhoc analysis of system behaviors without corrolating multiple log lines.
It also enables significant analysis with fairly simple text search tooling.

I haven't really thought about write-time transformation of logs before, but it makes sense. It's often hard to get the full picture of events in a single 
request out of the noise of many concurrent logs. Log analytic tools can help you, but it adds complexity quickly.

It has me wondering what other kinds of transforms would be useful. I should also investigate how different structures or conventions could empower logging.

## Monadic Logs

Scott Wlaschin wrote a [fantastic on series on monads](https://fsharpforfunandprofit.com/posts/monoids-without-tears/).
The [last post](https://fsharpforfunandprofit.com/posts/monoids-part3/) suggests that metrics should be monads. 

The main reason is that monads have associativity and closure. That means aggregates look the same and can be further aggregated. It also means we can aggregate in any order and get the same result.

He specifically suggest use of counters over rates. This enables incremental computation, where new statistics are always `old aggregate + new record`. Each metric update is fixed-time, no matter how many records we accumulate. Any re-calculation is also perfectly distributable.


