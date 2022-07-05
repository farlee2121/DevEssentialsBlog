---
date: "2020-11-16T00:00:00Z"
draft: true
tags:
- Sql
- SqlServer
- JSON
- how-to
---

# Getting Started with JSON in MS SQL Server

Document vs Sql databases are no longer an either-or. Many tools allow mixed-model to bridge the benefits of both paradigms. Postgre seems to be the RDBMS of choice for those who want to use json columns as a bridge for document-like scenarios. However, I'm using Sql Server and migrating isn't an option in the medium-term. This post outlines some practical examples to get started.

I'm not much of one for technology how-to posts, but I had a hard enough time I felt this topic deserved it.

## Available Methods

First, a quick review of the available methods. The first four are pretty straight forward and focus on manipulating the JSON string.
**IsJson**: Test if given string or column contains valid JSON. Returns 0 or 1. [Docs](https://docs.microsoft.com/en-us/sql/t-sql/functions/isjson-transact-sql)
```sql
select * from [Table] where IsJson([Column])
``` 

**Json_Value**: Extract a simple value (e.g. strings, numbers, bools) from a JSON string. The [docs](https://docs.microsoft.com/en-us/sql/t-sql/functions/json-value-transact-sql) give decent examples

```sql
select JSON_VALUE([column], "$.firstlevel.some_array.[0].propety") from [Table]
```

**Json_Query**: Extract an object or array from a JSON string. It somewhat confusingly returns a JSON sub-string, since SQL has no objects or arrays. I find the name misleading, and it appears to be separate form Json_Value to help Json_Modify differentiate update cases.

**Json_Modify**: Uses the same path syntax as Json_Value to update the JSON string. Works for setting any kind of json type, but complex values (arrays and objects) will be treated as a string unless you wrap them in Json_Query.

> Note that that JSON doesn't have a special column type in SQL Server like it does in other Sql engines. Use the same column type you would if it was just a string.



These methods layout operations internal to the JSON string, but allow very limited interop between the SQL and JSON worlds. That's where the last method comes in. Pretty much all complex management is done with

**OpenJson**: Access a json field as if it were a table. [Docs](https://docs.microsoft.com/en-us/sql/t-sql/functions/openjson-transact-sql)

The documentation is pretty sparse about how different values are transformed into tables or how to make meaningful queries on json in a table column. So, that's what we cover next.

## How JSON values map to Tables
Here are how different values map to a table

Object-valued columns



- json arrays opened as [key, value, ?] // need to revisit this to double check
- objects opened as row with properties
- scalar value

<!-- probably show it with a table variable and a few inserted, or otherwise show the table contents and the query reqsult  -->

## Query Examples
The key bit to remember when using OpenJson is that is produces a table, and only fits in your queries where a table would fit. Specifically, not in the select portion of your query. Expect to use a lot of nexted queries. 



<!-- need a better understanding of https://docs.microsoft.com/en-us/sql/t-sql/functions/openjson-transact-sql?view=sql-server-ver15#return-value -->

Here are some useful examples
- self note, look at FOR JSON as way of converting data back to json

- rows where the json column has a particular value
- reduce a json array to distinct values
- select the first n of a sub-array
- map properties to new names