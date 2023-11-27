---
title: Usage
---

All paths are `@src` relative.

### Copying a directory

Copy the entire `@src/images` directory:

```ts title=bud.config.ts
bud.assets('images')
```

### Copying a file

Copy a single file:

```ts title=bud.config.ts
bud.assets('images/image.png')
```

### Copying from multiple sources

You may add array items to specify additional tasks.

```ts title=bud.config.ts
bud.assets([`images`, `fonts`])
```

Or, call **bud.assets** more than once:

```ts title=bud.config.ts
bud
  .assets(`images`)
  .assets(`fonts`)
```

### Copying using an object

For more granular control, you may specify [`CopyPlugin.ObjectPattern`](https://github.com/webpack-contrib/copy-webpack-plugin#patterns) object(s) directly.

As an example, to copy all the images from `vendor/images` and preserve the directory structure:

```ts title=bud.config.ts
bud.assets({
  from: `vendor/images/**/*`,
  context: bud.path(),
})
```

## Additional information

You don't need to import assets which are utilized by your bundled code. For instance, if you are referencing a font file from your stylesheet, the font will already be included in your distribution. You don't need to manually require it with **bud.assets**, although there is probably no real harm in doing so.

**bud.assets** is specifically for compiling files which are not already included elsewhere.
