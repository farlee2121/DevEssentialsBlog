---
date: 2023-05-25
tags: [F#, FsCheck]
title: F# Sneaky Construction vs Initialization Issue
---


I rarely worry about constructors or initialization in F#. But, every once in a while, the difference is important.
<!--more-->

## Short Version

When you declare constructor parameters next to the type name in F#, code that follows underneath is *not* part of the constructor.
It is initialization code.

```fsharp
type TypeName (arg1: ArgType1, arg2: ArgType2) as this =
    // code here is initialization code 
    // `this` *can* be reference however you like
```

True constructor code looks like
```fsharp
type TypeName =
    new (arg1: ArgType1, arg2: ArgType2) as this = 
        // Constructor code here
        // `this` has restrictions
```

While they may look effectively the same, these two approaches are different.
Initialization code is run *after* the instance is fully constructed 
while the constructor code runs *before*. 
The constructor has some constraints on how `this` can be referenced while
the initialization code does not.

## Long Version

### Context
I was [contributing](https://github.com/fscheck/FsCheck/issues/612) to [FsCheck](https://fscheck.github.io/FsCheck/QuickStart.html) 
when I stumbled on a rather challenging circular reference issue in constructing a type.

The type, [ArbMap](https://github.com/farlee2121/FsCheck/blob/cc4f3c0b2efb6d0a9f3fe9f8aa8fc8a95307b29e/src/FsCheck/ArbMap.fs), is responsible for managing registrations of type generating functions. These data creating functions are called "arbitrary" types, thus this class that maps types to the arbitrary data creating functions is called ArbMap.
Besides mapping types to arbitraries, ArbMap also helps discover custom Arbitrary type registrations in the code base.

I wanted to extend ArbMap so users could easily derive a new ArbMap with certain added or overwritten Arbitrary registrations.
This can simplify custom generator construction, especially for arbitrarily nested data structures.
For example, if you want to generate nested data structures, but ensure all strings on any type in that nested structure are non-null without effecting the string generation behavior for other types you might be testing against.

ArbMap depends on a `TypeClass` which does the heavy lifting determining type compatability. For example, if there is a registered arbitrary for List, but not for IEnumerable, TypeClass will figure out that it can use the arbitrary registered for List to create an IEnumerable.

The trick is that TypeClass has a circular reference with the ArbMap that contains it. The circular reference can't be easily removed without breaking expected behaviors.

The original class didn't have an issue with this circular reference

```fsharp
type internal ArbMap internal (typ: Type, ?existingMap: ArbMap) as this =
    let finder =
        match existingMap with
        | None ->
            TypeClass.TypeClass<Arbitrary<obj>>
                .New(injectParameters = true)
        | Some arbFinder -> arbFinder.ArbFinder

    let result =
        finder.DiscoverAndMerge(onlyPublic = false, instancesType = typ, newInjectedConfigs = [| this |])

    //...
```

Here it appear to be constructing the ArbMap with a contained TypeClass that takes a reference to the instance of the ArbMap (i.e. `this`).
Looks simple enough.

However, my changes required a new ArbMap construction scenario.

### Failed Approach - Alternative Constructors

At first I thought I could just add another constructor.

```fsharp
type internal ArbMap =

    val finder : TypeClass.TypeClass<Arbitrary<obj>>

    member private this.ArbFinder = this.finder

    internal new (typ:Type, ?existingMap:ArbMap) as this = 
        let finder =
            match existingMap with
            | None ->
                TypeClass.TypeClass<Arbitrary<obj>>
                    .New(injectParameters = true)
            | Some arbFinder -> arbFinder.ArbFinder

        let merged = finder.DiscoverAndMerge(onlyPublic = false, instancesType = typ, newInjectedConfigs = [| this |])
        {finder = merged}

    internal new (tc: TypeClass.TypeClass<Arbitrary<obj>>) as this=
        {finder = tc.Merge(TypeClass.TypeClass(injectedConfigs = [| this |]))}

```

Both constructors now throw
>The initialization of an object or value resulted in an object or value being accessed recursively before it was fully initialized.

What?! It seems like I'm doing the same thing as before, just now with two constructor overloads.

The sneaky truth is that the original ArbMap example is not creating the contained TypeClass in a constructor.
Rather, ArbMap is constructing itself *and then* making the constructor parameters available to *initialization* code in the class.
The original ArbMap has already finished constructing the class instance by the time it tries to create the inner TypeClass. 
Thus there is no trouble when we reference `this` in the TypeClass constructor.

My attempt to use two constructor overloads moved the initialization into a true constructor. The class instance is not complete until
*after* the constructor is run, so passing `this` as a parameter ends up creating a never-ending construction loop.

### Successful Approach - Union-based Constructor with Initialization

I ended up settling on a union type for constructor parameters so I could revert to using the single default constructor with initialization code.

```fsharp
type internal ArbMap private (init: ArbMapInit) as this=
    
    let finder = 
        match init with
        | FromTypeClass tc -> tc.Merge(TypeClass.TypeClass(injectedConfigs = [| this |]))
        | FromDiscover (typ, existingMap) -> 
            let finder =
                match existingMap with
                | None ->
                    TypeClass.TypeClass<Arbitrary<obj>>
                        .New(injectParameters = true)
                | Some arbFinder -> arbFinder.ArbFinder
            
            finder.DiscoverAndMerge(onlyPublic = false, instancesType = typ, newInjectedConfigs = [| this |])

    member private _.ArbFinder = finder

    //...
  
and 
    private ArbMapInit = 
    | FromTypeClass of TypeClass.TypeClass<Arbitrary<obj>>
    | FromDiscover of (Type * ArbMap option)
```

These and other attempted solutions can be found in [the PR discussion](https://github.com/fscheck/FsCheck/pull/613#discussion_r913368006)

