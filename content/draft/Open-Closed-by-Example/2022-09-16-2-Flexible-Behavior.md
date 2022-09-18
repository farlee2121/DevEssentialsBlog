---
date: "2022-09-16T00:02:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Composable Behaviors"
---

This series clarifies the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) by example. In this post we'll demonstrate ways the principle guides composable behaviors without leaking abstractions between components.
<!--more-->


## Object Inheritance
<!-- - Closed: must satisfy contract of parent
- Open: anyone can add children
- Open: Derive to add additional fields and methods
- Open: Derivatives can override behavior -->


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

<!-- 
- base class forms contract
- derivatives can add properties, change behavior, but still be used as base class
- too much going on
  - Data + Methods = worry about state
  - Behavior overriding => worry about safety of inheritance

PHRASING: The problem is that objects have too much going on and it make extension complex
 -->


----

# Interfaces
- Closed: for contract changes
- Open: to new implementations

<!-- TODO: may want to change object example for a better interface evolution -->

```cs 
interface IPaymentStrategy{
  void Pay(PaymentToken token);
}
```

----

## Dependency Inversion
- Closed: list of required dependencies
- Open: Flexible on creation and lifetime of dependencies

```cs
class SignupWorkflow{
  public SignupWorkflow(IPaymentStrategy paymentStrategy){
    //...
  }
}
```

<!-- Hint toward more general method: Ports and Adapters -->

<!-- Q: Interface + DI makes me want to talk about ports. Do I need to move these later? -->

<!-- TODO: add function parameters back in with continuations? Functional idea of parameterization. Functions not fixed to particular context -->

----
# Example: Email Notification
- A user should get an email when messages are sent

----
### Notifications: First Pass

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

----

### Notifications: Injection-based

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

----

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

----

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

<!-- As demands on these dependencies grow, it keeps complexity down in the core messaging client -->

----

<!-- lead: Our notifier implementations don't just have to be for production use. In fact, abstracting the notifier greatly simplifies testing. -->
```cs
class MockMessageNotifier : IMessageNotifier{
  List<Message> MessagesNotifications = new List<Message>();

  void NotifyMessageSent(Message message){
    MessagesNotifications.Add(message);
  }
}
```