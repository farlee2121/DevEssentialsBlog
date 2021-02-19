<!-- 
  Paul didn't pickup what I was putting down at all. He thought it was basically just IDesign
  He made a good point that overall architecture systems are pretty much impossible to maintain at large companies like amazon.
  What's more important is understanding the mechanism of decoupling.
  I overall agree, but that is still a high bar. How can I reposition to make it unambiguous that I'm building more specific decision processes
  as a ramp up to that understanding?
  Maybe split the general overview into its own post, focusing hard on just the two decisions I take from IDesign and Ports and adapters
  Then, in a second post, go hard on context-specific rules
  Also, list the past posts as concrete examples
 -->


# Notes from Doug's review (on v2)
He feels there is usefulness lurking in the post, but he wants more concrete examples and analogies. He doesn't feel like he gets it.

This makes me think I could add a posts such as
- show implementations of ports and adapters: DI in C#, parameterization in F#, computer ports as a hardare example
- perhaps add the computer analogy back to this first post
- Perhaps distill more focused versions of my previous case studies
- probably walk through an example of the core loop

Overall, I think I need to build more context in each post for where they are in the process as a whole


## 2021-02-18 Self-notes
so far i've clarified dependency flow, domain decomposition, file structure, but I haven't show concrete examples of ports and adapters. I should probably add that either to the first post or as a second post (i favor the second post)

Consider making some of these posts stand-alone (not part of the initial series)
- volatility analysis?
- I definitely think the functional post is stand-alone

I'd like some visuals, but i'm not sure what
- i think a one service to one service visual would be good. Also allows me to demonstrate decorators
  - I think a full system visual is just too complicated to be meaningful unless it is a concrete system. That could be meaninful as a post, but would be too complicated for a presentation.
    - in my current posts it would probably fit well in the file orgnization post. Maybe in post 1b

-----

# How deep does it go?
FP as the extreme of this model. The paradigm focuses on making small independent pieces and tools for integrating them with confidence and without hating the process

point to the ROP, elevated worlds posts as examples
