---
layout: post
tags: [math, functional programming]
---
# Building a Monad Intuition

Like most people, I've found monads hard to pin down. I know things I can do with them, but I don't understand them at an intuitive and flexible level. Here I'll try to build my mental model by relating to other tools.

Monads are originally a math concept, but I learned about them in a programming context and want to use them practically as a developer. However, they just aren't like other programming structures I know. It isn't really a statement, datastructure, or type. What makes a monad special is the behavioral properties that live outside of the obvious syntax or structures.

It is like a pattern, but it doesn't relate closely to any patterns I know. This may be because patterns reduce common solutions, and often feel familiar. There usually don't have strong conceptual consequences. On the other hand, Monads aren't something you'd easily deduce. They stem from a theoretical construct whose useful consequences filtered down into practice. 

Relating to programming structures just isn't cutting it, so instead, let's lean on my math background to try to build an understanding.

## Isomorphism?

<!-- TODO: I concluded that they aren't an isomorphism, but the wikipedia article states that every monad is formed by a set of adjunctions, and adjuctions are a pair of bijectional functions between two sets. This means they would be an isomorphism... I'm confused

I think the mistake i'm making is that result types are actually monads of the (Success + Error) space

Ah. I see my mistake. A bijections is only the same as an isomorphism for an unstructured set. We also have operations that apply to each type set. Those operations could fail for the one side or the other and thus bijection != isomorphism
 -->
Scott Wlaschin likes to talk the functional way of "lifting" into the monad world, and keeping it there as long as possible before converting back.

[lifting]()

This makes me think of an isomorphism. An isomorphism is "structure-preserving mapping between two structures of the same type that can be reversed by an inverse mapping". In simpler terms, it is a set of actions that are effectively the same for two different types, and you can map between the types. It's like a shift cipher (where you assign each letter to a different letter). The new alphabet looks different but acts the same as the original and can always be mapped back no matter how much we re-arrange the letters.

So are monads an isomorphism? No, result-types prove that they aren't. Result-types take advantage of the "lifting" to let us define a series of actions that might have errors, and not worry about the errors until we need to extract the final result.
```fs
// divide by zero example
```

This threw me for a loop for a bit. I originally thought it wasn't an isomorphism because I assumed the starting domain to only be success values (e.g. numbers if we're calculating). 
Then I realized that the monad actually maps to and from the sum of the success and error typespaces. 

Now we have to make an important distinction. The monad forms a bijection, where every monad value corresponds to a distinct value in the original typespace. However, we can't perform the same operations in either typespace and expect to get the same result. The whole point of the result monad is that there could be breaking errors. Since the operations are not always equivalent, it is not an isomorphism.

We can, however, always map operations from the original typespace to the monadic typespace. 

While an isomorphism wasn't quite accurate, this is a useful parallel for how the lifting works. We map values to a more useful form to operate and map back. Mapping back from the monad even helps us discover cases that aren't intuitive in the original typespace.

## Injective?
<!-- TODO: i'm not sure if this is right. I don't think my example is a real monad, but i'm not sure yet  -->

We noticed early that we can always map from the original typespace to the monadic typespace. Are monads injective?
That is, does every value of the original type map to a distinct value of the monad type?

Again, no. If I understand right, the following example is techically a proper monad. It just maps everything the the empty list.
```fs
let return val = EmptyMonad ([])
let bind f x = EmptyMonad([])
```

Injectivity isn't a good parallel, but it does highlight something. The map isn't as important as the fact that we get values into the monad and then we can always perform operations that also return values in the same monad.

## Ring?

<!-- !!!:TODO: it forms a closure -->

The fact that we can reliably apply functions to a monad value and get another monad value is very useful. This allows us to chain without fear that some step will return a "new kind" of value we can't operate on just as we were before. 

This is why the result-type is so powerful. It allows us to ignore error states until the very end, producing simple and readable code.

This reminds me of rings in Group Theory. There are some specific rules, but the basic idea is that you have a set of operations that will always produce the same kind of value they were given. In this way monads are very much like rings.

## Conclusion

Most are propbably satisfied to know
- Monads are always chainable (like rings)
- Monads are let us transform values to fit our usecase, then map back (e.g. async, lists, error-handling, etc)
  - We can always map to, but need to be careful for extra cases mapping back from a monad

However, I find the parallel to other math concepts helps me feel a deeper intuition for why monads work and what they are useful for.

Ah, it feels good to math again.