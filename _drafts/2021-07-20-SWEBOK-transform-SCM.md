---
layout: post
tags: [SWEBOK, Design Process, SCM, Quality]
---

SCM/Quality activities at each step?
- REQs
  - SCM: Inspection (other reviews), Bug trackers, Work trackers, triage / change control boards, estimation/priority separation?
  - Quality: Inspection, mock testing, formal models, language analysis (mentioned by swebok, e.g. find ambiguity indicators), acceptance testing

- Design
  - SCM: Inspections (& other reviews), Source control or other versioning system (e.g. wikis, versioned file system, specialized software)
  - Quality: Inspections (& other reviews), translation to tests, 
- Construction
  - SCM: Source Control, Inspections (& other reviews), pull requests
  - Quality: Inspections (and other reviews), compiler, Static Analyzers, .editorconfig (auto formatting), style guides, automated testing, fault handling, cyclomatic complexity, defect density (requires review and/or bug tracking), fan in/out (component stability)
- Testing
  - SCM: source control, Inspections (& other reviews)
  - Quality: Inspections/review, acceptance testing, test engineering, mutation testing, test counting methods (state machine, branch, ...), Quality assurance process (multiple verification, standard process, measurement standards, reporting, sign-off )
- Delivery
  - SCM: Source control (version history and control deployment definition changes), gated releases, feature flags, deployments as code, infrastructure as code (docker, ARM, cloud formation,...)
  - Quality: logging, uptime monitors, canary testing, backups, redundancy, staged release
- Meta: 
  - SCM: ???
  - Quality: retrospectives, process improvement board/role, self-improving processes (i.e. Inspections), audits 
