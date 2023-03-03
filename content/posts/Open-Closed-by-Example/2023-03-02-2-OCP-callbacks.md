---
date: "2023-03-02T00:02:00Z"
tags: [SOLID, Design Principles]
seriesId: "Open-Closed Principle by Example"
title: "Open-Closed Principle by Example: Callbacks & Handlers"
aliases:
- /draft/open-closed-by-example/2-OCP-callbacks  
---

<!-- TODO: Can I tie back to focusing the domain like I do with other posts in the series? -->

This series clarifies the [Open-Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle) with examples. This post will demonstrate how the OCP can be achieved through flexible behaviors like callbacks. 
<!--more-->

I recommend you read the [series intro post](./2023-03-02-0-Intro-to-OCP.md) if you haven't already. It defines the Open-Closed Principle (OCP) and highlights motivating questions.

In summary, the OCP illuminates how components can offer self-defined flexibility and adapt to caller needs without changing internally. This is much like how parameters
enable functions to be resused by many consumers without changing the function.

One way to achieve self-defined flexibility is through flexible behaviors like callbacks.


## Reusing flow
The easiest way to compose functions is through a pipeline. That is, mapping return values of one function into parameters for the next function.
This allows functions on data to be arbitrarily combined as long as the inputs and outputs are mappable.

Sometimes, the pipeline or flow of actions might be more important than the specific data operations.
In this case, we want to reuse a flow and swap behaviors within that flow.

<!-- 
TODO: consider renaming this to flexible behavior part 1 and 2.
Both focus on flows with injected behavior. One focuses on a behavior swapped into a flow the other focuses on a flow swapping in behaviors. In callback we are focused on the caller. In DI we are focused on being the caller. Not sure the difference is very clear
 -->

## Example: Recipe Editor

A classic example of resusable flow is a UI component. UI components define some user interaction and let their parent know when certain events happen (e.g. data edited, form submitted, etc).

The following example is a simple editor for recipes. The code is loosely written with [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor) syntax.

### First Pass: Hard-coded actions

The recipe editor is a custom control. We want to centralize the editing experience for recipes. The control should 
- organize input fields for all editable data on a recipe
- validate the recipe data
- save only if the recipe is valid
- return to the recipe list if the user cancels

An intuitive first pass at this control might look like

```cs
//RecipeEditor
<h1>@recipe.Title</h1>
<MarkdownEditor @bind-Value="@recipe.IngredientsMarkdown" />

<button type="submit" class="btn btn-success" onclick="@Recipe_OnSave">
  Save Recipe
</button>

@code{
  [Parameter]
  Recipe recipe {get; set;}

  public async Task Recipe_OnSave(){
      var validationErrors = SomeValidatonRules(recipe);
      if(validationErrors.Empty()){
        // !!! Calls server directly
        await server.SaveRecipe(recipe);
      }
      else{
        DisplayErrors(validationErrors);
      }
  }

  public async Task Recipe_OnCancel(){
    // !!! Cancel always returns the recipe list
    navigationManager.NavigateTo(NavPath.RecipeList);
  }
  
}
```

However, this recipe editor makes all kinds of assumptions about the flow it lives in.
- It only returns to the user's recipe list on cancel. It cannot return to any other UI flow
- Save always only calls the one backend method

## Second Pass: Event Handlers 

Let's add some requirements. 

Suppose we want users to edit recipes in their recipe list, or while browsing another user's collection, or while browsing a special recipe collection, and so on. Our previous implementation won't do.

We might also want our recipe editor to save in different ways. For example, a user might use one endpoint to save their own recipes, but suggesting edits to another user's recipe requires an additional UI page before commiting changes. Our previous implementation can't do that.

But, these cases can be supported with a little modification.
The recipe editor can require event handlers instead of directly deciding behaviors on save or cancel.

