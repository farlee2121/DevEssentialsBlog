---
date: 2022-10-05
tags: [SOLID, Design Principles]
title: Are principles SMART?
---

SMART is a set of criteria for setting effective goals. I recently saw a recommendation that architecture principles should be SMART, but I'm not convinced.
<!--more-->

SMART stands for 
- Specific
- Mesasurable
- Achievable
- Realistic
- Timely

In general this translates into goal in the form "Move [ goal measure ] up/down by [ amount ] by [ deadline ] by [ action ]".

This is a good framework for goals. However, does it apply to principles?

## Is SMART SMART?

Speaking of principles, SMART is a principle for setting goals. Is SMART SMART?

- *Specific*: A little help from the template goes a long way. I'd say it's decently clear even without the template.
- *Measurable*: I can't think any meaningful measures. One can recognize if a goal is SMART, but that's more of a review than a measure. Each property within is relatively boolean or rather subjective if quantified.
- *Achievable*: Yes
- *Realistic*: Yes
- *Timely*: No. There is no timeframe for SMART it is something you apply whenever you set a goal and it doesn't specify how often you set goals.

## Is SOLID SMART?

The [SOLID principles](https://en.wikipedia.org/wiki/SOLID) are probably the most famous set of design principles in software. Are they SMART?

- *Specific*: Yes? A trained individual can generally decide if each principle is satisfied, even if there is a spectrum of potential applications.
- *Measurable*: Not really. There are outcomes related to SOLID that can be tracked, but the principles themselves manifest in a variety of ways. They also focus on conceptual divisions. We can track complexity and churn, but we can't track if a unit of code has one reason for change (the [Single-Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)). Reason for change depends on the perspective.
- *Achievable*: Yes
- *Realistic*: Yes
- *Timely*: No. There is no timeframe for SOLID. It is something you use 

## What are Principles?

The analyses of SMART and SOLID look awfully similar. I think this is pointing to the nature of principles.

I'm having a surprisingly hard time finding an official definition of design principles. IEEE has [a paper](https://ieeexplore.ieee.org/document/6301346) collects common themes
- "standards used to organize and arrange the structural components of Software Engineering design"
- "build up common consensus about architectural knowledge"
- "help beginners avoid traps and pitfalls"

Most every definition has some flavor of guiding decisions using established knowledge.

I think this is why principles are not measurable or timely. They are a decision tool used any time certain kinds of decisions are made. They describe motivations and desirable qualities, not prescriptive action plans. They narrow the solution space so we can decide faster and more consistently.

By analogy, you could say that principles are more like a compass than an odometer. They tell us if we're going the right direction, they don't tell us how far we've gone.

Principles are not about tracking over time. They're about improving the individual decisions on our way to any goal. 

## Conclusions

I principles naturally don't follow SMART. The core divergence is measurement and timeframes. Principles are not about tracking over time. They're about improving the individual decisions on our way to any goal. 

<!-- TODO: get a clear statement of what principles are
- guide decisions (Principles define fallback motivators to say yes to some things and no to others for any given decision (within relevant type of work). The faster we can narrow options, the faster we move in general.)
- tackle fundamental qualities of doing. Some aspects might be measurable, but it seems too broad
- More like a compass than an odometer. Tells you if you're going the right direction, not how far you've gone.
  - 


potential measures
- could have an evaluation framework to rate goals as smart or not, that's a kind of measure (but not objective)
  - measure also doesn't make sense. 100% of your tracked goals should be SMART. It's more of a review process and less of something you might track on a dashboard or as a performance metric
  - I suppose it could be an evaluator of how well your teams carry out the framework. Have a third party audit a sampling of goals from around the company. % well-defined goals is a measure of company understanding and adherence to framework. 
  - !!! same "audit" approach could be applied for design principles. That's an interesting idea

Q: Are the principles I've outlined in my blog posts SMART?
- specific, achievable, realistic -> for sure
- Measurable: this is harder. SOLID isn't measurable either. SMART
isn't really measurable either. They capture the soft concepts that we
can't mechanize
  - SIA is measurable via things like cycle times, release frequency,
other Devops and agile measures
  - Q: How effective would it be to measure scope of churn / code change?
- Testable: Not quantitatively, but something like an inspection or
standard can achieve objective verification or defect detection

Maybe make this a blog post. Start by examining SMART itself, then
SOLID, then SPNC -->