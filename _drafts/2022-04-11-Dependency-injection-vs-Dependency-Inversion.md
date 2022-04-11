---
layout: post
tags: [SOLID, Dependency Inversion, Software Design]
---

# Dependency Inversion > Dependency Injection

[Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) has gained popularity in recent years. This is a good this, but Dependency Injection does not enjoy the full benefit of [Dependency Inversion](https://en.wikipedia.org/wiki/Dependency_inversion_principle) perscribed the the [SOLID principles](https://en.wikipedia.org/wiki/SOLID). This post will clarify the difference and some of the addition power enjoyed by Dependency Inversion.

<!-- 
TODO: make sure I highlight that this breaks semantic tension between caller and implementation and prevents otherwise likely semantic coupling between callers through their dependencies.
 -->

## Definitions and difference

First, to define the two concepts
- Dependency Injection -> dependency instances are constructed externally and provided to a component
- Dependency Inversion -> A component depends on *abstractions it defines itself*. Implementations are created in separate and unreferenced assemblies. The component and implementations of it's abstract dependencies are then referenced by some third party and composed together with dependency injection, generally by the top level of the program.

The key difference is that Dependency Inversion mandates *abstractions belong to the callers.*

## Injection and Inversion Samples

Let's look a few quick examples. 

This code follows dependency injection, but not inversion. The `RecipeManager` does not own the `SendGridClient` type. In fact, the email client is owned by a 3rd party library. However, this code does follow dependency injection. `RecipeManager` doesn't know how `SendGridClient` is constructed. `RecipeManager` doesn't know about api keys or other configuration and dependencies of `SendGridClient`. It simply receives an instance an uses it.
```cs
class RecipeManager{

    SendGridClient emailClient;
    public RecipeManager(SendGridClient emailClient){
        this.emailClient = emailClient;
    }
}
```

Here's a sneakier sample of injection, but not inversion. In this case the manager is depending on an abstraction. It could accept all kinds of implementations of recipe accessor: SendGrid, MailGun, etc. However, it does not own the `IEmailAccessor` abstraction, so this is still not inversion. The manager still needs a design-time dependency on the accessor's assembly. The manager also must bend to the semantics of the dependency, even if we split out the interface into a new assembly.

```cs
// RecipeManager.cs
class RecipeManager{

    IEmailAccessor emailClient;
    public RecipeManager(IEmailAccessor emailClient){
        this.emailClient = emailClient;
    }
}

// RecipeAccessor.cs

public interface IEmailAccessor{
    void SendEmail(Email to, Email from, string subject, string message);
}

public class SendGridRecipeAccessor : IRecipeAccessor{

    public SendGridRecipeAccessor(SendGridClient emailClient){

    }

    public void SendEmail(Email to, Email from, string subject, string message){
        //...
    }
}
```

An inversion-based approach requires the manager to define it's own abstraction. An adapter assembly depends on the `RecipeManager` service and maps the manager's need into some concrete implementation.

```cs
// RecipeManager.cs
public interface IRecipeEventNotifier{
    void RecipePublished(RecipeId recipeId);
}

class RecipeManager{

    IRecipeEventNotifier notifier;
    public RecipeManager(IRecipeEventNotifier notifier){
        this.notifier = notifier;
    }
}

// RecipeManager.Notifications.SendGrid -> SendGridRecipeNotifier.cs

public class SendGridRecipeNotifier : IRecipeEventNotifier{

    public SendGridRecipeAccessor(SendGridClient emailClient){

    }
    void RecipePublished(RecipeId recipeId){

    }
}
```

Moving the dependency abstraction (i.e. `IRecipeEventNotifier`) into the caller (i.e. `RecipeManager`). Means the caller doesn't have to worry about anyone else's needs. It can define the interface to it's own semantics and let implementations figure out details. This semantic insulation is key to reusable components and flexible systems.



## Benefits of Dependency Inversion (over injection)

The samples already listed some benefits of dependency injection and inversion.

Injection is good because it decouples our components from knowledge of how it's dependencies are constructed. This allow systems to centralize instantiation and configuration. With abstract dependencies, this means different implementations can be swapped without modifying consuming components.

Dependency inversion reaps even greater benefits by requiring callers to define their own dependency abstractions. This breaks semantic coupling to dependencies. Benefits of this break include
- Callers flow more naturally because they don't work around dependency semantics
- Multiple consumers of a dependency do not accidentally leak expectations to each other through needs they impress on the dependency.
- Dependency implementations don't need to worry about accommodating caller semantics. This leads to more generic dependency implementations that can be more widely reused, which respects the [Open-closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle).
- The caller does not know about any abilities of a dependency that it doesn't need. This minimizes coupling and respects the [Interface Segregation Principle](https://en.wikipedia.org/wiki/Interface_segregation_principle).
- Information hiding is increased. Core services (ususally domain rules) become the lowest design-time layer. This results in low churn to our most central domain components.
  - The smaller and more flexible adapters encapsulate responsibility for dependency changes
  - Services can more easily compose new behavior (e.g. new kinds of notification in the earlier sample) by adding adapters rather than modifying the service.
  - Services can more readily adapt to new environments. For example, new programs with different langauge versions, framework versions, different storage, different application goals. The core business rules are maximally portable with contextual concerns delegated to the abstract dependencies. 
  - Non-shared behaviors are also simplified. They can be implemented directly in an adapter without worrying about speculative reuse or a general interface, and the service is still not coupled to an implementation.


One of my favorite results is composition of adapters. Semantic focus of abstractions is much tighter, since the caller defines it's own dependencies. This also improve changes that all actions on given dependency will change for the same reasons. Similarly, we can reliably call multiple implementations that respond to the service need in different ways, but for the same motivation.

Events are a major application. They allow response to service actions without the service knowing about subscribers, or subscribers knowing about each other. 

Consider our earlier `IRecipeEventNotifier`. There could be separate notifiers for email, text, in-app alerts, or even internal system responses. Each approach is independent. The app can then configure as many or few of them as desired using a composite notifier 

```cs
public class CompositeRecipeEventNotifier: IRecipeEventNotifier{
    private IRecipeEventNotifier[] notifiers;
    public SendGridRecipeAccessor(IRecipeEventNotifier[] notifiers){
        this.notifiers = notifiers;
    }
    void RecipePublished(RecipeId recipeId){
        foreach(IRecipeEventNotifier notifier in notifiers){
            notifier.RecipePublished(recipeId);
        }
    }
}

// Elsewhere

new RecipeManager(
    new CompositeRecipeEventNotifier(new IRecipeEventNotifier[] {
        new SendGridRecipeEventNotifier(),
        new InAppAlertRecipeEventNotifier(),
        new SearchIndexRecipeEventNotifier(),
    })
)
```

Other common applications include
- Migration: composite to read from original store while writing to both until new store is ready
- Caching: Can wrap a port with a caching decorator without changing service or the implementing adapter
- Retry / failure policy: again added as a decorator
- Transport/protocol: requests to a port/service can be moved out of process without service or adapter changing, only a new decorator (and maybe a new client) 
- Authorization: decorate an interface that an implementation that checks authorization, then passes on to another implementation or throws an unauthorized exception ([example](https://github.com/farlee2121/DependencyInversionExample/blob/65ddb973949131b1367d143e791bd378331a062e/src/Managers.RecipeManagementService.Adapters/Identity/AuthorizedRecipeManagementServiceDecorator.cs))

I've started a [repository](https://github.com/farlee2121/DependencyInversionExample) for demonstrating inversion and some techniques it empowers. I also wrote [Patterns in Practice](../_posts/2021-07-09-Patterns-in-Practice.md), which describes how I use this approach and other patterns to design systems.


## Conclusion

Dependency Inversion takes Dependency Injection a step further by requiring callers to define their own dependency abstractions. This choice breaks semantic tension between callers and implementations leading to powerful improvements in component reusability and stability.



