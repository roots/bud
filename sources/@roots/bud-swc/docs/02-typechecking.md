---
title: Typechecking
---

`@roots/bud-swc` does not currently support typechecking during compilation.

Our recommendation is to run typechecking as a separate process. You can use the `bud typecheck` command or even use `tsc` directly: `tsc --noEmit`.

You could also add the `fork-ts-webpack-plugin` in your bud configuration. This approach conflicts with bud.config files authored in typescript.

Subscribe to [swc-project/swc#571](https://github.com/swc-project/swc/issues/571) for more information on where swc-project is at with its typecheck implementation.
