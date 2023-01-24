---
title: Handling blade `@asset` directives
---

You can include blade template files in entrypoints as if they were normal javascript modules.

```js
export default async bud => {
  bud.entry({
    app: ['@scripts/app', '@styles/app'],
    editor: ['@scripts/editor', '@styles/editor'],
    index: ['@views/index'],
  })
}
```

When a blade template file is included in an entrypoint any assets referenced with the `@asset` directive will be included in the compilation without needing a separate copy step.

If you wanted to include _all_ blade templates, you could do with `bud.glob`.

```js
export default async bud => {
  bud.entry({
    app: [
      '@scripts/app',
      '@styles/app',
      ...(await bud.glob(`@views/**/*.blade.php`)),
    ],
    editor: ['@scripts/editor', '@styles/editor'],
  })
}
```
