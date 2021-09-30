May be obvious to many people, but I put together multiple verification as a QA technique and as a governance technique. They're the same thing, it's about managing the level of trust we're comfortable with in our process.

That may sound bad, but good governance doesn't mean we don't trust, it means we don't *have to*.

Basically, The way we mitigate people not doing their job is having multiple people involved. This happens at all kinds of levels from loose to formal: pair programming, peer reviews, audits. We do the same to our code, the way we guard against tests not doing their job is multiple test approaches. testing with multiple techniques as the "votes" toward a particular answer

the more people required the more conservative the process is. The bias is toward stopping failure. This can be slower, but it's safer. Tradeoff between speed and safety is really a decision of about risk. (risk matrix!)

can pull from governance for good techniques
- quorum, veto, veto override, 2/3rds majority, simply needing another 


examples: want an admin to not be able to remove other admins and host system hostage, don't want a single person capable of deleting the company repositories.
Consequences are not so severe if a coder makes local changes, those don't need to be regulated. / Spectrum of serverity examples