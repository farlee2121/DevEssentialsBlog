---
date: "2022-01-14T00:00:00Z"
tags:
- SWEBOK
- Software Engineering
title: SWEBOK Key Definitions
---

I realized that my Software Engineering Body of Knowledge (SWEBOK) posts reference, but never define, the 15 key knowledge areas outlined by SWEBOK. I intent to fix that with this post.

Below I cover each of SWEBOK's key knowledge areas with
- An informal definition
- Some examples for context
- A defining excerpt from the book


## Software Requirements 
Requirements establish a shared expectation about the software, usually some aspect of customer need.
 
Requirements are often formalized, but still in natural language. This generally results in "stories" or self-contained statements of user need that are small enough in scope to estimate and deliver in an acceptable time frame (i.e. <= 1 week). A story often includes a breakdown of expectations as a "definition of done" or "acceptance criteria". Defining requirements includes many kinds of discovery like interviews, shadowing, mockups, etc.

> Software requirements **express the needs and constraints** placed on a software product that contribute to the solution of some **real-world problem**. 
 
> The Software Requirements knowledge area (KA) is concerned with the elicitation, analysis, specification, and validation of software requirements 
as well as the management of requirements **during the whole life cycle** of the software product. It is widely acknowledged amongst researchers and industry practitioners that **software projects are critically vulnerable when the requirements-related activities are poorly performed**.
 


## Software Design

Design starts to compare customer need (requirements) against high-level solutions. Design often defines major divisions of the software and underlying non-functional requirements like scalability, robustness, security approaches, and similar.

Design is diverse and based on the needs of the software, but some common key activities include
- Identifying self-contained sub-systems
- Isolating and outlining key domain (business) workflows
- Identifying transaction boundaries (what units succeed or fail together)
- Overarching error handling strategies
- Producing component diagrams, activity diagrams, security diagrams, etc

> Design is defined as both "the process of defining the architecture, components, interfaces, and other characteristics of a system or component" and “the result of [that] process”.
>
> Viewed as a process, software design is the software engineering life cycle activity in which software requirements are analyzed in order to produce a description of the software’s internal structure that will *serve as the basis for its construction*. A software design (the result) describes the software architecture—that is, **how software is decomposed and organized into components — and the interfaces between those components**. It should also describe the components at a level of detail that enables their construction.



## Software Construction
Construction transitions our solution from high-level designs to computer-executable code. 

This is not a mechanical process. The detail of implementation often reveals undiscovered requirements and tradeoffs that must be resolved with the customer. Component design, method-level design, and developer tests are also a major factor in system understandability and quality.

Examples
- Test-Driven Development (TDD) loop
- Most any time you use a programming language

> The term software construction refers to the **detailed creation of working software through a combination of coding, verification, unit testing, integration testing, and debugging**. ...
>
> Although some detailed design may be performed prior to construction, **much design work is performed during the construction activity**.



## Software Testing
Testing executes the software to verify expectations.

SWEBOK includes debugging (running the software with ability to stop at certain lines of code & inspect values) in this category. Most often this category refers to automated tests (e.g. unit tests). I have several posts on [different kinds of tests](../posts/2021-08-30-Test-Types-and-Lifecycle-Phases.md) and [when to use them](../posts/2021-12-05-What-tests-measure.md).

Examples
- Debugging
- Unit testing
- Integration testing
- Property Testing
- Load testing
- Monitors / health checks

> Software testing consists of the **dynamic verification** that a program provides **expected behaviors** on a finite set of test cases, suitably selected from the usually infinite execution domain.
>
> In recent years, the view of software testing has matured into a constructive one. Testing is no longer seen as an activity that starts only after the coding phase is complete with the limited purpose of detecting failures. Software testing is, or should be, **pervasive throughout the entire development and maintenance life cycle**. Indeed, planning for software testing should start with the early stages of the software requirements process.



## Software Maintenance:
Maintenace includes ongoing changes to and support of existing software. 

This includes monitoring for new or changed understanding of the problem, then running through the software lifecycle to adapt to the change. It also includes most documentation and devops concerns (e.g. deployment, monitoring).

Maintenance implies a shift in cost and technique profiles from completely new software. In reality, most development is maintenance. 

Examples
- Continuous Integration / Continuous Delivery (CI/CD)
- Software updates
- Documentation
- Support tickets
- Monitors, healthchecks, logging

> In this Guide, software maintenance is defined as the totality of **activities required to provide cost-effective support to software**. Activities are performed during the predelivery stage as well as during the postdelivery stage. Predelivery activities include planning for postdelivery operations, maintainability, and logistics determination for transition activities. Postdelivery activities include software modification, training, and operating or interfacing to a help desk.
> 
> Software development efforts result in the delivery of a software product that satisfies user requirements. **Accordingly, the software product must change or evolve**. Once in operation, defects are uncovered, operating environments change, and new user requirements surface. The maintenance phase of the life cycle begins following a warranty period or postimplementation support delivery, but maintenance activities occur much earlier. 



## Software Configuration Management
Think change control and tracking.

