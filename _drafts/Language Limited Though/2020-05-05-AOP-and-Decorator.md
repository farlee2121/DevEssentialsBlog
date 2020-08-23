---
layout: post
tags: [Languages, Functional Programming, Design Thinking,
        Pivotal Insights]
series: Language-Limited Thought
series_description: Exploring how different languages equip us to solve different design problems
---

# Functional Composition, Decorator, and Aspect-Oriented Programming

Aspect-Oriented programming has captivated my imagination for years. C#, however, does not support AOP. Even conceptually realizing benefits of the paradigm proved difficult. Then, I experienced functional composition.

## What is Aspect-Orientation
The heart of Aspect-Orientated Programming (AOP) is cross-cutting concerns. The creators saw concerns like logging, authorization, authentication, and transaction mananagement. They asked why these needed to be spread through the program. 
 - Their implementation is nearly identical everywhere
 - They are not intrinsic to the business logic. They distract from the semantic clarity of a function
 - They are needed through most components of the system

The idea is to run these cross-cutting concerns as a sort of add-on or interceptor for other logic flows. This allows the cross-cutting concerns to be defined centrally, evolve separately from the core logic, and for the core logic to remain focused.

## What is a Decorator

Decorator is an Object-Oriented pattern similar in motivation to AOP. The idea is that you take some core functionality and "decorate" it with additional functionallity. The core logic is unchanged and many decorators can be used together to create complex functionality.

A good example (stolen from Steve Tockey) is the Java Filestream. At the base is the file stream. Then, you can add a Compressed decorator to get a compressed file stream. Add an encrypted decorator and you get an EncryptedCompressedFileStream. So on and so on.

## C# difficulties
AOP requires some mechanism for "weaving" the cross-cutting concerns back into core functionality. C# has no built-in solution for proxying methods or specifying behavior before or after a method call.

That is a bit of a lie. Attributes can be triggered before a function call. They can interupt execution with an exception, but don't have access to the function inputs or outputs.

