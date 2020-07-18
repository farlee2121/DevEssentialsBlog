Setup what i've tried, what i've landed on, and then use specific cases to demonstrate the difference
---
layout: post
tags: [Architecture, DDD, iDesign, Reading Notes]
---

# Rediscovering Options

Configuration is a powerful tool and a dangerous temptation. My goal in this post is to walk through the ways I mishandled condiguration, ended up rediscovering the Options pattern, and finally dive into specific design scenarios to show why Options is the most stable solution.

First some motivation. Adding configuration is powerful because it
 - removes literals from our programs
 - adds deployment-time flexibility
 - can change system behavior without code deployment
 - and consolidate potential duplicated code

// do I really want to give examples here? do I care if people don't understand why we want configuration?
For example, imagine jQuery UI if it didn't allow you to set the animation time and delay. It would be useless because few people will always want the same animation

On the flip side, configuration can feel deceptively trivial. Frameworks make config retrieval very easy, and so we are tempted to think that fetching a configuration value is an inconsequential decision.

In my early days, I used the .NET `ConfigurationManager` class to access configuration directly from any component that needed a configuration value. I didn't think much of it because it was easy to do. Eventually, this brought me two major pain points. 

Fist, I now had a bunch of configuration key literals scattered around my program. Changing a key in the configuration profile became a dangerous activity.  
Second, I couldn't easily run tests with multiple configuration values. The Configuration Manager expects configuration to live in a `web.config` or `app.config` file. This meant that any part of my program using configuration required the existence of a config file, and there could only be one of them from all components (in a single runtime context). This means my tests could mess with each other if I tried to modify the config file for tests with different configuration values.

This led me to my second design iteration , configuration accessors. The idea was to hide configuration behind a bunch of functions. This was much easier to test because it could be injected like any other dependency, thus mocked like any other dependency. It also made configuration usage more readable. The downside was implementing so many functions to access configuration.  
I also realized that implementing a function-based interface exposed my expectation that values would come from a data store. It would be awkward to pass configuration directly from a calling piece of code.

At this point I knew ...
 - show how nested types is much easier. Give actual code example like binding db config only once, but reusing it in multiple config types

## Other designs
Here are some other configuration designs that I ruled out for my own work, but I have seen and experienced.
- Static Config wrapper: have a static `Configuration` class with methods like `GetConfigValue(KeyType key)`. This does abstract the config storage. This method works fairly well with constants for the keys, but is still hard to test, creates an implicit config dependency, and is prone to leak knowledge of config values around the system. Using strings for the keys is a strictly inferior version that litters the program with literals.
- Injected Config Wrapper: still use key-based access to any configuration, but inject the helper instead of statically accessing. Easier to mock than the static version, but not any clearer about what configuration values a component needs.
- Config values as constructor parameters: really just a sub-type of Options. The major weakness here is that directly using system types (like string, int, etc) can pile up fast and is more awkard to inject using relection-based frameworks.
- Combining config with related data access: This is really just the accessor method, but mixing configuration value access with business entity access. This can work fine. The primary driver here is semantics. Configuration like theme preference might fit, but configuration unrelated to the business domain probably shouldn't be handled this way.

## Volatility comparison
Now let's look at various ways we might change our expections and see how the different design categories hold up. I'll be comparing: 
- Direct: Using a tool like ConfigurationManager to directly access configuration
- Static: Using a global static utility for accessing configuration. We'll assume constant keys.
- Accessor: Using a module-specific type for injecting configuration. Values are returned by methods
- Options: Using a module-specific type for injecting configuration. Values are stored as properties.

Suppose we want to change 

Add a configuration value
- Direct: Easy. Simply reference the key from desired component. 
- Static: Easy. Add a constant for the new value, and add a call in the relevant component.
- Accessor: Easy-ish: Add a method to the relevant type. Potentially create a new config accessor and add it to the composition root
- Options: Easy: Add a property to the relevant type. Potentially create a new config data type and inject it to the composition root 

Remove a configuration value
- Direct: Unsafe. Configuration can be referenced from anywhere. You must search and test the whole system to ensure the value is no longer used. Any remaining references will throw a runtime error.
- Static: Unsafe, but easier. Configuration can be referenced from anywhere. You must check and test the every system that uses the configuration helper to ensure the value is no longer used. The search is aided by tooling. Remaining references will cause a compiler error because we're using named constants as value keys.
- Accessor: Easy, limited scope. Any missed usage of deleted method will be caught at compile time. Since the accessor is created 
- Options: 

- change config storage (i.e. database)
  - Direct: must change every module that uses configuration
  - Static: Only need to change the static configuration helper
- pull from multiple config stores
- run parallel tests with different configuration values
- use component directly from a console app
- move component to a new system
- Enable configuration per culture
- White label system, config per customer (consider split vs shared deployment)
- Release as library (yes, this really highlights the discoverability aspect)

Split up config values??
What situation show potential nesting different (i.e. many things want database info, but may also each need other unrelated data)