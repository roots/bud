---
title: Example usage
---

Here's an example of how you can use the `bud.stylelint` API in your Bud configuration:

```ts
import {type Bud} from '@roots/bud'

export default async (bud: Bud) => {
  bud.entry('app', ['app.js', 'app.css'])

  bud.stylelint
    .extends([`@roots/bud-stylelint/config`])
    .setRules({'no-descending-specificity': null})
    .setFailOnError(bud.isProduction)
    .setFailOnWarning(false)
    .setFix(true)
}
```

In this example, we are extending the default `@roots/bud-stylelint/config`, setting a custom rule `no-descending-specificity`, and adjusting the behavior for errors and warnings based on the environment. We also set `setFix(true)` to instruct Stylelint to attempt to fix any issues it detects.
