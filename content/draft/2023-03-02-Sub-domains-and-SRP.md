---
date: 2023-06-12
tags: [Domain-Driven Design, SOLID, Single Responsibility Principle]
title: Sub-Domains That Follow the Single Responsibility Principle
---

The [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) applies even to identifying [sub-domains](https://docs.aws.amazon.com/prescriptive-guidance/latest/modernization-decomposing-monoliths/decompose-subdomain.html).
<!--more-->

As a review, domains are essentially problems spaces. Accounting, e-commerce, developer tools, and mining are examples of problem domains.
Sub-domains are subsets or supporting sub-problems within that problem space. Common generic sub-domains include notifications (like email delivery), payments, and identity management.

I've long believed that division of people within a company (departments, teams, etc) is an effective way to discover sub-domains. Where the company saw enough delineation to separate human responsibilities, the same often applies for the software.
Plus, this guidance sources from of the original [Domain-Driven Design book](https://www.amazon.com/dp/0321125215).

Now I have yet another reason to believe in sub-domains by people divisions. I've realized that it also satisfies the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle).

The Single Responsibility Principle states that any unit of code should have one reason for change. The focus here is on separating design forces
so the unit of code isn't balancing competing motivations.

Separating sub-domains by company unit de-tangles the most fundamental of design forces, stakeholders. If the major units of a software system
are decomposed by business units, then each software unit has only one group of relatively uniform of stakeholders driving the requirements.
Each sub-domain can then evolve with minimal conflict of interest and with tighter feedback loops because of the reduced stakeholder scope.
Sub-domains can still call each other and map their concerns to and from the concerns of other sub-domains, just like different business units may
use normalized requests processes between each other. However, the different sub-domains aren't allowed internal knowledge of other sub-domains.
They must interact with the public api of other sub-domains to minimize coupling.

Separating sub-domains by company unit also makes it easier to identify and swap-in build-vs-buy decisions.
Third-party products tend to be aimed at specific roles in a company: like accounting, marketing, inventory management, etc.
In effect, they are targeting business role-based sub-domains, which is the same way we are encouraged to decompose sub-domains.


In summary, decomposing sub-domains based on business roles or units obeys the Single Responsibility Principle by isolating the most
fundamental design force: stakeholders.