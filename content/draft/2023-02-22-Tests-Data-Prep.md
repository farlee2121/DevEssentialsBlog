---
date: 2023-02-22
tags: [testing]
title: Evolving Test Data Arrangement
---

<!-- 

- TODO: link to files in sample repo for particular examples?
- TODO: Do I need a conclusion?
  - what would I conclude? I suppose that it's a nice view of the journey to injection with composition roots?
- TODO: consider a TestApi variation of the motivating test
-->

This post recounts my journey to understand tests data arrangement from before my blogging days. This exploration cemented key lessons in reusability and composition.
<!--more-->

Disclaimer, the methods I devised in this journey do not reflect my current approaches to testing. My testing approach was transformed by the [TestApi](../posts/2022-05-16-TestApi-and-Test-reuse-in-CSharp.md) approach a few years ago. I'll cover some of why TestApi renders my Test Data Prep approach unnecessary at the end of the post.

Even though I don't follow Test Data Prep anymore, the journey was formative for my understanding of reuse and composition. Perhaps reliving the journey can help someone else.

Code examples will be drawn from a [demo system](https://github.com/farlee2121/TestingPatterns) I made alongside one of my first tech talks.



## Motivations

I went into this journey believing that tests are critical to maintainable software systems. Tests should deliver value such as
- Reduced bugs
- Early detection of defects (which saves lots of time)
- Code documentation
- Pressure toward good practices (It's hard to test poorly designed systems)
- Confidence to make changes and believe the system still works

However, tests themselves can become difficult to maintain.

Some of the key problems I focused on were
- Fragility: Inline data arrangement can cause wide-spread changes to tests whenever data contracts change.
- Readability: Complex data arrangement and assertions decrease test readability.
- Ease of writing tests: Complex data arrangement is tedious and 

I was simultaneously exploring problems like
- Stable and Independent Execution: the tests should not share state. That could cause non-deterministic outcomes and flakey tests
- Speed: Tests coupled to external data stores are slow
- Integration tests: New challenges arise when components work together, but writing a whole suite separate suite of integration tests is a massive effort.


## Sneak peek

My combined methods for simplifying arrangement and asserstions greatly shortened tests.
Here's an quick before and after example.

Before
```cs
public void GetTodoItems_Ugly()
{

    // arrange
    using (TodoContext db = new TodoContext())
    {
        UserDTO user = new UserDTO()
        {
            Name = "Bob",
        };
        db.Users.Add(user);
        db.SaveChanges();

        TodoListDTO expectedList = new TodoListDTO()
        {
            UserId = user.Id,
            Title = Guid.NewGuid().ToString(),
        };
        db.TodoLists.Add(expectedList);
        db.SaveChanges();

        List<TodoItemDTO> expectedItemList = new List<TodoItemDTO>();
        int expectedTodoItemCount = 5;
        for (int i = 0; i < expectedTodoItemCount; i++)
        {
            TodoItemDTO expectedItem = new TodoItemDTO()
            {
                TodoListId = expectedList.Id,
                Description = Guid.NewGuid().ToString(),
                IsActive = true,
                IsComplete = false,
            };
            expectedItemList.Add(expectedItem);
        }
        db.TodoItems.AddRange(expectedItemList);
        db.SaveChanges();

        // act
        IEnumerable<TodoItem> actualItemList = accessor.GetTodoItemsForList(new Id(expectedList.Id));

        //assert
        Assert.AreEqual(expectedItemList.Count, actualItemList.Count());
        foreach (TodoItem actualTodo in actualItemList)
        {
            TodoItemDTO expectedTodo = expectedItemList.FirstOrDefault(ti => ti.Id == actualTodo.Id);
            Assert.AreEqual((Id)expectedTodo.TodoListId, actualTodo.TodoListId);
            Assert.AreEqual(expectedTodo.Description, actualTodo.Description);
            Assert.AreEqual(expectedTodo.IsComplete, actualTodo.IsComplete);
        }

        db.TodoItems.RemoveRange(expectedItemList);
        db.TodoLists.Remove(expectedList);
        db.Users.Remove(user);
        db.SaveChanges();
    }
```

After
```cs 
[Test]
public void GetTodoItems_Final()
{
    // arrange
    TodoList todoList = dataPrep.TodoLists.Create();
    int expectedItemCount = 5;
    IEnumerable<TodoItem> expectedItemList = dataPrep.TodoItems.CreateManyForList(expectedItemCount, todoList);

    // act
    IEnumerable<TodoItem> actualItemList = accessor.GetTodoItemsForList(todoList.Id);

    //assert
    expectedItemList.WithDeepEqual(actualItemList).Assert();
}
```

Some of the improvement is also from simplified assertions and data cleanup, which I won't cover in detail in this post.

## Avoided Solution: Pre-seeded Data

Pre-seeded data is a common solution to excessive data arrangement.

I had experienced this approach before, and judged that it could not satisfy all my goals.

First, it increases the scope needed to understand the tests. Both the data seed and the test need to be kept in sync. It moves important context out of the test making the test less clear. It's also tempting to reuse other seeded data in multiple tests, which then creates coupling between tests through the data. Overall, it's unstable and becomes hard to maintain from an clear expectations standpoint. 

Second, pre-seeded data encourages tests to share data store state. This leads to flakey and unpredictable tests.

Third, the data seed tends to lock us into a single data store and dependency on slow out-of-process data storage.

Regarding storage, I was still testing primarily against a real database using Entity Framework at that time. However, a company I worked with had devised a method of using transaction scopes to isolate tests from each other while still using a full database, even with parallel test execution. The transaction also eliminates need for data cleanup. I still use the transaction technique to simplify integration test cleanup if a database is involved.

## Local Functions

Pre-seeded data was ruled out, so tests needed to be creating all of their own state.
The question became, how do I create that state concisely.

We'll, the first step was to refactor out common data arrangement into local functions

A simple examples might look like
```CS

private TodoItem CreateTodoItem(Guid listId, bool? isComplete = null){
    //NOTE: optional parameters like isComplete simplify different consumer needs
    
    var dbTodoItem = new TodoItemDTO()
    {
        TodoListId = listId,
        Description = Guid.NewGuid().ToString(),
        IsActive = true,
        IsComplete = isComplete ?? false,
    };

    using(var db = dbFactory()){
        db.TodoItems.Add(todoItem);
        db.SaveChanges();
    }
    return TodoItemDTO.ToTodoItem(dbTodoItem);
}

```

## Shared Functions

Refactoring common arrangement into local functions quickly uncovered similar arrangement needs across test classes.

The natural next step was to centralize common data arrangement functions in a shared tests data prep class.

```cs
public class TestData{
    // pretend these have implementations
    public TodoItem CreateTodoItem(Guid listId, bool? isComplete = null); //...
    public TodoItem[] CreateTodoItems(int count, Guid listId); //...
    public User CreateUser(); //...
    public TodoList CreateTodoList(); //...
    public TodoList CreateTodoListWithItems(int itemCount); //...
}
```

The problem is that these functions may want to use each other. A few inter-function dependencies is no issue in a local test class, but it quickly spirals out of control with more functions. It also becomes difficult to find the function you need in the ever-growing list. Naming also gets harder as there are more functions to differentiate.

## Static Hierarchy

Arranging functions into sub-classes improves discoverability, but then you can end up with circular class references and it's still very hard to track dependencies between prep functions. The whole is essentially an inseparable unit. 

```cs 
public static class TestData{
    
    public static class TodoItem{
        public TodoItem Create(Guid listId, bool? isComplete = null);//...
        public TodoItem Create(bool? isComplete = null);//implicitly creates a list
        public TodoItem CreateMany(int count, Guid listId); //...
    }

    public static class User{
        public User Create();//...
    }
    
    public static class TodoList{
        public TodoList Create();//...
        public TodoList CreateWithItems(int itemCount);//...
    }
}

// Can now access like

TestData.TodoItem.Create(id);
```

We're also sharing at a broad enough scale now that we run into issues like different test classes wanting to use different data stores. Static references don't effectively support configuration unless we want to pass it as an argument on every call. For example, passing the data store to every function would get old fast.

## Using Injection

Non static classes directly constructing other data prep classes only partially solves configuration and reference issues from static classes. However, it can leave us with circular references and can lead to either passing configuration through a whole hierarchy or limiting configuration.


```cs
public class TodoItemPrep{
    //!!!! Circular reference
    TodoListPrep todoListPrep = new TodoListPrep();

    public TodoItem Create(Guid? listId = null, bool? isComplete = null){
        var dbTodoItem = new TodoItemDTO()
        {
            TodoListId = listId ?? todoListPrep.Create().Id,
            Description = Guid.NewGuid().ToString(),
            IsActive = true,
            IsComplete = isComplete ?? false,
        };

        //...
    }
}
    
public static class TodoList{
    //!!!! Circular reference
    TodoItemPrep todoItemPrep = new TodoItemPrep();
    UserPrep userPrep = new UserPrep();

    public TodoList CreateWithItems(int itemCount){
        ///...
        var dbTodoList = new TodoListDTO()
        {
            TodoItem = Guid.NewGuid().ToString(),
            UserId = userPrep.Create().Id,
        };

        //...

        todoItemPrep.CreateMany(itemCount, dbTodoList.Id);
        ///...
    }
}
```

So, how do we enable independent data prep configuration and clarify dependencies between data prep classes? This is the quitessential case for constructor injection.

```cs
public class TodoItemPrep{
    TodoListPrep todoListPrep;
    DatabaseContext db;

    public TodoItemPrep(TodoListPrep todoListPrep, DatabaseContext db){
        this.todoListPrep = todoListPrep;
        this.db = db;
    }

    public TodoItem Create(Guid? listId = null, bool? isComplete = null){
       //...
    }
}
```
[Repo link](https://github.com/farlee2121/TestingPatterns/blob/c17649d9610b94298b456ce6b2fa61bd58d80d3c/Tests.DataPrep/TodoItemPrep.cs)

Now each data prep class defines what configuration and dependencies it requires via the constructor.
Those dependencies are constructed externally and passed in only once without muddying function signatures or requiring mid-level consumers to know about the component's configuration.

## Separate Composition

Constructor injection enabled composable and configurable data prep classes.
However, it's a pain to instantiate a hierarchy of data prep classes in each test. Sharing instances in across a test class is better, but I've still lost the central location for discovering existing data prep methods.

Eventually, I discovered that I could define a composition of data preps as a class of it's own. I'm back to the static hierarchy experience now, but without compromising ability to configure and reuse data preps independently. I could easily create different compositions of data prep classes for use in different cases without modifying any of the component data prep classes.

```cs
public class TodoDataPrep
{
    ITestDataAccessor dataPersistance;
    

    public UserPrep Users { get; set; }
    public TodoListPrep TodoLists { get; set; }
    public TodoItemPrep TodoItems { get; set; }

    public TodoDataPrep(bool shouldPersistData)
    {
        if (shouldPersistData)
        {
            dataPersistance = new ApplicationDbTestDataAccessor();
        }
        else
        {
            dataPersistance = new NoPersistanceTestDataAccessor();
        }

        Users = new UserPrep(dataPersistance);
        TodoLists = new TodoListPrep(dataPersistance, Users);
        TodoItems = new TodoItemPrep(dataPersistance, TodoLists);
    }
}
```
[Repo link](https://github.com/farlee2121/TestingPatterns/blob/c17649d9610b94298b456ce6b2fa61bd58d80d3c/Tests.DataPrep/DataPrep.cs)

Now a whole suite of data prep classes are created and are intuitively discoverable with a single instantiation.
```cs
TodoDataPrep dataPrep = new TodoDataPrep(false);
TodoItem todoItem = dataPrep.TodoItems.Create();
```


## Existing libraries

At some point started calling this shared data arrangement the Test Data Prep pattern or Test Prep.  However, with a better idea of what I needed, I started finding existing libraries for test data generation. Libraries for .NET include [Bogus](https://github.com/bchavez/Bogus) and [AutoFixture](https://github.com/AutoFixture/AutoFixture). I now know there is a general [Test Data Builder Pattern](https://blog.ploeh.dk/2017/08/15/test-data-builders-in-c/).

Still using these libraries directly still didn't satisfy some of my needs.

Sometimes the generated data required particular sequence for committing the state to the data store, and I want to reuse that sequence too. I also want to give semantic names to the data generation scenarios I'm defining, which the libraries didn't support elegantly.

However, I can use these general data generation libraries within Test Prep class to simplify implementation while still wrapping the scenarios with a semantically named function call.

```cs
using Bogus;

public class TodoItemPrep{
    TodoListPrep todoListPrep;
    DatabaseContext db;

    Faker<TodoItemDTO> todoItemFaker = ...; 

    public TodoItemPrep(TodoListPrep todoListPrep, DatabaseContext db){
        this.todoListPrep = todoListPrep;
        this.db = db;
    }

    public TodoItem Create(Guid? listId = null, bool? isComplete = null){
       TodoItemDTO todoItem = faker.Generate();
       //...
    }
}
```

If custom data prep isn't necessary, these pre-make fakers can also composed similar to [how we composed our custom data prep classes](#separate-composition). This allows any common configuration to be defined once.

## Test Reuse

Now that configuration is easy, DataPrep can support running on different data stores configured in the test constructor. This supports another initiative where I reused test as both unit and integration tests. Reusing tests this way requires more steps. I probably won't blog about these efforts because they are better served by TestApi, which I've already [written about](../posts/2022-05-16-TestApi-and-Test-reuse-in-CSharp.md).


## Reflections from the Future

This journey taught me a lot about composition and reuse that I still use today.
My view on test, however, have changed. Data prep has some key weaknesses

First, Data Prep biases toward data all living in generally the same data store, which is a design smell. The system is probably experiencing implicit coupling through relationships expected to be managed at the datastore level. 

Second, Data Prep assumes enough data contracts are shared between services such that reusing data preps is worth while. However, services should own their own abstractions, otherwise we're violating Dependency Inversion and the services will end up leaking needs to each other via data contracts. This greatly reduces composability, but thats a [different series](./drafts/../Open-Closed-by-Example/2022-09-16-0-Intro-to-OCP.md). Isolating services with Dependency Inversion ([which is different from injection](../posts/2022-07-03-Dependency-injection-vs-Dependency-Inversion.md)) greatly reduces shared contracts, contract complexity, and complexity of data generation.

<!-- TODO: this section needs work -->
I've completely abandoned Test Prep in favor of [TestApi](../posts/2022-05-16-TestApi-and-Test-reuse-in-CSharp.md). TestAPI achieves a similar goal, but in a much more [Stable, incremental, additive](../posts/2022-02-25-Stable-Incremental-Additive.md) way. TestAPI focuses on externally observable behaviors. For example, if we save an entity then we should be able to retrieve it. This means we can lean more into the system to create state or generate data for our tests.

TestAPI also pushes tests, like any caller with Dependency Inversion, to define their own data contracts. Each test class defines the methods and data it needs to run the tests. The tests are freed to express the requirements more directly and tests aren't coupled to shared contracts. 

This also means the system doesn't need to directly support all the data generation or stateful operations the tests require. We can backfill such methods in the TestApi adapter. Data prep can live in the adapter or our tests can directly use data generators and lean into the testApi's methods to turn data into expected side-effects. There isn't the need to create magically ready data stores or for tests to directly fill gaps in system ability.

I'm not doing TestApi justice in this short blurb, but I've written about it [many times](/tags/testapi) before [with concrete examples](../posts/2022-05-16-TestApi-and-Test-reuse-in-CSharp.md).


