---
date: "2021-11-19T00:00:00Z"
tags:
- .NET
- Open source
title: Dotnet SDK Contribution Tips
---

I've been experimenting with adding a feature to the [.NET SDK](https://github.com/dotnet/sdk). Oof, this project is understandably large and complex.
Here are a few lessons I've learned that simplify working on the project.


## Solution Filters
Some of the sub-projects (like dotnet-watch) have their own solution filter files (e.g. `dotnet-watch.slnf`). Use these, Visual Studio will run much faster

## Partial Build/Test
- The full test suite takes forever (more than an hour), focus to only the tests you want.

- Partial testing is not well documented. It can be done with 
  ```ps1
  ./build.cmd -test -projects path/to/test/project.csproj
  ```
  - Tests can supposedly be run with `dotnet test` or Visual Studio after running `dogfood.cmd` or `sdk-build-env.bat`. I've not had luck with it
  
- Partial builds can also be done with `./build.cmd -projects path/to/test/project.csproj`
  - [This file](https://github.com/dotnet/sdk/blob/main/eng/common/build.sh) is the core build script. It's a useful reference. 
  


## Tool Aliases
SDK-specific tools like `dogfood.cmd` and `build.cmd` will be used all the time. Set aliases to access them quickly and without needing relative paths
  - I especially use this when I'm testing the SDK on a project that lives in a different directory
  - Here are my core aliases
    ```ps1
    set-alias devenv "C:\Program Files\Microsoft Visual Studio\2022\Preview\Common7\IDE\devenv.exe"
    set-alias dotnet-dogfood path-to-repository\sdk\eng\dogfood.cmd
    set-alias dotnet-build path-to-repository\sdk\build.cmd
    ```
  - Assuming you have VSCode, you can open the right powershell profile to add these aliases to with
    ```ps1
    > code $profile
    ```

## Global Tool Gotcha
Use dogfood.cmd over directly invoking the locally built dotnet.exe. Direct invocation will run the local core executable, but does not configure the core SDK executable to use locally built versions of built-in tools (like dotnet-watch)

## Different ways to use the local SDK
  - `dogfood.cmd` is the easiest route
  - `sdk-build-env.bat` can setup the local build in your current shell, *seems to only work for Command Prompt* (not PowerShell)
  - `dogfood.ps1` can setup the local build in your current powershell instance similar to `sdk-build-env.bat` does for Command Prompt
  - Directly setup environment variables
    - This would allow the settings to persist across all shells
    - Proper environment variables can be found in [dogfood.ps1](https://github.com/dotnet/sdk/blob/main/eng/dogfood.ps1)


## Using from VSCode

Testing with VsCode can be tricky. Test from the console instead if you can. Otherwise, the most reliable method I've found so far is to set environment variables in the `tasks.json`. Alternately, one can effectively install the local SDK build by setting environment variables globally.



<!-- 
build and test tools are a separate project https://github.com/dotnet/arcade

Update: it looks like you can use Visual Studio and the dotnet sdk to test and debug if you match the version explicitly required via global.json
 -->
