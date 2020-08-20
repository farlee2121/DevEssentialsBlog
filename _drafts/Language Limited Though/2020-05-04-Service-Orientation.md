---
layout: post
tags: [Languages, Functional Programming, Design Thinking,
        Pivotal Insights]
excerpt: null
series: Language-Limited Thought
series_description: Exploring how different languages equip us to solve different design problems
---

# Service-Orientation and Functional Programming

Service-Oriented Programming is a rising design paradigm that divides the software into self-contained "services" or groups functionality. Services also apply in functional programming, rather, service-like behavior is enforced all the way to the foundational concepts.

## What is Service-Orientation
My background in service-orientation requires that
 - services have clear boundaries
 - services only communicate through contracts (interfaces and data-contracts)
 - services are self-contained / understanding the service doesn't require looking at any other services
 - services are stateless... well... more like transactional
   - For example, a service could certainly save some data that was previously unknown and allow it to be retrieved by some reference. Each call musts be a complete transaction though. Save should not be split over two operations that expect to be called in sequence.

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

## Functional Foundations



also do a post of service orientation??
 - purity/statelessness
 - separation of data and operations
 - DI/IH

Other
 - not reusing variables
 - talk about composition as something I try to do, but struggle with because there isn't a clear expression for it (managers are basically the pipelines scott shows, organize flow and error handling)
   - not all composition equal, in c# it leads to lots of nesting, which means the composition often gets lumped together