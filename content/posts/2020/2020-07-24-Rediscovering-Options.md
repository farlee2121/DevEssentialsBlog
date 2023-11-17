---
date: "2020-07-24T00:00:00Z"
tags: [Software Architecture, Design Patterns, Configuration, Design thinking, Volatility Analysis, Case Study]
title: Rediscovering Options
aliases:
- /2020/07/24/rediscovering-options
---

Configuration is a powerful tool and a dangerous temptation. My goal in this post is to walk through the ways I mishandled configuration, ended up rediscovering the Options configuration pattern, and finally dive into specific design scenarios to show why Options is the most stable solution.
<!--more-->

First some motivation. Configuration is a powerful expression of the Open-Closed principle. It allows us to change the behavior of code without changing the code itself. This power to extend helps us trade many similar code paths for a single configurable path. Consider a calendar framework, it would be frustrating if you needed a different component to change the title, or color, or language, or date format, or so on. 

On the flip side, configuration can be dangerous because of it's seeming simplicity. Frameworks make config retrieval very easy, and so we are tempted to think that fetching a configuration value is an inconsequential decision. However, configuration can expose inner assumptions and quickly cause coupling throughout a program.

## My Mistakes

**Direct Config Access**  
In my early days, I used the .NET `ConfigurationManager` class to access configuration directly from any component that needed a configuration value. I didn't think much of it because it was easy to do. Eventually, this brought me two major pain points. 

1. I now had a bunch of configuration key literals scattered around my program. Changing a key in the configuration profile became a dangerous activity.  
2. I couldn't easily run tests with multiple configuration values. The Configuration Manager expects configuration to live in a `web.config` or `app.config` file. This meant that any part of my program using configuration required the existence of a config file, and there could only be one of them for all components (in a single runtime context). This means my tests could mess with each other if I tried to modify the config file to test with different configuration values.

It's worth noting that this also makes the dependency on the configuration values completely opaque. You have to either look at the code or run it and get errors to know what configuration values it needs.

**Config Accessors**  
This led me to my second design iteration, configuration accessors. The idea was to hide configuration behind a bunch of functions. This was modeled after the iDesign accessor concept (which is much like an anti-corruption layer).

This was much easier to test because it could be injected like any other dependency, and thus mocked like any other dependency. It also made configuration usage more readable because each configuration scenario was given a context-relevant name. The downside was implementing so many functions to access configuration. I also realized that implementing a function-based interface exposed my expectation that config values would come from a data store. Passing configuration values decided at write time or passed from the calling function required the excessive ceremony of a whole new accessor implementation. 


## Other designs
Here are some other configuration designs that I ruled out for my own work, but I have seen and experienced.
- **Static config wrapper**: A static `Configuration` class with methods like `GetConfigValue(KeyType key)`. This does effectively centralize decisions like config storage. It can also avoid constants and improve discoverability by using named constants for the keys. However, is still hard to test, creates an implicit config dependency, and is prone to leak knowledge of config values around the system. It also locks all consumers into the same configuration decisions.  
Using strings for the keys is a strictly inferior version that litters the program with literals.
- **Injected config utility**: Use key-based access to any configuration, but inject the helper instead of statically accessing the helper. This is easier to mock than the static version and allows different configuration implementations for different parts of the system. However, still falls short in making necessary configuration values clear. 
- **Config values as constructor parameters**: really just a sub-type of Options. The major weakness here is that directly using system types (like string, int, etc) can pile up fast and is more awkard to inject using reflection-based frameworks.
- **Combining config with related data access**: This is really just the accessor method, but mixing configuration value access with business entity access. This can work fine. The primary driver here is semantics. For example, theme preferences might fit with user access. However, configuration unrelated to the business domain probably shouldn't be handled this way.

## Options

At this point I knew I wanted my configuration design...
 - to be agnostic to where configuration values come from
   - it should be as easy to use the component from a quick console app where the values are set by hand in code as to fetch them from a file or database
 - To reduce duplicated logic for fetching configuration values that were needed in multiple components
 - Maintain testability
   - maintain independence of configuration values between components and instances of a component
 - Be capable of runtime configuration reloading
 - If the component needs to move to a new system then it shouldn't need to take any configuration utilities or files with it. I also shouldn't have to worry about separating out which config values should move or stay.
 - To be whitebox. A component should make all of it's configuration dependencies explicit and discoverable at write time.

Having the right list of constraints finally led me to a winning design. Configuration should be defined as a type with only data/properties. This type is specific to the component that uses it and is passed/injected through the constructor. How data gets into the object is decided externally. This clearly allows easy and discoverable configuration for manual situations like small console applications. Large applications can still enjoy easy and fairly centralized configuration by binding values through the Dependency Inversion container or in the composition root. 

Another benefit is that configuration types can be nested to reduce duplicated bindings of common config values. For example, you can make a DbConfig type that is used as a sub-property of component-specific config types. Then the DI container will take care of binding that value to all component-specific configs.

I set out to see if there was a framework that would help me bind configuration this way. As it turns out, Microsoft already had the same thoughts I did and built it into their 1st party configuration library for .NET Core. They named the pattern [Options](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration/options?view=aspnetcore-3.1) and recommend it as the preferred pattern for various common config scenarios. 


