---
date: "2021-03-05T00:00:00Z"
tags: [tools, markdown, process]
title: Notes as Data
aliases:
- /2021/03/05/reference-ready-notes
---

I've fallen in love with Markdown and it is slowly permeating all of my documents. The latest addition is notes, which Markdown makes easy to reference either manually or programmatically!
<!--more-->


## How I got here

I'm a note taker. I've tried Evernote, Onenote, Word docs, github issues, and a variety of other methods for tracking my notes. None of them quite fit my needs. 

Note software was taggable and searchable, but requires specific software. There is also always the danger of loosing access to all of those notes. Having notes for every purpose in one place also didn't work for me.

Word docs were my mainstay for a long time. They were simple to get started with, familiar, spellcheck and formatting were great, and I could portion my notes like any other file. The main issue was that they are harder to search. I had to remember where certain notes came from to look information.

Then, I started this blog. I wanted to write my posts in format that made it easy to get my thoughts out there, but could also be used directly to generate the blog to avoid syncing formats. Markdown rose as the clear choice. It allowed me
- easy source control integration
- easy blog tooling integration 
- code editor integration
- well supported inline code formatting
- More than enough theming and formatting
- Post metadata via a common yaml section
- extensibility via familiar tools (HTML & CSS)

Markdown and VsCode worked so well that I moved my [duck doc design process](../posts/2020-10-02-Whats-Your-Duck.md) over to markdown. I could
- get my thoughts out without the tools slowing me down
- work with design docs directly in the code base
- copy design doc snippets into issue trackers or other tools
- search my design docs with standard IDEs
- Pseudo-code using code fences

Soon markdown took over all of my notes, bringing all of the above potential benefits.

I was still treating my notes pretty much like word documents though.

One day, I was reading a bunch of performance posts and wanted to tag their files for easy lookup as a group later on. That's when it hit me, my notes could contain arbitrary metadata too!

In fact, there are many advantages to markdown. We'll explore
- Flexible meta-data
- Portability
- Text as consumable data

## Reference Metadata Formats

There is often more do a document than just its content. Tags, author info, and dates are examples of meta-data that help us to quickly understand context for our document and find information quickly. 

Markdown makes it easy to add standard metadata at the document, section, and content levels.

### Whole document
A common standard for adding configuration data to Markdown is to start the document with a yaml block 
```yaml
----
# A jekyll example
layout: post
title: I am title
tags: [tag1, tag2]
----
```

I can use the same paradigm and create standard configuration for my notes and duck docs.

```yaml
----
date: 1111-11-11
author: Author of reading material
link: link to blog, video, etc
referred-by: name or link that led me here
rating: 3 # 0 to 5
tags: [performance, design, ...]
# or anything else
----
```

This means that I can add metadata to my notes at any time and it stays with the file wherever it goes.

### Sub-sections
Sometimes, however, I read a whole bunch of articles all at once. I may or may not take many notes on each post and creating a new file for each one is a pain. The same applies to conference presentations.

This time I can borrow a pattern from literate configuration files. The idea is to embed configuration in documentation using yaml code blocks
```md
# Article title
```yml
link: https://spencerfarley.com
rating: 5 
\```
More text... 
```

This enables cascading metadata for any number of subsections in one document, again by building on an existing paradigm with tooling.

### Inline Tags

Yaml blocks standardize meta for large blocks, but there are many things I might want to highlight within a document. I already had a paradigm for this taken from a common comment token format. E.g. `TODO:` or `SOURCE:`

Some of the common tokens I use are 
- TODO:
- SOURCE:
- QUOTE:
- TECH: (for technique, a bit confusing)
- GOLD: or !!!: (for key ideas I want to remember)
- READ: (referenced material I want to read)
- CROSS: for cross references

The benefit of these tokens is that they can be placed anywhere. I don't have to think about structure or categorization while I'm writing. They're refactor-friendly, moving with the content they modify and easily backed in to existing documents.


## Maximally Portable

Since all the data is all just text, editors like VsCode can easily surface it in search. Same with searching from a file system, code repositories, or any other place we access the notes that supports text search. That includes most tools since text is generally the lowest common denominator.

All of the paradigms are also shared with coding. They require little to no adjustment as I switch between activities. Programmers viewing my notes wouldn't require any training to understand what's going on and do likewise. Non-programmers can understand it, but may need a little boost to emulate it.

## Programmatic Possibilities

This data format is easy to type and works well with editors, and... the notes have effectively become a database!
- Normalized meta provides context for the content
- Tags flag special content inline
- The document itself defines semantic structure (headers, paragraphs, block quotes,...)
- We can process the data in-place. The notes are the direct truth source!

Consumers of the markdown don't have to worry about syncing because the content is a self-contained and normalized data format. It happens to be a format that is convenient for humans to read and write. Writing notes is intuitive and would look about the same if you have downstream consumers or not!

The data can also be incrementally refined with new meta-data over time without need for global consistency.

Here are some practical ways this could be leveraged
- create a quote search engine over my notes
- automatically compile key points from every article
- recommend reading based on keywords and ratings from my notes
- generate a list of flagged material to read that I haven't already read
- analyze the progression of topics I've learned over time
  - potentially to help develop curriculum
- calculate the expected read time for a guided reader selected from articles I've read

## Conclusion

Markdown is just the best. It has united the community around a readable and easy-to-write format that can also be extended. 

This balance enables us to leverage human-readable text documents (like notes) directly as data without sacrificing good tools or simplicity during our creative work! 