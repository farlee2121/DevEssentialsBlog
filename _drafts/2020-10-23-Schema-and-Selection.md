# Schema and Selection

<!-- As programmers, we naturally see semantic equivalencies between our data types, but need different sets or represntations for each scenario.  -->
I commonly struggle with systems that have a half-dozen data types that, semantically, represent about the same information. Different usecases call for different views or combinations of the data (especially clients). I always assumed this was unavoidable to achieve clarity. However, Rich Hickey proposes a new take on the problem.

This post is a response to [Maybe not](https://www.youtube.com/watch?v=YR5WdGrpoug) by Rick Hickey.

## The Problem
First, a few clarifying examples

Suppose we have a todo list application. It's not so unusual that we might want to fetch the todo list details along with the individual tasks. 

```cs
class TodoList{
    string Title;
    DateTime CreateDate;
    // other data...

    Task[] Tasks;
}
```

The problem is that this contract always implies the existence of child tasks. However, that isn't always desirable
- If we want to save, are the tasks saved in the same call as the TodoList? If not, they shouldn't be there.
- What about showing all TodoLists for a user? We don't want to require the whole hierarchy when we only need a fraction of the info. But we shouldn't leave it to the programmer to implicitly know when that data isn't present.

The same can be said for the non-complex properties of a type. If we're suggesting lists in a search field, we probably only want the title and Id. Everything else is extraneous.

Sadly, all roads seem to lead to extra types. Common solutions are in the vein of 
```cs
class TodoListSaveContract{
    string Title;
    DateTime CreateDate;
    // all direct properties, no tasks
}
//Alternatively
class TodoListDetailViewModel{
    TodoList ListDetails;
    Task[] Tasks;
}

class TodoListSuggestionModel{
    Id Id;
    string Title;  
}
```

Types can multiply quickly and mapping is both tedious and error prone. It is easy for each model to slightly vary the parameter names too, which hurts understandability.

I've limited mapping in my system through the deliniation of service purposes, but it still feels bad every time I need to map a contract for a new scenario. Though it feels much less bad than the system getting entangled by unnecessary data connections.

## The Alternative

Rich Hickey continues to impress me with the way he re-examines the fundamental concepts of and communication though programming languages.

The concept he proposes is the separation of **schema** and **selection**. 

### Type-only membership 
First, this requires decoupling our data from named or positional data containers. That mean no properties like in records and classes and no positional reliance like tuples.

This can be solved with type-based aggregates, known as `spec/keys` in clojure.

```clojure
; example here
```

This is brilliant. Accessing data requires only the bear conceptual minimum: an idea of what guarantees the data meets and existance of the data. 

### Who owns optionality
Optionality is represented by presense or absense of a key. If a key is required and doesn't exist, the compiler or runtime can throw an error. If optional, the consumer checks for the presense of the key.

This strikes at an important question: who owns optionality?

Consider Rich's example. If a Car type has a make and model, when are those properties optional? We don't know. It depends on the context. Some cases will need that info and others won't. Thus, optionality is context-dependent and cannot be part of a generally usable type scheme.


In short, it is always up to the consuming context to declare what it does and doesn't need and decide if the data meets those criteria. Like if you parse a JSON file, you decide how to interpret a missing property. Further, data sources don't need to know about optional properties if they don't use them.

This clicks with the haskell concepts of "parse, not validate" from [this delightful article](
http://lexi-lambda.github.io/blog/2020/01/19/no-dynamic-type-systems-are-not-inherently-more-open/).

### Partial Contracts

This all pulls together into a prototype language syntax for separating **schema** generally and **selection** per-context.

```clojure
(s/spec this sfasdf)
```

This allows maximial reuse of the same data types without compromising on clarity of required information in each usecase.

At the time of the presentation, this was just a proposal. Briefly examining the documentation also indicates that this is not finished as of writing this post. The idea, however, is powerful and I hope to see it gain ground.

## Reservations 
While I believe this idea is powerful, I still have questions and reservations.

What about the case where an aggregate uses two of the same type, but with different semantic intent? For example, a `ToAddress` and `FromAddress` or `User Author` `User Recipient`. One could make sub-types for these cases, but that feels a bit wrong.

The general schema also feels like a strong temptation to break service boundaries and tie services through the general schema. I suppose this is already a temptation and it will always be up to the designers on where to draw hard boundaries.


## Conclusion
Articulating that optionality belongs to the consuming context is a powerful conceptual advance. I think Rich's proposal for separating general **schema** and required member **selection** per-context is promising for more expressive and less redundant type systems!