# SOLID Notification Refactor and Ideal Design

A clear and general design for integrating notifications (email, text, push, etc) has long eluded me. However, a recent refactor using the concepts of [Synthesizing Project Organization Methods]({%post_url 2020-07-10-Synthesizing-Structure %}) has settled my search. Here I'll explore my refactoring experience and why the conceptual shift is generically more stable. 

*Note*: I now use SOLID Structure as the name for the code organization pattern described in [Synthesizing Project Organization Methods]({%post_url 2020-07-10-Synthesizing-Structure %}). 

## Current System

The system I'm working on tries to abstract notifications through an EmailAccessor that hides the SMTP framework and an EmailGenerationEngine that creates email content from data and hides a templating framework. Some of the notification are also made background tasks by queueing a message to a a bus and processing it in a general NotificationManager.
[!Diagram here]()

## New Constraints
We now needed to white label our system. Emails need to branded per white label customer and adapted quickly to changing product positioning. Requiring feedback cycles between developers and business people for every email just isn't a tenable solution. Instead we wanted to define email on a remote service where we could edit them visually. This meant emails were sent by calling an api with the template ID and data instead of generated locally.

## The Problem
This is a reasonable desire and completely in line with the system's notification needs, but it completely blew up the system's notification design.

The original design seems like reasonable services trying to hide reasonable decisions, but it only hides frameworks and doesn't hide that we rely on email or that the emails are generated locally. Further, using these services is the lowest energy decision when relying directly on external dependencies. This causes the coupling to spread to many consumers. The result is that every service that sent a notification directly knew about the organization process for sending an email and had to be changed. 

I would argue that this isn't just a flaw of the system I was working on but a general issue with trying to directly consume a shared notification service. 

First let's look at the information we want a notification system to hide
 - The notification medium (email, text, push, phone, etc)
 - How the notification contents are generated (i.e. templating, where templates live)
 - Technology used to send the notification (e.g. sendgrid, twilio, mailchimp)
 - The number and type of notifications sent (e.g. on user signup may email user but also notify a business person to follow up with them)
 - From the consuming side we want to specify the minimal information necessary to send the notification 

What we've just described is really an event system.

Suppose we choose a better event-like design. Only minimal data is included on the event and the event subscriber uses that information to look up the rest of the information it needs to compose and send a notification. This further abstracts the notification medium, message construction, and number of recipients from the business flow.

The flaw is the event data. What should be the minimal data contract of this general event system? Every component of the system will have a different answer for that. In my refactoring I had events that required a just a user ID, just the ID for some other entity, and certain identity events that required both a user ID and a verification token for security purposes. 

We could have the notification system take a base object or a generic type parameter, but then how does the notification system retrieve the data? It has to know how to fetch data all the different services' events and the notification system is highly coupled to the rest of the system. We've also lost type enforcement and could be tempted to pass excessive data to the event handler.

We could have the service implement some generic handler registration, but that pushes concrete notification implementations back into each of the services and distributes framework or medium-specific code to every service. 

The notification system is trying to juggle the needs of too many consumers and has no stable solution.

## Solution 
Now let's abandon the idea of a central generalized notification/event system. Instead let's use the SOLID Structure concepts. 

This means each service defines it's own dependency abstractions, exposes extensibility to callers generically, and uses thin adapters to bridge the gap (of generic outward interfaces to specific dependency abstractions).

This means that each service defines it's own event types. This also solves the key issue with the generalized notification system while allowing us to maintain the best aspects of that design.

Here's an approximation of one of my types
```cs
public struct IdentityEvents{
    public static IdentityEvents ConfirmEmail; 
    public static IdentityEvents ResetPassword; 
    public static IdentityEvents BrandRegistered; 
}

public interface IIdentityNotifier{
    void Notify(IdentityEvents event, UserId id, Token token);
}
```

With just this I can easily write all of my identity related flows including notification, but not worrying about any notification details. The lowest energy change to add a new notification is to just add a new event type. In fact, creating this abstraction in the first place is a lower energy solution than trying to think of what an email or notification needs as part of the business flow. 

The handler side is also easier because we can split the responsibility of getting event data and generating/sending the notification.
In my case, I created a genericized email service. It takes an email, template ID, and generic object. It then looks up a template or remote template, applies the data, and sends the email. The handler is responsible for looking up the data and ensuring any expected templates are registered with the email service. 

The email service was actually fairly easy to implement since it was purely concerned with locating templates and sending the email. Any domain or usecase knowledge is pushed to the adapter in the same way that any notification knowledge was pushed from our service to the adapter. This means we can reuse the email service for any adapter and in any program. 

## Summary Notes

Notice how emails started as part of the business flow and got pushed out, eventually resulting in a new and clear generalized service. The selfish service design makes Single Responsibility Principle a more natural and low energy choice. This separates out cross-cutting concerns. This allows us to address cross cutting concerns more directly and closes the gap between our own utility implementations and potential 3rd-party solutions. Many cases (e.g. user management, payments, feature flags, logging) already have robust 3rd-party solutions which this pattern can easily consume without mixing them into core services. While you may still wrap some of these utility-like concerns for framework portability, but we hide much less of their power since we are wrapping them in line with their original purpose and defer business flow adaptation to the service adapter layer.

- easy for others to extend!
- need to talk more about how the refactoring process led me to the solution