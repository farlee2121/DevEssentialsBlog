---
date: "2022-06-24T00:00:00Z"
tags: [Dependency Injection, Constructor Injection]
title: "Misconception: Constructor Injection Exposes Dependency Chains"
---

I've struggled with explaining Service Locator as an anti-pattern. I've addressed [certain cons of service locator](../posts/2021-03-12-Service-Locator-Hides-Circular-Dependencies.md) and pros of constructor injection. However, I think I overlooked a fundamental misconception that would reasonably push developers away from constructor injection: a belief that constructor injection exposes dependency chains across the system.
<!--more-->

## The Misconception

Let's dig into that misconception with a concrete example.

Suppose we have a component `MidService`
```cs
class MidService{
    public MidService(Dependency1 dep1, Dependency2 dep2){
        //...
    }
}
```

The misconception is that some consumer of MidService would need to know about and provide Dependency1 and Dependency2.

```cs
class TopService
{
    public TopService(Dependency1 dep1, Dependency2 dep2){
        var midService = new MidService(dep1, dep2);
    }
}
```

If this were true, it would make for a fragile and nasty code base. Higher level services would need to know about a compounding list of dependencies. The high level services would be fragile due to necessary change if any lower level dependency is modified. Our whole system would be coupled to our dependency chains.

It's understandable a developer would prefer service locator if this is the consequence they expect from constructor injection. Fortunately, this isn't true.


## Misconception Debunked by Example

Constructor injection is truly a form of dependency injection. It expects a component to define it's *direct* dependencies. Instances of those dependencies are then provided ready-for-use. The consuming component has no knowledge of dependency configuration or construction, including any dependencies of it's dependencies.

Consider the following dependency chain. This sample is also [available to clone and run](https://github.com/farlee2121/DependencyInversionExample/blob/65ddb973949131b1367d143e791bd378331a062e/test/RecipeManagementService.Tests/SmallConstructorInjectionSample.cs) if you want to experiment.

```cs
public class TopLevel
{
    private readonly Mid1 dep1;
    private readonly Mid2 dep2;
    public TopLevel(Mid1 dep1, Mid2 dep2)
    {
        this.dep1 = dep1;
        this.dep2 = dep2;
    }

    public string TestMe()
    {
        return $"TopLevel with dep1:|{dep1.TestMe()}| and dep2: |{dep2.TestMe()}|";
    }
}

public class Mid1
{
    public record Config(string message);

    private readonly Config config;
    private readonly LowestService lowest;
    public Mid1(Config config, LowestService lowest)
    {
        this.config = config;
        this.lowest = lowest;
    }

    public string TestMe()
    {
        return $"(Mid1 with {config.message} and |{lowest.TestMe()}|)";
    }
}

public class Mid2
{
    private readonly LowestService lowest;
    public Mid2(LowestService lowest)
    {
        this.lowest = lowest;
    }

    public string TestMe()
    {
        return $"(Mid2 with |{lowest.TestMe()}|)";
    }
}

public class LowestService
{
    public record Config(string message, int otherConfig);


    private readonly Config config;
    public LowestService(Config config)
    {
        this.config = config;
    }

    public string TestMe()
    {
        return $"(Lowest: {config.message}, {config.otherConfig})";
    }
}
```

Each layer only knows about it's direct dependencies. For example, `TopLevel` knows it needs `Mid1` and `Mid2`. However, it does not know that `Mid1` and `Mid2` have dependencies of their own. It knows nothing of `LowestService` or `Mid1.Config`.

A running system can then be composed in the top level of the application. This is called the composition root. Such a root usually only needs defined once per application, but how the root is referenced depends on the application model. 

```cs
public void SeeItRun(){
    var sut = new TopLevel(
        new Mid1(
            new Mid1.Config("I'm configured"), 
            // note multiple uses of lowest service. Each can be configured differently
            new LowestService(new LowestService.Config("something", 1))
        ),
        new Mid2(
            new LowestService(new LowestService.Config("something else", 2))
        )
    );

    var testString = sut.TestMe();
}
```

Like Service Locator, each component knows only about it's direct dependencies.

Unlike Service Locator, each component makes it's dependencies clear through the constructor. This means that we can flexibly use components in different contexts. We can compose them into a system with a composition root, or we can use subsets of the dependency tree on their own for other applications. Diverse consumers know what they must provide for a working component without looking at a component's code.

## Conclusion

Constructor injection does **not** require consumers to know about 2nd+ order dependencies and couple our application to it's dependency chain. Each component only knows about it's direct dependencies and should expect to receive ready-made instances. Thus, constructor injection provides the same about of information hiding between components as service locator with the added benefit of clear component requirements (via the constructor) across any context.
