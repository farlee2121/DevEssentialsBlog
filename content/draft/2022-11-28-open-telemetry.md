---
date: 2022-11-28
tags: [observability, logging]
title: Clear Observability Terms
---

I never realized how sloppy my observability terminology was until I read the OpenTelemetry documentation.
<!--more-->

The docs offer concise and clear definitions, so I won't duplicate them here.
Check out the [observability primer](https://opentelemetry.io/docs/concepts/observability-primer/) and the [metric](https://opentelemetry.io/docs/concepts/signals/metrics/) docs. They take only a few minutes to read and set a useful baseline for understanding observability.

I'd particularly like to highlight spans. Spans define units of work that group together a series of smaller operations and logs. Nested spans add up to a trace, which allows us to observe the lifetime of a request across process boundaries. It's like having a stack track that works across service boundaries. Traces and spans greatly improve context of logs and improve diagnostics.