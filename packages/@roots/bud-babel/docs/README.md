<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/roots/bud-babel">
    <img src="https://img.shields.io/npm/v/roots/bud-babel.svg?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://codeclimate.com/github/roots/bud-support/maintainability">
    <img src="https://img.shields.io/codeclimate/maintainability/roots/bud-support?color=%23525ddc&style=flat-square" />
  </a>
  <img alt="Lerna" src="https://img.shields.io/github/lerna-json/v/roots/bud?color=%23525ddc&style=flat-square">
  <a href="Typescript" src="https://github.com/roots/bud/tree/stable/typings">
    <img src="https://img.shields.io/badge/typings-%40roots%2Fbud--typings-%23525ddc" />
  </a>
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
  </a>
</p>

<h1 align="center">
  <strong>@roots/bud-babel</strong>
</h1>

## Overview

> Adds babel support to [@roots/bud]([[base]]/README.md) projects.

- [Installation](#Installation)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Presets](#presets)
  - [Plugins](#plugins)
  - [Configuration example](#configuration-example)
- [Hooks](#hooks)
  - [Hooks examples](#Examples)

## Installation

```sh
yarn add @roots/bud-babel --dev
```

## Usage

```js
bud.use("@roots/bud-babel");
```

## Configuration

Out of the box [@roots/bud-babel]([[base]]/packages/@roots/bud-babel) comes with:

- `@babel/preset-env`
- `@babel/plugin-transform-runtime`
- `@babel/plugin-proposal-object-rest-spread`
- `@babel/plugin-syntax-dynamic-import`

If this works for you, great! No need to keep reading. But, if you need something more specialized, there is a configuration utility registered by [@roots/bud-babel]([[base]]/packages/@roots/bud-babel) designed to help you out.

### Presets

Add babel preset:

```js
bud.babel.setPreset("@babel/preset-env");
```

Remove babel preset:

```js
bud.babel.unsetPreset("@babel/preset-env");
```

Override any preset options:

```js
bud.babel.setPresetOptions("@babel/preset-env", {
  /** custom config */
});
```

### Plugins

Add a babel plugin:

```js
bud.babel.setPlugin("@babel/plugin-transform-runtime");
```

Remove a babel plugin:

```js
bud.babel.unsetPlugin("@babel/plugin-transform-runtime");
```

Override any plugin options:

```js
bud.babel.setPluginOptions("@babel/plugin-transform-runtime", {
  helpers: false,
});
```

### Configuration example

The implementation used by [@roots/bud-babel]([[base]]/packages/@roots/bud-babel) internally is identical to the one intended for use in bud config files:

```js
app.babel
  .setPreset("@babel/preset-env")
  .setPlugins([
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
  ])
  .setPluginOptions("@babel/plugin-transform-runtime", {
    helpers: false,
  });
```

## Hooks

You can also customize the babel config using hooks registered by [@roots/bud-babel]([[base]]/packages/@roots/bud-babel):

| Hooks                                 | Description                                                                                   |
| ------------------------------------- | --------------------------------------------------------------------------------------------- |
| **loader/babel**                      | Babel loader implementation \[default: `require.resolve('babel-loader')`]                     |
| **item/babel**                        | The full babel RuleSetUse definition                                                          |
| **item/babel/options**                | `babel-loader` options                                                                        |
| **item/babel/options/root**           | The root directory supplied to `babel-loader` \[default: `app.subscribe('location/project')`] |
| **item/babel/options/cacheDirectory** | The cache directory supplied to `babel-loader`                                                |
| **item/babel/options/presets**        | Babel presets                                                                                 |
| **item/babel/options/plugins**        | Babel plugins                                                                                 |

### Examples

Get a list of all registered presets and their configurations:

```js
bud.subscribe("item/babel/options/presets");
```

Override the cache directory:

```js
bud.publish({
  "item/babel/options/cacheDirectory": () => bud.project("tmp"),
});
```

Modify the plugins (in this case filter out the `@emotion` babel plugin):

```js
bud.publish({
  "item/babel/options/plugins": (plugins) =>
    plugins.filter(([plugin, options]) => plugin !== "@emotion"),
});
```

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
