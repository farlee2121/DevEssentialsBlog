
other post idea (Corrolated Type spectrums?)

- start with very brief definitions
  - structural, think json. If both sides have a name, date, and guestCount field, they are effectively the same type. What matters is members, not declared types.
  - nominal is what most static language users know. A Customer isn't a Person unless it explicitly inherits from person. What matters is declared types, not members;
  - dynamic: types can be changed at runtime
  - static: types are fixed at write time
- are the structural vs nominal and dynamic/static spectrums intertwined
  - practically speaking, yes
  - theoretically, no. you could have a dynamic type system that allows you to add inheritance or properties at run time, but considers separately generated types to be different independent of their members
  - similarly you could have a static type system where all types are determined at write time but any type with the same members is considered equivalent. You could also generate a method that enumerates members for ... printing, or any other reason you'd want to deconstruct the type.
    - tuples are common in static languages and are structural


So why the correlation?
similar driving concerns
look at python's "duck" typing. Structural and dynamic typing work together to create a system that is pretty much entirely implicit. You are free do pretty much whatever whenever and it can find a fit between types it works

Static and nominal both promote safety and explicit decisions


clojure
- structural and safe?
- Design by contract
- essentially a parsing mentality. I make sure my input matches the requirements I need
- it is dynamic in clojure, but doesn't need to be. A compiler could check the compatability of contracts and throw errors if there is a mismatch 
- the contracts are stronger than generally found in static system
- removes the extraneous names from comparison, just types and values