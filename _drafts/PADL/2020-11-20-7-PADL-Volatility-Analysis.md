# PADL: Volatility Analysis

Explorations so far have focused on use and benefits of PADL in limited contexts. Architecture is not math and doesn't need general proof to be useful. However, that won't stop me from providing one. This volatility analysis demonstrates the general benefits of PADL.

This is more generally a proof for any port-based architecture. I could also explore the benefits of responsiblity cohesion, but [Parnas did that already](https://prl.ccs.neu.edu/img/p-tr-1971.pdf).

I also don't believe that my specific choice of responsiblity layers will be right for every scenario. They are simply a good foundation for most scenarios. Choosing different layers doesn't fundamentally change the paradigm.

<!-- I'm not convinced this provides meaningful benefit over the case studies. Discussing it abstractly is awkward without a concrete example. Adding a concrete example just make it a one of the case studies -->

Contrast direct dependencies vs ports

- change accessor -> forces consumer to adapt to new data format
- change manager -> accessor needs

very conceptual
[]

- further guidance on how layers do and don't interact with each other
- really focus on the adapt to integrate here

I think I did a volatility analysis in a previous post. Maybe in the notification system? Queue?
- it was in [](../../_posts/2020-08-14-Notification-Design.md)

Want analysis on how direct dependencies force change 