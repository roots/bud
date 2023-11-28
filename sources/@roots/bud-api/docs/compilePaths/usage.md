---
title: Usage
---

The most basic, broad and intensive application of this function is passing the project's base directory.
This will treat _every module_ as a source module.

```ts title=bud.config.ts
export default async bud => {
  bud.compilePaths(bud.path())
}
```

It pays to be more restrictive here. So while you could do the above it would be better to narrow it down:

```ts title=bud.config.ts
export default async bud => {
  bud.compilePaths([bud.path(`@src`), bud.path(`@modules`)])
}
```

Even better to only target the modules which actually need it:

```ts title=bud.config.ts
export default async bud => {
  bud.compilePaths([bud.path(`@src`), bud.path(`@modules/swiper`)])
}
```

The best possible thing would be to only treat the directories as sources _for specific filetypes_. This is supported with a second parameter:

```ts title=bud.config.ts
export default async bud => {
  bud.compilePaths(
    /**
     * For these directories...
     */
    [bud.path(`@src`), bud.path(`@modules/swiper`)],
    /**
     * ...treat these filetypes as untranspiled
     */
    [`js`, `css`],
  )
}
```
