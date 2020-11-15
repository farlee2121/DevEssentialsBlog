---
layout: post
tags: [Architecture, Patterns, Clean Architecture]
---

# Ports and Adapters

Understanding [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) has transformed my approach to architecture. Now I feel like my understanding has evolved one step further by understanding it's parent pattern's name, Ports and Adapters.

Ports and Adapters is more commonly known as Hexagonal Architecture. While the name confused me at first, I've come love it as a strong analogy for the core intent of this family of patterns.

## Core Analogy
It isn't talking about ports as in :8080 or adapters in the OO design pattern sense. Think of it more in the hardware sense. Each machine makes external communications available through a set of ports. If another device doesn't have the right plug for the port, then it uses an adapter. This combination of ports and adapters allow us to interface all kinds of devices while leaving each device to only worry about the single standard that meets its needs. Sometimes, adapters can even plug multiple devices into the same port.

Clean Architecture-family structures are the same. The caller defines "ports" which expose how anything external may communicate with the service. The ports are not concerned with what the external services may be, just how they can communicate to the service that owns them.

Other services define their public contracts which act like their "plug". If the plug doesn't fit, then programmers provide and "adapter" to connect the plug to the port. The adapter works for any two services as long as they meet the same "plug" and "port" standards.

Side-note: I feel like this is where IDesign comes in handy. Engines, accessors, and utilities look for those consistent "plugs" in system activities. Their might be many implementations for a message communication system, but as long as they meet the same plug standard they work for all of the same adapters in the system.

## Visualization
I love this analogy because it lends itself to a familiar visualization. The visual gives us a tangible feel for why the structure is flexible and how it's suppose to work. It's like our hardware.
- we separate by the features we want to be portable into separate components
- No one like to lots of cable plugging. Each device should include all the things we want available together.
- The more things a device (and service) do the more expensive it'll be
- Outlier requirements often need specialized connections (extreme performance, tight related activities)

The visual also reveals other properties we may not have seen at first. For example, the connection between components really matters. A slow cable means slow processing and operations that needs to be really fast or are should be handled with specialized hardware connections, often within the device. On the flip side, the adapter can improve flexibility by using wireless communication.

In the same way, our how our services communicate can be hidden by the adapter. The adapter may put the other service behind a queue for reliability or run code on a different server for scalability. However, it's generally best to default to the simplest and fastest cable: in-process method calls.

## Language-Agnostic

I also love how the Ports and Adapters analogy leaves out any notion of language constructs. [This reddit thread](https://www.reddit.com/r/rust/comments/jriowl/my_first_impression_and_some_questions_regarding/?utm_source=share&utm_medium=ios_app&utm_name=iossmf) shows some developers struggling to map Clean Architecture to Rust because they aren't sure how to implement DI without interfaces.

However, the Ports and Adapters doesn't say anything about interfaces. It's just some consistent means of exposing extension points and the paired means of fitting into them. This leaves helps my mind stay open to what a "port" means in different paradigms.
- in OO: ports are interfaces
- in functional languages: ports are function signatures
- in Rust: ports, apparently, are traits

## Conclusion

I consider Clean Architecture an indispensible tool for how I think about systems, but I found it difficult to comprehend and communicate. Ports and Adapters imparts the same core benefits and structure, but comes with the added benefit of a strong visual analogy to communicate the pattern with fellow developers!

<!-- A great solid structure explanation would be to put different idesign services on different hardare devices (probably managers as the core computer, client as monitor) and show them plugging in -->
