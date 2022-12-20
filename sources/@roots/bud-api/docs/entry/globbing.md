---
title: Globbing
---

**bud.entry** can be used with [bud.glob](/docs/bud.glob) to find matching files.

```js title='bud.config.mjs'
export default async bud => {
  bud.entry({
    app: await bud.glob('./src/*.{css,js}'),
  })
}
```
