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

I find it appropriate that these are also the most common tools for collaboration. They solve coordination and governance for work and code, bringing transparency and safety to multi-contributor environments.

<!-- measurements could be taken at a point in time and still allow quantitative demonstration of improvement -->

## Conclusion
I conclude that work item tracking and source control are the most foundational tools for a software engineering process. Together, they record a holistic history of a project. Having both in place allows the team to evolve their measurement and quality processes over time without loss of information. However, taking one away causes a permanent gap in project analysis.

<!-- These tools should be standard at this point. Negligence on either tool shows a lack of understanding. I'd argue anyone who does not value these tools cannot be called a professional -->
