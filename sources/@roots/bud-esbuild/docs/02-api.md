---
title: API
---

### bud.esbuild.use

If you have one or more compilers installed alongside the esbuild extension you will want to call **bud.esbuild.use** in your config to ensure
esbuild is used to compile your code.

```ts title=bud.config.ts
export default async (bud) => {
  bud.esbuild.use()
  // ...config
}
```
