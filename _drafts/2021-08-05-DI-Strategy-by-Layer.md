

After reading https://fsharpforfunandprofit.com/posts/dependencies-3/. Whole series is great.

- Accessory -> reader
- Engines -> pure
- Managers -> interpreter


I've tried to keep my engines pure for years

I've been using interpreter for managers since reading Domain Modeling Made Functional. 
I know I like it
- reduces mocks
- transaction friendly (nothing committed until whole logic flow is finished)
- Domain is more evident. Harder to hide decisions in side-effects nested somewhere in a call-chain
- Portable and composable by default


Accessors are the uncertain one here. Interpreter pattern greatly reduces the need for centralized storage services.
It would make sense, since accessors are IO-focused. 
- CON: don't want people replicating the pattern to higher layers
- CON: It could reduce transactional friendliness, but it feels like the discreet storage actions are as good as we can hope for transactions at this level

Not sure. I need to experiment and build larger systems with this paradigm to make a decision