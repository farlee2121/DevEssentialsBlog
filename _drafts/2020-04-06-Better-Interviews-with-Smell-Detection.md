---
layout: post
tags: []
---

# Better Software Interviews with Code Smell Detection

I've sat through many a coding interview as both examiner and examinee. The experience is usually sub-par on either side. 
The results always feel incomplete, and the assessment of skill foggy and inconsistent. My recent experiments suggest a new approach that may be more effective: smell detection.

<!-- TODO: consider defining a more convienient term than "problem" for the coding assessent -->

## Goals of a technical interview

First, if I'm going to make claims about "more effective" then I must answer *what* the technique is more effective at doing.

My goals in a technical interview ususally include gauging 
- basic comfort working with code
- critical thinking approach and adaptability to new problems
- knowledge of best practices
- if skill falls in the expected range for the position
- role-specific expectations like: 
  - effective test case selection
  - low-level design
  - system architecture
  - refining requirements

A few non-goals usually include
- language-specific experience
- framework-specific knowledge
- expertise in a specific problem domain
- ability to complete solutions in a short amount of time

Other limitations include
- short time-frame to assess skill (30 - 60 min)
- limited access to experienced interviewers

The depth of assessment can vary greatly based on the seniority of the position.
 

## Problems with coding interviews

The goals and non-goals lead me to a few issues with typical problem-based coding interviews.

**Difficult to write:** Setting up a good interview requires a good problem to solve. The problem must be quick to pick up, but can't be trivial to solve. This is a pretty narrow problem space. The bar for a difficult problem is also very sensitive to candidate experience, making it difficult to reuse samples across positions. 

I emphasize [understanding a problem well](../_posts/2021-01-29-Going-Fast-is-Going-Well.md) before writing code. As such, I often spend most of my coding interviews understanding the problem and writing very little code.

**Too Open-ended & Inconsistent:** Often, companies want to assess certain skills in their candidates. For example, knowledge of testing patterns. Such objectives are difficult to consistently incorporate into a problem-based coding interview. Handing the candidate a problem and letting them code leaves us at their mercy for how they tackle the problem and what parts they tackle. This is great if we want to assess design straight from requirements, but it leaves a big gap for assessing construction-level abilities more commonly expected from junior to mid level developers. 

Providing partial solutions can push improve odds of observing target skills. However, this biases examinees toward practices they may not have considered otherwise. It also increases work to construct interviews. 

**Difficult to tune:** Companies interview for many skill levels and kinds of positions. Adapting problem-based interviews to these scenarios is difficult because the problems are so sensitive to conditions. A little difference in position or skill level and the specified problem could be too large or too simple to appropriately assess the candidate. Adding role-specific assessment goals can quickly spiral a problem out of attainable scope for the interview. The complexity does not compound linearly. Further, it's difficult to recover from a problem mismatched with the candidate's skill, leaving us will an inconclusive evaluation of the candidate's skill level (beyond just above or below assessment expectations).

**Difficult to score:** The open-ended nature also spurs inconsistent interviews and difficulty objectively comparing candidates. Each candidate could focus on a different aspect of the problem. Some with demonstrate a few skills deeply, and others demonstrate many skill with little depth. Targeting specific skills at certain depths is effectively unattainable. My attempts at normalized grading have resulted in most skills ending as "inconclusive". Even with a normalized ruberic, skills will show up in diverse ways. Interviewers must apply heavy individual discretion as to what objectives are met.

## Code Smell-based assessment

<!-- TODO: consider making it defect detection-based assessment? -->


<!-- [Code smells](https://en.wikipedia.org/wiki/Code_smell), for those who are unfamiliar, are code characteristics that commonly indicate deeper problems in the code. These characteristics are given names and are often paired with [refactorings](https://en.wikipedia.org/wiki/Code_refactoring). A few examples include: long methods, long function parameter lists, unclear names, and [primitive obsession](http://grabbagoft.blogspot.com/2007/12/dealing-with-primitive-obsession.html). -->

Defect detection can be used to assess skill, targeting specific best practices as well as understanding a developer's thought process by seeing what they look for when they evaluate code for quality.

Defect samples can be generated across many kinds of programming activities. Here are some samples I've used.

<!-- Simple naming and spacing sample
    IH failure sample
    design sample
    test sample?
 -->



Defect detection-based assessment addresses many of the core issues with problem-based assessment.

**Plentiful Examples:** Defect samples can often be pull almost directly from our own systems. Most developers can recount many examples of bad design they've encountered. If not, [code smells](https://en.wikipedia.org/wiki/Code_smell) formalize common issue indicators in code. Examples of these smells are readily available online or can be seeded into code with relative ease.

**Controlled Scope:** Many defects are agnostic to the problem domain and can be demonstrated with fairly little motivating context. Also, we know each examinee is given the same code with the same issues. Targeting specific skills at certain depths can be planned out ahead of time with confidence.

**Simple Assessment:** Code samples and their associated list of errors are known upfront. Evaluation is far more consistent between candidates. The results are also much easier to compare objectively. Examiners can report percentage of defects found. The defects found can even be categorized by target skill for more granular communication of skills. Worries about reviewer bias are also easier to address. Multiple reviewers can independently assess against the same objective expectations, or candidate answers can be transcribed for later reviewers to compare against the target defects.

**Modular and Composable:** Each code sample represents a self-contained assessment for specific defects. Larger exams can be composed by selecting many code samples to target the desired target skill set. Interviews for diverse roles can be constructed from the same base set of code samples. If target skills are missing, then simply add a new self-contained sample for that skill instead of modifying existing samples. If skills aren't needed for a role, simply drop the corresponding samples. 
Such a system also responds much better to candidates that may be intersting, but are outside of the target role's expectations. Present harder or simpler samples until the samples match the candidate's skill level. Similarly, shift to samples from other roles if the candidate shows promise in a different specialty.
<!-- TODO: reference stable, incremental, additive -->



Defect detection rates are useful, but I also supplement them with more categorical or qualitative assessments. For example, I may categorize construction maturity  
- Only sees syntax errors
- Sees style errors like naming and white space
- Sees low-level design errors like information hiding faults and coupling
- Sees big picture issues like domain alignment, service coupling, scalability, etc

Similar categories can be made for other skill areas like testing. These qualities don't have to explicitly derived from detection rates, but detection rates are powerful evidence for conclusions that would otherwise be purely opinion.


## Experience

I've applied this defect-detection-based approach with previous clients, and also used it outside of interviews for informal assessments. Overall, the results look promising. I feel like I understand the examinee's ability in more detail, the examinees catch on quickly, the interview is much less pressed for time, and results are easier to communicate. Non-interview assessments also lead into curiosity and good learning opportunities.

## Conclusion

Defect-detection-based interviews leverage prepared code samples with known defects to assess skill. This approach delivers significant gains over tradition problem-based coding interviews. In short, I've found them to be easier to prepare and adapt, more detailed and reliable in assessing of developer skills, and more objective to assess.

<!-- TODO: conclusion is a bit shakey -->

<!-- 
Educational followup

Great educational too. Smell-based assessments help us zero in on experience level fairly quickly. Can move into refactoring to see how student deals with the issues they see.
Can also refactor with the student to show them how to deal with the issue. Very close to actual application. Builds ability to recognize issues in the wild and deal with them. -->