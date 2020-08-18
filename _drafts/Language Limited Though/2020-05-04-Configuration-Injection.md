---
layout: post
tags: [Languages, Functional Programming, Design Thinking,
        Pivotal Insights]
excerpt: null
series: Language-Limited Thought
series_description: Exploring how different languages equip us to solve different design problems
---
Configuration


- previous design
  - ConfigManager (strings be nasty, no IH, can't mock)
  - service-locator style (no IH, excessive enums, config needed for service is unclear)
  - strongly typing with functions (awkward to swap sources)
 - Constructor injection, Options pattern (composible as data object)
 - patial application, record types?
 - for this one, the solution in c# is pretty nice, but took a while to get to. However, in f# the right way is the default way
   - same if you want to factory the config or props


