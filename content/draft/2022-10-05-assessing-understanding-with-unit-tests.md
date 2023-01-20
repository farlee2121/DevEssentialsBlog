---
date: 2023-01-20
tags: [learning, unit tests]
title: Assessing Understanding with Unit tests
draft: true
---

I've been thinking of ways I can encourage students to get knowledge out of their head and experiment. Both so I can give feedback and to get them in the habit of checking their own understanding. I think unit tests might be an effective tool.
<!--more-->

## Teaching clarity
I strongly favor the [better wrong than vague](../posts/Whats-Your-Duck-V2/2022-06-16-1-Software-as-Clarity.md) philosophy. Committing thoughts to concrete forms, like words or code, exposes gaps in our thinking. It also sets a basis for refining understanding, referencing it, or collaborating.

These are all desirable properties for learning. However, I've found some difficulty bridging the gap between my understand and that of learners. Clarity is relative, and we may not understand what context the other person needs to understand what we want to communicate. 

I have also built up an extensive and almost reflexive set of potential experiments for testing my thoughts. Students often won't yet have that.

So, how can I choose a finite skill set that enables students to check their understanding and communicate it effectively?

## Unit tests as understanding

I've long considered unit tests to be an encoding of requirements, the "why" behind a system. In other words, unit tests represent a proposition and the related answer.

This same property can be useful for teaching. Students can encode the key points of their understanding, the "why", as unit tests. A test can be started whenever the student has a question, then the test body works out the answer by experiment.

## Example

Suppose I want a student to understand how typing works in nominally typed languages. More specifically, the relationship between casting and inheritance.

I can ask the student to demonstrate valid casts and invalid casts with unit tests. The test name or a comment can be used to explain why that case is important, or what that test tells us about the type system.

```cs
public class CastingAndInheritanceTests
{
    interface IBase { }
    class Child1 : IBase { }

    [Fact]
    public void AnInvalidCastThrownsAnException()
    {
        //An invalid cast throwns an exception
        Assert.Throws<InvalidCastException>(() => (int)(object)"string");
    }

    [Fact]
    public void ATypeCanCastToItself()
    {
        // a type can cast to itself
        Child1 child1 = (Child1)(object)new Child1();
    }

    [Fact]
    public void ADerivedClassCanCastToABaseClass()
    {
        // a derived class can cast to a base class
        Child1 concrete = new Child1();
        IBase abstr = concrete;
        Assert.Equal(concrete, abstr);
    }

    [Fact]
    public void AnAbstractTypeCanCastToTheConcreteType()
    {
        IBase abstr = new Child1();
        // don't actually do this
        Child1 concrete = (Child1)abstr; 
        Assert.Equal(abstr, abstr);
    }

    public interface IFoo
    {
        string Foo();
    }
    class NotDerived
    {
        public string Foo() => "bar";
    }

    [Fact]
    public void CastingDoesNotWorkIfTypesLookAlikeButDoNotInherit()
    {
        // casting does not work for types that look alike but don't have an inheritance relationship
        // A.k.a The language is not structurally typed
        Assert.Throws<InvalidCastException>(() =>
        {
            IFoo food = (IFoo) new NotDerived();
        });
    }

}
```

## Suspected Benefits

I've been trying out this approach with a student, and the results seem promising.

The student feels more confident asking and answering more of their own questions.
Our feedback sessions are also more productive because we have a shared document to work from. It's not unusual for us to explore a new question in real-time by writing a new test, and we can refer to previous learnings in other tests very concretely.

<!-- Unit tests encode expectations, so they encourage students to always keep the goals of a concept in mind. -->

In general, I feel confident that automated tests 
- Reduce the gap between teacher and student understanding through a shared document
  - The high precision of code seems to help reduce miscommunications
- Stably record increments of the student learning in the student's own terms
- Promote discussion and comparison
- Equip students for independent discovery

I also hope to to use tests to 
- Develop a stable inner working loop: encourage students to feel out the boundaries of an idea while locking down independent facts. 
- Minimize back-tracking from forgetting what they've learned
- Draw connections from learnings into professional work

## Conclusion

Shared understanding is hard, especially across an experience gap.
Unit tests encode expections about a system, and could similarly encode understanding of concepts for educational purposes.

In this way, unit tests would standardize the form of student experimentation, offer immediate feedback similar to professional development, and create an artifact both the student and teacher understand.