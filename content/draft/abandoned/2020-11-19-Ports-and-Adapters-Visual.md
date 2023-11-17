---
date: "2020-11-19T00:00:00Z"
draft: true
tags: [Software Architecture, SOLID Structure, IDesign, Clean Architecture]
---

# Ports and Adapters+ Visualized

I love the [Ports and Adapters metaphor](./2020-11-14-Ports-and-Adapters.md) for flexible plugin-style architecture. Here I'll use the analogy to visualize [my mix of Clean Architecture and IDesign](./2020-09-17-Solid-Structure-Checkin.md).

Each service defines it's ports for extension based on only it's own needs. You can think of it as every service has it's own port standards for both input and output.

![port standards](../../static/post-media/Ports-And-Adapters-Visual/port-lineup.drawio.svg)
*Since using a bunch of port icons is a pain, I'll be relying on letters as valid port types.*


Fortunately, port adapters are easy to make in software. All we need is a thin layer for mapping between standards. 

![adapter example](../../static/post-media/Ports-And-Adapters-Visual/adapter.drawio.svg)

*For those familiar with OO patterns, the Adapter, Facade, and Bridge patterns all satisfy this hardware-ish idea of adapter. It could be any of them since we aren't picky about the semantics of what is mapped to.*

Different kinds of service layers liken to different kinds of hardware we might connect
- **Clients -> Monitor and keyboard:** Responsible for communication to and from a consumer of the system. Kinda like an adapter to and from the user. It should mostly just pass on to a manager.
- **Managers -> Computer:** The heart of the system responsible for organizing and delegating usecases.
- **Engines & Accessors -> Custom peripheral devices:** Could do just about anything that we want to reuse. Should be self-contained so they can be moved around. Different from utilities in that these likely can't be bought standard as they're specific to our line of business.
- **Utilities -> Standard peripherals:** Common pluggable extensions many systems would use. Wireless communication, user verification, printing, ...  

![System visual](../../static/post-media/Ports-And-Adapters-Visual/system.drawio.svg)


New connections just require new adapters. Adapters can also connect multiple devices.

![New Connections]()

Replacing a peripheral just means a new adapter, the core manager doesn't change. A peripheral can also change how it works without system change as long as it keeps the same port standard.

![Replacing Service]()

Adapters don't have to just be wired. They can change the communication, like wireless adapters or diagnostic tools do. A system might practically implement this as remote api calls or message queues.

![Remote adapters]()
<!-- is this where i put and adapter adapter like logging? -->

## Wrap up
I love the way these hardware analogies provide a mental image for different responsibilites and where they live. I feel like I can intuitively point to a place on the picture and say for any type of behavior.

Not a perfect analogy, as always, but I look forward to seeing how it facillitates teaching the pattern to others.



<!-- 

things that could be accessories
- thumb drive
- thermometer


port types I could use / easily visualize
- co-axial
- usb-a
- usb-c
- usb-b
- could probably find micro-usb icon
- 


how can i differentiate the ports?
- shape 
- color
- outline 
-->