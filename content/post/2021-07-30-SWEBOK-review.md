---
date: "2021-07-30T00:00:00Z"
tags:
- SWEBOK
- Reading Review
---

# Reading Review: Software Engineering Body of Knowledge

The Software Engineering Body of Knowledge (SWEBOK) levels up our industry. It collects evidence-based standard practices that every developer is expected to know. This post will establish some background for SWEBOK, cover my high-level takeaways.

## Back Story

In 1990, the Department of Defense commissioned [Prospects for engineering discipline of software](https://resources.sei.cmu.edu/asset_files/TechnicalReport/1990_005_001_299270.pdf). This study examined necessary steps for software to become an engineering profession. In short, what would it take for software to become a mature industry with reliable and repeatable standards. The report lists 5 key steps, and first step is identifying a standard body of knowledge practitioners should know.

SWEBOK is that document. Commissioned by the IEEE (our professional standards body) and committee approved. It gathers evidence-based key practices that every practitioner should know and builds a schema for software practices. 


## CAUTION: SWEBOK is a standards document

SWEBOK is not for general readers.

Yes, it is very important. It draws a clear line for expectations and supports a road map to becoming a competent developer. It coordinates certifications, standards, education programs, terminology, and more. 

However, SWEBOK is a *standards document*. It prioritizes precision and enumeration of ideas. It does not teach the ideas it enumerates, nor does it generally try to make topics approachable. It is not aimed for general audiences and I do not recommend the book to beginner or intermediate developers.

## Direction for General Readers

SWEBOK as a whole is not suited as educational reading, but parts of it introduce topics very well. It spurred other, much more approachable, resources that are suited for beginning and intermediate training.

First off, I recommend the [Construx Professional Development Ladder](https://www.construx.com/professional-development-ladder/). This career ladder lays out an approachable and flexible system for developers to methodically improve their skills. I've [previously summarized](../post/2021-06-28-Construx-Career-Ladder.md) the ladder if you want a deeper look. 

I recommend the following sections for those who want to dabble in SWEBOK
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
The further readings are generally aimed at learning topics introduced by the chapter, and each comes with an explanation of what you should learn from that reading.
The reference table maps every topic to a specific section of relevant source materials.

> Update 2022-01-14: Here's [SWEBOK term definitions](../post/2022-01-14-SWEBOK-term-definitions.md) for a quick overview of SWEBOK topics

## Personal Takeaways

### Confidence and Reference
SWEBOK was a heavy read, but well worth the time. The primary benefit was a solidified overarching framework for software knowledge.

I've also long worked to formulate an overall picture of the software industry, both for mentoring and understanding how complete my own learnings are. The issue is, most books cover particular topics or a individual's take on software skills. They build skills but not an impartial overall picture. SWEBOK finally puts this to rest. It explicitly constructs an overall picture founded in evidence.

Most of the views aligned with mine, but now I know they are supported by industry standard. I can also quickly find supporting materials to back up each practice.

Some of the key ideas SWEBOK reinforced were
- Problem definition (requirements) is foundational to good software
  - Stating the right problem and stating it well is very hard and directly impacts quality
- Requirements are refined throughout the software lifecycle (e.g. design, coding, and testing all feed back into requirements)
- There is no perfect design, only ones that meet requirements
  - Requirements includes quality requirements like maintainability 
  - Economic impact is an important factor for what is "good enough"
- Critical thinking skills underlay every process
- "Software testing is, or should be, pervasive throughout the entire development and maintenance lifecycle"
  - Testing is a risk management strategy, it can't guarantee zero defects
  - Unit testing, as they define, is not about individually testing every internal component. The smallest unit they list is "a larger component made of highly cohesive units".
- Information hiding and abstraction are the underlying drivers of decomposition
- The best documentation is self-documenting code


<!-- Maybe I should talk about how, as an author, I've been working to put together a big picture of the software ecosystem. This -->


### New Ideas
I was also introduced to a few new concepts. Most notably *Software Configuration Management*. This category is all about identifying important information and documents of the software process and controlling updates to them. Some examples include source control (e.g. git), pull requesting changes, bug tracking systems, and automated CI/CD pipelines.

I knew about many configuration management processes before hand, but I hadn't thought of them as a single concern cross-cutting the whole software process.

I also enjoyed some of the theory around test suite completeness (e.g. control-flow coverage models, state machine coverage models).

### Immaturity of Software Design

I was quite disappointed by the Design chapter of SWEBOK. It was very abstract. There were few concrete design systems or practices to latch on to. The methods listed are mostly low-level problem solving approaches (e.g top-down, divide-and-conquer). It also discusses some base patterns like layering, pipes, and kernel.

Unfortunately, I think lack of definition reflects the reality of design practices. Only a few well-defined architecture systems exist, and most of them are not broadly adopted.

The ones I know are
- Plugin-style architectures (Ports and adapters, Clean Architecture, Hexagonal)
- Domain Driven Design
  - often mixed with other architecture approaches
- IDesign

## Conclusion

SWEBOK is a foundational document for building a mature software industry. The book is not the best training material on it's own, but it identifies good sources and has spurred a variety of training materials.

SWEBOK's greatest benefit is a shared concept of good practice. It sets a road map for training, evidence and confidence for the experienced, standard expectations for companies, and a shared language for the industry.


<!-- - Also reinforces how important Design of Design was. Also parts of Code Complete.

Definitely didn't include every technique that's important to me, but covers many that took me a while to learn about. Definitely coming away feeling more sure of my overall understanding. -->


<!-- Side note: it's spooky how I accidentally took pretty much all of the side topics the book mentions (that aren't comp-sci). I took combinatorics, and set theory, and numerical analysis, and modern algebra, and economics, and accounting.  -->
