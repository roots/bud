---
description: Expose and manipulate exposed values during config and compilation.
---

# Hooks

Bud provides a system of 'hooks' to expose values for modification.

## bud.hooks.on

Hooks are defined as functions. Hook functions are registered with `bud.hooks.on`

`bud.hooks.on` takes two parameters:

- The `name` of the `filter` being hooked.
- The `function` to filter with.

### Usage examples

Add a new entry to the `webpack.externals` configuration:

```js
bud.hooks.on('webpack.externals', externals => ({
  ...externals,
  $: 'jquery',
})
```

Change the `webpack.output.filename` format:

```js
bud.hooks.on('webpack.output.filename', () => '[name].[hash:4]')
```

Replace the regular expression used for CSS modules:

```js
bud.hooks.on(
  'webpack.module.rules.oneOf.css.test',
  () => /\.css$/,
)
```

## bud.hooks.filter: register a new hookable value

Filter functions are the other side of the coin. They are registered with `bud.hooks.filter`

`bud.hooks.filter` takes two parameters:

- The `name` of the `filter` to hook onto.
- The `value` which is being filtered

### Usage

A `value` is passed through the `my.filter.key` filter.

```js
const filteredValue = bud.hooks.filter('my.filter.key', value)
```

Now, the user and other extensions have access to this value and can modify it.

```js
bud.hooks.on('my.filter.key', value => value.shift())
```

## Available hooks

| Name                                          |
| --------------------------------------------- |
| `webpack.bail`                                |
| `webpack.cache`                               |
| `webpack.context`                             |
| `webpack.devtool`                             |
| `webpack.entry`                               |
| `webpack.externals`                           |
| `webpack.infrastructureLogging`               |
| `webpack.mode`                                |
| `webpack.module`                              |
| `webpack.module.rules`                        |
| `webpack.module.rules.oneOf`                  |
| `webpack.module.rules.oneOf.{fileType}`       |
| `webpack.name`                                |
| `webpack.node`                                |
| `webpack.optimization`                        |
| `webpack.optimization.minimize`               |
| `webpack.optimization.noEmitOnErrors`         |
| `webpack.optimization.namedModules`           |
| `webpack.optimization.removeAvailableModules` |
| `webpack.optimization.runtimeChunk`           |
| `webpack.optimization.splitChunks`            |
| `webpack.output`                              |
| `webpack.output.filename`                     |
| `webpack.output.path`                         |
| `webpack.output.publicPath`                   |
| `webpack.stats`                               |
| `webpack.target`                              |
| `webpack.parallelism`                         |
| `webpack.performance`                         |
| `webpack.plugins`                             |
| `webpack.plugins.{pluginName}`                |
| `webpack.profile`                             |
| `webpack.recordsPath`                         |
| `webpack.resolve`                             |
| `webpack.resolve.alias`                       |
| `webpack.resolve.extensions`                  |
| `webpack.resolve.modules`                     |
| `webpack.stats`                               |
| `webpack.target`                              |
| `webpack.watch`                               |

## TypeScript

You can specify the expected return type using a TS generic:

```ts
bud.hooks.on<string>('my.filter.key', value => `${value}!`)
```
