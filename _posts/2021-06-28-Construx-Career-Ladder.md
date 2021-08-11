---
layout: post
tags: [Concept Map, Reading Review]
published: false
---

# Construx Career Ladder

The [Construx Professional Development Ladder](https://www.construx.com/professional-development-ladder/) is a comprehensive and clear road map for software career development. It mixes community standards, respected literature, and experiential learning to create a framework for understanding and acquiring software competency. I would recommend this short reading to every young developer. Let's look at what makes it so good.


## What is the career ladder?

The [career ladder white paper](https://www.construx.com/professional-development-ladder/) is only 32 pages (as of this writing) and well worth your time, but I'll summarize it here anyway.

The premise of the ladder is that the software developers need three key types of knowledge 
- Technologies/frameworks
- Domain / business
- Best Practices

The first two are naturally acquired in the course of work, but also don't transfer well between projects. Conversely, best practices can be applied and built up consistently across projects and jobs, but are not acquired naturally.

Best practices are well studied, but not broadly known or applied. Thus, average practice is closer to worst practice. The key to raising average practice is a methodical path to career grow, muck like lawyers, accountants, doctors and other professions.

Construx builds this path on their Professional Development Matrix, which crosses Knowledge Areas with levels of capability. Each knowledge area is based on the [IEEE Software Engineering Body of Knowledge](https://www.sebokwiki.org/wiki/An_Overview_of_the_SWEBOK_Guide#Software_Requirements).

<style>
.skill-matrix {
  margin-top: 50px;
}
.skill-matrix .ka-row th span{
  transform: rotate(-60deg);
  position: relative;
  display: flex;
  max-width: 30px;
  /* height: 100px; */
}
.skill-matrix .ka-row th {
  max-width: 30px;
  box-sizing:
}
.skill-matrix td{
  border: 1px solid;
}
</style>
<table class="skill-matrix">
<tr class="ka-row">
  <th></th>
  <th><span>Configuration Management</span></th>
  <th><span>Construction</span></th>
  <th><span>Design</span></th>
  <th><span>Foundations</span></th>
  <th><span>Maintenance</span></th>
  <th><span>Models and Methods</span></th>
  <th><span>Process</span></th>
  <th><span>Management</span></th>
  <th><span>Quality</span></th>
  <th><span>Requirements</span></th>
  <th><span>Testing</span></th>
</tr>
<tr>
  <th>Introductory</th>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <th>Competence</th>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <th>Leadership</th>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
</table>


The path defines knowledge to achieve each cell in the matrix. Each cell includes
- readings
- trainings
- "defined experience" - a description of practical experiences encountered in the course of application

Overall skill is measured by aggregate competency in knowledge areas. For example
- Junior Developer: has introductory capability in all knowledge areas and competence in two
- Senior Developer: must have competence in at least 6 knowledge areas and leadership in 2


## What does the career ladder do well?

The Professional Development Matrix establishes a framework for software experience. It clearly delineates the big picture view from the detailed plan to acquire each skill. It is well organized and easy to understand. 

Additionally, I think it does the following well

- **Cross-specialty**: Many types of software professionals can guide their growth without changing the learning activities for each skill.
- **Competence areas**: The matrix separates measures for different skills and levels of mastery. This accommodates different specialties and diagnoses missing concepts in otherwise competent professionals, which is all too common with haphazard software education.
- **Multiple types of learning**: Considers both factual and procedural knowledge and feedback cycles
- **Customizable**: It is easy to imagine how the matrix can be modified without throwing out lots of work. Knowledge areas can be added or dropped and the required experience for each cell can be modified
  - In other words, the ladder is made of *incremental and stable* pieces
- **Clear expectations**:
  - Sets defined time expectations. Helps learners set healthy progress expectations.
  - Defines a clear framework for reasoning about and communicating skill level and suitability of an individual to different roles (via component skill competencies)
- **Individual Choice**: Gives learners autonomy to order their own learning and focus on their own interests without sacrificing clarity of overall capabilities
- **Standards-based**: Based on SWEBOK and impartial community standards more than a personal philosophy of development


## What would I do differently?

I think the Construx ladder accomplishes its goals very well. That said, I think there is value in different approaches to a career path. Here are a few things I would do differently

**Fundamental Knowledge**: I believe some ideas are more fundamental than any of the knowledge areas, and calling them out explicitly would improve learning. Fundamentals like thinking skills, views on what software is, the state of our industry, what our industry could be, and responsibilities of individual developers.

To be fair, some of these are touched on in the white doc.

**Emphasize Thinking Skills**: I believe thinking skills are foundational. Awareness and control over one's thought process amplifies every other skill. This reflective improvement process also directly powers many of the contextual techniques of each knowledge area. Mastery takes time, but emphasizing this underlying connection could prime students to be effective learners and transfer skills between contexts.

**Individual over Company focus**: The career ladder is made with companies in mind. It supports training programs, promotion paths, hiring assessment, and more. These are all great. An individual can also evaluate themselves and try to arrange path experience on their own.

However, many of the qualities that make the ladder great for companies make it less approachable to individuals. Emphasizing standards with little personal experience reduces relational connection to concepts. Separating specific practices from the general map delays connections to experience. Accommodating multiple roles is at odds with compact and targeted messaging. Overall, its hard to paint a concrete picture of a top-notch process.

I'd like to see a work geared toward bootstrapping developers with a good set of default practices. A work opinionated enough to be concrete without abandoning foundation in, and acknowledgement of, the wider body of best practices.


## Conclusion

The Construx Professional Development Ladder is by far best framework for software experience that I've seen. It balances specialization and flexibility with standards and clarity. I believe it fills an important gap for casting the road map for aspiring developers and breaking us out of immature industry practice.

I highly recommend the paper to any developer who wants to gauge and methodically improve their abilities (which I hope is everyone).
 



