---
layout: post
tags: [SWEBOK, ]
---

# SWEBOK Key Definitions

I realized that my Software Engineering Body of Knowledge (SWEBOK) posts reference, but never define, the 15 key knowledge areas outlined by SWEBOK. I intent to fix that with this post.

Below I cover each of SWEBOK's key knowledge areas with
- An informal definition
- Some examples for context
- A defining excerpt from the book

<!-- 
TODO: Highlight key bits in the swebok excerpts 
 -->


## Software Requirements 
Requirements establish a shared expectation about the software, usually some aspect of customer need.
 
Requirements are often formalized, but still in natural language. This generally results in "stories" or self-contained statements of user need that are small enough in scope to estimate and deliver in an acceptable time frame (i.e. <= 1 week). A story often includes a breakdown of expectations as a "definition of done" or "acceptance criteria". Defining requirements includes many kinds of discovery like interviews, shadowing, mockups, etc.

> Software requirements express the needs and constraints placed on a software product that contribute to the solution of some real-world problem. 
 
> The Software Requirements knowledge area (KA) is concerned with the elicitation, analysis, specification, and validation of software requirements 
as well as the management of requirements during the whole life cycle of the software product. It is widely acknowledged amongst researchers and industry practitioners that software projects are critically vulnerable when the requirements-related activities are poorly performed.
 
## Software Design

Design starts to compare customer need (requirements) against high-level solutions. Often the phase where major divisions of the software are discovered and underlying required qualities like scalability, robustness, security approaches, and similar are decided.

Design is diverse based on the needs of the software, but some common key activities include
- Identifying self-contained sub-systems
- Isolatign and outlining key domain (business) workflows
- Identifying transaction boundaries (what units succeed or fail together)
- Overarching error handling strategies
- Producing component diagrams, activity diagrams, security diagrams, etc

> Design is defined as both "the process of defining the architecture, components, interfaces, and other characteristics of a system or component" and “the result of [that] process”.
>
> Viewed as a process, software design is the software engineering life cycle activity in which software requirements are analyzed in order to produce a description of the software’s internal structure that will *serve as the basis for its construction*. A software design (the result) describes the software architecture—that is, **how software is decomposed and organized into components — and the interfaces between those components**. It should also describe the components at a level of detail that enables their construction.

## Software Construction
Construction transitions from high-level designs to computer-executable code.

This is not a mechanical process. The detail of implementation often reveals undiscovered requirements and tradeoffs that must be resolved with the customer.

TODO: Test/code/debug cycle

> The term software construction refers to the detailed creation of working software through a combination of coding, verification, unit testing, integration testing, and debugging. ...
>
> Although some detailed design may be performed prior to construction, much design work is performed during the construction activity.

## Software Testing
Executing the software to verify expectations. SWEBOK includes debugging (running the software with ability to stop at certain lines of code & inspect values) in this category. Most often this category refers to automated tests. I have several good posts on different kinds of tests and when to use them.

> Software testing consists of the dynamic verification that a program provides expected behaviors on a finite set of test cases, suitably selected from the usually infinite execution domain.
>
> In recent years, the view of software testing has matured into a constructive one. Testing is no longer seen as an activity that starts only after the coding phase is complete with the limited purpose of detecting failures. Software testing is, or should be, pervasive throughout the entire development and maintenance life cycle. Indeed, planning for software testing should start with the early stages of the software requirements process

## Software Maintenance:
Monitor for new or changed understanding of the problem, then run through the lifecycle to adapt to the change. Maintenance implies a shift in cost and technique profiles from completely new software. In reality, most development is maintenance 

> In this Guide, software maintenance is defined as the totality of activities required to provide cost-effective support to software. Activities are performed during the predelivery stage as well as during the postdelivery stage. Predelivery activities include planning for postdelivery operations, maintainability, and logistics determination for transition activities. Postdelivery activities include software modification, training, and operating or interfacing to a help desk.
> 
> Software development efforts result in the delivery of a software product that satisfies user requirements. Accordingly, the software product must change or evolve. Once in operation, defects are uncovered, operating environments change, and new user requirements surface. The maintenance phase of the life cycle begins following a warranty period or postimplementation support delivery, but maintenance activities occur much earlier. 