```cs
//RecipeEditor
<h1>@recipe.Title</h1>
<MarkdownEditor @bind-Value="@recipe.IngredientsMarkdown" />

<button type="submit" class="btn btn-success" onclick="@Recipe_OnSave">
  Save Recipe
</button>

@code{
  [Parameter]
  Recipe recipe {get; set;}

  [Parameter]
  public EventCallback<Recipe> OnSaveAsync { get; set; }
  public EventCallback<Recipe> OnCancelAsync { get; set; }

  public async Task Recipe_OnSave(){
      var validationErrors = SomeValidatonRules(recipe);
      if(validationErrors.Empty()){
        // Caller provides save action
        await OnSaveAsync(recipe)
      }
      else{
        DisplayErrors(validationErrors);
      }
  }

  public async Task Recipe_OnCancel(){
    // Caller provides save action
    await OnCancelAsync(recipe);
  }
  
}
```

Now different consumers can swap in their own behaviors

```cs
// My Recipes flow
<RecipeEditor recipe="recipe" 
  OnSaveAsync="(recipe) => { await server.SaveRecipe(recipe); }"
  OnCancelAsync="Recipe_OnCancel" />

@code {
  public async Task Recipe_OnCancel(Recipe editorRecipe){
      navigationManager.NavigateTo(NavPath.RecipeList);
  }
}
```

```cs
// Shared recipes
<RecipeEditor recipe="recipe" 
  OnSaveAsync="(recipe) => { await server.SuggestRecipeEdit(userId, recipe); }"
  OnCancelAsync="Recipe_OnCancel" />

@code {
  public async Task Recipe_OnCancel(Recipe editorRecipe){
      navigationManager.NavigateTo(NavPath.SharedRecipes(collectionName));
  }
}
```

The recipe editor is closed because it defines recipe the editing UI and validation without changing them for different UI flows. It's also open because each caller can decide what happens after important events like save or cancel. 

This particular modification is simple, but the pattern can be used for all kinds of powerful reusability. 

## Event Handlers and Continuations

The recipe UI component used "event handlers". These are but one of a family of customizable behavior patterns.

Continuations define the behavior to "continue with" once some decision or other process has finished.

For example we might log if a save fails
```cs
data.Save(onError: (err) => logger.Error(err))
```
Continuations are sometimes also referred to as callbacks.

A similar approach is used for collection transforms. 
```cs
list.Select(data => data.Id)
```
[Refactoring](https://martinfowler.com/books/refactoring.html) went so far as to categorize loops as a code smell in favor of collection transforms like these.


## Out-of-Process Callbacks

Passing functions requires the caller and called code to be in the same langauge, and usually running on the same machine. However, this pattern works even across network calls. A callback can also be an endpoint. 

Consider Authentication flows. 

The authentication service generally provides a login endpoint to send the user to. The login form is owned by the 3rd-party auth service. The 3rd party service cannot know what page comes after login for each application. Instead, such login pages usually accept a callback. In this case, the callback is a URL that the auth service should forward to once login has succeeded.

This flow is effectively the same as a function callback. Our application (the caller) provides the next behavior to run after some operation is complete. 

This callback-based login page is open because it can be inserted into any login flow, returning to the consumer's specified webpage. The login is also closed because the login page is not modified to accommodate new flows. It authorizes users the same every time.

## Webhooks
Webhooks are similar to event handlers, but over a network boundary. 

3rd party services commonly track event of interest to their users. Consider a payment service. Applications using that service may control product access separate from payment management, but want to cut access if a user stops paying.

Applications could poll the payment service to get this information, but polling wastes a lot of resources. Instead, services can offer webhooks. Consumers register urls they want the external service to call when a given event happens. 

Webhooks are open because each consumer can register their own event handlers, but closed because the payment service does not change for each application that listens for events.

## Conclusion

The Open-Closed Principle pushes components to offer self-defined flexibility. Such components adapt to different callers without changing internally.

In this post we've seen how flexible behaviors like callbacks can adapt flows to different callers without knowing anything about those callers.