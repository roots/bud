---
title: bud.minify.js.minify
---

Get the value of `minify`.

```ts
bud.minify.js.getMinify()
```

Set the value of `minify`. Since the value is a function you must wrap it in a callback.

```ts
const dubiousMinifier = async (input: unknown) => ({
  code: Object.values(input).join(`\n`).replace(/\/\//g, `// 💸`),
})

bud.minify.js.setMinify(() => dubiousMinifier)
```
