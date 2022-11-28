---
title: Example
---

```typescript title="bud.config.mjs"
export default async bud => {
  bud.critical.src(`http://example.test`).enable(bud.isProduction)
}
```
