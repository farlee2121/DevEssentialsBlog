---
date: 2022-10-05
tags: [learning, unit tests]
title: Assessing Understanding with Unit tests
draft: true
---

<!-- TODO: Benefits section doesn't flow with overall framing -->
<!-- TODO: should test this more in mentoring before posting -->
I've been thinking of ways I can get student to get knowledge out of their head and experiment. Both so I can review and give feedback and to get them in the habit of checking their understanding. I think unit tests might be an effective tool.
<!--more-->

## Teaching clarity
I strongly favor the [better wrong than vague](../posts/Whats-Your-Duck-V2/2022-06-16-1-Software-as-Clarity.md) philosophy. Committing our thoughts to concrete forms like words or code exposes gaps in our thinking. It also sets a basis for refining understanding, referencing it, or collaborating.

These are all desirable properties for learning. However, I've found some difficulty bridging the gap between my understand and that of learners. My concept of clear is not the same as theirs. Clarity is also relative, and we may not understand context the other person needs to understand a concept. 

I also have build up an extensive and almost reflexive set of potential experiments for testing my thoughts. Students don't yet have that.

So, how can I choose a finite skill set that enable students to check their understanding and communicate it effectively.

## Unit tests as understanding

Unit tests are commonly used to verify production systems work the way we expect them to.
I've long considered unit tests to be an encoding of requirements, the "why" behind a system.

This same property can be useful for teaching. Students can encode the key points of their understanding as unit tests.

## Example

Suppose I want a student to understand how typing work in nominal languages. More specifically, the relationship between casting and inheritance.

I can ask the student to demonstrate cases of valid casts and invalid casts with unit tests, and name or comment each test to why each case is a valid or invalid cast.

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
        Child1 concrete = (Child1)abstr;
        Assert.Equal(abstr, abstr);
    }

    public interface IFoo
    {
        public string Foo();
    }
    class NotDerived
    {
        public string Foo() => "bar";
    }

    [Fact]
    public void CastingDoesNotWorkIfTypesLookAlikeButDoNotInherit()
    {
        // casting does not work for types that look alike but don't have an inheritance relationship
        Assert.Throws<InvalidCastException>(() =>
        {
            IFoo food = (IFoo) new NotDerived();
        });
    }

}
```

## Benefits

This approach encourages students to feel out the boundaries of an idea with experiments that are repeatable, referencable for later review, and sharable. 

Unit tests encode expectations, so they encourage students to always keep the goals of a concept in mind.

Unit tests simultaneously guide experimentation and provide immediate feedback. A good compiler will pass/fail many ideas right away. The test can also be run to feel out the problem. 

Even better, the feedback loop with the tests is very similar to what the student will experience while developing code professionally.

After experimenting, the test remains as an expression of the studen'ts knowledge. It serves as a reference point for the teacher to give concrete feedback, and review for the student. The compiler and pass/fail nature of the tests also requires a higher level of precision than does prose or verbal communication.


## Conclusion

Shared understanding is hard, especially across an experience gap.
Unit tests encode expections about a system, and can similarly encode understanding of concepts being learned.

In this way, unit tests standardize the form of student experimentation, offer immediate feedback similar to professional development, and create an artifact both the student and teach understand.