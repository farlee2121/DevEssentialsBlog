

// TODO: I should get Paul's blessing before publishing this post. Especiall with the quotes from him.

Give a brief introduction to paul's method
 - Wrestling with the fragile test problem N^N complexity
 - Use an anti-corruption layer. Abstraction belongs to the client, in this case the tests
 - The the api doesn't expose it, it can't be tested
 - "Testing legacy code without indirection basically ensures the tests can't survive the refactoring", but if you change the test then you can't be for sure the behavior is the same

"Right, it's basically like applying TDD after the fact. You're not writing tests first, but you are writing them blindly, which is where the real test value comes in. Doing it first just achieves the same result with a stronger guarantee of not being biased by existing code. Same overall motivation"

Early scepticism
- abstraction duplication
- seems excessive adding yet another layer
- Would I really still be testing the system


Why this is so great
- pays for itself very quickly
- can use the api to cheat and expose things to the tests that shouldn't be part of the system. Like if there is a type you need to create for tests, but creation shouldn't be exposed to callers of that abstraction
 - n complexity (right?) not N^N


 - can write good tests no matter what your system looks like
   - tests then serve as refactor guide
 - Easier to write tests because you can write dependency in the most convenient form for the tests, don't even have to look at the code, more naturally represent the usage being tested
 - Reusable tests, mocking, component mix, all that is decided by the test adapter. the test just encodes an expected behavior. 
   - I find myself using my own system more and only mocking out resources.
   - Could totally reuse the same test suite as integration tests by not mocking anything 
 - Tests are very short. My tests generally don't go longer than 5 lines.
 - Tests look very much like a playback of how I would test if I wanted to test out the code in a REPL
   - very readable

- example of when i thought I had a great idea for lib structure, but test api looked different. I brushed it off, but the test api was right. Test are the first consumer and I should have listened


how do I division all of this? 
 - blind tests: don't know about a system, just an expectation
 - Change resilience: test don't when system changes, makes the test suite more trustworthy
 - Short local cycles: writing test is 
 - Test Design: The tests don't know about the system, so they act as a design check. You get a clean chance at designing to the expectations. If adapting the system to the tests is hard then you likely make a design error.