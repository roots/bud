---
description: Customize image minimizer plugins.
---

# bud.imageminPlugins

Customize imagemin plugins.

## Usage

Shown with defaults:

```js
bud.imageminPlugins([
  ['gifsicle', {interlaced: true}],
  ['jpegtran', {progressive: true}],
  ['optipng', {optimizationLevel: 5}],
  [
    'svgo',
    {
      plugins: [{removeViewBox: false}],
    },
  ],
])
```

## Signature

```ts
function (
  plugins: [
    [string, {[key: string]: any}]
  ],
): Bud
```
