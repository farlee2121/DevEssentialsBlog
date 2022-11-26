---
date: "2021-05-21T00:00:00Z"
tags: [Duck Docs, Rubber Ducking, Design Process]
title: Duck Structure
aliases:
- /2021/05/21/duck-structure
---

Good designs generally reflect the nature of the problem they solve, and the same applies to designing a process for design. Design is messy, incremental, and has spurts of both broad and deep exploration.

Here I'll describe the simple and flexible organization structure my [duck docs](./../posts/2020-10-02-Whats-Your-Duck.md) evolved to capture design thoughts for reference without impeding exploration.

<!--more-->

> UPDATE: I've [updated some of my duck doc structure](../posts/2022-11-25-Duck-Structure-Update.md)

The organization scheme consists of two main mechanisms: sections and tags.

## Sections

The sections largely reflect steps of design, but also a few frequent-reference items.
- **Motivation**: Every doc starts with a high-level motivation statement. It's important to know the why behind the work so that the right problem is solved. This section is a great place to link pre-existing materials for the task
- **Requirements and constraints**: Starts breaking the motivation down into a checklist of success criteria. Could also be considered a "definition of done".
- **Exploration** (a.k.a. knowns and unknowns): This section is the meat of the document. Questions and facts are collected until there is a clear enough picture to make a solid plan
- **Plan**: Outline the conclusion of the explorations. Often a checklist. Makes an easy reference for implementation and future readers.
- **Implementation**: Additional details and problems always show up during implementation. This section is a scratch pad for modifications to the plan
- **Meta**: I also usually include a yaml section at the top with date, author, and work item information for clerical purposes.


## Tags

Textual tags tame the tangle, providing enough structure to reference key pieces of information without pulling the author out their rapid flow of thought. Tags only require a local decision and can be backfilled easily


My duck docs have refined a fairly small but powerful set of tags over time.
- **Q: / A:** -> Question and it's answer. Deliberation may come in between, usually as bullet points
- **Q: / OPT: / DECIDED:** -> Question, Option, and the final decision
  - Similar to question and answer, but oriented to questions that have limited answers categories
  - **PRO: / CON:** -> State advantages and disadvantages of each option
- **U:** -> Unknown. A statement of some quality that I don't know, but think is important.
- **K:** -> Known. For recording facts about the problem
- **REQ:** -> Requirement. Mostly used to mark new requirements discovered in the flow of exploration. These should be copied up to the requirements section at a convenient time.
- **SOURCE:** -> some reference used to inform the design or a question. 
- **PROBLEM: / OPT:** Very similar to Q:, but used for unforeseen issues in a previous decision rather than general exploration. Also usually phrased as more of a statement about current behavior than a question. A good way to get unstuck.

The Exploration and Implementation section are usually just a nested list of questions. The additional tags help index the raw chain of thought, simplifying reference to previous decisions, sources, and alternatives. 

You don't have to tag everything. Tag things you want to be able to find later. For example, 
- newly discovered requirements or constraints
- decisions about the solution
- the conclusion of a line of questioning
- and key pros or cons of alternate approaches

It's best to get your thoughts out there, and tag them later if they end up being important.

Textual tags are a much more general pattern. You can read about similar techniques [here](./../posts/2021-03-05-Reference-Ready-Notes.md)

## Sample

Here is an actual example from a [learning project of mine](https://github.com/farlee2121/clj-recipe). The stakes were low and the goals loose. Thus, I don't dive deep into many of the questions.
```md
## Motivation

I want to improve my clojure skills
- partially to prepare for a potential consulting project
- partially to understand the "symbolic" computing paradigm

## Requirements & constraints
This project should
- REQ: require a full-stack (api, logic, storage, maybe UI)
- REQ: use datomic in some way
- REQ: Try to coordinate a few different modules
  - REQ: require some composition
- REQ: Include tests
  - REQ: Map the testApi pattern into Clojure

Domain requirements
- REQ: View a list of recipes
- REQ: Add a new recipe
  - REQ: Title, ingredients, instructions
- REQ: View recipe details
- REQ: Update a recipe
- REQ: Delete a recipe
- rate a recipe?

current domain requirements don't seem to require much coordination... We'll start here though. We can add later

## Exploration: Knowns & Unknowns

U: How to use datomic
K: basic idea of building an API with Clojure. See clj-test repository for example
- SOURCE: http://clojure-doc.org/articles/tutorials/basic_web_development.html

U: Architecture and overall design
- It seems to make sense that I use what I learned from Domain Modeling Made Functional. 
  - Con: This will increase the cognitive load
  - Pro: but it will give me another pass at the style of design
  - Pro: the pure style fits well with functional and clojure ideals
  - Pro: I've got a partial event storm available for a recipe app. Reduces the domain considerations
- A: use transform and event style modeling

K: Basic experience with spec
U: Need better concept of testing based on spec (generative testing)

U: How do I want to represent the recipe parts?
- OPT: Individual values
  - pro: easier for me to validate
  - con: recipes are often pretty free-form
- OPT: Separate markdown sections
  - pro: can differentiate ingredient list from steps just by which field they added it to
  - pro: gain powerful formatting with minimal effort
    - e.g. they can now add sections for parts of the recipe like Sauce Ingredients
  - pro: simpler UI and data model for steps and ingredients
  - con: easy for them to enter nonsense
  - con: need to sanitize the input
  - con?: They can add pretty much whatever, it need not be a recipe
  - con: maybe harder to dig out info. I also can't really migrate away once I choose this route
  - pro: better matches the pretty free-form nature of recipes
  - Q: Would it feel natural for users to enter the recipe across multiple fields?
    - A: this is a sample for myself. I think it's fine
  - Q: should I strip image links?
    - seems wise. I don't plan to self-host the images
    - A: I can come back to this if I feel like it. Not high-priority
- OPT: just one markdown field
  - Let's them decide the key sections... Seems a bit too freeform. Maybe nice for the author, less consistent for end users
- Decided: use two markdown fields  

Q: Does clojure have a good library for sanitizing markdown?
- https://github.com/yogthos/markdown-clj
- https://github.com/alxlit/autoclave
- A: there are some options


## Plan

- [x] Define my events and transforms
- [ ] Create a spec model
- [ ] Implement the basic CRUD transforms and read models
    - [ ] Use TDD with testApi 
- [ ] Map events to datomic store
- [ ] Wrap the transforms with API methods
- [ ] Look into adding ratings

```

## Conclusion

The design process is messy. The thought process is fast and loose. However, well chosen sections and textual tags can meet the design process in its natural state *and* provide enough order to speed continuing work.