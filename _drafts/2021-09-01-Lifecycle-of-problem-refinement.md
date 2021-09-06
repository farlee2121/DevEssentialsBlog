# Programming is Problem Modeling

Code is often considered the goal of programming. This abjectly false. Programming is about understanding and representing problems. This belief is expressed by many experts, but the repercussions are many and nuanced. This is my latest attempt to communicate the idea clearly.


I've long conceptualized the software lifecycle as a spectrum. We start with much unknown and iterate until there is enough known to deliver a solution.
![unknown to known spectrum](../post-media/Going-Fast/spectrum.png)

This is an evolution of that idea, hopefully filling in more detail.

## Goals

Problem modeling permeates all aspects of software development. I can't hope to communicate a full picture in single visual.

The primary ideas I want to communicate are
- Problem understanding evolves through the whole software lifecycle
  - Problem understanding can't be confined to requirements 
- Lifecycle / process artifacts are restatements of the same problem
- Problem understanding is fundamentally progressive
  - The problem changes over time
  - Understanding is naturally incomplete
- Lifecycle stages are not strictly sequential
- The problem is defined by user need
  - Success is defined by satisfaction of user need
- Common ways lifecycle stages help refine the problem
- Lifecycle stages as an accumulation of problem clarity


Secondary ideas I'd like to communicate 

- Software/developer needs constrain solutions to the problem, but are secondary
  <!-- - Examples: 
    - Developer time impacts schedule, but not individual functional expectations
    - Qual
    - maintainability impacts velocity and developer happiness -->
- There is no perfect design


## Sources

> "The besetting mistake of expert designers is not designing the thing wrong, but designing the wrong thing" - Design of Design p. 167

I don't expect you to take these statements of software truth on my word. Here are many of the key points taken directly from the [Software Engineering Body of Knowledge](../_posts/2021-07-30-SWEBOK-review.md).

Customer need defines "correct" software (heart of design process)
- Ch 11.1.9 Tradeoff analysis - software engineer must evaluate tradeoffs with stakeholders
- Ch 7.4.1 Customer satisfaction is principle goal of engineering management
- Ch 1.3.2 "The software engineer, first of all, must determine the real purpose of the software"

Software Engineering is Problem Modeling
- Ch 1.2.1 Requirements are refined through all lifecycle phases
- Ch 13.1.5 Software Engineering is a set of translations from plain language to executable code
- Ch 1.3.2 "The software engineer, first of all, must determine the real purpose of the software"

Problem understanding is fundamentally progressive
- Ch 1.7.1 Iteration is Fundamental
- Ch 1.7.1 Requirements *will* change
- Ch 2.3.4 Design less of an activity more of a decision process
- Ch 12.5.1 "Good Enough" principle and RACE Reduce Accidents and Control Essence


<!-- Testing isn't optional
- Ch 4.intro "Software testing is, or should be, pervasive throughout the entire development and maintenance lifecycle" -->

## Lifecycle Visual


## Underlying Scientific Method

Notice how the lifecycle repeatedly refines understanding through 
- identify a need
- identify a solution
- test the solution to make sure it fits the need
- Deliver the solution
- Repeat

This is the scientific process.

![Scientific process]()

These question/hypothesis/test loops underlie not only the lifecycle, but each individual activity as well.



## Good Enough

![Good Enough target]()
- idea lines on design tree indicating phase transfers (maybe phase through phase artifacts)

testing





Requirements
- interviews, prototypes, shadowing, acceptance tests, ....

Design / Construction
- Specificity reveals hidden assumptions
- weigh tradeoffs with customer
- Areas of flexibility reveal nature of business (volatility vs change)

Testing
- echoes developer understanding of requirements
- The right techniques let customers review test suites
- acceptance tests probs belong here in this view?

Maintenance 
- adjust to changes in need
- adjust to changes in understanding 



DDD: A design reflecting domain will likely lead to deeper insights and changes in the design. Design is, in a way, becoming an expert in the field you are representing.






Maybe explicitly connect hypothesis/test cycles from problem solving as even more fundamental version of this


## Further reading

Here are some of my past posts relevant communicating similar ideas
- [SWEBOK: Software Engineering As Problem Translation](../_posts/2021-08-13-Swebok-transform-view.md)
- [Going Fast is Going Well](../_posts/2021-01-29-Going-Fast-is-Going-Well.md)
- [What's your duck?](../_posts/2020-10-02-Whats-Your-Duck.md)
- [Requirements](../_posts/DevEssentials/2018-11-25-Requirements.md)
- [Quantified Communication (from customer to code)](../_posts/2021-03-19-Quantified-Communication-Customer-to-Code.md)



"The quality of your questions determines the quality of your decisions"

Q: Should it be a spiral toward "good enough"?
- maybe it's two visuals?
- !!! spiral is the design tree with some failed paths, gradually incrementing to "good enough"
  - in this vein, one visual is responsible for communicating connection to problem understanding, the other to progression of the understanding over time

Where does problem understanding come from: most often the customers.


This is to address carlos' reaction to the transformation view. It also helps emphasize a very critical belief that the problem we're solving is king and present in every stage

This should be specific practices, not just the general increase in detail.
