---
description: Set terser options.
---

# bud.terser

Bud uses `terser` to minify js assets. This function lets you configure terser options. For more information [see the Webpack documentation for configuring Terser](https://webpack.js.org/plugins/terser-webpack-plugin/).

## Usage

Defaults shown:

```js
bud.terser({
  terserOptions: {
    parse: {
      ecma: 2018,
    },
    compress: {
      ecma: 5,
      comparisons: false,
      inline: 2,
    },
    mangle: {
      safari10: true,
    },
    output: {
      ecma: 5,
      comments: false,
      ascii_only: true,
    },
  },
  extractComments: false,
  parallel: true,
})
```
