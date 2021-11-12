---
layout: post
tags: [Tools, Process, Quality]
---

TODO: rename file to match final title
# Foundation of Measurement

Software Engineers are differentiated from other programming disciplines by economical, repeatable, and reliable results. Such consistency requires measurement, data on which to make informed decisions. I propose that source control an work item tracking are the kernel of such process.

First, what are the goals of a refined process? What do we want refine through measurement?
- Delivery of expected value
- Cost expectations
- Estimates, schedule expectations
- Minimize software defects
  - Cause of defects that slip through
  - effectiveness of defect prevention techniques

Let's consider common tool categories
- automated tests
- debugger
- IDE
- compiler
- frameworks & package management
- loggers
- work tracking
- source control
- performance profilers
- CI/CD or build and deployment
- Infrastructure (servers, etc)

We can divide these into several categories.

Those that are convenient, but not inherent to measurement and refinement: debuggers, IDE, compilers, frameworks & package managers, build and deployment, and infrastructure.

A team can control improvement over time and deliver consistently without these tools under the right conditions. For example, build, deployment, compilers and infrastructure are not necessary if a team only delivers code and not running software.

The remaining tools are useful for measurement: automated tests, loggers, work tracking, source control, performance profilers

I see one key difference that splits our remaining tools. Tests, logs, and performance profiles can all be done later so long as the right artifacts are available. On the other hand, work item tracking and source control collect information that is irreplaceable. They are the tools that collect the artifacts other tools measure for quality and progress.
- Work item tracking captures what was done (at need level), when it was done, why it was done, who did it, and who they did it for. None of this information is replaceable with any other type of tool.
- Source control captures what code met a need (thus design and code quality), who implemented it, and often who approved it. Good source control allows measurements to be backfilled for any state of the system over time.

<!-- measurements could be taken at a point in time and still allow quantitative demonstration of improvement -->

## Conclusion
I conclude that work item tracking and source control are the most foundational tools for a software engineering process. Together, they record a holistic history of a project. Having both in place allows the team to evolve their measurement and quality processes over time without loss of information. However, taking one away causes a permanent gap in project analysis.

<!-- Note: my argument for source control and work tracking doesn't seem very tight. It feels like tests and logs could have similar amounts of support/necessity.
- I suppose if we can recreate a system version, we can reproduce logs and backfill tests
- should be clear I think the other tools (especially tests and logs) are important. It's just that work tracking and source control are the only tools who's value can't be replicated later

Instead of explaining each tool. Divide them into groups -->

<!-- : Extremely valuable for runtime measurement. Could I still rate a team as mature without logging? Yes. For example, tightly constrained low-level systems may not have the option to leverage logging. 

 Without work tracking, we lose the why and when of work done. Estimates and value delivered have no basis for comparison. Coordination is haphazard and project information is permanently lost.
 
 Without we lose the what/how. We can't characterize quality over time, sources of defects, or 
-->

<!-- Programming is a discipline overflowing with tools. Picking which to use and why can be overwhelming. I propose that the most fundamental tools are source control and work item tracking. These two form the foundation of measurement.

What are the common tools of a professional programmer?
- Source control
- Work item tracker (aka backlog, issue tracker, etc)
- Debugger
- IDE
- compiler
- Test framework -->


<!-- I need to think about my angle here. An argument can be made for many of the tools. No compiler no software. Difference is we're trying to be professionals, take a repeatable and predictable approach to software. That requires measurement 

-->


<!-- Programming is a discipline overflowing with tools. Picking which to use and why can be overwhelming. What is the bare minimum tooling a team could use a still be professionals?

The first task is to set our our assumptions.
- First of all, we're talking about a professional environment. Work is expected to produce results that satisfy consumers.
- Second, we're considering a team. The vast majority of software development these days requires multiple contributors.

I think these two assumptions provide enough context without getting too specific.

Next, what are the chief concerns of such a team
- Delivering expected value
- Delivering on time
- Coordinating work of multiple contributors. 
- Minimizing software defects

What kinds of tools  -->


I think the focus here is collaboration. Collaboration pretty much can't happen without work tracking and source control.

What was done?
Why was it done?
When was it done?
How much effort did it take?

- fundamental tools: work item tracking and source control
  - the what, the why, often the how and when. Basis of most all measurement
  - pretty much only our brain is more fundamental. not even a debugger or ide 
  - working without these is flying blind. Can't have measured approach without them, decisions would be made without data
  - to not value these is to not be an experienced dev

Other posts I could extract from my time at kana?


- Basics of Governance?
  - essence is decentralizing responsibility... maybe managing levels of trust is a better way of saying it. Flip side is managing levels of risk. It's about how much risk you're willing to accomodate from certain personnel. 
    - example: the company owner in small to medium businesses can generally sink the company if they want to. Therefore, there isn't much additional risk if they can access many assets. There is risk though if they might hand that access to someone else, or mistakenly mismanage an asset. 
  - tools are anything that forces review or multip
  - can generally be forced through some replication with separate ownership
  - feeling a bit meh on this one...
