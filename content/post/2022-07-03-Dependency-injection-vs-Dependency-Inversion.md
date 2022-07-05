---
date: "2022-07-03T00:00:00Z"
tags:
- SOLID
- Dependency Inversion
- Software Design
---

# Dependency Inversion > Dependency Injection

[Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) has gained popularity in recent years. This is good, but Dependency Injection does not enjoy the full benefit of [Dependency Inversion](https://en.wikipedia.org/wiki/Dependency_inversion_principle) perscribed the the [SOLID principles](https://en.wikipedia.org/wiki/SOLID). This post will clarify the difference and some of the addition power enjoyed by Dependency Inversion.


## Definitions and difference

First, let's define the two concepts
- Dependency Injection -> dependency instances are constructed externally and provided to a component ready-to-use
- Dependency Inversion -> A component depends on *abstractions it defines itself*. Implementations are created in separate and unreferenced assemblies. The component and implementations of it's abstract dependencies are then referenced by some third party and composed together with dependency injection, generally by the top level of the program in a composition root.

The key difference is that Dependency Inversion mandates *abstractions belong to the callers*.

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

Here's a sneakier sample of injection, but not inversion. In this case the manager is depending on an abstraction. It could accept all kinds of implementations of IEmailClient: SendGrid, MailGun, etc. However, RecipeManager does not own the `IEmailClient` abstraction, so this is still not inversion. The manager still needs a design- and compile-time dependency on the email client's assembly. The caller (RecipeManager) must bend to the semantics of the dependency because the dependency abstraction is defined on the dependency's terms. This is true even if we split the email client interface into a separate assembly from the email client implementation(s).

```cs
// RecipeManager.cs
class RecipeManager{

    IEmailClient emailClient;
    public RecipeManager(IEmailAccessor emailClient){
        this.emailClient = emailClient;
    }
}

// EmailClient.cs

public interface IEmailClient{
    void SendEmail(Email to, Email from, string subject, string message);
}

public class SendGridEmailClient : IEmailClient{

    public SendGridEmailClient(SendGridClient emailClient){

    }

    public void SendEmail(Email to, Email from, string subject, string message){
        //...
    }
}
```

An inversion-based approach requires the caller to define it's own abstraction. An adapter assembly then depends on the `RecipeManager` service and maps the manager's need into some concrete dependency implementation.

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
        // get recipe
        // send email
    }
}
```

Moving the dependency abstraction (i.e. `IRecipeEventNotifier`) into the caller (i.e. `RecipeManager`). Means the caller doesn't have to worry about anyone else's needs. It can define the interface to it's own semantics and let implementations figure out details. This semantic insulation is key to reusable components and flexible systems.

Consider the notification example. Ignoring the dependency implementation led to a much more general notification abstraction. Now recipe notifications are not tied to email. We could as easily swap in push notifications, in-app notifications, text messages, or even queue search indexing and other system responses to a recipe publication.

## Benefits of Dependency Inversion (over injection)

Injection is good because it decouples our components from knowledge of how its dependencies are constructed. This allow systems to centralize instantiation and configuration. Abstract dependencies additionally allow different implementations to be swapped without modifying the consuming components.

Dependency inversion reaps even greater benefits by requiring callers to define their own dependency abstractions. This breaks semantic coupling to dependencies. Benefits of this break include
- Callers flow more naturally because they don't work around dependency semantics
- Core services (ususally domain rules) become the lowest design-time layer. This results in low churn to our most central domain components.
- Information hiding is increased. 
  - Multiple consumers of a dependency do not accidentally leak expectations to each other through needs they impress on the dependency.
  - The smaller and more flexible adapters encapsulate responsibility for dependency changes
  - Services can more easily compose new behavior (e.g. new kinds of notification in the earlier sample) by adding adapters rather than modifying the service.
  - Services can more readily adapt to new environments. For example, new programs with different langauge versions, framework versions, different storage, different application goals. The core business rules are maximally portable with contextual concerns delegated to swappable dependencies. 
- Dependency implementations don't need to worry about accommodating caller semantics, they can fit to caller semantics with a thin adapter. This leads to more generic dependency implementations that can be more widely reused. This respects the [Open-closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle).
- Non-shared behaviors are also simplified. They can be implemented directly in an adapter without worrying about speculative reuse or a general interface, and the service is still not coupled to an implementation.
- The caller does not know about any abilities of a dependency that it doesn't need. This minimizes coupling and respects the [Interface Segregation Principle](https://en.wikipedia.org/wiki/Interface_segregation_principle).

## Key Benefit: Composed dependencies
Composable dependencies is one of my favorite results of dependency inversion.

The semantic focus of dependency abstractions (i.e. [ports](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software))) is much tighter, since they only serve the one service. This also improve chances that all actions on given port/abstraction will change for the same reasons. Similarly, we can reliably call multiple port implementations that respond to the service need in different ways, but for the same motivation.

Events are a key example. Events allow response to service actions without the service knowing about subscribers, or subscribers knowing about each other. 

Consider our earlier `IRecipeEventNotifier`. There could be separate notifiers for email, text, in-app alerts, or even internal system responses. Each approach is independent. The app can then configure as many or few of these event handlers as desired using a composite notifier 

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

Other common applications of these composites include
- Migration: use a composite to read from original data store while writing to both stores until new store is ready to take over
- Caching: wrap a port with a caching decorator without changing service or the wrapped implemention
- Retry / failure policy: again added as a decorator. No change to the service or dependency
- Transport/protocol: requests to a port or service can be moved out of process without changing the service or port implementations. Just wrap the out-of-process component with a new decorator (and maybe a new client to receive the calls if the protocol requires it) 
- Authorization: decorate an interface with an implementation that checks authorization, then passes on to another implementation or throws an unauthorized exception ([example](https://github.com/farlee2121/DependencyInversionExample/blob/65ddb973949131b1367d143e791bd378331a062e/src/Managers.RecipeManagementService.Adapters/Identity/AuthorizedRecipeManagementServiceDecorator.cs))

I've started a [repository](https://github.com/farlee2121/DependencyInversionExample) for demonstrating inversion and some techniques it empowers. I also wrote [Patterns in Practice](../_posts/2021-07-09-Patterns-in-Practice.md), which describes how I use this approach and other patterns to design systems.


## Conclusion

Dependency Inversion takes Dependency Injection a step further by requiring callers to define their own dependency abstractions. This choice breaks semantic tension between callers and implementations leading to powerful improvements in component reusability and stability. Inversion, over injection, is critical to supporting other SOLID principles like the Open-Closed Principle and the Interface Segregation Principle.



