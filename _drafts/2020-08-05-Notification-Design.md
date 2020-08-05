# SOLID Notification Refactor and Ideal Design

A clear and general design for integrating notifications (email, text, push, etc) has long eluded me. However, a recent refactor using the concepts of [Synthesizing Project Organization Methods]({%post_url 2020-07-10-Synthesizing-Structure %}) has settled my search. Here I'll explore my refactoring experience and why the conceptual shift is generically more stable. 

*Note*: I now use SOLID Structure as the name for the code organization pattern described in [Synthesizing Project Organization Methods]({%post_url 2020-07-10-Synthesizing-Structure %}). 


The underlying problem here is that notifications and background processing are actually separate utility-like services of their own.

Lets consider notifications. The system I'm working on tries to abstract notifications through an EmailAccessor that hides the SMTP framework and an EmailGenerationEngine that creates email content from data and hides a templating framework. These seem like reasonable services trying to hide reasonable decisions, but they don't hide that we rely on email or that the emails are generated locally. Further, using these services is the lowest energy decision when relying directly on external dependencies. This causes the coupling to spread to many consumers.  

I felt the pain of this when I needed to change my system so emails were defined on a remote service where we could edit them visually. This meant emails were sent by calling an api with the template ID and data instead of generated locally. This is a reasonable desire and completely in line with the system's notification needs, but it completely blew up the system's notification design. Every service that sent a notification directly knew about organizing data for an email and had to be changed. 

I would argue that this isn't just a flaw of the system I was working on but a general issue with trying to directly consume a shared notification service. 

Suppose we choose a better event-like design. Only minimal data is included on the event and the event subscriber uses that information to look up the rest of the information it needs to compose and send a notification. This further abstracts the notification medium, message construction, and number of recipients from the business flow.

The flaw is the event data. What should be the minimal data contract of this general event system? Every component of the system will have a different answer for that. In my system there were (user events, data update events, campaign events). then how does the notification system retrieve the data? it has to know about all the different services.

Now let's abandon the idea of a central generalized event system.
- can actually generalize the email service better, fewer mixed needs
- still keep handlers out of core flow
- service specific knowledge is limited in scope to just the adapter
- easy for others to extend!