---
date: "2022-02-03T00:00:00Z"
tags:
- .NET
- C#
- Language Design
---

# Case for Static Class Extension in C#

Working on [System.CommandLine.PropertyMapBinder](https://github.com/farlee2121/System.CommandLine.PropertyMapBinder) has led me to believe C# is missing a powerful feature: static class extensions. This post explains my usecase, and balances some of the tradeoffs.


## Context
A quick rundown of the context. [System.CommandLine](https://github.com/dotnet/command-line-api) is a library for creating good user experiences in the console. The user declares what inputs they want, and the library takes care of parsing, help menus, completions, etc. My PropertyMapBinder seeks to create an intuitive and extensible experience for mapping the CLI inputs into code models with this library.

I was thinking it would be a discoverable and intuitive experience to construct different kinds of command handlers and property maps from functions on static classes. For example
```cs
rootCommand.Handler = CommandHandler.FromPropertyMap(SuchHandler,
    new BinderPipeline<SuchInput>{
        PropertyMap.FromName<SuchInput, string>("print-me", model => model.PrintMe ),
        PropertyMap.FromReference<SuchInput, int>(frequencyOpt, model => model.Frequency),
        PropertyMap.FromName<SuchInput, IEnumerable<int>>("-l", model => model.SuchList)
    });
```

Some of the benefits
- Discovery: Users can "dot in" to a single class and let auto-completion show all their options for different kinds of command handlers and property maps.
- Independence: Handlers and maps are stand-alone functions. I can use them in any case I may want a command handler or property map, not just pipeline building
- Composition: Handlers and maps can be wrapped or composed into making new handlers and maps


## The Problem: No static extension
However, I quickly ran into a problem. Static classes cannot be extended in C#. Extension methods require an instance, and partial classes can only be extended within an assembly.

This means that any users who want to add new handlers or maps have to add them somewhere besides `CommandHandler` and `PropertyMap`. Thus, the discoverability is undermined.


I'll admit. This is a very F# way of thinking. It's not very idiomatic to [Object-Oriented Programming](https://en.wikipedia.org/wiki/Object-oriented_programming). Adding static extensions would potentially open up a new code organization style, creating less consistency in the C# community.

## Issues With an OO Approach

Along this line of thought, I explored transitioning these functions to classes, and found it wasn't really possible.

The key issue is that many kinds of handlers (and some maps) can be constructed different ways, each with different possible generic type arguments. Class constructors don't accept additional type arguments, and thus diverse overloads are not possible. I'd end up with an explosion of classes trying to handle different scenarios.

Here's some a motivating example. I want to be able to run the binder pipeline against simple classes, existing instances, and classes with no default constructor. 
```cs
CommandHandler.FromPropertyMap(handlerFunc, pipeline)
CommandHandler.FromPropertyMap(handlerFunc, pipeline, inputModel)
CommandHandler.FromPropertyMap(handlerFunc, pipeline, inputFactory);
```

The first approach requires a `new()` type constraint, he second has no constraints, and the third might take a delegate of any number of parameters. None of these scenarios can share a class. The variable arity function is especially tricky. A class would be required for every number of delegate arguments.

The function-approach allows me to define just one function per set of type constraints. All of those functions can be discovered together on the same class or treated as overloads.
```cs
ICommandHandler FromPropertyMap<InputModel, T>(Func<InputModel, T> handler, IPropertyBinder<InputModel> propertyBinder) where InputModel : new(); 

ICommandHandler FromPropertyMap<InputModel, T>(Func<InputModel, T> handler, IPropertyBinder<InputModel> propertyBinder, InputModel inputModel);

ICommandHandler FromPropertyMap<InputModel, T>(Func<InputModel, T> handler, IPropertyBinder<InputModel> propertyBinder, IModelFactory<InputModel> inputFactory);

    IModelFactory<InputModel> FromSymbolMap<T1,InputModel>(Func<T1,InputModel> factory, params Symbol[] symbols);
    
    IModelFactory<InputModel> FromSymbolMap<T1,T2,InputModel>(Func<T1,T2,InputModel> factory, params Symbol[] symbols);
```

## Conclusion

I recognize that static class extension opens up a new approach to writing and organizing C# code. Adding new paradigms can reduce consistency, thus unity and understandability of an ecosystem.

However, it seems clear to me that C# cannot cleanly handle type instantiation with multiple generic type arguments and constraints.
Static class extension would enable this scenario in a way that is discoverable and familiar to .NET developers.