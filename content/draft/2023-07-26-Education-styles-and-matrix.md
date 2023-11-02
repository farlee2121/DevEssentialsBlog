---
date: 2023-11-02
tags: [Education, SWEBOK]
title: Educational Methods to SWEBOK Knowledge Areas Matrix
---

I wasn't familiar with all educational methods highlighted in this [SWEBOK v4 update article](https://ieeecs-media.computer.org/media/education/swebok/SWEBOK_Education_CSEE_T2023.pdf).
So, here I'll explore them and visualize their recommended connection to software knowledge areas.
<!--more-->
<!-- TODO: Get grace's feedback on my assessment of the educational techniques, and if she'd heard anything about the 2 I couldn't find -->

For those who are unfamiliar, the Software Engineering Body of Knowledge (SWEBOK) organizes and outlines generally accepted software engineering practices.
It is an [IEEE](https://www.computer.org/) standard meant to define a shared baseline of software knowledge to improve education and training across the field.

[Envisioning software engineer training needs in the digital era through the SWEBOK V4 prism](https://ieeecs-media.computer.org/media/education/swebok/SWEBOK_Education_CSEE_T2023.pdf)
considers the SWEBOK v4 update and what the changes mean for software education.

My focus here is on a particular table from the article relating educational methods to the key knowledge areas outlined in SWEBOK.
Since I didn't know all these educational methods, I researched them and briefly summarize each below.


- [**Project-Based Learning**](https://en.wikipedia.org/wiki/Project-based_learning): Students learn about a subject by working on a complex open-ended question for an extended time. The student creates some artifact (e.g. a presentation, paper, model, etc) that requires them to think critically and demonstrate gained knowledge in the target subject
- [**Learning by Reflection**](https://en.wikipedia.org/wiki/Reflective_learning): "The intentional attempt to synthesize, abstract, and articulate the key lessons taught by experience" ([source](https://hbswk.hbs.edu/item/learning-by-thinking-how-reflection-improves-performance)). In my own words, learning by taking time to examine what you know. Often includes clarifying ideas, reframing ideas in personalized terms, discovering connections between ideas, or seeing information from a new perspective.
- [**Problem-based Learning**](https://en.wikipedia.org/wiki/Problem-based_learning): Has a strong overlap with project-based learning. Both focus on open-ended questions, critical thinking, and student-driven inquiry. Problem-based learning appears to focus more on greater student ownership across the whole process ("learner-driven self-identified goals and outcomes"), whereas project-based learning may have more defined bounds.
- [**Active Learning/Learning by Doing**](https://en.wikipedia.org/wiki/Active_learning): Students actively participate in experiential learning. Think science labs, debates, games, crafts, students explaining to peers, etc.
- [**Just-in-time Learning**](https://en.wikipedia.org/wiki/Just-in-time_learning): A philosophy of making need-based educational materials available to learners to use when they encounter that need. Think youtube tutorials (bike maintenace, home maintenance, ...). Common approaches in software might include documentation, knowledge bases, and blog posts.
- [**Flipped Learning**](https://en.wikipedia.org/wiki/Flipped_classroom): Instead of an in-class lecture with at-home exercise, the students review materials before coming to class and then work through exercises and questions together in class. You could say an at-home lecture with in-class exercises (thus "flipped").
- [**Collaborative/Peer Learning**](https://en.wikipedia.org/wiki/Peer_learning): Students learn from each other, not just the teacher. Classroom examples could be group activities, peer reviews, or questions followed by quick small group discussions. Workplace examples could be lunch and learns, pair programming, and code reviews.
- **Participation in the SW Community**: SW means software. Otherwise, it's all in the name. You learn by being a part of the software community.
- **Global Software Development**: This one is unclear. Most all of the references to Global Software Development I can find are in research papers. It doesn't seem to be an eduction term, but the idea of distributed teams collaborating on a project along with the methods for managing touch-points between those teams effectively. The only topic they recommend this for is Software Construction. I think they're saying people can learn about effective software construction by needing to draw effective boundaries between the responsibilities of different teams and their corresponding programmatic interfaces (APIs). 
- **Experimental/Research-based Learning**: I couldn't find an official source for this one. The only topic the recommend it for is testing. The article also brings attention to DevOps and empirical measures for evolving quality. I think they mean learning through hypothesis-test cycles, the method that underlies all [scientific experiments](https://en.wikipedia.org/wiki/Scientific_method).
- [**Agile Learning**](https://en.wikipedia.org/wiki/Agile_learning): The agile process applied to learning. Can include scoped requirements, iterations, and regular review of delivered value. It makes sense that the article recommend this for Engineering Management. It's kind of like a [Objectives and Key Results (OKR) process](https://en.wikipedia.org/wiki/Objectives_and_key_results).

<!-- https://en.wikipedia.org/wiki/John_Dewey came up in relation to several of these ideas (active learning, project-based, reflective learning) -->

I tried to organize the knowledge area-to-method relationships in a table. The techniques are sorted by how many knowledge areas they're recommended for, most recommended to least. It's a bit of a mess to show compactly, but here it is anyway. Happy scrolling.

<!-- 
TODO: Need to figure out the table
- mention the ordering
- probably need to flip the table...
- table doesn't really work. too big. Honestly, I think I just need to make it in powerpoint, but then I'm not sure how to manage accessibility
 -->

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
.skill-matrix tr th {
    max-height: 20px;
}
</style>
<table class="skill-matrix">
<tr class="ka-row">
  <th></th>
  <th><span>Requirements</span></th>
  <th><span>Architecture</span></th>
  <th><span>Construction</span></th>
  <th><span>Design</span></th>
  <th><span>Testing</span></th>
  <th><span>Operations</span></th>
  <th><span>Maintenance</span></th>
  <th><span>Configuration Management</span></th>
  <th><span>Management</span></th>
  <th><span>Process</span></th>
  <th><span>Models & Methods</span></th>
  <th><span>Quality</span></th>
  <th><span>Security</span></th>
  <th><span>Professional Practice</span></th>
  <th><span>Economics</span></th>
  <th><span>Computing Foundations</span></th>
  <th><span>Math Foundations</span></th>
  <th><span>Engineering Foundations</span></th>
</tr>
<tr>
  <th>Project-Based Learning</th>
  <td>✅</td>
  <td> </td>
  <td>✅</td>
  <td>✅</td>
  <td></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td></td>
  <td>✅</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <th>Learning by Reflection</th>
  <td></td>
  <td>✅</td>
  <td>✅</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
</tr>
<tr>
  <th>Problem-based Learning</th>
  <td></td>
  <td></td>
  <td></td>
  <td>✅</td>
  <td>✅</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>✅</td>
  <td></td>
  <td>✅</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <th>Active Learning/Learning by Doing</th>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>✅</td>
  <td></td>
  <td></td>
  <td>✅</td>
  <td></td>
  <td>✅</td>
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
  <th>Just-in-time Learning</th>
  <td></td>
  <td>✅</td>
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
  <td>✅</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <th>Participation in the SW Community</th>
  <td></td>
  <td></td>
  <td></td>
  <td>✅</td>
  <td>✅</td>
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
  <td></td>
  <td></td>
</tr>
<tr>
  <th>Flipped Learning</th>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>✅</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>✅</td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <th>Global Software Development</th>
  <td></td>
  <td></td>
  <td></td>
  <td>✅</td>
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
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <th>Experimental/Research-based Learning</th>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>✅</td>
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
  <td></td>
  <td></td>
</tr>
<tr>
  <th>Collaborative/Peer Learning</th>
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
  <td></td>
  <td></td>
  <td></td>
  <td>✅</td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <th>Agile Learning</th>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>✅</td>
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
