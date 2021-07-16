---
layout: post
tags:  [SWEBOK]
---


Abstractly speaking, problem solving using a computer can be considered as a process of problem transformation—in other words, the step-by-step transformation of a problem statement into a problem solution. To the discipline of software engineering, the ultimate objective of problem solving is to transform a problem expressed in natural language into electrons running  around a circuit.

Major steps
- Figure out what to tell the computer to do (problem statement) -
- Convert the problem statement into algorithms (design and construction)
- Convert the algorithms into machine instructions (compiler)

Chapter 13 Section 3.1 Illuminates the division of the early chapters as a series of transforms.

Really each activity is a transform that achieves a level closer to a machine-legible representation of the problem

(may be nice to have a simple graphic that shows natural language on one side and machine instructions on the other)

- a flat view for showing segments of the transform pipeline
- a circular view to emphasize the iterative nature


I realize that maintenance can have significantly different management, cost, and process characteristics. However, from an intellectual/learning standpoint it is just the same process with more constraints than before.
- I suppose this is why the intro lumps maintenance into the "management" portion of the book

related to my spectrum view

Hmm. The SCM intersection is becoming kinda long. I think I should split it

SCM/Quality activities at each step?
- REQs
  - SCM: Inspection (other reviews), Bug trackers, Work trackers, triage / change control boards, estimation/priority separation?
  - Quality: Inspection, mock testing, formal models, language analysis (mentioned by swebok, e.g. find ambiguity indicators), acceptance testing

- Design
  - SCM: Inspections (& other reviews), Source control or other versioning system (e.g. wikis, versioned file system, specialized software)
  - Quality: Inspections (& other reviews), translation to tests, 
- Construction
  - SCM: Source Control, Inspections (& other reviews), pull requests
  - Quality: Inspections (and other reviews), compiler, Static Analyzers, .editorconfig (auto formatting), style guides, automated testing, fault handling, cyclomatic complexity, defect density (requires review and/or bug tracking), fan in/out (component stability)
- Testing
  - SCM: source control, Inspections (& other reviews)
  - Quality: Inspections/review, acceptance testing, test engineering, mutation testing, test counting methods (state machine, branch, ...), Quality assurance process (multiple verification, standard process, measurement standards, reporting, sign-off )
- Delivery
  - SCM: Source control (version history and control deployment definition changes), gated releases, feature flags, deployments as code, infrastructure as code (docker, ARM, cloud formation,...)
  - Quality: logging, uptime monitors, canary testing, backups, redundancy, staged release
- Meta: 
  - SCM: ???
  - Quality: retrospectives, process improvement board/role, self-improving processes (i.e. Inspections), audits 


Uncategorized: chaos testing, stress testing, penetration testing, 

Control and management is generally a factor of data and checkpoints from quality and configuration management practices
- SCM gives natural checkpoints


# Hierarchy of chapters (separate post)

Tiers based on how fundamental each is 
- mid tier built on concepts and measures of bottom tier
- outer tier integrates the middle tier at every stage
- outer tier is the general form of the software process loop. That loop may be very short and on smaller decisions in some methodologies
- true center tier is problem solving (13.1.1 everything is problem solving and specialized techniques separate out into disciplines)

Econ is actually in management and not in foundations, but economics is the differentiation between engineering and science
Maintenance is in management section, not sure if I should include it in the middle or outer tier...
- everything is maintained, and maintenance is more of a perspective, but it sorta has a position in the process flow

<!-- I like how Construx separates out cross-cutting *activities* and cross-cutting *concerns*
- their visual makes more sense to me now -->

intro divides sections into
- development
- management
- Professional Practice
- foundations



IDEA: I could make cross-sectional cheatsheets of swebok
- i.e. a sheet that outlines investigational skills across all chapters


What is my blog post lineup?

- SWEBOK Summative review
- Swebok topic hierarchy
- SWEBOK transform view
- SWEBOK cross-cutting activity table
- Focused concept map 
  - limited to layout and few key ideas. Focused on application view (routine process view)
- Chapter cheat sheets
  - Enumerating key concepts for inclusion in concept map. No need to do for chapters with mostly obvious outlines (most foundations)
  - Requirements
  - Design
  - Construction
  - Testing
  - Quality
  - Config management?
- "Good Enough" target
- Concept map
