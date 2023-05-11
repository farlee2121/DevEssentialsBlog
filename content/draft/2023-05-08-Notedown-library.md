---
date: 2023-05-08
tags: [Notedown, Ducks]
title: Notedown Library Now Available
---

Notedown is my convention for note taking in Markdown. Now it's also a library that reads the convention as semi-structured data.
<!--more-->

I've previously covered Notedown several times. Such as [how notes can double as light data format](../posts/2021-03-05-Reference-Ready-Notes.md)
and how I use the format [for exploring ideas](../posts/2022-11-25-Duck-Structure-Update.md).

The new library contains two main features, extracting document section hierarchies with metadata and extracting tagged content.

## Section Hierarchy With Meta

Parsing a markdown document for sections and meta is pretty simple.
```fsharp
open Notedown

let noteModel = NoteModel.parse markdownText
```

This method would parse a Notedown-based document like the following example.
```
---
some-config: "I'm root-level meta" 
date: 20xx-MM-dd
tags: [tag1, tag2]
---

Root level content

# I'm a section

Content 

## I'm a child Section
```yml
some-config: "I'm child section meta"
rating: 5
\```
Child Content

```

The parsed data comes in this form
```fsharp
type Section = {
    Level: SectionLevel
    Meta: MetadataValue
    ExclusiveText: string
    Children: Section list
    // There is also a FullText() method
}
```

There are also several optional rules for metadata inheritance. For example
```fsharp
let notesWithMetaInheritance = noteModel |> NoteModel.Inheritance.parentChild
```

You can crawl the note hierarchy to create your own inheritance rules or otherwise
transform the model using `Section.mapFold`.


## Tag Extraction
The other main feature is tag extraction

```fsharp
let extracted = TagExtraction.extract ["tag:"; "otherTag:"] markdownText
```

It takes any list of tags to extract and any markdown text, then returns the markdown text of any sections, paragraphs, or list items marked by those tags

Here's a sample of how tagging could work
```
## TAGGED: I'm a tagged heading

Content of tagged sections is extracted with the heading

- PRO: This list item is tagged pro
- CON: this list item is tagged con
  - child list items are included with tagged parent

TAGGED: This paragraph is tagged
- List items following the paragraph without space between are included in extraction

```


## Applications

These to features are pretty straight forward, but they can be used to power all kinds of experiences.
For example, I use the tag extraction to compile reading lists from materials recommended in my reading notes. In particular, is use the `READ:` tag.
I also use the tool to collect key points from my notes into summaries.

Not currently built in, but the tools could also be used for more complex searches like "key points from reading notes with rating higher than 4".
I've also considered using `referred-by` meta to create a graph of how and when I discovered different materials.

All in all, I'm enjoying taking notes-as-data from idea to application.
Perhaps others might find it useful too.