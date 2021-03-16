<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/@roots/bud-postcss">
    <img src="https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square" />
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
  <strong>@roots/bud-postcss</strong>
</h1>

## Overview

> Adds postcss support to [@roots/bud](https://github.com/roots/bud/tree/stable/README.md) projects.

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
yarn add @roots/bud-postcss --dev
```

## Usage

```js
bud.use("@roots/bud-postcss");
```

## Configuration

Out of the box [@roots/bud-postcss](https://github.com/roots/bud/tree/stable/packages/@roots/bud-postcss) comes with:

- `postcss-import`
- `postcss-nested`
- `postcss-custom-properties`

If this works for you, great! No need to keep reading. But, if you need something more specialized, there is a configuration utility registered by [@roots/bud-postcss](https://github.com/roots/bud/tree/stable/packages/@roots/bud-postcss) designed to help you out.

### Plugins

Add a postcss plugin:

```js
bud.postcss.setPlugin("postcss-import");
```

Remove a postcss plugin:

```js
bud.postcss.unsetPlugin("postcss-import");
```

Override any plugin options:

```js
bud.postcss.setPluginOptions("postcss-import", {
  path: bud.subscribe("build/resolve/modules"),
});
```

### Configuration example

The implementation used by [@roots/bud-postcss](https://github.com/roots/bud/tree/stable/packages/@roots/bud-postcss) internally is identical to the one intended for use in bud config files:

```js
bud.postcss
  .setPlugin("postcss-nested")
  .setPlugin("postcss-custom-properties")
  .setPlugin([
    "postcss-import",
    { path: bud.subscribe("build/resolve/modules") },
  ])
  .enable(["postcss-import", "postcss-nested", "postcss-custom-properties"]);
```

## Hooks

You can also customize the postcss config using hooks registered by [@roots/bud-postcss](https://github.com/roots/bud/tree/stable/packages/@roots/bud-postcss):

| Hooks                      | Description                                                                                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **loader/postcss**         | postcss loader implementation [default: `require.resolve('postcss-loader')`]                                                                                                                                                       |
| **item/postcss/options**   | `postcss-loader` options                                                                                                                                                                                                           |
| **item/postcss/sourceMap** | Should sourcemaps be enabled [default: `true`, mandatory for `url-resolve`]                                                                                                                                                        |
| **item/postcss/config**    | Should a configuration file take precdedence over `postcss`/`@roots/bud-postcss` config? [default: `true` if `postcss.config.js`/`.postcssrc` file is present in project directory, or a `postcss` field is set in `package.json`] |
| **item/postcss/plugins**   | postcss plugins                                                                                                                                                                                                                    |

### Examples

Get a list of all registered plugins and their configurations:

```js
bud.subscribe("item/postcss/plugins");
```

Override the sourcemap option:

```js
bud.publish({
  "item/postcss/sourceMap": () => false,
});
```

Modify the plugins (in this case filter out `postcss-import`):

```js
bud.publish({
  "item/postcss/plugins": (plugins) =>
    plugins.filter(([plugin, options]) => plugin !== "postcss-import"),
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
