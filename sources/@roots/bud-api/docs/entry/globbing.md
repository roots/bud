---
title: Globbing
---

**bud.entry** can be used with [bud.glob](/reference/bud.glob) to find matching files.

```ts title=bud.config.ts
export default async bud => {
  bud.entry({
    app: await bud.glob('./src/*.{css,js}'),
  })
}
```
