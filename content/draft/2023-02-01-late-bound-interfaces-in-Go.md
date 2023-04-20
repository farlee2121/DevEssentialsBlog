---
date: 2023-04-20
tags: [F#, Go]
title: Late-bound inheritance vs Function Composition
---

I heard Go had late-bound inheritance and was excited to see how that would effect my coding. Instead I found that I already achieve the same kind of value in F#, just in a different way.
<!--more-->

## Late-bound Inheritance

By late-bound inheritance, I mean that a class can inherit an interface after the class is defined.

This contrasts with many popular static languages that require inheritance relationships to be defined at the same time as the class is defined.

For example, in C#

```cs
class IFoo{
    void Foo();
}

class Bar: IFoo { // <- Inheritance must be declared here when the class is defined
    public void Foo(){
        //....
    }
}
```

`Bar` must implement `IFoo` when it is defined or it can't be treated like an IFoo later.
Only the owner of Bar can decide if it is an IFoo. Inheritance can't be decided by a later 
user of Bar and IFoo without making a derivative type of Bar.

In practice, this means it's expensive to adapt arbitrary types into an interface, so coders often choose a different route.

However, late-bound inheritance means that interfaces can be inherited outside the class declaration, making it much easier to implement interfaces on arbitrary types. 

Simpler interface inheritance also simplifies [Interface-segregation](https://en.wikipedia.org/wiki/Interface_segregation_principle) where interfaces are broken out into minimal groups of behavior, thus avoiding unintended coupling.

### Go Limitations

Unfortunately, it turns out Go does not support late-bound inheritance between types in different packages. It is only possible if the type and the inheritance are defined in the same package. This significantly limits the utility of adding interfaces to types, since we can only do it when we already have access to directly extend the type's declaration.

### Example

Go's limitations aside, let's consider an example of how late-bound inheritance might be useful. Imagine an interface `IConsolePrint`. The interface is used to get the console representation of a type.
3rd-party types clearly won't come with this custom functionality. With late-bound inheritance, we could retrofit types to satisfy `IConsolePrint`.

```go
type IConsolePrint interface {
	ConsolePrint()
}

func (tree BinaryTree) ConsolePrint(){
    // somehow print the tree
}

func PrintArbitraryConsoleThings(printables []IConsolePrint){
    for _, val := range printables {
        val.ConsolePrint()
    }
}

func main(){
    // BinaryTree satisfies IConsolePrint even though we just implemented the method here
    printables := []IConsolePrint {genTree()}
    PrintArbitraryConsoleThings(printables) 
}
```

## Why this doesn't impact my thinking

Go's late-bound inheritance is interesting, but it didn't significantly change my thinking.
Instead, I realized that I effectively already achieve the same value in F# through composition.

F# can pass and store functions as values. Any function that fits the expected type signature can be assigned to that parameter or symbol.

For example

```fsharp
let acceptsAFunction (f: int -> string) =
    let str = f 1
    printfn str

acceptsAFunction string // prints "1"
acceptsAFunction (fun n -> "hi") // prints "hi"
acceptsAFunction (fun n -> $"{n}*2 = {n*2}") // prints "1*2 = 2"
```

This means that function values act like single-method interfaces. 

For example, here's the previous Go sample translated to F#
```fsharp
module BinaryTree = 
  let consolePrint tree = 
    // somehow print tree

let printArbitraryConsoleThings (printers: (unit -> unit) list) =
    printers |> List.map (fun printer -> printer ())

let main () =
    let trees = genTrees()
    let delayedPrint () tree = BinaryTree.consolePrint tree
    printArbitraryConsoleThings (trees |> List.map delayedPrint)
```

But that only demonstrates a single method. Interfaces with multiple methods can be approximated using records types. For example

```fsharp
type ThingCRUD = {
    GetThing: Id -> Thing option
    CreateThing: Thing -> unit
    ListThings: unit -> Thing list
    DeleteThing: Id -> unit
}

// Now consume the set of functions
let deleteAll (api:ThingCRUD) = 
    api.ListThings ()
    |> List.map (fun thing -> api.DeleteThing thing.Id)
```

We can then compose an "implementation" of `ThingCRUD` simply by assigning functions with the right type signatures to an instance of `ThingCRUD`.

Here's a really simple in-memory implementation of ThingCRUD
```fsharp
let mutable things : Thing list = []

let matchId id thing= thing.Id = id
let InMemoryThingCRUD = {
    GetThing = (fun id -> things |> List.tryFind (matchId id))
    CreateThing = (fun thing -> things <- thing :: things)
    ListThings = (fun _ -> things)
    DeleteThing = (fun id -> things <- (things |> List.filter (not << (matchId id))))
}
```

Thus, we can satisfy the same need as late-bound interfaces, which allows us to treat arbitrary objects the same under a given abstraction. And the interface "implementations" are lightweight since mapping functions into such parameters is quite simple and terse. Unlike Go, this approach is not effected by package boundaries.

For those who want to dig deeper, this F# approach is secretely a [reader monad](https://fsharpforfunandprofit.com/posts/dependencies-3/).




<!-- ## Conclusion

Conclusion, hasn't changed my way of thinking much. Maybe I just haven't used it enough.
- Go methods are basically all like static extension methods in C#. Convenient but not paradigm changing
- Strongly-typed structural inheritance is more interesting, but it doesn't seem practically different from F#'s type-based function polymorphism, where you can interchange function values that satisfy the signature. If you want multiple such functions, you can use multiple parameters or create a record, for which the mapping doesn't seem heavier than implementing the interface in Go would be. -->

