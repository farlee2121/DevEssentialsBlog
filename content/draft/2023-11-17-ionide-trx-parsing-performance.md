---
date: 2023-11-17
tags: [Performance, Case Study]
title: Improving the Ionide TRX Parsing Performance 
---

I managed to re-teach myself about always measuring first when considering performance.
<!--more-->

I contributed to the Ionide (F#) test explorer for VS Code and noticed large test suites were
running rather slow. A test suite of about 2,000 tests would take about 5-6 minutes to complete.


At first I assumed that the issue was with restoring and building projects.
Due to complications in the typescript, the test explorer had to restore and build
projects one at a time. This had caused a lot of grief in the initial development,
so it was heavy on my mind. I spent quite a bit of time brainstorming solutions
for smarter build order and parallelization.

However, while working on a different issue, I noticed there was a delay between when 
the logs claimed the test run was done and when the test explorer showed the run was done.

*facepalm* I know the key rule of performance optimization is to measure first and often.

I separately timed the key phases of the test run (i.e. build, test run, result parse, UI update), 
narrowing my timed sections as needed until I was sure exactly what portion of the process was
running so long. And, once I was satisfied with my timed sections, I collected measurement from several
runs just to be sure the results were consistent.

Turns out the slow test runs on large test suites had little to do with build order.
The vast majority of time was being spent on test results parsing.
As in roughly 3/4 of the run time was results parsing. 

Now that I had good measurements in place, I could experiment with fixes and be certain when the problem was solved.

I tried a few things that helped, but weren't a enough.
It turns out that [XmlDOM](https://www.npmjs.com/package/xmldom) had a known issue with 
selector performance on large documents.
I'd assumed id-based selector lookup would be fast (should be constant time), but that wasn't true.

In the end, I was able to keep XmlDom but decrease the average selector scope.
This reduced the average parse time from over 200 seconds (3.5+ minutes) to under 2 seconds.

In summary, always measure when working with performance issues.
Apparently it's a lesson I needed another reminder of.