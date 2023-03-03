---
date: "2022-09-16T00:03:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Interchangable Implementations"
aliases:
- /draft/open-closed-by-example/3-Interchangable-dependencies  
---


<!-- TODO: Consider reframing DI buildup in terms of continuations instead of inheritance. Class dependencies are basically like class-level event handlers.
Probably still important to highlight issues with inheritance because it's so commonly taught -->

This series clarifies the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) with examples. This post will demonstrate the OCP through interchangable and composable dependencies.
<!--more-->

I recommend you read the [series intro post](./2022-09-16-0-Intro-to-OCP.md) if you haven't already. It defines the Open-Closed Principle (OCP) and hightlights some motivating questions.

In summary, the OCP illuminates how components can offer self-defined flexibility and adapt to caller needs without changing internally. This is much like how parameters
enable functions to be resused by many consumers without changing the function.

## Object Inheritance
Most software students learn [Object-Oriented Programming](https://en.wikipedia.org/wiki/Object-oriented_programming).
Class inheritance tends to be one of the first tools taught for modeling variable behaviors.
<!-- , despite the principle to [favor composition over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance). -->

Inheritance does offer some open-closed benefits. It is
- Closed because all dervatives must satisfy the parent's contract (i.e. public members and methods)
- Open because anyone can create derivatives/children
- Open because derivatives can add fields and methods to offer features beyond the parent
- Open because derivatives can override parent behaviors

For example, this simple payment hierarchy
```cs
class PaymentType{
  string DisplayName();
  void Pay();
}

class CreditCard : PaymentType{
  string CardNumber;
  string SecurityCode;
  string DisplayName() => ;///...
  void Pay(){
    //...
  }
}

class Stripe  : CreditCard{
  string DisplayName() => ;///...
  void Pay(){
    //...
  }
}
```

The main problem here is that object inheritance has too much going on.

Mixing data and behaviors forces derivatives to worry about maintaining the state of parent types.
It's also easy to end up with an application that's dependent on state spread around many classes.
The system develops a "memory" and it becomes difficult to reason about what the application might do without also knowing what previous calls have been made.

Behavior overriding is also unsafe. It's easy to slip up and cause different behaviors
depending on what type the object is used as. For example, `PaymentType cc = new CreditCard()` might behave differently than `CreditCard cc = new CreditCard()`.

All of these result in un-advertised expectations and systems that are difficult to understand. Class inheritance enables interchangable behaviors, but it's challenging to get right.


## Interfaces

Interfaces offer a less complex alternative to object inheritance.

For example
```cs 
interface IPaymentStrategy{
  void Pay(PaymentToken token);
}

class StripePaymentStrategy : IPaymentStrategy{
  void Pay(PaymentToken token) => //...
}
```

Interfaces offer the same basic open-closed value as object inheritance. They are closed because they define a fixed shape.
That is, they require method of specific names, parameters, and return types. They are also open for anyone to derive and supply a new implementation.

Unlike objects, interfaces are abstract. You cannot directly create an instance of them.
Derivatives do not need to worry about parent state or existing behavior when deriving from an interface. Implementation state, however, can still be an issue.

## Dependency Inversion

Dependency Inversion (DI) takes behavior extension to the next level. DI dictates that [*callers should own their own abstractions*](../../posts/2022-07-03-Dependency-injection-vs-Dependency-Inversion.md).

This means that a component, a class for example, should define its own dependency types instead of using types provided by another component.
This usually means interfaces and [constructor injection](https://en.wikipedia.org/wiki/Dependency_injection#Constructor_injection) when it comes to behavior.

```cs
class SignupWorkflow{

  // The swappable behavior's interface
  interface IPaymentStrategy{
    void Pay(PaymentToken token);
  }

  // Boilerplate constructor injection
  private IPaymentStrategy paymentStrategy;
  public SignupWorkflow(IPaymentStrategy paymentStrategy){
    this.paymentStrategy = paymentStrategy;
  }

  // Using the injected dependency
  public SignUp(SignUpData signupData){
    //...
    paymentStrategy.Pay(signupData.PaymentToken);
    //...
  }
}
```

Dependency Inversion (DI) is closed because a component (often a class) specifies the list of dependencies it requires and what those dependencies look like.
DI is also open because consumers can swap in different implementations of those dependencies to change behavior. We'll see an example of that soon.

DI may seem like it requires a lot of extra types that feel unnecessary. This is partially an artifact of common Object-Oriented language choices. Other type systems, like some functional languages, require less overhead. Sometimes the extra types really are just overhead. 
However, this pattern will open up powerful possibilities that we'll explore more deeply in the next post about system structure.


## System Example: Email Notification
It's time for an extended example. We're revising the chat/messaging system from the [data](./2022-09-16-1-OPC-through-Data.md) post.
This time we want to sent users an email when they receive a message in chat.

### First Pass

The simplest implementation would be add some SMTP service to our chat library and
call it directly when a user sends a message.

```cs
class MessageClient{
  public MessagingClient(){
    //...
  }

  public void SendMessage(){
    //...
    SendEmailNotification(message);
    //...
  }

  void SendEmailNotification(Message message){
    // sendgrid -> SMTP client
    sendgridClient.Send([stuff here])
  }
}
```

This works, but only with email and only with one email provider. Every user of this chat library is forced 
to send email notifications and always by the same email provider.

### Injection-based

An injection-based approach better highlights the essence of the chat problem domain. 
The chat library only cares about notifying users when they received a message. 
It doesn't care if the notification is an email, in-app, push notification, physical mail, or other.

The chat library can define it's own notification interface instead of depending on a specific notification method. Then consumers of the chat library can register any kind of notification they want.

The core message flow looks almost the same.
```cs
interface IMessageNotifier{
  void NotifyMessageSent(Message message);
}

class MessageClient{
  private IMessageNotifier notifier;
  public MessagingClient(IMessageNotifier notifier){
    this.notifier = notifier;
  }

  public SendMessage(){
    //...
    notifier.NotifyMessageSent(message);
    //...
  }
}
```

However, now we can create many notifiers and swap them out to meet different needs.
```cs
class SendgridMessageNotifier : IMessageNotifier {
  void NotifyMessageSent(Message message){
    //Email code from before
    sendgridClient.Send([map message to sendgrid]);
  }
}

class MailGunMessageNotifier : IMessageNotifier{
  //...
}

class SNSMessageNotifier : IMessageNotifier{
  //...
}
```

We aren't limited to just one notifier. Notifiers can be generically composed.
Consider this AggregateNotifier. It takes a list of notifiers and calls all of them.
We could send notifications my email, text, and in-app or even dynamically select strategies based on user notification preference. 
All this can be accomplished without changing the chat library or the individual notifiers.

```cs
class AggregateNotifier : IMessageNotifier{
  private IMessageNotifier[] notifierList;
  public AggregateNotifier(IMessageNotifier[] notifierList){
    this.notifierList = notifierList;
  } 
  void NotifyMessageSent(Message message){
    foreach(notifier in notifierList){
      notifier.NotifyMessageSent(message); 
    }
  }
}
```

Dependency Inversion requires some extra types, but can dramatically reduce implementation complexity as requirements complexity increases.

## Testability
Notifier implementations don't just have to be for production. We can swap out dependencies with ones custom-built for our testing. 

```cs
class MockMessageNotifier : IMessageNotifier{
  List<Message> MessagesNotifications = new List<Message>();

  void NotifyMessageSent(Message message){
    MessagesNotifications.Add(message);
  }
}
```

Great testability tends to be one of the first benefits of Dependency Inversion.

## Conclusion

The Open-Closed Principle pushes components to self-defined flexibility. Such components adapt to different callers without changing internally.

Interfaces and Dependency Inversion are foundational tools for achieving that flexibility with component dependencies.
Components better represent their domain by defining their own dependency interfaces. 
Callers can then swap dependency implementations to compose new behaviors as that caller's specific usecase becomes more complex.
