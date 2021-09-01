---
layout: post
tags: [.NET, Open source]
---

# Dotnet SDK Contribution Tips

I've been experimenting with adding a feature to the [.NET SDK](https://github.com/dotnet/sdk). Oof, this project is understandably large and complex.
Here are a few lessons I've learned that simplify working on the project.

- Build and test don't work from VS, don't try
- Some of the sub-projects (like dotnet-watch) have their own solution filter files (e.g. `dotnet-watch.slnf`). Use these, Visual Studio will run much faster
- The full test suite takes forever (more than an hour), focus to only the tests you want
  - Testing limited subsets is not documented. It can be done with `./build.cmd -test -projects path/to/test/project.csproj`
- Set aliases to common actions like dogfood, the visualstudio preview (devenv.exe), and build.cmd
  - allows makes it much easier to invoke the local version on other projects, no nasty long paths
- Use dogfood.cmd over directly invoking the built dotnet.exe. Direct invocation will not use the local build of tools (like dotnet-watch)


[This file](https://github.com/dotnet/sdk/blob/main/eng/common/build.sh) is the core build script. It's a useful reference. 

Here are my core aliases
```ps1
set-alias devenv "C:\Program Files\Microsoft Visual Studio\2022\Preview\Common7\IDE\devenv.exe"
set-alias dotnet-dogfood path-to-repository\sdk\eng\dogfood.cmd
set-alias dotnet-build path-to-repository\sdk\build.cmd
```

Assuming you have VSCode, you can open the right powershell profile to add these aliases to with
```ps1
> code $profile
```
<!-- 
build and test tools are a separate project https://github.com/dotnet/arcade -->


