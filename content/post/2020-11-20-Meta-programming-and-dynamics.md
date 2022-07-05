---
date: "2020-11-20T00:00:00Z"
tags:
- Programming Languages
- Type Systems
- Language properties
---
# Meta-Programming and Type Dynamics

Dynamically typed systems effectively come with meta-programming capabilities for free, but are dynamic systems fundamentally better at meta-programming?

I recently learned the difference between Structural and Nominal typing. This got me thinking about the differences I've felt when trying to implement Aspect-Orientation or other meta-programming type activities in Javascript vs C#.

Javascript objects are pretty much dictionaries with some extra operations. It is simple to iterate over the members, and any type is interchangeable as long as it has the right members (thus, structurally typed). This makes it easy to operate directly on types to create clones, proxy classes, copy information, and similar.

However, I realized there was another critical quality enabling these meta-programming activities: the dynamic typing. I wouldn't be able to construct the structurally equivalent types on the fly if my types had to be declared at write time. The javascript-style meta-programming was effectively a free result of equal members making equal types (structural typing) and the ability to add members to a type at any time (dynamic typing). Both type properties were also a pre-requisite for the style of meta-programming.

This led me to a hard question: are dynamic systems fundamentally better at meta-programming?

Well, the static languages I know rely on reflection for meta-programming. Unfortunately, reflection is often slow and arcane. 

Some thought experiments
- Do static languages fundamentally need to rely on reflection to enumerate type members?
  - No, the information is present at compile-time and a consistent method for enumerating members could be generated.
- Can static languages meaningfully generate types like in javascript?
  - not at runtime, that would be dynamic typing
- Can the types be generated at compile time?
  - This is a hard question that is well explored in [this article](http://lexi-lambda.github.io/blog/2020/01/19/no-dynamic-type-systems-are-not-inherently-more-open/). In short, yes. Our program can't operate on something that is entirely unknown. Static languages force us to make our assumptions explicit. Even if they are very loose expectations. Dynamic languages often let us leave assumptions of structure and type implicit, but still necessary for the code to execute. Since we encode these assumptions when we write the code, the information is present at write-time. 

This leads me to conclude that static languages can theoretically meta-program as well dynamic languages. It is a limitation in the tooling that prevents our code from utilizing itself as information to generate code at compile-time.

Think of examples like proxying, cloning, and mapping. We programmers can see the relationships and generic process for implementing them, but the language isn't smart enough to harness it. 

## Dream Come True

While pondering this I came across C# 9 Source Generators. They fill this expression gap by working like compile-time reflection. We can create code using our code as data! It is not limited to our own code though, we can generate code based on any data at compile-time! 

In summary, dynamic languages are not fundamentally better at meta-programming than static ones and C# 9 will be closing the practical gap with Source Generators.