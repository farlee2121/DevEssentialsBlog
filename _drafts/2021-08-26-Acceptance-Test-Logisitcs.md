---
layout: post
tags: []
---

## Acceptance Test Logistics

I [previously wrote](TODO) on how acceptance tests can keep inter-team work efficient. I've been thinking about logistics
<!-- idea: can the tests be packaged with nuget to be shared with the implementing team? probably... 
- this keeps ownership with the upstream team while giving control of the adapter implementation to the downstream team.
- keeps test suites accessible, standard (i.e. no forking), and composable (i.e. implementers of contracts can import the packages of all contracts they must satisfy to run in their suite). 
  - Upstream team may need to implement their own version against the real dependency. Simplifies ownership concerns and takes out the need for trust in the tests. Lines up with ownership of outcome responsibilities. If test suites disagree, that's valuable info about what might be wrong. Also solves issues of joint dependency ownership. The upstream teams can make sure there is not corner-cutting by other teams (so far as it effects behavior, inspections with both parties would be needed for code quality, and I do think inspections should be used for all multi-ownership code).

make these ideas another blog post... Inter-team Acceptance test logistics
 -->