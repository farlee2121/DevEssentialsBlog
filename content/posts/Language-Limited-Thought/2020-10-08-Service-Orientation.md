---
date: "2020-10-08T00:00:00Z"
seriesId: "Language-Limited Thought"
series_description: Exploring how different languages equip us to solve different design problems
tags: [Languages, Functional Programming, Design Thinking, Pivotal Insights]
title: Service-Orientation and Functional Programming
aliases:
- /2020/10/08/service-orientation
---

Service-Oriented Programming is my primary programming paradigm. It divides the software into self-contained "services" or groups of functionality. Services also apply in functional programming, rather, service-like behavior is enforced all the way to the foundational functional concepts.
<!--more-->

To be clear, Service-Orientation isn't a concept I struggled with in C#. Rather, it is fascinating how service-oriented principles that surfaced in response to object-oriented issues align so well with concepts of functional programming. Let's look at the two methods, then compare them.

## What is Service-Orientation
First, let's look at properties of service-orientation.
 - services have clear boundaries
 - services only communicate through contracts 
 - Separated data and operations contracts (interfaces and data-contracts)
 - understanding the service shouldn't require looking at any other services
 - services are place-unaware / have self-contained operations
   - Every operation is a complete transaction
   - For example, setting values and persisting them should not be split over two operations that expect to be called in sequence.
   - The Values of Values by Rich Hickey is a great talk for understanding this property.

A helpful trick, imagine you were to offer every component of your software as a REST API.  The api would obviously be a set of operations that accepts and returns determined data structures. Each operation would need to be clear and complete. For scale and reliability, it wouldn't be able to rely on keeping state server-side.

The [service-orientation wikipedia article](https://en.wikipedia.org/wiki/Service-orientation) is surprisingly helpful and succinct.

## Replaced Object-Oriented Ideas
It helps to understand the Object-Oriented approach that service-orientation is replacing. Just about every OO tutorial will have some animal-based example. We'll say turtles. First you ask what a turtle has, what a turtle does, and what it is. 
 - Things it has => data
 - Things it does => methods
 - Things it is => base classes

```cs
class Turtle : SeaAnimal{
    public Fin Fin {get; set;}
    public Mouth Mouth {get; set;} 
    public void Eat(Food food){ 
        //...
    } 
    //...
}
```

This is now known to be an unsustainable way of design. It results in state hiding all around the program. It is very difficult to scale. There are also organizational issues with nouns that may be split between segments of the business.

Rick Hickey refers to this as Place-Oriented Programming (PLOP). 

## Functional Foundations

Functional programming is strongly inspired by mathematics. This means
- Functions are *not* algorithms, they are transformation from input to output
- The transformation should be stateless. The same input always produces the same output
  - This is known as referential transparency
- A function always has an output value, even if that value is "nothing"
- All expectations of a function should be passed as arguments. There are no hidden inputs.
  - Functions are not operations on internal data like methods are in OO
- Data is immutable
  - A function does not effect the state of it's caller 
  - Data/values are *not* a place in memory. They are facts. Change in data is like history building up over time.


## FP to SOP
You can probably already see similarities to service orientation, but let's lay it out.
- Services have clear boundaries
    - Not guaranteed by functional paradigms, but stylistically encouraged. Referential transparency discourages stateful coupling and encourages a clear contract between components. It sorta makes every function a mini-service that can be grouped with like mini-services. 
- Separated data and operations contracts
    - Functional data types are immutable. You cannot expose changeable data properties on a module. Changes in data are accomplished through function calls (like with service or api calls).
    - One difference, functional programs treat functions as a type of data. They can be passed around on instances of data records. I have not seen this done before, and it neither causes locals state nor is a viable code organization scheme like methods on objects is.
- Services are self-contained
    - Again, referential transparency plus immutability encourages each function to be self-contained. Higher levels of grouping are accomplished with modules.
- Place-unaware / Self-contained operations
    - Functional data types are immutable. Most functional languages disallow variables. Instead they offer "binding" values to names. It can feel a lot like variables, but they value assigned to the name does not change. Instead, you are encouraged to bind values to new names (which is what you should do in any language anyway). This also means that any values passed into a function will not change, just like you wouldn't expect a json object to mutate when you pass it to an API. Instead you must reflect any updates in the return value.

Almost every property listed for SOP requires self-discipline to work around prominent object-oriented tools. Tools like referential mutability, surfacing data and actions together, and statefulness. Functional programming, however, enforces some and encourages all of the Service-Oriented values.

## Further Reading
- The Value of Values by Rich Hickey https://www.youtube.com/watch?v=-6BsiVyC1kM
- Thinking Functionally - Mathematical Functions by Scot Wlaschin https://fsharpforfunandprofit.com/posts/mathematical-functions/