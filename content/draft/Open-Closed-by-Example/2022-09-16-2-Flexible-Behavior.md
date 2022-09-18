---
date: "2022-09-16T00:02:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Composable Behaviors"
---

This series clarifies the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) by example. This post will customizing behaviors without leaking abstractions between components.
<!--more-->

I recommend you read the [series intro post](./2022-09-16-0-Intro-to-OCP.md) if you haven't already. It defines the Open-Closed Principle (OCP) and hightlights some motivating questions.
In summary, the OCP illuminates how components can set defined flexibility so the component can adapt to caller needs without changing internally. This is much like how parameters
enable functions to be resused by many consumers without changing the function.

## Object Inheritance
Most software students these days learn [Object-Oriented Programming](https://en.wikipedia.org/wiki/Object-oriented_programming).
Object inheritance tends to be one of the first tools taught for modeling relationships
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

All of these result in un-advertised expectations and systems that are difficult to understand.
Object Inheritance makes good behavior extension complex.


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

Interfaces offer the same basic open-closed value as object inheritance. The are closed because they define a fixed contract.
That is they require method of specific names, parameters, and return types. They are also open for anyone to derive and supply a new implementation.

Unlike objects, interfaces are abstract. You cannot directly create instance of them.
Derivatives do not need to worry about state or existing behavior when deriving from an interface.

## Dependency Inversion

Dependency Inversion (DI) takes behavior extension to the next level. DI dictates that *callers should own their own abstractions*.

This means that a component, a class for example, should define it's own types instead of using types provides by another component.
This usually means interfaces and [constructor injection](https://en.wikipedia.org/wiki/Dependency_injection#Constructor_injection) when it comes to behavior.

```cs
class SignupWorkflow{

  interface IPaymentStrategy{
    void Pay(PaymentToken token);
  }

  private IPaymentStrategy paymentStrategy;
  public SignupWorkflow(IPaymentStrategy paymentStrategy){
    this.paymentStrategy = paymentStrategy;
  }

  public SignUp(SignUpData signupData){
    //...
    paymentStrategy.Pay(signupData.PaymentToken);
    //...
  }
}
```

Dependency Inversion is closed because a component (often a class) specifies the list of dependencies it requires and what those dependencies look like.
DI is also open because consumers can swap in different implementations of those dependencies to change behavior. We'll see an example of that soon.

DI may seem like it requires a lot of extra types that feel unnecessary. This is partially an artifact of common Object-Oriented language choices. The
overhead is less in other kinds of language, like some functional languages. And, sometimes, the extra types really are unneeded overhead. 
However, this pattern will open up powerful possibilities that we'll explore more deeply in the next post about system structure.


## System Example: Email Notification
It's time for an extended example. We're revising the chat/messaging system from the previous post.
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

This works, but only with email from one email provider. Every user of this chat library is forced 
into sending email notifications and always by the same provider.

### Injection-based

An injection-based approach better highlights the essence of the chat problem domain. 
Our chat library only cares about notifying users they received a message. 
It doesn't care if notification is email, in-app, push notification, physical mail, or other.

Instead of depending on a specific notification method, the chat library can define an interface 
for sending notifications. Then consumers of the chat library can register any kind of notification they want.

The core message flow looks almost the same.
```cs
interface IMessageNotifier{
  void NotifyMessageSent(Message message);
}

class MessageClient{
  private IMessageNotifier notifier;
  public MessagingClient(IMessageNotifier notifier){

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
All without changing the chat library or the individual notifiers.

DI requires some extra types, but can dramatically reduce implementation complexity as requirements complexity increases.

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

Notifier implementations don't just have to be for production. Great testability tends to be one of the first benefits of DI.
We can swap out dependencies with ones custom-built for our testing.

```cs
class MockMessageNotifier : IMessageNotifier{
  List<Message> MessagesNotifications = new List<Message>();

  void NotifyMessageSent(Message message){
    MessagesNotifications.Add(message);
  }
}
```

## Conclusion

The Open-Closed Principle calls for flexibility without modifying the core implementation. 
Interfaces and Dependency Inversion are foundational tools for achieving that flexibility with behaviors.
Components better represent their domain by defining their own dependency interfaces. 
Consumers can then swap dependency implementations to compose new behaviors as the specific usecase become more complex.
 <!--TODO: this conclusion might need work -->
