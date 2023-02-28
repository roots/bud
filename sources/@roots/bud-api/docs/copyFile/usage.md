---
title: Usage
---

All paths are relative to `@src`. This can be changed with [the `context` parameter](#changing-context).

## Copying a file

Copy `@src/images/image.jpeg` to `@dist/images/image.jpeg`:

```typescript title=bud.config.js
bud.copyFile(`images/image.jpeg`)
```

## Modifying the output path

Copy `@src/images/image.jpeg` to `@dist/example/image.jpeg`.

```typescript title=bud.config.js
bud.copyFile([`images/image.jpeg`, `example/image.jpeg`])
```

## Hashing copied files

The standard way would be to replace the filename with `@file`:

```typescript title=bud.config.js
bud.copyFile([`images/image.jpeg`, `images/@file`])
```

## Changing context

You can pass a second parameter to specify base directory of the task (the `context`):

Copy `vendor/images/image.jpeg` to `@dist/images/image.jpeg`:

```typescript title=bud.config.js
bud.copyFile(`images/image.jpeg`, `vendor`)
```

Copy `vendor/images/image.jpeg` to `@dist/example/image.jpeg`

```typescript title=bud.config.js
bud.copyFile(
  [`images/image.jpeg`, `example/image.jpeg`],
  `vendor`,
)
```

Copying from `node_modules/@roots/bud/README.md` to `@dist/README.md`:

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
