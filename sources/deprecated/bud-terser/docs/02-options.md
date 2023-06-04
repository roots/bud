---
title: Options
---

| Option            | type                                                         | Default                            |
| :---------------- | :----------------------------------------------------------- | :--------------------------------- |
| `minify`          | `TerserWebpackPlugin.MinimizerImplementation<TerserOptions>` | `TerserWebpackPlugin.terserMinify` |
| `include`         | `TerserWebpackPlugin.BasePluginOptions['include']`           | `undefined`                        |
| `exclude`         | `TerserWebpackPlugin.BasePluginOptions['exclude']`           | `undefined`                        |
| `extractComments` | `TerserWebpackPlugin.BasePluginOptions['extractComments']`   | `false`                            |
| `parallel`        | `TerserWebpackPlugin.BasePluginOptions['parallel']`          | `true`                             |
| `terserOptions`   | `TerserWebpackPlugin.TerserOptions`                          | `[object]`                         |

- When [@roots/bud-swc](https://bud.js.org/extensions/bud-swc) is installed the swc minifier function will be used.
- When [@roots/bud-esbuild](https://bud.js.org/extensions/bud-esbuild) is installed the esbuild minifier function will be used.
