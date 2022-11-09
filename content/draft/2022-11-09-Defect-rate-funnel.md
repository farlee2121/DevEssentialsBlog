---
date: 2022-11-09
tags: [Quality, Measurement]
title: ""
---

## 

- not just zero defects about shape of defect rates
- requires tracking defect discovery before prod
- key checkpoints to create the funnels

Setting a goal of zero total defects creates a pressure to hide problems.

It could be better to aim for zero user-discovered defects. The users
won't hide the defects (though I suppose reporting structures could
end up tampered with).
The incentive is that *we* should find defects, but our customers
should not. The pressure here is then toward testing. We can set goals
for defect discovery rate (maybe 1-2 defects make it out to customers
per year). There will be defects, we don't want them to impact
customers and we do want staff ruthlessly identifying defects.

This requires measuring / tracking defects detected before they're
found by customers. This is not a measure i've seen tracked, though I
have heard of it being tracked with processes like inspections or
requirements being sent back.

It'd be interesting to think more about points where we can measure
defects found before customers.
In general we want to find them earlier. Many defects should be caught
by developer tests run locally. We don't want to accidentally
incentivise devs to push errors to be caught by CI in order to improve
metrics.

We don't want to incentivize letting defects get through to any
particular gate (reviews, canary, etc).
So I guess the right approach would be rates. What should the rates look like?
- our rates should decline as we progress down the pipeline
  - (fewer in prod than canary, fewer in canary than integration,
fewer in integration than dev tests?)
  - I don't know if this applies to unit -> integration since they
find different kinds of errors. I also don't know that it should apply
to requirements -> dev tests. Again, they're different kinds of
errors. maybe there are multiple funnels here. Requirements should get
fewer errors as they go from specification -> review -> dev discovered
-> user discovered
- the end of the funnel, user reported, should be zero or near-zero
- there probably shouldn't be any sharp declines. That'd mean the
prior step(s) are generating low-quality work. There also shouldn't be
any bulges, that indicates errors being injected at a certain stage