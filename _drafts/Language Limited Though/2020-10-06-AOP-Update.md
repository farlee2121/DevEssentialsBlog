I need to do more research here. Should try to prove out some kind of AOP wrapper.


Should also look at result types to see if it's gotten better with C# 9
- the short answer is yes, instances now work by using generics and covarient overrides
- static methods helpers can be created a similar way, but it feels pretty meh
- Can't really use source generators either. 
- The key issue with the static methods is
  - I want to use the same generic methods across result types
  - that the generic inferrence isn't smart enough to make it pleasant (can't infer success and failure types from a given result type)