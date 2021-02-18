# PADL: File organization

All this decomposition has been abstract so far. Here we'll dig into concrete code organization, and how the pattern scales code to teams of all sizes.

The abstract decomposition closely reflects the ideal file structure. That also means that there are multiple scopes of separation.

## Sub-domains

small sub-domains on small projects may be ok as just another assembly. Be mindful of how assemblies are achieved in your language. Can also think of it as packages to publish to a package repository like nuget, npm, or pip.

 .NET languages use projects files to define assemblies.

## Responsibility layers
talking layers within a sub-domain here
- at minimum separate namespaces
- ideally separate assemblies
- Goal is to prevent temptation to make forbidden references. and make it clear when layer rules are violated

## Adapters
at least one per responsiblity layer in the sub-domain. Possibly more if you would 

repositories, project boundaries, use of namespaces 

## Cross-cutting concerns
- may live with adapters or as own assembly depending on their portability

## General Rules of thumb

Unit of reuse is the unit of release

- small can be scrappier in interest of reduced complexity. As you scale separation is speed because teams can be split. Shared libraries have their own approval processes and ability for multiple teams to contribute.

Think of it like releasing a library. You want consumers to be able to fetch little extra, extend it themselves, and update as few packages as needed when bugs happen



## Summary
In general eac