## Volatility comparison
Now let's look at various ways we might change our expectations and see how the different designs hold up. I'll be comparing: 
- Direct: Using a tool like ConfigurationManager to directly access configuration
- Static: Using a global static utility for accessing configuration. We'll assume named constant keys.
- Accessor: Using a module-specific type for injecting configuration. Values are returned by methods
- Options: Using a module-specific type for injecting configuration. Values are stored as properties.

Suppose we...

Add a configuration value
- Direct: Easy. Simply reference the key from desired component. 
- Static: Easy. Add a constant for the new value, and add a call in the relevant component.
- Accessor: Easy-ish: Add a method to the relevant type. Potentially create a new config accessor and add it to the composition root
- Options: Easy: Add a property to the relevant type. Potentially create a new config data type and inject it to the composition root 

Remove a configuration value
- Direct: Unsafe. Configuration can be referenced from anywhere and so all code is susceptible to change. You must search and test the whole system to ensure the value is no longer used. Any remaining references will throw a runtime error.
- Static: Unsafe, but easier. Configuration can be referenced from anywhere. You must check and test the every system that uses the configuration helper thoroughly because all code is susceptible to change. The search is aided by tooling. Remaining references will cause a compiler error because we're using named constants as value keys.
- Accessor: Easy, safe. Any missed usage of deleted method will be caught at compile time. Since the accessor is created for a certain component, only that component needs to be retested.
- Options: Easy, safe. Any missed usage of deleted method will be caught at compile time. Since the type is created for a certain component, only that component needs to be retested.

Change config storage (i.e. database)
- Direct: must change every module that uses configuration
- Static: Only need to change the static configuration helper, but every caller is potentially exposed to changed behavior or errors.
- Accessor: The source can be changed per configuration value independently. Only the changed values need to be tested and redeployed. 
- Options: The source can be changed per configuration value independently. Only the changed values need to be tested and redeployed. It is likely that you will fetch all configuration values for a given type from the same sources though. Still only affects the one component

Pull from multiple config sources. (different values from different stores)
- Direct: possible, have must change every component that wants a different store
- Static: possible but awkward. Requires internal lookup of config keys to expected store
- Accessor: easily defined per value
- Options: easily defined per type and not very hard per value

Pull from multiple config sources (same value coming from a prioritized list of sources)
- Direct: Explosive code duplication
- Static: Possible and centralized. Errors can leak to every caller and only show when the code path is executed.
- Accessor: Possible, but not well centralized. Must change every accessor that needs multiple sources (or add another abstraction layer)
- Options: Possible and centralized. Any errors happen at bind time. Most likely on application start with the creation of the composition root.

Run parallel tests with different configuration values
- Direct: Depends on framework. Probably not possible or at least non-trivial
- Static: not possible
- Accessor: possible, requires mocking
- Options: Possible, does not require mocking

Use same component with different configuration in different parts of the system (i.e. Connect to two databases to transfer data. Access a different data store with same schema for different use cases)
- Direct: Not possible
- Static: Not possible
- Accessor: possible but not elegant
- Options: possible and easy

Enable configuration values per culture/language
- Direct: Depends on framework, probably not possible. At least requires explosive code changes
- Static: Possible, probably need to change every caller
- Accessor: Possible and easy (can always inject the culture). At most need to change every config accessor
- Options: Possible and easy. Probably only need to change composition root.

White label platform, load config per whitelabel customer allowing shared infrastructure with different behavior and potentially different storage/resources
- effectively the same question as culture except...
- Static: Cannot reliably manage more than one customer per deployment since static values are shared between threads and instances. Causes significant concurrency issues.

Re-use component directly from a new client (i.e. console app as a quick utility)
- Direct: configuration needed by component is completely opaque. Have to look at code or run it and see errors to know what values are needed. The new client must reference the same configuration framework and have the same configuration resources (i.e. files)
- Static: same as direct, must also drag the static config utility into the new client. Helper likely exposes all of the possible configuration values from the rest of the system whether relevant or not.
- Accessor: Either implement a new accessor or setup the same resources as the old use case. 
- Options: trivial to manually bind configuration or use a different binding framework.

Move component to a new system
- Essentially the same as the new client question, but much more painful.

Release as library 
- Essentially the same as the new client and new system questions. However, the direct and static designs become completely untenable since the user cannot realistically be expected to explore the code or repeatedly sift through error messages to discover config dependencies. No user would find implementing new accessors an acceptable configuration paradigm. Options is exactly the kind of configuration we would expect.


## Summary

Configuration is a sharp tool. Used poorly, it makes our components difficult to reuse or separate. Used well, it amplifies testability and extensibility. Sadly, the most apparent and direct ways of consuming configuration end in poor design. Only the Options pattern is unshaken by the many volatilites expected of configuration.

I find it appropriate that the pattern we would immediately expect from any [extension-friendly framework](https://blog.ploeh.dk/2014/05/19/di-friendly-framework/) ends up being the most stable solution for our own code too.
