---
date: "2021-03-12T00:00:00Z"
tags:
- Dependency Injection
- Design Patterns
title: Service Locator Hides Circular References
---

Many have discussed the issues with the service locator anti-pattern for dependency management. However, I've repeatedly run into an issue that I haven't seen discussed yet: it causes circular references. 

## Existing Arguments

For some existing materials, Mark Seemann wrote a [strong case](https://blog.ploeh.dk/2010/02/03/ServiceLocatorisanAnti-Pattern/) against various forms of Service Locator. Even Microsoft discourages the practice in their [DI framework documentation](https://docs.microsoft.com/en-us/dotnet/core/extensions/dependency-injection-guidelines#recommendations).

In short, service locator couples all components that depend on the locator and requires developers to examine code to know what dependencies are needed. This greatly harms portability, and almost completely prevents reuse of code between projects.

## New Case: Circular Dependencies

At least four systems I've consulted on have suffered from nasty circular dependencies. All of them used the service locator pattern.

This is not a coincidence. Let's clarify by contrasting against constructor injection.

### Constructor injection
**Eager**: Constructor Injection requires all dependencies to be defined when a component in instantiated. This lends itself to an eager dependency approach. Any circular dependencies would be triggered in the composition root. This most likely means the system fails on startup, or at latest when the broken component is first created.

**Explicit**: Constructor Injection is also explicit about dependencies. All dependencies are (usually) assembled in a composition root. Trying to create one of the circular dependencies will immediately force the developer to realize that they can't create all the dependencies needed without already having the type they're trying to create.

### Service Locator

The properties that prevent circular dependencies in Constructor Injection are opposed by Service Locator.

**Lazy**: A dependency isn't created until the dependency is requested. It is tempting to create services per-method or even ad-hoc for each call. Any dependencies not directly invoked will not be constructed. This means that circular dependencies only trigger when specific methods repeatedly invoke each other. 

**Hidden**: Constructing a component doesn't require any dependencies. They are registered somewhere unknown for the system at large. We don't know what the current component depends on unless we examine the code. Any missed dependencies won't error until they are invoked.

### The Contrast
The eager and explicit nature of Constructor Injection pushes failures to the earliest moment, often design-time or startup.

Conversely, Service Locator ensures that we find dependency errors at the last moment possible. Probably at runtime and even in production.

Circular dependencies are rarely direct. The only way a developer can be sure there are no circular dependencies with Service Locator is to trace every dependency chain every time they add a dependency. 

I don't know any developers who are that disciplined. That also sounds like a boring, time consuming, and unsustainable practice. It is no surprise that some developer eventually sees a method they need, and takes it without considering downstream dependencies. This behavior accumulates over time, increasing the chance of circular dependency until they are almost a guarantee. The longer the system lives, the more this happens, and the harder it is to fix.

## Conclusion

Service Locator is an anti-pattern. The natural tendency to obscure circular dependencies is one more reason not to use it. 

