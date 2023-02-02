---
date: 2023-02-01
tags: []
title: Lessons from Late-bound inheritance in Go
---
<!-- TODO: maybe have paul double check this post. My Go is still pretty iffy -->

I heard Go had late-bound inheritance and was excited to see how that effected my thinking.
Unfortunately, I don't think it effects my thinking (but it's still cool)
<!--more-->

## Late-bound Inheritance

By late-bound inheritance, I mean that an inheritance relationship between between an interface and can be decided after the class is defined.

This contrasts with many popular static languages that require inheritance relationships to be defined when the class is defined.

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
This means that Bar satisfying IFoo is must decided by the author and can't be decided by a later 
user of Bar and IFoo without making a derivative type of Bar.

In practice, this means it's expensive to adapt of arbitrary types into an interface and so authors often choose a different route.

However, late-bound inheritance means that the inheritance relationship can be defined at any time, making it much easier to satisfy interfaces. 
Thus it's also easier to use more interfaces that specify only what functionality a value must have, thus satisfying [Interface-segregation](https://en.wikipedia.org/wiki/Interface_segregation_principle) and avoiding unintended coupling.

To see how this might be useful, imagine an interface `IConsolePrint`. The interface is used to get the console representation of a type.
3rd-party types clearly won't come with this functionality. In Go, that's no big deal. We can retrofit types to satisfy `IConsolePrint`

```go
type IConsolePrint interface {
	PrintC()
}

func (tree BinaryTree) PrintC(){
    // somehow print the tree
}

func PrintThingsInOrder(printables []IConsolePrint){
    for _, i := range printables {
        i.PrintC()
    }
}

func main(){
    trees := genTrees()
    // BinaryTree satisfies IConsolePrint even though we just implemented the method here
    PrintThingsInOrder(trees) 
}
```

## Why this doesn't impact my thinking

Go's late-bound inheritance is cool, but it didn't significantly change my thinking.
Instead, I realized that I effectively already achieve the same effect in F#.

F# can pass and store functions as values. The any function can that fits the expected signature can be assigned to a given parameter or symbol.

This means that function values act like single-method interfaces. Multi-method interfaces can be approximated using records with multiple function values.
Mapping implementations into such arguments is quite simple and lightweight. Thus, we can satisfy the same need as interfaces, which allow us to treat arbitrary objects the same under a given abstraction.

That said, Go's late-bound inheritance is still pretty cool. I just have one more reason to love F# now.
<!-- ## Conclusion

Conclusion, hasn't changed my way of thinking much. Maybe I just haven't used it enough.
- Go methods are basically all like static extension methods in C#. Convenient but not paradigm changing
- Strongly-typed structural inheritance is more interesting, but it doesn't seem practically different from F#'s type-based function polymorphism, where you can interchange function values that satisfy the signature. If you want multiple such functions, you can use multiple parameters or create a record, for which the mapping doesn't seem heavier than implementing the interface in Go would be. -->

