---
date: 2023-11-17
tags: [dotnet]
title: Gotchas Implementing Debugging for Ionide
---

I contributed debug support to the Ionide (F#) test explorer for VS Code.
I thought I'd document the quirks I encountered, though I don't expect many people to need such info.
<!--more-->

## Getting the right process ID to debug


First of all, debugging requires a process id to attach the debugger to. 
I generally expect to get a process id when I spawn a process, in this case a [Node ChildProcess](https://nodejs.org/api/child_process.html#class-childprocess).
However, invoking `dotnet test` does not return the correct process id. Instead, the console command spawns a separate test host process and it's 
that process that we need to attach to. 

Neither dotnet test or the underlying vstest list options for debugging in their CLI option documentation.
Nor does the test host process id show in the console output.

However, if you set the environment variable `VSTEST_HOST_DEBUG=1`, then vsTest will add the test host process id
to the console output

![console output showing testhost process id](../../static/post-media/Ionide-Test-Explorer/vstest-process-id.png)


## Debug Pause / Continuation Delay

The other key gotcha was debugger pausing.

Notice the console output above says "Please attach debugger to testhost process to continue".
Running with the debugger enabled causes the process to pause on entry. This avoids the process running ahead while the debugger is attached and potentially passing over the lines of interest to the user.

However, the process does not automatically continue once the debugger is attached. *Continue has to be called explicitly*.

To the user, this may look like the program never loaded. The program is stopped but no breakpoints are hit. It's not intuitive that they have to click continue. So, ideally, we'd programmatically continue execution once we've attached the debugger.
This is yet another gotcha. The debugger attaching can take a while, so the continue call must be delayed a second or two, or it will be called before the debugger is ready and the user will be left with the confusing pause-on-entry state.