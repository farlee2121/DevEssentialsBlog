---
layout: post
tags: [C#, Records]
---

# C# Records Compare Private Members

Turns out private members of C# records affect value-based equality.

This means that if we define a type like

```cs
public record Title{
    private string title;

    public Title(string title){
        this.title = title;
    }
}
```

Then 
```cs
new Title("hi") == new Title("hi") // true
new Title("hi") == new Title("bye") // false
```

The same applies for private propertiesn

```cs
public record Title{
    private string title {get; set;}

    public Title(string title){
        this.title = title;
    }
}
```

I'm note 100% sure how I feel about this. It does allow types, as above, to retain value equality without exposing their internal values. This is a case I encounter often.


At the same time, it could cause unintuitive inequality. Two instances of a type could appear to be the same because all their public values match, but still not be equal because of hidden values. I can picture this causing a debugger great confusion.

```cs
public record MixedAccessLevels{
    // consumers can only inspect `visible`
    private string invisible {get; set;}
    public int visible {get; set;}

    public Title(string invisible, int visible){
        this.invisible = invisible;
        this.visible = visible;
    }
}
```