Configuration management is a relatively unknown term among software professionals, but a common activity. Configuration management is largely about controlling changes to key artifacts and processes. For example,
- source control (e.g. Git)
- work item trackers (e.g. Jira, Github issues)
- software deployment techniques (CI/CD -> continuous integration / continuous deployment)
- [infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_code)

> A system can be defined as the combination of interacting elements organized to achieve one or more stated purposes. The configuration of a system is the functional and physical characteristics of hardware or software as set forth in technical documentation or achieved in a product; it can also be thought of as a collection of specific versions of hardware, firmware, or software items combined according to specific build procedures to serve a particular purpose. Configuration management (CM), then, is the discipline of identifying the configuration of a system at distinct points in time **for the purpose of systematically controlling changes** to the configuration **and maintaining the integrity and traceability** of the configuration throughout the system life cycle.
> 
> Software configuration management (SCM) is a supporting-software life cycle process that benefits project management, development and maintenance activities, quality assurance activities, as well as the customers and users of the end product. 

## Software Engineering Management
Software engineering management is mostly management in the general sense. It's about how we track our projects against goals and course correct to stay on track.

> Software engineering management can be defined as the **application of management activities**—planning, coordinating, measuring, monitoring, controlling, and reporting to ensure that software products and software engineering services are **delivered efficiently, effectively, and to the benefit of stakeholders**.

## Software Engineering Process
Software Engineering Process is effectively process in the general sense.

It's how we go about executing our activities and how that feeds into accomplishing desired outcomes. This includes the software development lifecycle, but also the selection and arrangement of controls and measures within that lifecycle, as well as process improvement practices.

I've previously discussed software development as [a series of problem transformations](../posts/2021-08-13-Swebok-transform-view.md) and how this process [produces artifacts for control](../posts/2021-08-20-SWEBOK-transform-SCM.md).

Examples
- Development lifecycles (e.g. requirements, design, construction, test, and maintenance)
- Process maturity models (e.g. [CMMI](https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=9661))
- Checklists
- Process Standards / Standard Procedure
- Process measurement (E.g. utilization, defect density, etc)
- Continuous improvement, retros, etc



> In this knowledge area (KA), software engineering processes are concerned with work activities accomplished by software engineers to develop, maintain, and operate software, such as requirements, design, construction, testing, configuration management, and other software engineering processes
>
> An engineering process consists of a **set of interrelated activities that transform one or more inputs into outputs** while consuming resources to accomplish the transformation. Many of the processes of traditional engineering disciplines (e.g., electrical, mechanical, civil, chemical) are concerned with transforming energy and physical entities from one form into another, as in a hydroelectric dam that transforms potential energy into electrical energy or a petroleum refinery that uses chemical processes to transform crude oil into gasoline.


## Software Engineering Models & Methods
Models & methods are ways we encode knowledge about software. The models half includes kinds of diagrams, pattern descriptions, etc. Methods generally refers to ways of doing things like agile, kanban, etc.

Examples
- Class diagrams
- Flow charts
- Activity diagrams
- Design Patterns
- Agile
- Kanban

> Software engineering models and methods **impose structure** on software engineering with the **goal of making that activity systematic, repeatable, and ultimately more success-oriented**. Using models provides an approach to problem solving, a notation, and procedures for model construction and analysis. Methods provide an approach to the systematic specification, design, construction, test, and verification of the end-item software and associated work products.


## Software Quality
Quality defines how good our software and process is.

"How good" can mean many things. In general, software engineers should quantify quality goals (e.g. time between defects) and continually refine practices based on those measures.

Examples
- Time between defects
- Frequency of defects (e.g. bug reports)
- Understandability
- Robustness
- Responsiveness
- Latency
- Completeness (e.g. how well tests cover system)

> Software quality may refer: to **desirable characteristics of software products**, to the extent to which a particular software product possess those characteristics, and to processes, tools, and techniques used to achieve those characteristics. 
>
> More recently, software quality is defined as the "capability of software product to satisfy stated and implied needs under specified conditions” and as “the degree to which a software product **meets established requirements**; however, quality depends upon the degree to which those established requirements **accurately represent stakeholder needs**, wants, and expectations"


## Software Engineering Professional Practices:
Largely about ethics, regulations, and knowing the baseline expectations of a professional.

Examples
- Certifications, baseline of competence
- Know regulations
- Prioritize safety and societal impact
- Personal accountability
- Use industry best practices
- Effective communication

> The Software Engineering Professional Practice knowledge area (KA) is concerned with the knowledge, skills, and attitudes that software engineers must possess to practice software **engineering in a professional, responsible, and ethical manner**.


## Foundations

The last four key areas are foundations, which I figured don't need definitions. Instead I list a few of the referenced techniques

- **Economics**: economic decision models, cost/benefit analysis, earned value, estimation techniques, "good enough" principle
    >Software engineering economics is about making decisions related to software engineering in a business context. The success of a software product, service, and solution depends on good business management.

- **Computing Foundations**: structured programming, problem solving approaches, principles (abstraction, encapsulation, etc), programming paradigms (object-oriented, functional, imperative, etc), security basics
- **Math Foundations**: proof techniques, finite state machines, complexity classes, set theory, formal logic 
- **Engineering Foundations**: scales of measurement, margin of error, engineering design process, tradeoff analysis, experimental methods, modeling techniques