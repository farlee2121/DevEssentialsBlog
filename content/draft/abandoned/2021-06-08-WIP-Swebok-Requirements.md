---
date: "2021-06-08T00:00:00Z"
draft: true
tags: []
---

<style>

.sheet{
    /* a4 paper */
    height: 8.3in;
    width: 11.7in;
    background-color: white;
    padding: .25in;
    box-sizing: border-box;

}

.sheet .table{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: flex-start;

    border: 2px solid black;
    height: 100%;
    width: 100%;
}

.sheet section {
    border: 1px solid black;
    width: 2in;
}
</style>

<!--
GOAL: Document should provide quick reference to all keypoints from the chapter
GOAL: Document should be glance-able
NON-GOAL: teach all the concepts
GOAL: Understand lay of key terms and techniques.
- also motivations/goals and involved parties
GOAL: Self-reference for building a concept map

 IDEA: color code the different text tags like CORE, TECH, etc 
 
 possible tags: TECH, CORE, CROSS, DEFN, GIST, QUAL -->

<article class="sheet">
<section class="table">
<section>

## Introduction 
The Software Requirements knowledge area (KA) is concerned with the elicitation, analysis, specification, and validation of software requirements as well as the management of requirements during the whole life cycle of the software product.
- software projects are critically vulnerable when the requirements-
related activities are poorly performed
- DEFN: Software requirements express the needs and constraints placed on a software product that contribute to the solution of some real-world problem
- DEFN: “requirements engineering” is widely used in the field to denote the systematic handling of requirements.
- ROLE: Requirements Engineer, Requirements Specialist
- The process-based breakdown reflects the fact that the requirements process, if it is to be successful, must be considered as a process involving complex, tightly coupled activities (both sequential and concurrent), rather than as a discrete, one-off activity performed at the outset of a software development project.
- CROSS: most all KAs

## 1.1 Requirement Fundamentals
- could move req definition here
- Requirements are complex and multi-source because problems are complex and multi-source
- must be verifiable
- additional properties to facilitate management

## 1.2 Product and Process Requirements
- DEFN: product requirement -> constraint or need of the software 
- DEFN: process requirement -> constraint or need of how the software is made

## 1.3 Functional and Non-Functional Requirements
- DEFN: Functional Requirements: describe expected features
- DEFN: Nonfunctional Requirements: aka constraints or quality requirements. Describe attributes of how functional requirements are achieved (e.g. performance, maintainability, safety, reliability, security, etc)

1.4 *Emergent Properties* Some requirements represent emergent properties of software—that is, requirements that cannot be addressed by a single component but that depend on how all the software components interoperate.

1.5 Software requirements should be stated as clearly and as unambiguously as possible, and, where appropriate, quantitatively.
- somewhat duplicate of objective verifiability 

