---
layout: post
tags: [Architecture, Patterns, Configuration, Design thinking, Volatility Analysis]
---

# Rediscovering Options - Design Matrix

I got to thinking about the [Rediscovering Options]({%post_url 2020-07-24-Rediscovering-Options %}) post. The volatility analysis is an important artifact of my design process. The current version requires reading the whole list to comprehend the results. How could I make it better?

The design process generally not very clean or binary. Many avenues are explored and abandoned. However, the cleaned-up anlysis in the post is tantilizingly reminicient of a product pricing plan table. A bit of spatial organization and some colored icons should allow quick intuitive interpretation of results and better recall. 

Here's my pedagogical periodical prototype.

For review, the design options are
- Direct: Easy. Simply reference the key from desired component. 
- Static: Easy. Add a constant for the new value, and add a call in the relevant component.
- Accessor: Easy-ish: Add a method to the relevant type. Potentially create a new config accessor and add it to the composition root
- Options: Easy: Add a property to the relevant type. Potentially create a new config data type and inject it to the composition root 

TODO: separate icon for possible/impossible than for good/bad/ok, maybe add another layer for hard-stop/very bad
<style>
td{ text-align:center;}
.good:before {
    color: green;
    content: "\2713\0020";
}
.ok:before{
    color: yellow;
    content: "~ "
}
.bad:before{
    color: red;
    content: "X ";
}
</style>
<table>
    <tr>
        <th width="200px"></th>
        <th>Direct<th>
        <th>Static<th>
        <th>Accessor<th>
        <th>Options<th>
    </tr>
    <tr>
        <td><strong>Add a configuration value</strong></td>
        <td><span class="good"><span>Easy. Simply reference the key from desired component<td>
        <td><span class="good"><span>Easy. Add a constant for the new value, and add a call in the relevant component.<td>
        <td><span class="ok"><span>Easy-ish. Add a method to the relevant type. Potentially create a new config accessor and add it to the composition root<td>
        <td><span class="good"><span>Easy. Add a property to the relevant type. Potentially create a new config data type and inject it to the composition root <td>
    </tr>
    <tr>
        <td><strong>Remove a configuration value</strong></td>
        <td><span class="bad"><span>Unsafe. Configuration can be referenced from anywhere and so all code is susceptible to change. You must search and test the whole system to ensure the value is no longer used. Any remaining references will throw a runtime error<td>
        <td><span class="ok"><span>Unsafe, but easier. Configuration can be referenced from anywhere. You must check and test the every system that uses the configuration helper throughly because all code is susceptible to change. The search is aided by tooling. Remaining references will cause a compiler error because we're using named constants as value keys.<td>
        <td><span class="good"><span>Easy, safe. Any missed usage of deleted method will be caught at compile time. Since the accessor is created for a certain component, only that component needs to be retested.<td>
        <td><span class="good"><span>Easy, safe. Any missed usage of deleted method will be caught at compile time. Since the type is created for a certain component, only that component needs to be retested.<td>
    </tr>
    <tr>
        <td><strong>Change config storage (i.e. database, json, xml)</strong></td>
        <td><span class="bad"><span>must change every module that uses configuration<td>
        <td><span class="ok"><span>Only need to change the static configuration helper, but every caller is potentially exposed to changed behavior or errors.<td>
        <td><span class="good"><span>The source can be changed per configuration value independently. Only the changed values need to be tested and redeployed. <td>
        <td><span class="good"><span>The source can be changed per configuration value independently. Only the changed values need to be tested and redeployed. It is likely that you will fetch all configuration values for a given type from the same sources though. Still only affects the one component<td>
    </tr>
    <tr>
        <td><strong>Pull from multiple config sources. (different values from different stores)</strong></td>
        <td><span class="bad"><span>possible, have must change every component that wants a different store<td>
        <td><span class="ok"><span>possible but awkward. Requires internal lookup of config keys to expected store<td>
        <td><span class="good"><span>easily defined per value<td>
        <td><span class="good"><span>easily defined per type and not very hard per value<td>
    </tr>
    <tr>
        <td><strong>Pull from multiple config sources (same value coming from a prioritized list of sources)</strong></td>
        <td><span class="bad"><span>Explosive code duplication<td>
        <td><span class="ok"><span>Possible and centralized. Errors can leak to every caller and only show when the code path is executed.<td>
        <td><span class="ok"><span>Possible, but not well centralized. Must change every accessor that needs multiple sources (or add another abstraction layer)<td>
        <td><span class="good"><span>Possible and centralized. Any errors happen at bind time. Most likely on application start with the creation of the composition root.<td>
    </tr>
    <tr>
        <td><strong>Run parallel tests with different configuration values</strong></td>
        <td><span class="bad"><span>Depends on framework. Probably not possible or at least non-trivial<td>
        <td><span class="bad"><span>not possible<td>
        <td><span class="good"><span>possible, requires mocking<td>
        <td><span class="good"><span>Possible, does not require mocking<td>
    </tr>
    <tr>
        <td><strong>Use same component with different configuration in different parts of the system (i.e. Connect to two databases to transfer data. Access a different data store with same schema for different use cases)</strong></td>
        <td><span class="bad"><span>Not possible<td>
        <td><span class="bad"><span>Not possible<td>
        <td><span class="ok"><span>possible but not elegant<td>
        <td><span class="good"><span>possible and easy<td>
    </tr>
    <tr>
        <td><strong>Enable configuration values per culture/language</strong></td>
        <td><span class="bad"><span>Depends on framework, probably not possible. At least requires explosive code changes<td>
        <td><span class="bad"><span>Possible, probably need to change every caller<td>
        <td><span class="good"><span>Possible and easy (can always inject the culture). At most need to change every config accessor<td>
        <td><span class="good"><span>Possible and easy. Probably only need to change composition root.<td>
    </tr>
    <tr>
        <td><strong>White label platform, load config per whitelabel customer allowing shared infrastructure with different behavior and potentionally different storage/resources</strong></td>
        <td><span class="bad"><span>"<td>
        <td><span class="bad"><span>Cannot reliably manage more than one customer per deployment since static values are shared between threads and instances. Causes significant concurrency issues.<td>
        <td><span class="good"><span>"<td>
        <td><span class="good"><span>"<td>
    </tr>
    <tr>
        <td><strong>Re-use component directly from a new client (i.e. console app as a quick utility)</strong></td>
        <td><span class="bad"><span>configuration needed by component is completely opaque. Have to look at code or run it and see errors to know what values are needed. The new client must reference the same configuration framework and have the same configuration resources (i.e. files)<td>
        <td><span class="bad"><span>same as direct, must also drag the static config utility into the new client. Helper likely exposes all of the possible configuration values from the rest of the system whether relevant or not.<td>
        <td><span class="bad"><span>Either implement a new accessor or setup the same resources as the old use case.<td>
        <td><span class="good"><span>trivial to manually bind configuration or use a different binding framework.<td>
    </tr>
    <tr>
        <td><strong>Move component to a new system</strong></td>
        <td><span class="bad"><span>"<td>
        <td><span class="bad"><span>"<td>
        <td><span class="bad"><span>"<td>
        <td><span class="good"><span>"<td>
    </tr>
    <tr>
        <td><strong>Release as library</strong></td>
        <td><span class="bad"><span>Completely untenable<td>
        <td><span class="bad"><span>Completely untenable<td>
        <td><span class="bad"><span>Awkward<td>
        <td><span class="good"><span>The expected pattern<td>
    </tr>
</table>