---
layout: post
tags: [SWEBOK, Reading Review]
---

The Software Engineering Body of Knowledge (SWEBOK) is an important document for leveling up our industry. It collects evidence-based standard practices that every developer is expected to know. This post will establish some background, cover my high-level takeaways, and set up later posts that examine pieces of SWEBOK in greater detail.

## Back Story

In 1990, the Department of Defense commissioned [Prospects for engineering discipline of software](https://resources.sei.cmu.edu/asset_files/TechnicalReport/1990_005_001_299270.pdf) by Mary Shaw. This study examined the potential and necessary steps software to become an engineering profession. In short, what would it take for software to become a mature industry with reliable and repeatable standards. The report lists 5 key steps, and first step is identifying a standard body of knowledge practitioners should know.

SWEBOK is that document. Commissioned by the IEEE (our professional standards body) and committee approved. It gathers evidence-based key practices that every practitioner should know. 


## CAUTION: SWEBOK is a standards document

SWEBOK is not for general readers.

Yes, it is very important. It draws a clear line for expectations and supports a road map to becoming a competent developer. It coordinates certifications, standards, education programs, terminology, and more. 

However, SWEBOK is a *standards document*. It emphasizes precision and enumeration of ideas. It does not teach the ideas it enumerates, nor does it generally try to make topics approachable. It is not aimed for general audiences and I do not recommend the book to beginner or intermediate developers.

## Direction for General Readers

SWEBOK as a whole is not suited as educational reading, but parts of it introduce topics very well. It also has spurred other, much more approachable, resources that are suited for beginning and intermediate training.

First off, I recommend the [Construx Professional Ladder](https://www.construx.com/professional-development-ladder/). This career ladder lays out an approachable and flexible system for developers to methodically improve their skills. I've [previously summarized](../_posts/2021-06-28-Construx-Career-Ladder.md) the ladder if you want a deeper look. 

For those who want to dabble in SWEBOK, I recommend the following sections
- Chapter 13.1 Problem Solving Techniques
- Chapter 13.2 Abstraction
- Chapter 13.3 Programming Fundamentals
- Chapter 15.4 Engineering Design
- Chapter 12.1.5 Decision-Making Process
- Chapter 12.3 Risk and Uncertainty
- Chapter 12.5.1 "Good Enough" Principle
- Ch 10 Quality
- Ch 4 Testing

Each of these chapters is relatively concrete and introduces fundamental concepts for robust software practice.

SWEBOK is also an exceedingly good index of topic resources. Each chapter defines further readings and a table of topic resources.
The further readings are generally aimed at learning topics of the chapter. Each comes with an explanation of what you should learn from that reading.
The reference table maps every topic to a specific section(s) of relevant source materials.

## Personal Takeaways

SWEBOK was a heavy read, but well worth the time. The primary benefit was a solidified overarching framework for software knowledge. Most of the views aligned with mine, but now I know they are supported by industry standard. I can also quickly find supporting materials to back up each practice.

- especially backed up Design of Design
- Config management
- core idea i sometimes forget I had to learn
- Quality measures like state-machine based enumeration of possible tests
- disappointed by lack of overall architecture patterns

## Conclusion



- Identifying and naming Configuration Management is important for shaping conceptual views.
  - Didn't do a great job calling out specific examples, but it was enough for me to see it through my own processes
- Backs up key beliefs I sometimes forget I had to learn
  - Defining the problem is hard, should be considered deeply, and must be continually evaluated through the process
  - Defining the problem is also part of the engineer's job
  - info hiding and abstraction are the underlying drivers of decomposition
  - There is no perfect design, only ones that meet the requirements "Good Enough"
  - Best documentation is self-documenting code

- Also reinforces how important Design of Design was. Also parts of Code Complete.

What value did I gain
- certainty, sources to read on some topic I want to know more about
- configuration management as a category and tool
- 

Definitely didn't include every technique that's important to me, but covers many that took me a while to learn about. Definitely coming away feeling more sure of my overall understanding.


Why am I stuck?
- I don't see the overall narrative

<!-- Side note: it's spooky how I accidentally took pretty much all of the side topics the book mentions (that aren't comp-sci). I took combinatorics, and set theory, and numerical analysis, and modern algebra, and economics, and accounting.  -->

<!-- core swebok post
- not for general audiences
- it even talks about how it is a standard for creating other materials (certs, accrediations, ...)
- great citation and reference 
- further readings good for learning the enumerated concepts. Concisely states the value of each further reading 

high-level impression: design and architecture didn't seem very helpful. Not sure the value of separating maintenance. SCM, Quality, process, testing were all quite good. 
I think this relects an actual gap in standards for design/architecture, or at least in communicating those standards versus other software concerns

Highly recommend 13.1, 13.2, 13.3
 -->