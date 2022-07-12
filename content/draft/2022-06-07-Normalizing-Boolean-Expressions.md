---
date: "2022-06-07T00:00:00Z"
draft: true
tags: [formal proof, Boolean logic]
---

# Normalizing Boolean Expressions for Programmatic Inspection

Programmer often arrange boolean expressions in all kinds of groupings for readability. The semantic of these groups, however, is not readily apparent to programs and algorithms. It turns out we can have it both ways, boolean expressions can be algorithmically normalized to consistent depth and form.
<!--more-->

## Motivating Context

I first faced this challenge working on [FsSpec](https://github.com/farlee2121/fsspec). FsSpec aims to aid type-driven development by defining constraints on values as data structures. For example, you might want to constraint an integer to fall in a certain range `and [min 0; max 100]`.

Representing these constraints as data (not functions) allows us to programmatically access the constraints and do far more than just validation. In my specific case, I wanted to generate data matching the requirements.

The simplest way to generate values is to simply filter them from unconstrained values. 

```fsharp
// Example using FsCheck
let constrainedGenerator = 
    Arb.generate<'a> 
    |> Gen.tryFilter (Constraint.isValid constraints)
```

However this is wildly inefficient for common scenarios like small integer ranges or strings matching a regular expression. It wouldn't be fast enough for practical use.

Parsing constraints from arbitrary trees is also insufficient. Consider a constraint
```fsharp
min 0 &&& (max 10 ||| value 500)
``` 

Valid values can only be zero to fifty or 500. This is intuitive to see, but an algorithm would not so easily find both the upper and lower bounds, since they are in split levels of the expression. It's easy enough to solve for this sample, but the separation could be much more complex in an arbitrarily deep expression.

We need some way to consistently understand maximally constrained alternatives allowed by the constraints. Fortunately, I was able to prove that boolean expressions can always be arranged for just that.

## Intuitive Reasoning

Understanding maximally constrained alternatives of a boolean expression structurally means we're looking for AND Groups separated by ORs. 

More visually
```
(a1 AND a2 AND ...) OR (b1 AND b2 AND ...) OR ...
```

The intuitive reason this works is distribution. If we fully distribute every AND then we are left with a set of valid alternatives. Terms that were formally consolidated higher in the tree are now part of each AND group they influenced and each AND group contains all the terms that effect its logical outcome. If any one of these AND groups is true, then the whole expression is true because the groups are strictly joined by OR.

I've included my formal proof below, for those who are curious.

## General Use

I devised this proof for understanding constraint trees, but it applies to any boolean expression. 

I feel like this would be a significant theorem for computer science applications, but I haven't been able to find a name or proof for this form thus far. I'm sure someone has to have proven this before, and I just haven't found the right search query. If you know more about this technique, please enlighten me via this blog's [Github issues](https://github.com/farlee2121/devessentialsblog/issues).

## Formal Proof

**Theorem:** Any boolean expression can be normalized as a series of AND expressions (or single variables) separated by ORs

The most basic case would be a single variable. This trivially satisfies the theorem

```
A
``` 

Similarly, any combination of only AND expressions trivially satisfies the theorem. By distributivity, no grouping of AND statements changes the logical semantic.

```
A1 AND A2 AND A3 ...
```

Similarly, any combination of OR expressions satisfies the theorem. By distributivity, any grouping of the or clauses is logically equivalent.
```
A1 OR A2 OR A3 ...
```


Let us suppose we have an expression of mixed operators. By commutativity, order of terms doesn't matter. There are only two distinct cases.

*CASE:* `A1 OR (A2 AND A3)`

This case trivially satisfies the theorem.

*CASE:* `A1 AND (A2 OR A3)`

By distributivity, this case can be re-written as `(A1 AND A2) OR (A1 AND A3)`. This for satisfies the theorem.

Thus any expression of two operators satisfies the theorem.

Now consider the inductive step

<!-- Could reduce cases by pointing out the above expressions Are equivalent to A1 && A2 and A1 || A2, only need to show 4 cases, but we've already shown all four of those cases work -->

*CASE:* `A1 OR (A2 AND A3)` where A3 is `(B1 AND B2)`.
```
A1 OR (A2 AND (B1 AND B2)) = A1 OR (A2 AND B1 AND B2)
``` 

*CASE:* `A1 OR (A2 AND A3)` where A3 is `(B1 OR B2)`.
```
A1 OR (A2 AND (B1 OR B2)) 
= A1 OR ((A2 AND B1) OR (A2 AND B2)) 
= A1 OR (A2 AND B1) OR (A2 AND B2)`
```

*CASE:* `A1 OR (A2 OR A3)` where A3 is `(B1 OR B2)`.  
This is an expression of all OR operations, thus satisfies the theorem.

*CASE:* `A1 OR (A2 OR A3)` where A3 is `(B1 AND B2)`.
```
A1 OR (A2 OR (B1 AND B2)) = A1 OR A2 OR (B1 AND B2)
``` 

*CASE:* `A1 AND (A2 AND A3)` where A3 is `(B1 AND B2)`
```
A1 AND (A2 AND (B1 AND B2)) = A1 AND A2 AND B1 AND B2
```

*CASE:* `A1 AND (A2 AND A3)` where A3 is `(B1 OR B2)`
```
A1 AND (A2 AND (B1 OR B2)) 
= A1 AND ((A2 AND B1) OR (A2 AND B2)) 
= (A1 AND A2 AND B1) OR (A1 AND A2 AND B2)
```

*CASE:* `A1 AND (A2 OR A3)` has already been shown to satisfy `(A1 AND A2) OR (A1 AND A3) = C1 OR C2`. 
We've already shown that all substitution in an OR statement satisfy the theorem.

Due to commutativity, this is an exhaustive set of distinct cases.

By induction any expression can substitute a variable for a two parameter sub-expression and still satisfy the theorem.
Any boolean expression can be created by different combinations of these substitutions. Therefore any combination of OR and AND expression can be reduced to a series of AND groups separated by OR operators.

NOT is also supported by De Morgan's, supposing were's ok with NOT operators for inverting some of our AND terms.

All logical operations can be constructed from AND, OR, and NOT. Thus, any boolean expression can be reduced to the the specified form.

QED

**LEMMA:** Any boolean expression can be created by expanding a term into a sub expression of two terms.

This feels tedious to prove, but I'm confident it's true because we can express any set of conditions as a binary tree (or as a series of 2-input logic gates)

Really this has to be true because boolean operators are binary operations. They take two term and output one term. It is only the structure that gives an illusion of larger groups. Using parentheses to fully clarify order of precedence would reveal the binary tree of terms
