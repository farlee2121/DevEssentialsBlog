---
layout: post
tags: []
---

# Going Fast is Going Well

I want to directly address the idea that moving quickly means bad code. The opposite is also not heavy design with process galor. To go fast is to go well, and that means fast incremental design.

It's generally accepted that bad code slows you down, eventually. The [design stamina hypothesis]() represents the general relationship well. 

I believe the trade-off happens very fast. The first time you have to rip out code you're both throwing away the previous work, adding work to remove it, and doing the new work. The more thrown-together code you have the more frequent and complex it's repercussions become.

I think the issue stems from a false belief that progress is only made in terms of code. I, however, see code as the last mile of encoding a design. We want to push off decisions until we need them to make other decisions. Narrowing our view at each step limits decisions, resulting in fast iterations, which are sum to a shorter path to a satisfactory solution. 

Jumping straight to full stack development is throwing out incremental progress and saying the next step the customer can give feedback to is a working feature.

I see it this way, building the right thing is about building what your customer wants. Doing that requires feedback from your customer. The speed limiter is how tight of a feedback loop you have with your customer. The fastest scenario is that you *are* your customer and you are constantly feeding backing into the development process. Still fast is that you can contact your customer whenever questions come up during development and work through a decision with them.

Even when coding starts [ports and adapters]() (or [Clean Architecture]()) is a way to incrementally develop, pushing lower details down the line while uncovering potential requirement gaps. It also happens to be the right way to make a flexible architecture.

If communication has to be more periodic and high-level, then less intensive implementations like mocks, UI-prototypes, BDD-requirements, and more are going to be faster than code. Live software is the most expensive, slowest, and hardest to change deliverable you can produce to get feedback from the customer.

If you want to go fast, invest in your customer reps. Cutting corners on code will only slow you down.