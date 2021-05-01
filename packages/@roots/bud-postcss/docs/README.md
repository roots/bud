<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/roots/bud-postcss">
    <img src="https://img.shields.io/npm/v/roots/bud-postcss.svg?color=%23525ddc&style=flat-square" />
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

> Adds postcss support to [@roots/bud]([[base]]/README.md) projects.

- [Installation](#Installation)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Presets](#presets)
  - [Plugins](#plugins)
  - [Configuration example](#configuration-example)
- [Hooks](#hooks)
  - [Hooks examples](#Examples)

## Installation

Due to changes in PostCss 8 regarding peer dependencies, you should explicitly install `postcss` alongside [@roots/bud-postcss]([[base]]/packages/@roots/bud-postcss)

```sh
yarn add @roots/bud-postcss postcss --dev
```

## Usage

```js
bud.use("@roots/bud-postcss");
```

## Configuration

Out of the box [@roots/bud-postcss]([[base]]/packages/@roots/bud-postcss) comes with:

- `postcss-import`
- `postcss-nested`
- `postcss-custom-properties`

If you have a postcss config file set in your project, that configuration will be used instead of the defaults provided by this extension.

Valid config locations:

- `postcss.config.js` file
- `.postcssrc` file
- `postcss` field in your project's `package.json`

## API

A configuration API is registered by [@roots/bud-postcss]([[base]]/packages/@roots/bud-postcss) for your convenience.

All methods return `bud.postcss` for further chaining.

### postcss.set

Add a postcss plugin:

```js
bud.postcss.set("postcss-import");
```

### postcss.unset

Remove a postcss plugin:

```js
bud.postcss.unset("postcss-import");
```

### postcss.setOptions

Override any plugin options:

```js
bud.postcss.setOptions("postcss-import", {
  path: bud.subscribe("build/resolve/modules"),
});
```

### postcss.setOrder

Specify an explicit order in which to load plugins:

```js
bud.postcss.setOrder(["postcss-import", "postcss-nested"]);
```

Note that when using `postcss.set`, each plugin is implicitly added to the end of the order.

### Configuration example

The implementation used by [@roots/bud-postcss]([[base]]/packages/@roots/bud-postcss) internally is the same one intended for use in the project config:

```js
bud.postcss
  .set("postcss-nested")
  .set("postcss-custom-properties")
  .set(["postcss-import", { path: bud.subscribe("build/resolve/modules") }])
  .setOrder(["postcss-import", "postcss-nested", "postcss-custom-properties"]);
```

## Hooks

You may also customize the postcss config using hooks registered by [@roots/bud-postcss]([[base]]/packages/@roots/bud-postcss):

| Hooks                      | Description                                                                                                                                                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **loader/postcss**         | postcss loader implementation \[default: `require.resolve('postcss-loader')`]                                                                                                                                                       |
| **item/postcss/options**   | `postcss-loader` options                                                                                                                                                                                                            |
| **item/postcss/sourceMap** | Should sourcemaps be enabled \[default: `true`, mandatory for `url-resolve`]                                                                                                                                                        |
| **item/postcss/config**    | Should a configuration file take precdedence over `postcss`/`@roots/bud-postcss` config? \[default: `true` if `postcss.config.js`/`.postcssrc` file is present in project directory, or a `postcss` field is set in `package.json`] |
| **item/postcss/plugins**   | postcss plugins                                                                                                                                                                                                                     |

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