1.6 System and Software Requirements
- DEFN: User Requirements: requirements sourced from end users of system
- DEFN: System requirements: requirements for larger system as a whole. Includes user requirements, regulations, and all other requirements sources 
- DEFN: Software requirements: requirements for a particular component (this isn't well defined)

<!-- idea: split into defs and properties. hmm, the contrast can be helpful though -->
</section>

<section> 

## (2 Reqs Process) 2.1 Process models
- is not a discrete front-end activity of the software life cycle, but rather a process initiated at the beginning of a project that continues to be refined throughout the life cycle;
- identifies software requirements as configuration items and manages them using the same software configuration management 
practices a other products of the software life cycle processes;
- needs to be adapted to the organization and project context.

2.2 Process Actors (stakeholders): Users, customers, market analysts, regulators, software engineers
- balancing stakeholder needs is a major concern of requirements

2.4 Quality and Improvement (this is pretty meh, could oust for section 6)
- process coverage by standards and models
- measures and benchmarks
- improvement programs

</section>

<section>

## 3 Requirements Elicitation

3.0
DEFN: Requirements elicitation is concerned with the origins of software requirements and how the software engineer can collect them.

CORE: It is the first stage in building an understanding of the problem the software is required to solve. 

CORE: It is fundamentally a human activity and is where the stakeholders are identified and relationships established between the development team and the customer

CORE: One of the fundamental principles of a good requirements elicitation process is that of effective communication between the various stakeholders. This communication continues through the entire software Development Life Cycle (SDLC) process with different stakeholders at different points in time.

GOAL: They must mediate between the domain of the software users (and other stakeholders) and the technical world of the software engineer.
- TECH: internally consistent models at different levels of abstraction for different stakeholders facillitate communication

GOAL: A critical element of requirements elicitation is informing the project scope.
- describe the software and its purpose
- prioritize deliverables by customer need
  - reduces waste on low-importance reqs or ones that change by the time they're needed

3.1 Requirement Sources
- Goals: high level objectives/motivations of the software
- Domain knowledge: often implicit background of the core problem
- Stakeholders: different groups often have conflicting needs
- Business rules
- Operational Environment
- Organizational Environment

3.2 Elicitation Techniques
- CORE: requirements are elicited ready-made. Have to distill and dig
  - users hay have difficulty describing their tasks, leaving important info implicit, unable or unwilling ot cooperate
  - difficult even with cooperative and articulate stakeholders
- techs
  - interviews
  - scenarios (what ifs)
  - Prototypes
  - Facilitated meetings
  - Observation (e.g. shadowing)
  - user stories
  - Analyze competitors
  - Customer request databases

</section>

<section>

## 4 Requirements analysis
4.0
- detect and resolve requirement conflicts
- discover bounds of software
- elaborate system reqs into software reqs

- reqs must be described precisely enough
  - to validate
  - verify implementations
  - estimate costs

4.1 Requirement Classifications
- functional/nonfunctional
- emergent / direct
- product / process
- priority
- scope (expected impact on existing system)
- volatility/stability

4.2 Conceptual Modeling
- Core: Capture real-world problems with context and constrain a solution
- Model types
  - use case diagrams
  - data flow
  - state models
  - user interactions
  - data models
- Model factors
  - nature of the problem
  - expertise of the engineer
  - process requirements (organizational preference)

REstate: "in almost all cases, it is useful to start by building a model of the software context" understand interaction of software with it's external environment 
- maybe "code or software models are hi-fidelity requirements models"
  - also highlights boundary detail issues hard to see otherwise

4.3 Architectural design and Requirements
- CORE: impossible to cleanly separate requirements and architecture
- Software Engineer often acts as the architect because understanding the requirements requires software design work
- **Allocation is critical**, especially to nonfunctional requirements (e.g. performance budgets for each module to reach overall goals)

4.4 Requirements Negotiation (Conflict Resolution)
- Decisions important decisions are traceable back to the customer
- Tradeoffs are key
  - prioritization (one feature vs another "analytic hierarchy process")
  - cost-value tradeoff

4.5 Formal analysis
- DEFN: custom language for unambiguous statements and automated verification (satisfies language expectations, conflict detection)
- use for: high stakes systems
- don't use: for unstable requirements

</section>

<section>

## 5 Requirements specification
- DEFN: "production of a document that can be systematically reviewed, evaluated, and approved"
- As many as three distinct documents, usually only software requirements
  - (DUPLICATION)
  - 5.1 DEFN: *System Definition* is high-level requirements from the domain perspective
  - 5.2 DEFN: *System Requirements Specification* includes software and all other components requirements for projects with significant non-software components
  - 5.3 DEFN: *Software Requirements Specification* establishes basis of agreement between customers and contractors/suppliers on what the software product should and shouldn't do
    - CRITICAL: Allows assessment of requirements before substantial implementation. Enables estimation, planning, verification, and all downstream work. Reduces rework
    - often in natural language, but may use semi-formal wording
    - more formal wording standards -> more precision
- Quality indicators
  - Per-req: imperatives, directives, weak phrases, options, and continuances
  - overall: size, readability, specificity, depth, text structure

</section>

<section>

## 6 Requirements Validation
6.0
goals
- ensure engineer understood the requirements
- meets standards
- understandable, consistent, complete
- defines the right problem (as expected by user)

Reqs subject to change control like any other part of software

<!-- Q: should I include pro/cons of techniques? -->
Techniques
- Requirement Reviews (e.g. Inspections, peer reviews, customer rep reviews, quality checklists)
- Prototyping (E.g. wire frames, mocks)
- Model Validation (depends on models used. E.g. formal language models, object models, workflow models)
- Acceptance tests: verification of requirements executed by customer representatives

</section>

<section>

## 7 Practical Considerations
7.0
- The requirements process  spans  the  whole software life cycle
-  Change management and the maintenance  of  the  requirements  in  a  state  that accurately mirrors the software to be built, or that 
has been built, are key to the success of the software engineering process
- requirements documentation and change management are key to the success of any requirements process 

7.1 Iterative Nature of requirements
- it is almost always impractical to implement the requirements process as a linear, deterministic  process  in  which  software  requirements  are  elicited  from  the  stakeholders,  baselined, allocated, and handed over to the software development team
-  requirements typically iterate towards a level of quality and detail that is sufficient to permit  design  and  procurement  decisions  to  be made.
- a project team may baseline only those requirements needed for the current iteration...This approach provides customers with business value quickly, while minimizing the cost of rework
- In almost all cases, requirements understanding continues to evolve as design and development proceeds
-   Perhaps  the most  crucial  point  in  understanding  software 
requirements  is  that  a  significant  proportion  of the requirements *will* change (because the world/problem changes)
- proposed changes go  through  a  defined  review  and  approval

7.2 Change Management
- CROSS 7.1 (maybe just move the point here)

7.3 Requirements Attributes
- DEFN: additional info that helps manage and interpret requirements
Examples
  - priority
  - Categorization/tags
  - Acceptance tests
  - Verification plan
  - source/requestor
  - change history
  - unique ID

7.4 DEFN: Requirements Tracing is ability to track connections and history from the source stakeholder/motivation to the work that satisfies it
- key for impact analysis

7.5 Measuring Requirements
- CROSS: 5.3 quality indicators
- mostly seems to care about size for evaluating change impact
- TECH: Functional Size Measurement
- CROSS: Software Engineering Process KA

</section>
<section>

## 8 Tools
- modeling tools
- management tools (e.g. Issue trackers)

## Key Resources
TODO

</section>



</section>
</article>


