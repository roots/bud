---
title: Minimizers
---

### Modifying minimizers

Use [bud.imagemin.configure](https://bud.js.org/extensions/bud-imagemin/configure) to customize minimizer options.

### Adding minimizers

You can add support for other minimizers beyond the included default using **bud.imagemin.setMinimizer**.

```typescript title="bud.config.mjs"
import MinimizerFunction from 'minimizer-lib'

export default async bud => {
  bud.imagemin.setMinimizer(`minimizer-lib`, {
    minimizer: {
      implementation: MinimizerFunction,
      options: {
        encodeOptions: bud.imagemin.encoders,
      },
    },
  })
}
```

### Operating on minimizers directly

You may access the minimizer map directly using **bud.imagemin.minimizers**.

```typescript title="bud.config.mjs"
export default async bud => {
  bud.imagemin.minimizers.clear()
}
```
