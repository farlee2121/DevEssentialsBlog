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

let map f = 
    fun resultInstance -> 
        match resultInstance with
        | Ok okVal -> Ok (f okVal)
        | Error errVal -> Error errVal


let safeDivide (divisor:int) (dividend:Result<int, string>): Result<int, string> = 
    if divisor = 0
    then Result.Error "Can't divide by zero"
    else (map (fun x -> x / divisor) dividend) 

let result = 
    Result.Ok 50 
    |> safeDivide 2
    |> safeDivide 0
    |> safeDivide 5

match result with
| Ok success -> printfn "%i" success
| Error message -> printfn "%s" message
// prints "Can't divide by zero"

```

This threw me for a loop for a bit. I originally thought it wasn't an isomorphism because I assumed the starting domain to only be success values (e.g. numbers if we're calculating). 
Then I realized that the monad actually maps to and from the sum of the success and error typespaces. 

However, it still isn't an isomorphism even though the value mapping isn't broken. We can't perform the same operations in either typespace and expect to get the same result. The whole point of the result monad is that there could be breaking errors in the original typespace. Since the operations are not always equivalent, it is not an isomorphism.

While an isomorphism wasn't quite accurate, this is a useful parallel for how the lifting works. We map values to a more useful form to operate and map back. Mapping back from the monad even helps us discover cases that aren't intuitive in the original typespace.

## Bijection?

Now we have to make an important distinction. A bijection would mean every monad value corresponds to a distinct value in the original typespace. It is similar to isomorphism, but only requires an equivalence between values, not operations.

This gets pretty murky. Monads are defined to be a bijection in the [cateogry theory definition](https://en.wikipedia.org/wiki/Monad_(category_theory)). The [programming version](https://wiki.haskell.org/Monad_laws), however, says nothing about an inverse map from the monad to original typespaces. 

Can we decide to add a reverse map and make into a bijection? Well, first we need to guarantee that the monad is injective.

## Injective?

The monad laws require a `return` method for elevating any value into the monad space. However, many of the definitions I was reading were unclear. I couldn't find out if a `bind` and `return` that simply mapped everything to a constant value made a valid monad.

```fs
let return val = ConstantMonad.Value
let bind f x = ConstantMonad.Value
```

I refactored [monad laws from the FsCheck test suite](https://github.com/fscheck/FsCheck/blob/9cc51c65ab0051e6d90cba4e138b96f5da980397/tests/FsCheck.Test/Gen.fs#L403) to take an arbitrary return and bind. Then I plugged in the constant monad. It passed. 

I think, however, that this is a limitation of the test rather than a true monad. [This definition](https://wiki.haskell.org/Monad_laws) is the clearest I've seen so far. It clarifies that the unit tests are looking for return (and bind) to produce semantically equivalent values. I think of this as, if we did unwrap the monad, the value would be the same as the original. This also is more in line with the original concept of a monad from category theory. 
<!-- This article also helps clarify the rules https://www.sitepoint.com/how-optional-breaks-the-monad-laws-and-why-it-matters -->

This clarification of the rule means that not only is the monad injective, it is also expected to be bijective.

This means we can always map values into the monad. We can also expect the monad values to map back to distinct values in the original typespaces.

This is important, but it's missing something. It's great that we can map, but just mapping isn't more valuable than other datastructures. 

## Ring?

This draws focus to the other function in the monad rule, bind. Bind lets us map operations into the monad space and guarantee that they return values in the monad.

The fact that we can reliably apply functions to a monad value and get another monad value is very useful. This allows us to chain without fear that some step will return a "new kind" of value. We can always continue to operate just as we were before. 

This is why the result-type is so powerful. It allows us to ignore error states until the very end, producing simple and readable code.

This reminds me of rings in Group Theory. There are some specific rules, but the basic idea is that you have a set of operations that will always produce the same kind of value they were given. That property is called closure. In this way monads are very much like rings.

## Conclusion

Most are propbably satisfied to know
- We can always map to and from a monad (but be careful for extra cases mapping back)
- Monads are always chainable
- Monads are let us transform values to fit our usecase, operate, then map back (e.g. async, lists, error-handling, etc)

However, I find the parallel to other math concepts helps me feel a deeper intuition for why monads work and what they are useful for.

Ah, it feels good to math again.



<!-- 
adapted from https://github.com/fscheck/FsCheck/blob/9cc51c65ab0051e6d90cba4e138b96f5da980397/tests/FsCheck.Test/Gen.fs#L403

let sample n = Gen.sample 1000 n

let sample1 gn = sample 1 gn |> List.head

module MonadLaws =
    let LeftIdentity bind _return (a:'a) (f:'a -> 'b) =
        let f = f >> _return
        let left = (bind (_return a)  f)
        let right = f a
        left = right 
    let RightIdentity bind _return (a:'a) =
        let m = _return a
        let left = bind m _return
        let right = m
        left = right
    let Associativity bind _return (a:'a) (f:'a->'b) (g:'b->'c) =
        let m = _return a
        let f = f >> _return
        let g = g >> _return
        let left = bind (bind m f) g
        let right =  bind m (fun x -> bind (f x)  g)
        left = right

    let All bind _return =
        (LeftIdentity bind _return) |@ "Left Identity"
        .&. (RightIdentity bind _return) |@ "RightIdentity"
        .&. (Associativity bind _return) |@ "Associativity"

type EmptyMonad<'a> = 
    | Empty

[<Fact>]
let ``should satisfy Monad laws``() =
    //let bind = (>>=)
    //let _return = Gen.constant
    let bind x f = Empty
    let _return x = Empty
    Check.Quick (MonadLaws.All bind _return)

 -->