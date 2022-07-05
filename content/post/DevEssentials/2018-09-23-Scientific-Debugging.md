---
date: "2018-09-23T00:00:00Z"
tags:
- Construction
- Dev Essentials
- Debugging
---
# Scientific Debugging

*“Finding the defect – and understanding it – is usually 90% of the work” - Steve McConnell*

<!--more-->

Studies suggest a 10x difference in productivity between average and best programmers [Brooks, McConnell].

Scientific debugging is one of the skills that differentiates 10x programmers.
What is scientific debugging and why does it matter? Let’s start with an example.

Story
-----

Once upon a time, I worked in a physics lab. We needed to estimate a magnetic effect on iron filings, and weight was an important factor.

I tried to tackle this problem head on. I got a single iron filing and tried every scale I could get my hands on. However, even the most sensitive scale in the department was not enough to weigh this sliver of metal.

I returned to my professor, defeated, and explained I couldn’t estimate the effect on the filing. My professor was a patient and smart guy. He dumped a bunch of filings on the closest scale and explained “If the filings weigh less than X, we won’t be able to see the effect. The scale shows Y grams, so if there
are more than 1000 filings on the scale, we need to reformulate. Are there more than 1000 filings?”. There clearly were.

Lesson
------

I had spent the better part of a day trying all kinds of special equipment, but my professor answered the question in a minute with common equipment.

Let’s break this down. What did my professor do that was so different from me?
Did he have knowledge I didn’t? Not really, it really comes down to skilled application of the scientific method.

I assumed a particular task was the only way to my goal. I then tried solving that directly instead of better understanding the problem.

My professor started with a solid understanding of what we were trying to accomplish, identified a possible condition of failure, and tested it as simply as possible. He eliminated the need for an individual filing weight all together.

[Scientific method picture]

Tie-in
------

The same skill applies to our debugging (and most problem solving). It is tempting to debug whack-a-mole style, by trying to solve pieces of the issue.
This is unreliable. Cognitive bias prevents us from seeing unexpected error sources or solutions and we can spend a great amount of time solving the wrong problem. Experts, in particular, are more at risk of solving the wrong problem then solving the problem incorrectly (McConnell?).

This is where the scientific method comes in. It allows us to better understand the problem we are solving. We systematically verify our assumptions, reduce the scope of the problem, repeat, and whatever is left must be the answer.

One case where this came particularly in handy was a zero-width non-unicode character. I kept looking at the code thinking nothing was wrong. But I narrowed the scope conclusively to that one line. This prompted me to conduct different tests on the line, eventually opening it in notepad, and finding the culprit
character.

Example Process
---------------

Let’s break it down into steps.

### Observe

Observing is about understanding the problem. Try to create a consistent set of steps for reproducing the error [McConnell].

Examples:

-   Look for logs, error messages, crash conditions, or other evidence that may help you understand what is going on.

-   Explain your problem to a rubber duck (or wall, or co-worker, etc). Explaining your thoughts often reveals the missing info

-   Make sure you understand what the expected behavior and the current behavior. Sometimes the error is not malformed code, but a mismatch with user expectations.

-   Consider environmental evidence. Is the error on one machine or many? For one user or many?

### Question / Hypothesis

The question and hypothesis are all about reducing the scope of the problem. If you have strong evidence, you may directly prove or disprove a likely source for the error. If the problem is not clear yet, your questions should be about removing categories of error sources.

Either way, when your hypothesis is tested, you should never have to consider the losing side of the hypothesis again.

-   Does this happen for one, or many users?

-   Where in the callstack does the data first fail to meet expectations?

-   I hypothesize the issue is caused by malformed data.

### Test

Testing should be the quickest path to a *definitive* answer to the hypothesis.

-   Comment out / remove the suspected code, does the error still happen?

-   Throw a break point or logging message to make sure the expected code actually runs

-   Dependencies - check that expected values and dependencies are provided
    correctly to the component. If not, find boundaries for where the value
    becomes incorrect

-   Ask a coworker to run the reproduction steps

Unit Testing
------------

Scientific debugging ties well into automated testing. If you understand your problem well, you should be able to create an automated test for it. By creating automated tests every time you find an error, you prevent that error from slipping through again. This is called **tightening the net** (The Pragmatic Programmer, p. 246).

Some regarded professionals, like Robert Martin, frown upon debugging. They further formalize this process into Test Driven Development (TDD). The idea being that you need very little debugging if you first formalize assumptions in tests and iterate to meet those assumptions one at a time.

TL;DR
-----

Scientific debugging increases productivity by methodically and definitively improving understanding of the problem.

You should observe, form a question and hypothesis, then test in rapid iterations. Keep a toolbox of simple techniques for forming and testing hypotheses.

Once you understand the problem, write a test and make sure it doesn’t happen again.

Further Reading
---------------

-   Code Complete, Steve McConnell, Chapter 23: Debugging

-   The Pragmatic Programmer, Andrew Hunt & David Thomas, Section 18: Debugging, Section 31: Programming by Coincidence, Section 43: Ruthless Testing

-   The Three Laws of TDD by Robert Martin
    <https://www.youtube.com/watch?v=AoIfc5NwRks>
