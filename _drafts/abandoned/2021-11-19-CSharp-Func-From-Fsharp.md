---
layout: post
tags: [C#, F#, interop]
---

<!-- I'm not entirely sure this stands. PropertyMapBinder (and the wrapper in Notedown) was able to handle inferred conversion from functions to lambdas fairly well. Even a passed 'a -> 'b was implicitly converted to a Func<'a,'b> -->

Today I tried to test my C# from F#. Most function calls were easy enough to invoke cross-language, but passing lambdas to C# got messy real quick. Fortunately, a little helper function can mediate types between paradigms and keep things simple on both ends.

Normal function calls from F# to C# code just look like a tupled argument. 
```fs
let returnedValue = CSharpClass.Method(param1, param2)
```

However, functional programming has leaked into C# and a lot more functions get passed around as `Action` or `Func`.

For example, I'm trying to test this generic tree reduce function
```cs
public static class Tree{
    public static TAgg Fold<TNode, TAgg>(TNode rootNode, Func<TNode, IEnumerable<TNode>> getChildren, Func<TAgg,TNode,TAgg> accumulate, TAgg initial)
    {
        TAgg aggregate = initial;
        Walk(rootNode, getChildren, (TNode node) => {
            aggregate = accumulate(aggregate, node);
        });
        return aggregate;
    }
}
```

Calling this from C# isn't too bad. I can use a Lambda and most types will be inferred.
```cs
Tree.Fold(tree, (node) => node.Children(), (aggregate, node) => ..., new List<int>());
```

However, C# lambdas and F# lambdas are not the same type. C# uses `Func` and `Action` while F# uses `FSharpFunc`. The main reason for the difference here is F#'s need for partial application. 


> Aside, lambdas are anonymous functions. Think of it as functions we can pass around as values. Both C# and F# treat these differently under the hood than they do named functions on a class or module.

I can convert from an fsharp function to a C# action [using a constructor](https://devonburriss.me/converting-fsharp-csharp/) like `Func<'t, 'u>(fsharpFunction)`.

But that gets gnarly real quick
```fs
Tree.Fold(tree, Func<Tree<None, int>, IEnumerable<Tree<None,int>>>(getChildren), Func<IEnumerable<int>,Tree<None,int>,IEnumerable<int>>(flatten), [])
```

Fortunately, we can write a set of generic converters that allow us to map F# functions to C# Funcs/Actions and let F# type inference do all the messy work.


```fs
module csharp =
  let toFunc<'a, 'b> f =
      System.Func<'a, 'b> f
  let toFunc2<'a, 'b, 'c> f = // 2 for 2 parameters
      System.Func<'a, 'b, 'c> f
  let toAction<'a> f =
      System.Action<'a> f
  let toAction2<'a, 'b> f = 
      System.Action<'a, 'b> f
```

Now the conversion looks like

```fs
Tree.Fold(tree, getChildren |> toFunc, flatten |> toFunc2, [])
```

This can also be used to make nice partial application-friendly wrappers of the original C# function
```fs
let fold root getChildren aggFn initVal = Tree.Fold(root, getChildren |> toFunc, aggFn |> toFunc2, initVal)
```