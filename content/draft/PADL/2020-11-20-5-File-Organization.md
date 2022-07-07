---
date: "2020-11-20T00:00:00Z"
draft: true
---

# PADL: File organization

All this decomposition has been abstract so far. Here we'll dig into concrete code organization, and how the pattern scales code to teams of all sizes.
<!--more-->

The abstract decomposition closely reflects the ideal file structure. That also means that there are multiple scopes of separation.

## Sub-domains

The top scope is sub-domains. Most of the time sub-domains should be given their own repository. This allows different teams to own each sub-domain and to impose collabration rules on sub-domains shared between teams. Single-team projects may be able to get away with just separating sub-domains into different folders or assemblies.

Multiple sub-domains can be coordinated as APIs, packages, or indirectly through message services. As a rule of thumb

- Message bus or events streams when
  - high-reliability or availability is a concern
  - uptime needs differ (like reporting is much less )
  - coordination can be "eventual"
  - Departments need systems to operate independently
  - Should be true for most manager-level sub-domains
- APIs
  - coordinated actions must be immediately consistent
  - fetching more data than is proper for an event
  - Independent deployment or maintenance is needed
  - Common for accessor-, engine-, and utility- based sub-domains 
- Packages
  - Easiest (and most stable) approach for small projects that can publish many sub-systems all at once. Single team projects should consider this approach.
  - The sub-domain doesn't have any side-effects (e.g. some engines)
  - Utilities that serve some purpose per context (e.g. check claim)



## Responsibility layers

Domain services inside each sub-domain should generally each be given their own assembly. In .NET that means a separate project file. 

This prevents accidental or sneaky violations of layering rules. Any violations of the rules will be clear in code review because of the project files changes. It would even be easy to write an automated build rule to check for violations. It also makes it easy to publish the services as packages or move them to different repositories.

At minium, I recommend giving each domain layer a namespace and each service it's own namespace. This reduces friction for small project in exchange for a higher risk of code coupling. The separate namespaces at least require an import/using statement that can be caught by tooling and code reviews.


## Adapters
There should generally be one assembly per domain service and primary implementation. For example, `XManager.SqlServer` implements SqlServer-based implementations of ports defined by `XManager`.

Think of these like the add-on packages for many popular libraries. EntityFramework offers separate packages for SqlServer, Postgres, Mongo, in-memory, and so on.

Keeping them in separate assemblies allows each package to be published and referenced separately. This limits unnecessary dependencies.

At the very least I recommend at least one assembly per domain layer (managers, engines, accessors) with adapters for each service in their own namespace.

## Cross-cutting concerns
Cross-cutting concerns are implemented as decorators of ports. They often deserve their own assembly, but may be lumped in with adapters for the same service. 

## General Rules of thumb

The general rule of thumb is borrowed for Robert marting

> The unit of reuse is the unit of release

Any components that may be consumed or updated separately should try to have their own assembly. This keeps packaging and deployment options flexible.

Overall, single-team projects can be scrappier in interest of reduced complexity. 

Large scale projects will actually operate faster with more separation because teams, processes, and deployments can be kept small and focused. Shared sub-systems also benefit from indepdenence. Allowing code collaboration rules to reflect organization rules. 


## Summary
The overall code structure closely mirrors the conceptual structure. Sub-systems map to repositories and smaller units of reuse map to assemblies. 

Favoring code separation reduces risk of code violations, maintains composability, and improves overall process by letting teams own the full lifecycle of their component. 