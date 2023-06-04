---
title: Options
---

## bud.minify.js

| Option            | type                                                | Default     |
| :---------------- | :-------------------------------------------------- | :---------- |
| `minify`          | `TerserPlugin.MinimizerImplementation`              | `terser`    |
| `include`         | `TerserPlugin.BasePluginOptions['include']`         | `undefined` |
| `exclude`         | `TerserPlugin.BasePluginOptions['exclude']`         | `undefined` |
| `extractComments` | `TerserPlugin.BasePluginOptions['extractComments']` | `false`     |
| `parallel`        | `TerserPlugin.BasePluginOptions['parallel']`        | `true`      |
| `terserOptions`   | `TerserPlugin.TerserOptions`                        | `[object]`  |

- When [@roots/bud-swc](https://bud.js.org/extensions/bud-swc) is installed the swc minifier function will be used.
- When [@roots/bud-esbuild](https://bud.js.org/extensions/bud-esbuild) is installed the esbuild minifier function will be used.

## bud.minify.css

| Option             | type                                                       | Default        |
| :----------------- | :--------------------------------------------------------- | :------------- |
| `minify`           | `CSSMinimizerPlugin.MinimizerImplementation`               | `lightningcss` |
| `test`             | `CSSMinimizerPlugin.BasePluginOptions['test']`             | `undefined`    |
| `include`          | `CSSMinimizerPlugin.BasePluginOptions['include']`          | `undefined`    |
| `exclude`          | `CSSMinimizerPlugin.BasePluginOptions['exclude']`          | `undefined`    |
| `parallel`         | `CSSMinimizerPlugin.BasePluginOptions['parallel']`         | `true`         |
| `minimizerOptions` | `CSSMinimizerPlugin.BasePluginOptions['minimizerOptions']` | `[object]`     |

- When [@roots/bud-swc](https://bud.js.org/extensions/bud-swc) is installed swc is used to minify css.
- When [@roots/bud-esbuild](https://bud.js.org/extensions/bud-esbuild) is installed esbuild is used to minify css.