Two options to get around this were 
 - [Post-sharp](https://www.postsharp.net/): runs at build type by re-writing the compiled IL
 - Constructor Injection + Decorators: Injecting abstract types allows me to add decorator functionality in the composition root. Example below.

Post-sharp was expensive, so I looked at constructor injection + decorator. For example

```cs
interface IDoSomething{
    int DoSomething(int a, int b);
}
class DoSomethingLogger : IDoSomething{
    public DoSomethingLogger(IDoSomething decorated, ILogger logger){
        //...
    }
    public int DoSomething(int a, int b){
        var stopwatch = StopWatch.StartNew();
        logger.Log($"called: {a}, {b}; Started: {DateTime.UtcNow}");
        var output = decorated.DoSomething(a, b);
        stopwatch.Stop();
        logger.Log($"{output}; Finished: {DateTime.UtcNow}; {stopwatch.Elapsed}");
        return output;
    }
}

class CompositionRoot{
    public RootType Compose(){
        ILogger logger = new Logger();
        IDoSomething decoratedDoSomething = new DoSomethingLogger(new ActualDoSomething(), logger);
        ConsumingType consumer = new ConsumingType(decoratedDoSomething);
        //...

        return rootType;
    }
}
```

This works. It works well for relatively isolated scenarios or common shared interfaces (i.e. INotifier). It does not work well for activities that would be shared between many components that don't share an interface. It would end up requiring decorator implementations for every abstraction in the system.

Some DI frameworks cater to this specific scenario. Autofac and Castle-Windsor allow you to registor decorators. The framework then takes care of generating dynamic proxies to adapt the decorator on to any component in the system. My issue with this solution is the heavy reliance on reflection. Relying on relection in the heart of my system seemed like a performance minefield. 

## Lack of Clarity

The above issues are not unique to C#. They exist in most OO languages because there isn't a great concept of wanting to generically pass along info.

I was facing a deeper issue though. I lacked clarity about what practically using AOP looked like. My expectations were to write decorators for all my components at once, but also to be able to access specific properties.

Authorization is a good example. Authorization often depends on some identifying information about the user. A decorator could grab the user id from the arguments and then make a decision based on that info. Sounds good, but how does it do that generally for any function that takes a user id? Either it requires name/type based reflection (which would not be great security practice) or it doesn't. 

## Functional Composition
I'd pretty much given up on AOP when I started to learn functional programming. Then, I witnessed composition in F#. 

In functional languages
 - functions are transformations from input to output, *not* an algorithm or set of instructions
 - the transformation is referentially immutable, it should always return the same output for given input
 - functions are data too. They can be assigned and operated on
   - To operate on functions normally, functions with the same type signatures are implicitly interchangable (i.e. you may have sprint in mind but specifying int -> string will accept any function int -> string)
   - arguments can be determined implicitly. For example, binding a from one name to the other does will implicitly impart arguments to the new function   
   ```fsharp
     let nya = (+) // nya takes two ints and outputs an int
   ```

This adds up for some powerful consequences. It means that the decorator pattern is a fundamental expected activity in functional languages. It even has an operator. It is a sub-set of the functional composition.

Here's the core idea, if a function is a transformation that always produces that same thing, then why not connect multiple transformations to make a new transformation?

```fsharp
let setModifedDate now, user = 
    user.ModifiedDate = now()
    user
let setDeleted user = 
    user.IsDeleted = true
    user

let deleteNow = setModifiedDate now >> setDeleted

let user = //...
deleteNow user
```

Reach back in your math education memories. This the functional equivalent of $F \circ G$. Most probably remember it as FoG and GoF.

Any two functions can be composed as long as the output of one matches the input of the other! This means we can easily create decorators that intercept, then pass on arguments or outputs.

```fsharp
let logInput input =
  log "input: %A; startTime: %s" input DateTime.UtcNow.ToString()
  input; 

let doWithLog = logInput >> doThing
```
Note that it does not matter what input is here. It is implicitly typed and will be decided based on where it is used!

This is a stark contrast to decorator in OO that requires a new type definition, constructor injection, and call forwarding of every method on the interface. This is much lighter weight.

## Gaining Clarity
The functional AOP implementation is very much lighter and nicer than the OO one. However, I haven't gained any abilities not available to me in C#. I suppose I gained generic decorators with built-in language functionality.

This doesn't resolve the genric decorators vs specific data conundrum.

The easy of implementation did, however, make it much easier to play and test my thoughts. I ended up realizing that there is a fundamental divide in AOP-style decorators. 

The first class is completely generic. They cannot depend on specifics of the functions that they are modifying. This class of decorators is great for centralizing tasks like peformance tracking, default authentication behavior, or error logging. Some crafty dependency injection can also achieve this for role- and component-based authentication.

The second class relies on some specific information of the function being decorated. There is and never was a way to get around creating a custom implementation for this scenario. An example would be authenticating a method call based on current user and id of the entity being acted on, which is passed as an argument.

This is not a reason to be dismayed. The completely generic decorators are already a significant win. The specific decorators also end up small and focused. They often aren't much more work than baking the concern into the core logic, but result in much more flexibility for change. In fact, the decorators can be decided at configuration time, where baked-in can only be decided at write time.

## Summary
AOP and decorators are definitely possible and beneficial in OO, but much more work. The functional focus on tranformations and composition makes AOP both natural and simple to implement. 

The simplicity of AOP in F# helped me to finally wrap my head around the paradigm as a practical tool.

## Further Reading
- A nice exploration of the AOP options in C#. I did not cover them all here because there are a lot https://www.dotnetcurry.com/patterns-practices/1305/aspect-oriented-programming-aop-csharp-using-solid
- Composition as decorator https://fsharpforfunandprofit.com/posts/conciseness-functions-as-building-blocks/
- Mapping OO patterns to FP https://fsharpforfunandprofit.com/fppatterns/