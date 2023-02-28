---
title: Usage
---

Copy `@src/images/image.jpeg` to `@dist/images/image.jpeg`:

```typescript title=bud.config.js
bud.copyFile(`images/image.jpeg`)
```

Copy `./images/image.jpeg` to `@dist/new-directory/image.jpeg`.

```typescript title=bud.config.js
bud.copyFile([
 `images/image.jpeg`,
 `new-directory/image.jpeg`,
])
```

## Hashing copied files

You can use a few helpful strings to apply a hash to your copied files (when hashing is enabled):

The standard way would be to replace the filename with `@file`:

```typescript title=bud.config.js
bud.copyFile([
 `images/image.jpeg`,
 `images/@file`,
])
```

## Changing context

Without specifying anything all paths are relative to `@src`.

You can pass a second parameter to change the context.

Copy `vendor/images/image.jpeg` to `@dist/images/image.jpeg`:

```typescript title=bud.config.js
bud.copyFile(`images/image.jpeg`, `vendor`)
```

Example when renaming paths:

```typescript title=bud.config.js
bud.copyFile(
  [`images/image.jpeg`, `new-directory/image.jpeg`],
  `vendor`,
)
```

Copying from `node_modules`:

```typescript title=bud.config.js
bud.copyFile(
  `README.md`
  await bud.module.getDirectory(`@roots/bud`)
)
```

## Changing options

Any of the underlying options can be dialed in with an optional third parameter.

Copy from `@src/fonts` to `@dist/vendor/fonts` and include dotfiles:

```typescript title=bud.config.js
bud.copyFile(`fonts/killa.otf`, `@src`, {
  globOptions: {dot: true},
})
```
