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

You don't need to import assets which are utilized in your bundled code. For instance, if you are referencing a font file from your stylesheet, the font will already be included in `dist`. `assets` is specifically for compiling files which are not already included elsewhere.
