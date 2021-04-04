---
description: Process static assets like images, videos, and fonts.
---

# bud.assets

`bud.assets` allows you to include static assets in your build.

You can specify a path to a specific file or use glob syntax to match many files at once.

## Usage

Move all files from `src/images`:

```js
bud.assets(['images/**/*'])
```

## Signature

```ts
function (
  from: [string],
): Bud
```

## Returns

The Bud instance.
