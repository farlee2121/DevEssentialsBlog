---
date: "2021-04-09T00:00:00Z"
tags:
- Domain Driven Design
- Events
- Functional Programming
---
# Progressive Modeling with Events, Transforms, and State

I just finished reading [Domain Modeling Made Functional](https://pragprog.com/titles/swdddf/domain-modeling-made-functional/). Wow, the technique in this book just feels right. It wraps up a bunch of development values I already had in a technique that is clear, thorough, and fluid. Here I'll overview the method and recount a bit of my experience applying it.

I'm a software design nut. I love trying different mental models for approaching problem solving. Here are some of my core values that also motivate this approach
- Understand a problem before coding
- Design to the problem and not the implementation
- Design is a spectrum: progressively uncover knowledge of the problem
  - Coding is just the last mile design phase
- Self-documenting code
- Core code should be infrastructure-agnostic
- Orient the api around verbs, not nouns

You can probably tell that this technique starts with problem (domain) modeling. So, we will too. First we'll talk about understanding a high-level problem with domain experts, then encoding that knowledge, filling in more detail, and lastly translating it to code.

## Event Storming
Event storming is a technique that quickly rooted itself in the DDD community, and the first step of this modeling process. 

Event storming is pretty straightforward. Get experts from different parts of the company in a room with a bunch of sticky notes. Then
1. Use orange sticky notes to create a timeline of domain *Events*, past-tense verbs that represent important things that happen in the business
2. Identify triggers
   - use blue stickies for *Commands*, imperatively phrased words for user actions that trigger events
   - use purple stickies for triggers based on time or external systems
3. Group related events together to find *workflows* of closely related events
4. Identify *sub-domains* or places where workflows need to be independent. Sub-domains are often along department boundaries


Event storming is meant to ease communication between many people. However, I was working on this alone. Instead of stickies I just typed it all out in a text document. Here's a simple sample

```md
Timeline
- Site determined distracting/negative
  - Source: User
  - Command: CreateSiteBlock
  - Event: block hours set 
- block hours updated
  - source: user
  - Command: UpdateBlockSchedule
  - REQ: if block running, finish the current block period before applying updates
- ScheduledBlockStarted
  - Source: time / saved schedule
  - Time: `UpdateBlocksBySchedule` triggered by registered schedule
  - note: minimum block increment is 1 minute. Expect blocks to be enforced to the minute.
- ScheduledBlockEnded
  - Source: time / saved schedule
  - `UpdateBlocksBySchedule`
- BlockRulesViewed
  - Command: ListBlockRules
- BlockPaused 
  - Source: user
  - Command: `PauseBlock`
- BlockDeleted
  - source: user
  - REQ: if block running, don't remove until normal period finished or end of day
```


## Storm to Design
The event storm outputs a collective understanding of the business process at a high level. The next step is to start working out details of each part with the experts who own it.

This can be done with just talking and note-taking. However, it's much more powerful to have some shared representation that both parties understand and can comment on.

Some might use UML or diagrams, but let's take a simple text-based approach. 

A few quick rules for understanding the text model
- `type` starts a definition
- `|` represents alternative values
- `{}` are bundled values
- `->` is a transform from data on the left to data on the right

The workflows from before become transforms, which take the related command as input and return the related events. This makes for an easy translation of the event storm into a format where we can start filling in details.

Here's the high-level translation.
```fsharp
type CreateBlockRule = CreateBlockRuleCommand -> RuleCreated
type UpdateBlockRule = UpdateRuleCommand -> RuleUpdated
type DeleteBlockRule = DeleteBlockRuleCommand -> RuleDeleted
type UpdateRuleActivations = TimeTrigger -> RuleActivationEvent list
type RuleActivationEvent = BlockRuleActivated | BlockRuleDeactivated

type ListBlockRules = unit -> RuleListItemModel list
```

## Refining the design: Values, State Machines, & Constraints

The text representation of events and commands gives us a template to start filling in details like  
- what information do they need to execute a command (still thinking in terms of manual process)
- what different routes can a task take and why
- how do the experts break down their work into smaller steps
- What can go wrong and how is it handled

Some of this might happen in the original event storm. In fact, some of it should if the decisions effect multiple parties.

### Values
Here are some of the commands and events filled in

```fsharp
// Creation Input
type CreateBlockRuleCommand = UnvalidatedBlockRule
type UnvalidatedBlockRule = {
    Name: string
    Targets: UnvalidatedBlockTarget list;
    BlockTriggers: UnvalidatedBlockTrigger list
}
type UnvalidatedBlockTarget = Website of string
type UnvalidatedBlockTrigger = Time of (DateTime * DateTime)

// Successful Creation Output
type RuleCreated = RuleCreated of ValidatedBlockRule
type ValidatedBlockRule = {
    Name: RuleName
    Site: ValidatedBlockTarget list;
    BlockTriggers: ValidatedBlockTrigger list
}
type RuleName = RuleName of string
type ValidatedBlockTarget = Site of string
type ValidatedBlockTrigger = TimeTrigger of TimeTrigger
type TimeTrigger =  { Start: Time; End: Time }
//NOTE: we only care about time resolution to the nearest minute. Thus we encode that expectation
type Time = { Hour: int; Minute: int } 
```

Hmm. A few things to notice
- We don't trust the block rule input. Thus it needs to get validated somehow
- A TimeTrigger is just one kind of block trigger. It is the only one for now, but we expect more options will be added. For example, location or user-defined "mode" would be reasonable triggers.
  - Similarly, a Website is just one kind of block target. Programs, files, or folders are also reasonable targets to block. They all fit the idea of limiting access to distractions

### Errors and Constraints

Let's dig deeper into the validation. First, our workflows should make it clear when errors are possible. So let's update them

```fsharp
type CreateBlockRule = CreateBlockRuleCommand -> Result<RuleCreated, CreateRuleError list>
type UpdateBlockRule = UpdateRuleCommand -> Result<RuleUpdated, UpdateRuleError list>
type DeleteBlockRule = DeleteBlockRuleCommand -> Result<RuleDeleted, DeleteRuleError>
type UpdateRuleActivations = RuleActivationTrigger -> RuleActivationEvent list

type ListBlockRules = unit -> RuleListItemModel list
```

Then we can identify different possible error cases

```fsharp
type CreateRuleError = 
    | InvalidName of ErrorReason
    | InvalidTarget of (UnvalidatedBlockTarget * ErrorReason) 
    | InvalidTrigger of (UnvalidatedBlockTrigger * ErrorReason) 

type UpdateRuleError = 
    | InvalidName of ErrorReason
    | InvalidTarget of (UnvalidatedBlockTarget * ErrorReason)
    | InvalidTrigger of (UnvalidatedBlockTrigger * ErrorReason) 
    | UnknownRule

type DeleteRuleError = 
    | UnknownRule

type ErrorReason = string
```

Note that both create and update share most of their failure cases. This hints at a shared sub-flow

```fsharp
type ValidateBlockRule = UnvalidatedBlockRule -> Result<ValidatedBlockRule, RuleValidationError>

type RuleValidationError = 
    | InvalidName of ErrorReason
    | InvalidTarget of (UnvalidatedBlockTarget * ErrorReason) 
    | InvalidTrigger of (UnvalidatedBlockTrigger * ErrorReason) 

type CreateRuleError = 
    | ValidationError of RuleValidationError

type UpdateRuleError = 
    | ValidationError of RuleValidationError
    | UnknownRule
```

We probably also want to iron out the rule validation *constraints* with domain experts. 
- Times are represented as 24-hr time. Hours 0-23 are valid and minutes 0-59
- Websites are expected to be domain names, with no sub-path
- Rule Name should not contain tabs or newlines

These constraints can also be represented
```fsharp
  let validateHour hour = 0 <= hour && hour <= 23
  let validateMinute minute = 0 <= minute && minute <= 59 
  //...
```

We can also dig into the dependencies of different operations, like validating a block rule

```fsharp

type ValidateBlockRule = ValidateTrigger -> ValidateName -> ValidateTarget
    UnvalidatedBlockRule -> Result<ValidatedBlockRule, RuleValidationError>

type ValidateTrigger = ValidateTimeTrigger -> Result<BlockTrigger, TriggerValidationError>
type ValidateTimeTrigger = ValidateTime -> Result<BlockTrigger, TimeTriggerValidationError>
//...
```
Each of these definitions uncovers more expectations of the domain clearly without forcing us into an implementation or prototype.


### States

Let's think about the rule update workflow. Our notes from the event storm indicate that a block rule should not be updated or deleted while the rule is in effect. This is to prevent users from circumventing rules. 

However, model does not currently indicate this rule
```fsharp
type UpdateBlockRule = UpdateRuleCommand -> Result<RuleUpdated, UpdateRuleError list>
```

Let's improve it. 

What should happen if a rule is currently active and a rule is updated.
- We could error and have the user try again later
- We could save the update for after the rule is inactivated
  - If the rule is always active?

Our "domain expert" (me) says we want to apply the rule later. If the rule is always active, apply changes at the end of the day.

This means we really have two success criteria.

```fsharp
type UpdateBlockRule = UpdateRuleCommand -> Result<RuleUpdatedEvents, UpdateRuleError list>

type PendingRuleUpdate = { Current: ValidatedBlockRule; Pending of ValidatedBlockRule}
type RuleUpdatedEvents = 
    | RuleUpdated of ValidatedBlockRule
    | UpdatePending of PendingRuleUpdate
```

This effects more parts of the design though. Our activation updater now needs to deal with multiple states. 

```fsharp
type StatefulBlockRule = 
  | Active of ValidatedBlockRule
  | Inactive of ValidatedBlockRule
  | PendingUpdate of PendingRuleUpdate

type RuleActivationEvent = 
  | Activated of BlockRuleActivated 
  | Deactivated of BlockRuleDeactivated
  | UpdateApplied of RuleUpdated

type ListBlockRules = unit -> StatefulBlockRule list 

type UpdateRuleActivations = ListBlockRules ->
 RuleActivationTrigger -> RuleActivationEvent list
```

The matrix of input states and output states defines a state machine of possible transitions
- Inactive, no update -> Still inactive
- Inactive and no update -> Becomes active
- Active and no update -> Stays active
- Active and update -> Stays active and holds update
- Active and update -> becomes inactive and applies update

This makes a good talking structure about stateful behavior with business experts.

## Design To Code

Now here's the best part. All those examples above are valid F# code. 

Using events, transforms, and state as the basis of our design captures domain requirements in a way that both parties can understand right up to the point where it becomes the high-level code design.

This approach also isn't limited to functional languages. Changes in C# 9 make many of these techniques quite pleasant. 
- For representing alternative values, see [my post on union types in c#](../_posts/2021-03-26-Unions-in-CSharp.md)
    - These enable reasonable state machines and compositional polymorphism (wrap rather than inherit)
- See my [post on result types in c#](../_posts/2021-01-15-Results-Update.md). A big step toward total functions
- [Positional records](https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-9#record-types) can be used to succinctly name and constrain simple types.


My full experiment source is available [on github](https://github.com/farlee2121/BlockScheduler).

## Personal Take
This technique is amazing. I've never used a modeling paradigm that encoded the domain with such ease and clarity. So much domain information can be encoded just in type signatures that many more issues can be detected before coding ever starts, and the gap to code is so much smaller once coding actually starts. Most domain rules are enforced by the type signatures, which reduces the errors that developers can make from misunderstanding or accident.

I think much of the power comes from focusing on events, transforms, and states rather than data, services, or other programming-focused constructs.

The approach definitely takes some adjustment to how you think, but in a very good way. It disentangles bad habits accumulated from accommodating limited type systems, storage, and the like.

## Summary

This event, transform, and state oriented design is an all around winner. It is easier to model the domain, more information is uncovered during modeling, and the resulting code is both safer and easier to write.

I highly recommend [Domain Modeling Made Functional](https://pragprog.com/titles/swdddf/domain-modeling-made-functional/) for further exploration. It describes the process accessibly and with lots of concrete examples.