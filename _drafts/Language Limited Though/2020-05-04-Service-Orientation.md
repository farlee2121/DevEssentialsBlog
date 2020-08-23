---
layout: post
tags: [Languages, Functional Programming, Design Thinking,
        Pivotal Insights]
series: Language-Limited Thought
series_description: Exploring how different languages equip us to solve different design problems
---

# Service-Orientation and Functional Programming

Service-Oriented Programming is my primary programing paradigm. It divides the software into self-contained "services" or groups functionality. Services also apply in functional programming, rather, service-like behavior is enforced all the way to the foundational concepts.

To be clear, Service-Orientation isn't a concept I struggled with in C#. It is facinating how service-oriented principles that surfaced in response to object-oriented issues align so well with concepts of functional programming.

## What is Service-Orientation
My background in service-orientation requires that
 - services have clear boundaries
 - services only communicate through contracts (interfaces and data-contracts)
   - separation of values and operations 
 - services are self-contained / understanding the service doesn't require looking at any other services
 - Place-unaware / Self-contained operations
   - Every operation is a complete transaction
   - For example, a service could certainly save some data that was previously unknown and allow it to be retrieved by some reference. Each call musts be a complete transaction though. Save should not be split over two operations that expect to be called in sequence.
   - The Values of Values by Rich Hickey is a great talk for understanding this property.

A helpful trick, imagine you were to offer every component of your software as a REST API.  The api would obviously be a set of operations that accepts and returns determined data structures. Each operation would need to be clear and complete. For scale and reliability, it wouldn't be able to rely on keeping state server-side.

The [wikipedia article](https://en.wikipedia.org/wiki/Service-orientation) is suprisingly helpful and succinct.

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

This is now known to be an unsustainable way of design. It results in state hiding in many places all around the program. It is very difficult to scale. There are also organizational issues with nouns that may be split between segments of the business.

Rick Hickey refers to this as Place-Oriented Programming (PLOP). 

## Functional Foundations

Functional programming is strongly inspired by mathematics. This means
- functions are *not* algorithms, they are tranformation from input to output
- a function always has an output value, even if that value is "nothing"
- the trasformation should be stateless. The same input always produces the same output
  - this is known as referential transparency
- All expectations of a function should be passed as arguments. There are no hidden inputs.
  - conversely functions are not operations on internal data like methods are in OO
- Data is immutable
  - a function does not effect the state of it's caller 
  - data/values are *not* a place in memory. They are facts. Change in data is like history building up over time.


## FP to SOP
You can probably already see similarities to service orientation, but let's lay it out.
- Services have clear boundaries
    - Not guaranteed by functional paradigms, but stylistically encouraged. Referential transparancy discourages stateful coupling and encourages a clear contracts between components. It sorta makes every function a mini-service that can be grouped with like mini-services. 
- Separation of function and data defitions
    - Functional data types are immutable. You cannot expose changable data properties on a module. Changes in data are accomplished through function calls (like service calls).
    - Functions are a type of data, though, and can be passed around on instances of data records. I have not seen this done before, and it isn't a managable code organization scheme like functions on objects is.
- Services are self-contained
    - Again, referential transparency plus immutability encourages each function to be self-contained. Higher levels of grouping are accomplished with modules.
- Place-unaware / Self-contained operations
    - Functional data types are immutable. Most functional languages disallow variables. Instead they offer "binding" values to names. It can feel a lot like variables, but they value assigned to the name does not change. Instead, you are encouraged to bind values to new names (which is what you should do in any language anyway). This also means that any values passed into a function will not change, just like you wouldn't expect a json object to mutate when you pass it to an API. Instead you must reflect any updates in the function's return value.

Almost every property listed for SOP requires self-discipline to ignore (or even work around) prominent object-oriented tools. Tools like referential mutability, surfacing data and actions together, and statefulness. Functional programming, however, enforces some and encourages all of the Service-Oriented values.

## Further Reading
- The Value of Values by Rich Hickey https://www.youtube.com/watch?v=-6BsiVyC1kM
- Thinking Functionally - Mathematical Functions by Scot Wlaschin https://fsharpforfunandprofit.com/posts/mathematical-functions/