## Software Configuration Management
A relatively unknown term among software professionals. It's largely about controlling changes to key artifacts and processes. Think source control, work item trackers, software deployment techniques (CI/CD -> continuous integration / continuous deployment)

> A system can be defined as the combination of interacting elements organized to achieve one or more stated purposes. The configuration of a system is the functional and physical characteristics of hardware or software as set forth in technical documentation or achieved in a product; it can also be thought of as a collection of specific versions of hardware, firmware, or software items combined according to specific build procedures to serve a particular purpose. Configuration management (CM), then, is the discipline of identifying the configuration of a system at distinct points in time for the purpose of systematically controlling changes to the configuration and maintaining the integrity and traceability of the configuration throughout the system life cycle.
> 
> Software configuration management (SCM) is a supporting-software life cycle process that benefits project management, development and maintenance activities, quality assurance activities, as well as the customers and users of the end product. 

## Software Engineering Management
mostly management in the general sense. It's about how we track our projects against goals and course correct to stay on track

> Software engineering management can be defined as the application of management activities—planning, coordinating, measuring, monitoring, controlling, and reporting to ensure that software products and software engineering services are delivered efficiently, effectively, and to the benefit of stakeholders.

## Software Engineering Process
effectively the same the general definition of process. How we go about executing our activities and that feeds into accomplishing our desired outcomes. This includes the software development lifecycle, but also the selection and arrangement of controls and measures within that lifecycle, as well as process improvement practices.




> In this knowledge area (KA), software engineering processes are concerned with work activities accomplished by software engineers to develop, maintain, and operate software, such as requirements, design, construction, testing, configuration management, and other software engineering processes
>
> An engineering process consists of a set of interrelated activities that transform one or more inputs into outputs while consuming resources to accomplish the transformation. Many of the processes of traditional engineering disciplines (e.g., electrical, mechanical, civil, chemical) are concerned with transforming energy and physical entities from one form into another, as in a hydroelectric dam that transforms potential energy into electrical energy or a petroleum refinery that uses chemical processes to transform crude oil into gasoline.


## Models & Methods
 Ways we encode knowledge about software. The models side includes kinds of diagrams, pattern descriptions, etc. Methods generally refers to ways of doing things like agile, kanban, etc.

> Software engineering models and methods impose structure on software engineering with the goal of making that activity systematic, repeatable, and ultimately more success-oriented. Using models provides an approach to problem solving, a notation, and procedures for model construction and analysis. Methods provide an approach to the systematic specification, design, construction, test, and verification of the end-item software and associated work products.


## Software Quality
 Ways we understand how good our software and process is. "How good" can mean many things. I can produce a typical quality properties list if desired. Software engineering should follow a measured and continually refined approach with quantified quality goals (e.g. time between defects).

> Software quality may refer: to desirable characteristics of software products, to the extent to which a particular software product possess those characteristics, and to processes, tools, and techniques used to achieve those characteristics. 
>
> More recently, software quality is defined as the "capability of software product to satisfy stated and implied needs under specified conditions” and as “the degree to which a software product meets established requirements; however, quality depends upon the degree to which those established requirements accurately represent stakeholder needs, wants, and expectations"


## Software Engineering Professional Practices:
Largely about ethics, regulations, knowing the baseline expectations of a professional

> The Software Engineering Professional Practice knowledge area (KA) is concerned with the knowledge, skills, and attitudes that software engineers must possess to practice software engineering in a professional, responsible, and ethical manner.



## Foundations

The last four key areas are foundations, which I figured don't need definitions. Instead I list a few of the referenced techniques

- **Economics**: economic decision models, cost/benefit analysis, earned value, estimation techniques, "good enough" principle

Software engineering economics is about mak-
ing decisions related to software engineering in a 
business context. The success of a software prod-
uct, service, and solution depends on good busi-
ness management.

- **Computing Foundations**: structured programming, problem solving approaches, principles (abstraction, encapsulation, etc), programming paradigms (object-oriented, functional, imperative, etc), security basics
- **Math Foundations**: proof techniques, finite state machines, complexity classes, set theory, formal logic 
- **Engineering Foundations**: scales of measurement, margin of error, engineering design process, tradeoff analysis, experimental methods, modeling techniques