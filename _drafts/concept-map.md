
Q: What are the primary divisions?
- I think they fundamentally can't be lifecycle-based. The activities have too much overlap between lifecycle phases
- The KAs of SWEBOK are probably good dividers
  - SCM (change control), Testing (verification), Requirements(problem definition), Design?, Management?, CS foundations, math foundations
    - Delivery is SCM
    - I think Construction falls under design
    - Is process a part of management? Or is management a part of process?
      - Process is really a way of trying to normalize practices and provide opportunities for measurement and control
    - economics is part of requirements and management

K: there can be separate divisions outside the core. E.g. Delivery should be a section within SCM


Ordering
- Management next to reqs
- Reqs next to design
- Hmm, but cs foundations could also be near design for encapsulation, abstraction, etc


Quality
Requirements
Work-items
stories
activities
critical path method
- float (not really a common term)
earned value
technical debt
"Good Enough" principle
- no perfect solution, only a bulls eye of "meets needs" including extensibility/maintainability needs
Design stamina hypothesis

agile
waterfall
scrum
extreme programming
estimation (see swebok ch 12.3.2)
wide-band delphi
cocomo
planning poker
historical estimations
formal specification
prioritization
- devs control estimates, product owner controls priority
standups
retrospectives
team-owned features 
- orthogonality of teams, minimize organizational friction

collaboration
inspections
pair programming
code review
code reading 
pass around
desk check



measurement
defects per kLoC
time between defects
cyclomatic complexity
code coverage
mutation testing

Security
OWASP
principle of least authority
authorization 
authentication
roles
capabilities
capability-based design
threat matrix 
actors



Performance testing
Load/stress testing
Latency
Responsiveness
efficiency (memory, cpu, storage, other resources) 

Canary Testing
Chaos testing
A/B testing
Staged Deployments
Deployment Environments
Infrastructure as Code
Deployments as Code

Mutation Testing
Unit Testing 
Regression Testing
System Testing
Acceptance Testing
Integration Testing
Flaky tests
Reproducibility
"tightening the net"
completeness
state-machine-based test completeness
branch-based completeness (see swebok to check if this is the right term)
correctness


Services
Inversion of Control
Dependency inversion
SOLID
Coupling 
Cohesion
Information hiding
Ports and Adapters
Hexagonal Architecture 
Clean Architecture
Plugin-style structure
Domain Driven Design
Event-Storming (also under requirements)
Design by contract 
defensive programming
volatility-based decomposition
modules
modularity
maintainability
- TODO: should make sure I have all the -ilities and -nesses and other measures mentioned in swebok
patterns
- adapter
- strategy
- ...
orthogonality
- separation of concerns
stream structure
blackboard (I still don't understand this one)

Documentation
self-documenting code
inline documentation
documentation generation
interactive documentation
tests as documentation
formal specifications
Request for creation (RFC)
Architectural Design Record (ADR)
naming
Duck Docs
Pseudo-code programming process
interface
contracts
threat matrix


Style
readability
indentation
naming 
semantic whitespace
minimized symbol scope
minimized symbol lifetime
no global variables
expression-based programming
immutability
referential transparency
totality / total functions
consistent level of abstraction
consistency of decisions


Language concepts
totality
immutability
expression-based
algebraic types
SWEBOK 13.4
- variables, data types, constants, assignment statements (binding), control statements, procedures, functions, and comments 
- high-level/low-level

SWEBOK 13.3
- Structured Programming
- Aspect-Orientation
- Object-orientation
- Functional
- What about logic, symbolic, stack-based, list-based (I suppose this list-based is functional)
  - less fundamental are actor, ownership
 

tools
source control
work planning
bug/defect tracker
test runner
- assertion frameworks
frameworks
serializer / transport formats
database / persistence
static analysis
wiki / knowledge sharing
documentation
workflow engine (logic apps and similar these days)
rule engine
coordination (load balancing + group configuration)
queue/ bus / decoupled communication
rendering 
Build and Deployment
Logging / runtime diagnostics
Debugger
Performance Profiling tools
advanced state machine tooling?
prototyping?




https://www.pinterest.com/pin/551620654342750590/

IDEA: this would be fantastic as an interactive visual. They can click in to see sub-graphs or definitions
IDEA: I could come out with sub-portions of this as blog posts if I felt I needed the buffer or increments
- tool categories would be a good post



major underlying sections could be
- mathematics
- economics
- computer science
  - problem-solving skills split between this and math
- Engineering