---
date: 2023-08-10
tags: [Notedown, Ducks]
title: Notedown Library Now Available
---

Notedown is my convention for note taking in Markdown. Now it's also a library that reads the convention as semi-structured data.
<!--more-->

I've previously covered Notedown several times. Such as [how notes can double as a light data format](../../posts/2021/2021-03-05-Reference-Ready-Notes.md)
and how I use the format [for exploring ideas](../../posts/2022/2022-11-25-Duck-Structure-Update.md).

The new library contains two main features, extracting document section hierarchies with metadata and extracting tagged content.

## Section Hierarchy With Meta


Consider a Notedown-based document like the following example.
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

This document has multiple sections, some of them nested, and some of those sections have meta data like dates or tags.

These sections and meta are all useful for analyzing the notes. For example, if we want to create a notes timeline, or if we want to search reading notes by rating, date range, tags, and similar facets.

Extracting this information is easy with the Notedown library

```fsharp
open Notedown

let noteModel = NoteModel.parse markdownText
```

The parsed data comes in this form
```fsharp
type Section = {
    Level: SectionLevel // i.e root, h1, h2
    Meta: MetadataValue
    ExclusiveText: string
    Children: Section list
    // There is also a FullText() method, 
    // which gets all text of the section and it's children
}
```

There are also several optional rules for metadata inheritance. For example
```fsharp
let notesWithMetaInheritance = noteModel |> NoteModel.Inheritance.parentChild
```

Custom inheritance strategies, or most any custom transformations, can be achieved with `Section.mapFold`.

## Tag Extraction
The other main feature is tag extraction.

A tagged document might look like this example.

```
## TAGGED: I'm a tagged heading

Content of tagged sections is extracted with the heading

- PRO: This list item is tagged pro
- CON: this list item is tagged con
  - child list items are included with tagged parent

TAGGED: This paragraph is tagged
- List items following the paragraph without space between are included in extraction

```

The Notedown library can extract content for specific tags.

```fsharp
let extracted = TagExtraction.extract ["tag:"; "otherTag:"] markdownText
```

Tagged content falls into a few categories
- Paragraph: Extracts the full paragraph if the tag appears anywhere in the paragraph
- Paragraph+list: Extracts the tagged paragraph and following list if there is no space between the paragraph and list (assumes the list belongs to the paragraph)
- List items: Extracts any list items containing the tag along with any sub-items (but not parent items)
- Headings/Sections: Extracts any heading containing the tag along with all content in the heading's section

I use this tool to with the `READ:` tag to extract reading suggestions from my notes. Usually resources recommended by other materials I've read.

I also use it to compile lists of key lessons I want to apply using the `APPLY:` tag.
This way I don't have to manually repeat this content for a central list, I can programmatically extract it whenever I like. This way I don't have two sources of truth to maintain. If I keep updating the notes, I can quickly re-extract the key lessons. 


All in all, these two features are straightforward, but can create all kinds of experiences over note data.

<!-- ## Applications

These two features are pretty straight forward, but they can be used to power all kinds of experiences.
For example, I use the tag extraction to compile reading lists from materials recommended in my reading notes. In particular, is use the `READ:` tag.
I also use the tool to collect key points from my notes into summaries.

Not currently built in, but the tools could also be used for more complex searches like "key points from reading notes with rating higher than 4".
I've also considered using `referred-by` meta to create a graph of how and when I discovered different materials.

All in all, I'm enjoying taking notes-as-data from idea to application.
Perhaps others might find it useful too. -->