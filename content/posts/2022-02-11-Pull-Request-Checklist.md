---
date: "2022-02-11T00:00:00Z"
tags:
- Checklist
title: Pull Request Checklist
---

This is my attempt to communicate what I consider when looking at a pull request.
<!--more-->

I've tried to frame the list as a series of questions. Not all lines of investigation 
are always relevant. The list instead tries to prompt the right lines of thought and defer to separate processes if specialized knowledge is needed.

I also tried to format core questions such that it creates a level of accountability.
The developer effectively signs-off that they considered an aspect of quality and found it sufficient.
If we later find lacking quality, then we can look at signoffs to classify the problem as 
insufficient review checklists or insufficient review quality.

I'm excited to hear opinions on this list and what others consider in code review.

## The Checklist

### Highlevel
- right work got done / work matches spec
- code is tested with the right kind of tests
- consider any specialists that may need to review the work
  - security
  - customer, especially for exploratory work
  - performance
  - safety
  - regulatory
- right people are notified of changes or process is in place so that update are graceful
- General architecture and style, understandability
- Check for frequent errors or error prone modules

Understandability, requirements, and testing should be in every review. Most other things should be a quick check to make sure less frequent, but important bits don't get forgotten. 



### Things that should be automatic
- [ ] Build Succeeded
- [ ] Automated tests succeeded
- [ ] Mutation tests or other completeness measures
  - [ ] completeness measure has not decreased
- [ ] Deploy to a QA / testing environment succeeded
- [ ] Static analysis succeeded
  - [ ] Possible flags for code over a certain cyclomatic complexity
  - [ ] Security scanning tools. At least package vulnerability analysis
- [ ] Possible architecture enforcement by convention 
  - [ ] service projects have no concrete dependencies. 
  - [ ] Manager, engine, accessor call flow enforcement
- [ ] Flag error prone modules for closer review
- [ ] Flag potential performance risks
  - [ ] Flag cyclomatic complexity over a given threshold
  - [ ] possibly flag resource calls in loops?
- [ ] Could probably flag potential CQRS violations




<!-- ### Reviewer

TODO: Consider how branches in review flow should work (e.g. alternative allowable expectations, presence of different solutions ) -->

### Requirements and Testing
- [ ] Are all requirements in the Definition of Done completed?
  - [ ] are all requirements represented by tests?
  - [ ] Do all tests reflect a clear and readable expectation
    - [ ] Are tests named using BDD conventions?
    - [ ] Has a customer representative reviewed the BDD statements?
  - [ ] Manually tested all functional requirements in the test environment
- [ ] Are acceptance tests necessary for this work?
  - [ ] Yes, and the customer approved the change
- [ ] Was a demo required to accept this work?
  - [ ] Yes, and the customer approved
  - [ ] No


### Style & Construction 
- [ ] Can I summarize back the intention of the code changes?
  - [ ] I can I summarize the intent of each component? Function?
    - [ ] Is the intent of each unit clear and focused?
- [ ] Are there notable formatting issues 
  - [ ] Spacing or layout that impacts readability
  - [ ] non-standard naming
  - [ ] Do new or changed names reflect the intended use?
  - [ ] Are names oriented to domain needs over implementation details?
- [ ] There are no inlined "magic values" (e.g. `if (val == 42) then ...`)
- [ ] Does all code live in the appropriate assembly and namespace?
- [ ] Is appropriate error handling in place?

### Architecture
- [ ] Ports and adapters is followed
  - [ ] New or modified services have no external dependencies
  - [ ] Service dependencies are separated into appropriate adapter packages
  - [ ] Ports are oriented to the service's need; not the adapter or a specific dependency implementation
- [ ] Are layering schemes followed?
- [ ] No component maintains internal state between calls, unless the core purpose of the service is to do so (e.g. caches, data stores)
- [ ] CQRS: There are no calls that modify state and return a value


### Documentation
- [ ] Were tradeoffs/reasoning documented and committed with code?
- [ ] Is public documentation impacted?
  - [ ] Yes, and change control reviews were conducted
  - [ ] no
- [ ] Are developer setup or contribution guides impacted?
  - [ ] Yes, and they have been updated
  - [ ] no
- [ ] FILL: other key artifacts the team maintains


### Performance
- [ ] Does this work impact performance-critical components?
  - [ ] yes, and a specialized review was passed
  - [ ] yes, and performance tests were passed
  - [ ] no


### Security
- [ ] No credential or other sensitive information is included in the pull request
  - [ ] I carefully inspected any changed config files
- [ ] All new public endpoints have properly configured authorization
- [ ] Is the code critical for application security? 
  - [ ] Yes, and I've scheduled a separate security review
  - [ ] No, and I considered
    - [ ] Could user data be exposed
    - [ ] Could user data be modified?
- [ ] I considered the OWASP top 10 for this code change and found no potential vulnerabilities

### Change Control / Versioning
- [ ] Does this change effect the public API available to the public or other teams?
  - [ ] Is versioning in place to enable fallback and smooth transition?
    - Alt: impacted teams have been alerted and changes planned
- [ ] Are feature flags needed?
  - Consider
    - Are UI or public expectations impacted in a way that may require fallback?
    - Should the feature change at a different pace for different customers?


### Deployment / DevOps
- [ ] Does this code impact infrastructure?
  - [ ] Yes, and infrastructure changes are represented in the code change
  - [ ] Yes, and a specialist review was passed
  - [ ] No
- [ ] Does this code impact deployment?
  - [ ] Yes, and deployment changes are represented in the code change
  - [ ] No
- [ ] Does the code require new or updated monitoring?
  - [ ] Yes, and the appropriate monitoring is coordinated
  - [ ] No

### Safety
- [ ] Does this code impact user safety?


### Common errors
- [ ] are any error prone modules impacted?
  - [ ] No
  - [ ] Yes, and specialized reviews passed
- list common errors for the team here

