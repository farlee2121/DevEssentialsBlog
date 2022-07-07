---
date: "2020-12-13T00:00:00Z"
tags:
- Design
- Reading Notes
title: The Power of a Limited Toolset
---

It's easy to drown in the sea of frameworks and methodologies available to programmers. Numerous authors speak out about against the constant swarming between them. However, now I have a concrete expression for both why it hurts and why fewer solutions can be better.

I've known that chasing frameworks was bad for quite a while. I was lucky to learn early that a programmer should consider their design first, and then figure out how languages and frameworks can serve the design (Code Complete by Steve McConnell, [Robert Martin](https://blog.cleancoder.com/uncle-bob/2016/01/04/ALittleArchitecture.html), Domain Modeling). 

I also found it easy to express why this [churn](https://blog.cleancoder.com/uncle-bob/2016/07/27/TheChurn.html) is bad. Frameworks and languages produce heaps of content that perpetuate the belief that frameworks and languages will solve our problems. It obscures access to underlying development practices when [the growth of our field already makes it hard to access good coaching](https://blog.cleancoder.com/uncle-bob/2013/11/19/HoardsOfNovices.html). I make a habit of asking people about their architecture, the most common answer I get is a list of technologies they use. That isn't architecture.

Changing frameworks also sets back tooling and productivity. I felt this sharply when I moved from WPF and C# to javascript early in my career. Web development was changing rapidly then and the tooling was primitive.

The problem was easy to express, but I have not been able to clearly communicate what the opposite was, other than thinking it was just better access to underlying principles.

It finally clicked when I recently read [Prospects for a Engineering Discipline of software](https://resources.sei.cmu.edu/asset_files/TechnicalReport/1990_005_001_299270.pdf). The author points to constant reinvention as a factor of software's immaturity compared to engineering disciplines. She goes on to outline next steps for our industry to grow into a true engineering discipline, including
- Identifying a core body of what devs should know
- Standard reference materials so average practitioners can leverage known good solutions with low learning and lookup cost
- Encouraging standard practices
- Recognizing sub-specialties
- Collaborating with the academic community to advance standard practices

This called forth a rush of kindred ideas from previous readings
- Elegant designs have few elements that can be powerfully combined. This is easier to learn and use (Design of Design, Fred Brooks)
- Keep a company wiki of tools and solutions, which is implicitly backed by orthogonality and DRY (Pragmatic Programmer)
- Robert Martin's calls to pick a few tools, focus on process, and become a *profession* ([here](https://blog.cleancoder.com/uncle-bob/2016/07/27/TheChurn.html), [here](https://blog.cleancoder.com/uncle-bob/2017/10/04/CodeIsNotTheAnswer.html))
- "A language that doesn't effect the way you think about programming isn't worth knowing" Alan Perlis ([via Scott Wlaschin](https://www.youtube.com/watch?v=0fpDlAEQio4))
- Better wrong than vague (Design of Design, Fred Brooks)

The churn is bad because it is vague. It obscures the underlying set of solutions. In contrast, a limited set of tools can be formalized and is powerful because it is explicit. It can be referenced, taught, reviewed, discussed, refined, and composed. It facilitates a community. Small groups can advance the parts they understand well, and everyone can benefit from using the results without high acquisition cost.

One such natural refinement is deduplication. People naturally don't want to remember more than they have to. Duplication will be discovered and removed. This leads to a minimal (orthogonal) set of complimentary solutions that can be composed. Such a list can be referenced much more confidently without the need to sift through the detailed differences of comparable solutions.
<!-- An engineer can then browse the list for standard parts and focus on how they combine into a product. This is a stark contrast to current process where  -->

<!--  -->

## Evolving languages
All this said, I do believe there is progress to made in languages and reason to migrate between them. [Mark Seemann's makes an excellent point](https://www.youtube.com/watch?v=MCZ3YgeEUPg) about how good design is more default in functional language. This aligns with [Mary Shaw's proposition](https://resources.sei.cmu.edu/asset_files/TechnicalReport/1990_005_001_299270.pdf) that better assumptions becoming part of languages is a step in how the industry grows.

However, I believe the migration should be part of evolving the standard set of practices. It should come with substantial conceptual improvements as opposed to a shuffling of hype and cosmetic preferences.

## Conclusion
Current development is dominated by languages and frameworks. We're so busy choosing between comparable tools that we aren't making intentional choices about the underlying design. It leads to constant reinvention and repeated mistakes. The antidote is to create a standard and limited set of design and development tools.
Being explicit creates a baseline for improvement and collaboration, whether its for personal development, your company, or our industry as a whole.
<!-- hmm, i think I might want to move that second sentence elsewhere to put something shorter here. something about understanding the underlying classes of solutions -->