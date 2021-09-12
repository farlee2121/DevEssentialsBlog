What am I trying to accomplish?

Inspections were a huge blindside for me. There is so much data that shows they reduce defects and improve process over time.
I want to sum all that up in an elevator pitch. To give someone the right idea of what inspections are and why they're important.

Ratheon decreased project rework cost from 41% to 20% in two years using an inspection program. It also reduced effort to fix defects in integration by 80% and time to retest by 50%

Things I like
 - improves over time
 - produces quantitative data
 - repeatable (checklists & process that can be learned, lessons folded in)
 - low-ego. uses metrics and predefined standards for evaluating code
 - room for creativity and individuality -> if it's not a defect and you can't force the author to change it
 - more peer-oriented than mentor-student oriented
   - code reviews can feel me vs you or like there is a power imbalance
   - inspections require concensus. Room for noobs to contribute and speak up without being placed out of depth or potentially simply shut down  

Comparison to other methods
- defect removal rate
- improves over time?
- Quantitative
- ego controls
- defined process? 
- followup?
- defined objectives
- preperation?
- specialization? (security, accessiblity, etc)

<!-- tables on pages 43, 33 , 36-->

## Methods to cover
- pass around
- Pair programming
- Team review / code review (think pull request)
- Ad hoc?
- Formal inspection



## key parts of a inspection

size: min 3*, max 6 (some reduced versions for 2)

Roles (venn diagram?)
 - moderator
   - defines done
 - Author
 - scribe
 - reviewer
 - reader

<!-- p. 50 shows overview, p. 51 shows inspection documents -->

Each phase should specify. Who, what, how long, outputs
 - outputs should show how they feed back in 
 - show conditions for next & repeat (like insufficiently prepared for inspection meeting, feel there is still more to cover, etc)

- "almost done"
  - choose moderator
- Inspection package
- Invites sent
- Overview
- preperation
- Meeting
  - non-author summarizes code
    - gives insight to readability / understandability of code which is important for maintenance
  - max rate is ~200 lines/hr. No more than 2 hour meetings
- Rework
- Followup
- Causal analysis


Visual 
- (maybe make the visual a separate post. Me thinks three posts text and comparison table of methods. inspection overview, inspection visual)
- Want to show loops
- would be kinda nice to have layers by role to clearly show when each party is involved and what they do at that stage
  - this might be a separate visual
- Show an internal meeting cycle