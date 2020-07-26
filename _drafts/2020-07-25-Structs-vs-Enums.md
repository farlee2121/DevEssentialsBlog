---
layout: post
tags: [Architecture, Patterns, Design thinking, Volatility Analysis]
---

# Why Static Structs are Better Than Enums

C# (and Java) offer a type call Enum. It represents a fixed list of possible values and is a powerful tool for communicating intentions through the type system. However, a recent legacy project forced me to face Enum's shortcomings and realize an even more powerful pattern, struct named constants.

## The Problem
I was working on an old golf-related program. This code was... special. One of it's many problems was the inconsistent use of literals all throughout the code. It was common to see sections like
```cs
if(club.Type == "I") //...
else if (club.Type == "W")//...
else if (club.Type == "D")//...
```
First, the use of literals is a very bad idea. Every time club type is referenced is rife with chances for bugs: 
- what if you type it lower case?
- what if you don't remember all of the potential cases?
- what if the literals aren't obvious and someone mis-remembers? (Does `W` mean wedge or wood? who knows)

Also, good luck trying to track down and change the literals used to represent each state.

*Deep breath*. Ok, next rant. 

The next issue was that this Enum-like use of literals was not consistent. Different parts of the program had different representations of the same concepts. For example, club type might be represented in one place as `I, Wdg, D, F, Wd, H`, and `Iron, Wedge, Driver, Fairway, Wood, Hybrid`. I counted at least four different representative sets for club type, completely undocumented. Conversion was done hodge podge for specific values that a section of code needed.

There were also types like club material or manufacturer. Sometimes we would make decisions based on known club materials or manufacturer, but the list of potential values changes over time.

## The Solution

First some additional constraints on my solution. 
 - Not all related type sets were interchangable. For example, not all club type sets divided clubs the same way (took me forever to figure out metal woods).
 - There were no clear bounds to where these values were used
   - All of these type literals were saved in data stores.
   - Many of the type literals were used in the UI for making decisions
   - It was unclear how many places these values could originate from and what might break if old representations were globally changed
 - I wanted to introduce type safety, slowly converting sections of code to only well-known values
 - I couldn't guarentee I knew all the potential values for a given type literal without looking through the whole program. I only knew what values a section of code used. 

My trusty fallback for these limited-option type representations were enums. However, enums clearly wouldn't work for this scenario because they can only accomodate a fixed set of options decided at design time.

My first step was to at least move all of these literals into named constants. This was a big step forward. 
 - I could now see a clear list of known values (thus expected cases)
 - I could map between related sets in a centralized and normalized way
 - It removed the chance for typing or forgetfulness errors. Values were guaranteed consistency by the compiler
 - Function signatures, property types, and variable types were left alone creating little rework
   - Original values and typing were left unchanged, accomodating for still unknown or changing values

Still, this solution lacked type enforcement. Which variation constants a component required had to be communicated through argument or property naming.

This led me to my final solution, a struct made with intention of creating named constants. Observe,
```cs
// Not a real code excerpt from unnamed system, just a demonstration 
struct ClubType{
    public string TypeName {get; }
    public ClubType(string typeName){
        TypeName = typeName;
    }

    public static ClubType Iron = new ClubType("Iron");
    public static ClubType Wedge = new ClubType("Wedge");
    public static ClubType Driver = new ClubType("Driver");
    //...
}
```

This solution meets all the constraints and desired properties. 
 - I can see the known values
 - I can reference known values in a consistent and compiler-checked way
 - I can clearly communicate expected values of an argument by using the type system
 - I can create instances with arbitrary values to accomodate change or potential missed values
 - I can implement consistent operations on the type, including mapping, getting display values, etc

Turns out this is not a new idea. It's actually how [System.Drawing.Color](https://github.com/dotnet/runtime/blob/6072e4d3a7a2a1493f514cdf4be75a3d56580e84/src/libraries/System.Drawing.Primitives/src/System/Drawing/Color.cs) is implemented for .NET.


It's worth noting that you wouldn't have to use a struct. The same would work with a class, but the value-type semantics of a struct fit this scenario well and provide some nice benefits like value-based equality.

Discriminated unions can also accomodate this scenario and are overall a much more powerful tool. Alas, most OO languages are not graced with them yet.

## Design Comparison
This situation highlighted three design alternatives. Here is their stengths and weaknesses in table form

<style>
td{ text-align:center;}
.good:before {
    color: green;
    content: "\2713\0020";
}
.ok:before{
    color: yellow;
    content: "~ "
}
.bad:before{
    color: red;
    content: "X ";
}
</style>
<table>
    <tr>
        <th width="200px"></th>
        <th>Enums<th>
        <th>Primitive Constants<th>
        <th>Struct Constants<th>
    </tr>
    <tr>
        <td><strong>Add values at write time</strong></td>
        <td><span class="good"><span><td>
        <td><span class="good"><span><td>
        <td><span class="good"><span><td>
    </tr>
    <tr>
        <td><strong>Add values at runtime (accomodate unknown values)</strong></td>
        <td><span class="bad"><span><td>
        <td><span class="good"><span><td>
        <td><span class="good"><span><td>
    </tr>
    <tr>
        <td><strong>Consistent, discoverable write-time refrences</strong></td>
        <td><span class="good"><span><td>
        <td><span class="good"><span><td>
        <td><span class="good"><span><td>
    </tr>
    <tr>
        <td><strong>Remove Values</strong></td>
        <td><span class="good"><span>The most restricted, thus easiest<td>
        <td><span class="good"><span><td>
        <td><span class="good"><span><td>
    </tr>
    <tr>
        <td><strong>Type Enforced</strong></td>
        <td><span class="good"><span><td>
        <td><span class="bad"><span><td>
        <td><span class="good"><span><td>
    </tr>
    <tr>
        <td><strong>Centralized operations (i.e. get display string, mapping, etc)</strong></td>
        <td><span class="ok"><span> A bit awkard in C# because of special typing<td>
        <td><span class="ok"><span>By convention<td>
        <td><span class="good"><span><td>
    </tr>
    <tr>
        <td><strong>Additional Properties</strong></td>
        <td><span class="bad"><span><td>
        <td><span class="bad"><span><td>
        <td><span class="good"><span><td>
    </tr>
    <tr>
        <td><strong>Guaranteed limited set of values</strong></td>
        <td><span class="good"><span><td>
        <td><span class="bad"><span><td>
        <td><span class="ok"><span>Can use a class instead to make all constructors private<td>
    </tr>
    <tr>
        <td><strong>Enumerate values when you don't control the executing code</strong></td>
        <td><span class="bad"><span><td>
        <td><span class="good"><span><td>
        <td><span class="ok"><span>Can have the raw value as a property<td>
    </tr>
</table>

Note the situation of not controlling the executing code. This is an important scenario. Frameworks may allow you to customize your usage through consistent use of values. For example, tagging or configuration where values are referenced by keys. In this case you do not own the code being extended and do not control the types that it uses. However, you do own the semantics for you're well known scenarios created on top of its type system. This is a prime case for primitive named constants. The named constants allow you to organize and enumerate your customizations while maintaining easy integration with the framework's existing types. 

## Summary
Primitive named constants, enums, and struct named constants all have situations where they shine the best. 
However, struct named constants follow the Open-Closed Principle, allowing extension of the type without direct modification while also enjoying the strong typing. Enums are not extensible, and primitive named constants do not enjoy strong typing.

For this reason, I believe that struct named constants are the best solution for representing a related set of known values.