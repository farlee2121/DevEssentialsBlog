---
date: "2018-12-15T00:00:00Z"
tags: [Project Management, Dev Essentials, Process, Review, Collaboration, Pair Programming]
title: Technical Collaboration
---

> “The need for reviewing was so obvious to the best programmer that they
> rarely mentioned it in print, while the worst programmers believed they 
> were so good that their work did not need reviewing”
> – Daniel Freedman and Gerald Weinberg

IBM found that every hour of code inspection saved 100 hours of related work (Code Complete, p.480). Pair programmers produce higher quality, more maintainable, code in only 15% more time than an individual (Pair Programming Benefits), and inspected systems require 1/10th the maintenance of non-inspected systems
(Code Complete, p. 485).

<!--more-->

These are a few of the stats supporting collaboration and review in software. Teams that regularly collaborate work faster, learn faster, and have fewer defects.

Methods
=======

Collaboration is as diverse as the collaborators, but there is no need to start from scratch. Existing frameworks have quantitatively proven results with adjustment built in. Some of the most common are

**Formal Inspection**: A formal review process that focuses on detecting historically common defects. Roles and process are clearly defined to limit ego and drive improvement over time. Typically, reviewers complete set checks independently. A meeting is held by a moderator, the reviewers discuss defects
and the author gives clarification. After, the author fixes defects.

Inspection has decades of research and has the highest defect detection (about 60%).

**Pair Programming**: A semi-formal process where two programmers take turns typing and assisting. The assistant is active in problem solving and reviewing the work being done.

Pairing has similar returns to formal inspection. Studies show pairs write higher quality code in only 15% more time than individuals.

**Code Readings**: A variable process where reviewers read code to detect errors and provide feedback on qualitative aspects like style and design. Feedback may be in person or through tools like pull request comments.

Readings can have benefit close to that of inspection, but is far less reliable and more sensitive to the contributors. Readings can be a good choice for remote teams or small teams with few experienced developers.

Quality
=======

Collaboration has demonstrated benefits for quality. Consistent code inspection catches 70-85% of defects (Code Complete, p. 485). Pair programming is similarly beneficial, and code reading can catch 20-60% depending on how it is done.

Review also prevents errors before they happen. Since contributors know their work will be checked, they are more conscious of their work and are incentivized to test thoroughly.

A normalized review process clarifies collaboration between different concerns. For example, specialists can review work for a specific concern like compliance or security. Fred Brooks highlights the benefit of enabling one person to specialize in the system architecture, or the big picture of design. This
enables a more consistent system and easier development.

Knowledge Transfer
==================

Normalized collaboration dedicates time for developers to share knowledge and discuss best practices, style, and design.

Multiple studies suggest that teams with a consistent review process (pair programming included) quickly rise to the skill of their best programmer.

Specialized skills also spread because every part of the system is exposed to multiple developers. This increases a team’s bus-factor (ability to lose developers and still function).

Reduced Dev Time
================

Fewer defects and cleaner code result in faster development. Further, developer exposure to more of the system also reduces scheduling challenges, as more developers can handle most tasks.

One study showed 400 programs that used inspection required 1/10th the maintenance of a similar set of programs that were not inspected (Code Complete, p. 485).

Standards
=========

No matter what method you use, there are key practices to maximize your returns.

**Style Guide**: Set a standard for style so collaborators can focus on work, not preferences.

**Rotation**: Regularly change who collaborates. This facilitates better knowledge transfer.

**Process Guide**: Create a brief guide for collaboration. This could be a review checklist, definition of participant roles, or definition of steps. Some formality will smooth collaboration and stabilize outcomes.

**Metrics**: Record some quantitative measures of your process. For example, defects rate, review rate, defect density, and types of defects. Metrics enable objective evaluation of process changes and insight to team struggles.

**Time Limits**: Humans can only effectively process 500 lines of code an hour, at most. Limit the review pace and time per review to maintain focus.

Refinement
==========

Some collaboration techniques have refinement built-in. However, it ultimately falls on the individuals to take refinement to heart. Keep metrics on your process and regularly analyze them for ways to improve.

TL;DR
=====

Technical collaboration methods like inspections or pair programming are proven to reduce dev time, produce better code, and raise team skill.

Further Reading
===============

- Code Complete, Steve McConnell, Ch 21 Collaborative Construction

- Best Practices for Code Review, Smart Bear, <https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/>

- Pair Programming Benefits, Jeff Langr and Tim Ottinger, <https://pragprog.com/magazines/2011-07/pair-programming-benefits>

- Agile Principles, Practices, and Patterns, Robert Martin, Ch 2 Overview of Extreme Programming