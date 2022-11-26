---
date: 2022-11-25
tags: [ducks]
title: "Duck Structure Update"
---

My duck docs continue to evolve as my process changes. Here changes I've noticed lately.
<!--more-->

This post does not fully cover duck docs. You can check out the [original duck structure post](../posts/2021-05-21-Duck-Structure.md) or my [whole series on ducking](../posts/Whats-Your-Duck-V2/2022-06-16-0-Intro.md). In short, the ducking process is about communicating ideas to assist the process of solving them. I tend to use lightly structured text documents.

## Sections

The major sections I use are mostly the same

- **Motivation**: Every doc starts with a high-level motivation statement. It's important to know the why behind the work so that the right problem is solved. This section is a great place to link pre-existing materials for the task. 
- **Requirements, Constraints, goals**: Starts breaking the motivation down into a checklist of success criteria. Could also be considered a "definition of done". Work items may contain success criteria, but it's always good to keep them front and center, refining as needed.
- **Exploration**: This section is the meat of the document. Questions and facts are collected and answered until the problem is solved.
- **TODO**: Track any action items that I discover but may not immediately addressed as part of exploration. Usually a checklist. Generally doesn't include outstanding questions, just determined actions.
- **Meta**: A yaml section (usually at the top) with date, author, tags, and work item information for clerical purposes.

I've also noticed that the motivation and requirements sections for bugs tend to focus on Expected Behavior and Actual Behavior, a common format for bug reports.

The main change is the Plan and Implementation sections got absorbed into Exploration and TODO.

I've been refining my ability to work, commit, and pull request in small increments. I usually still ask a lot of questions before writing code, but I no longer separate the exploration and implementation phases. I implement small chunks of value as I have enough knowledge to implement them. The exploration section is a continuous dialog until the problem is solved. 
This also better matches my mental model that [software is increments of clarity until you've represented the problem so that a computer can execute it](../posts/Whats-Your-Duck-V2/2022-06-16-2-Design-Tree-and-Incremental-Progress.md).


## Tags

I've also simplified my tagging. 
- **REQ:** What follows is a requirement, a necessary quality of a completed solution.
- **GOAL:** A factor that guides decisions between solutions that equally satisfy the necessary requirements. Not necessary for a completed solution 
- **Q: / A:** A question and it's answer. Deliberation may come between. Usually as a bullet list under the question.
- **OPT:** An option for a question with tradeoffs or multiple routes
- **PRO: CON:** Pros and cons of a given OPT:
- **SOURCE:** a reference that influenced a decision or question. Often a link
- **STUCK:** used if i'm spinning my wheels. I type out what I think is causing me to feel unsure or otherwise stall. Usually results in new questions that get me unstuck

The main change here is eliminating U: and K: for knowns unknown. I've found that phrasing all of my thoughts as questions and answers is easier for other readers to follow. It also encourages context for a given fact.

I've also added the STUCK tag. Ducks as a whole help organize thought and keep steps of the problem in focus. However, sometimes I might feel overwhelmed or otherwise stop making progress. The stuck tag gives me a standard outlet. I don't have to solve anything, I just explain why I feel stuck. That's usually enough to get going again.

I still occasionally use a handful of other tags
- **PROBLEM:** used for unforeseen issues in a previous decision. First states the identified issue then follows deliberates how to address the issue, potentially overturning an earlier conclusion
- **ALT:** like OPT, but the option is more of an aside (alternative) to a main line of thought
- **DECIDED:** highlight the route chosen from alternatives. I'll generally use A: instead, since most most everthing is posed as a question now.   
- **PICKUP:** A reminder of where I left off to help me get back into the flow later. These usually get deleted once I get back into the flow


<!-- TODO: example? Be sure to show more untagged content to address Jack's complaint -->

## Sample

I've reworked the example from my previous [duck structure post](../posts/2021-05-21-Duck-Structure.md). It focuses on a prior [learning project of mine](https://github.com/farlee2121/clj-recipe). I don't show very deep deliberations, partially because it was a fairly simple project and partially to keep the example size digestable.

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
  - GOAL: Map the testApi pattern into Clojure

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

Q: How do I use datomic?
- I'll need to overview basic concepts and operations, since I don't know if it'll be similar to relational databases
- The official site has some tutorials to get me started, then I can ask some more informed questions.

Q: Are there other technologies I'll need to learn?
- I've already worked with basic APIs
    - See clj-test repository for example
    - SOURCE: http://clojure-doc.org/articles/tutorials/basic_web_development.html
- I have basic experience with spec, the testing library
  - I'm still fuzzy on generative testing
- A: need to refine knowledge of spec's generative testing. 
    - Do some isolated examples


Q: What approach do I use for the architecture and overall design?
- It seems to make sense that I use what I learned from Domain Modeling Made Functional. 
  - CON: This will increase the cognitive load
  - PRO: but it will give me another pass at the style of design
  - PRO: the pure style fits well with functional and clojure ideals
  - PRO: I've got a partial event storm available for a recipe app. Reduces the domain considerations
- A: use transform and event style modeling


Q: How do I want to represent the recipe parts?
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
- A: use two markdown fields  

Q: Does clojure have a good library for sanitizing markdown?
- https://github.com/yogthos/markdown-clj
- https://github.com/alxlit/autoclave
- A: there are some options

Q: What other high-level decisions do I need to make before I can implement vertical?
- Q: Domain modeling?
  - I think the two markdown fields are enough for a proof of concept.
- Q: Technologies?

...

## TODO
- [x] Define my events and transforms
- [ ] Create a sample spec model
- [ ] Implement the basic CRUD transforms and read models
    - [ ] Use TDD with testApi 
- [ ] Map events to datomic store
- [ ] Wrap the transforms with API methods
- [ ] Look into adding ratings


```