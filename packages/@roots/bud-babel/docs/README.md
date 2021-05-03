<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/@roots/bud-babel">
    <img src="https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://codeclimate.com/github/roots/bud-support/maintainability">
    <img src="https://img.shields.io/codeclimate/maintainability/roots/bud-support?color=%23525ddc&style=flat-square" />
  </a>
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

> A friendly build tool to help manage your project assets.

## Overview

> Adds babel support to [**@roots/bud**](https://github.com/roots/bud/tree/stable/packages/@roots/bud) projects.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Presets](#presets)
  - [Plugins](#plugins)
  - [Configuration example](#configuration-example)
- [Hooks](#hooks)
  - [Examples](#examples)

## Installation

```sh
yarn add @roots/bud-babel --dev
```

## Usage

```js
bud.use("@roots/bud-babel");
```

## Configuration

Out of the box [**@roots/bud-babel**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-babel) comes with:

- `@babel/preset-env`
- `@babel/plugin-transform-runtime`
- `@babel/plugin-proposal-object-rest-spread`
- `@babel/plugin-syntax-dynamic-import`

If this works for you, great! No need to keep reading. But, if you need something more specialized, there is a configuration utility registered by [**@roots/bud-babel**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-babel) designed to help you out.

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

The implementation used by [**@roots/bud-babel**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-babel) internally is identical to the one intended for use in bud config files:

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

You can also customize the babel config using hooks registered by [**@roots/bud-babel**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-babel):

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

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore-start -->

<!-- markdownlint-disable -->

<table>
  <tr>
    <td align="center"><a href="https://kellymears.me/"><img src="https://avatars.githubusercontent.com/u/397606?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kelly Mears</b></sub></a><br /><a href="#maintenance-kellymears" title="Maintenance">🚧</a> <a href="https://github.com/roots/bud/commits?author=kellymears" title="Code">💻</a> <a href="https://github.com/roots/bud/commits?author=kellymears" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/clayrisser"><img src="https://avatars.githubusercontent.com/u/6234038?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Clay Risser</b></sub></a><br /><a href="https://github.com/roots/bud/commits?author=clayrisser" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/QWp6t"><img src="https://avatars.githubusercontent.com/u/2104321?v=4?s=100" width="100px;" alt=""/><br /><sub><b>qwp6t</b></sub></a><br /><a href="#maintenance-QWp6t" title="Maintenance">🚧</a> <a href="https://github.com/roots/bud/commits?author=QWp6t" title="Code">💻</a> <a href="https://github.com/roots/bud/commits?author=QWp6t" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/swalkinshaw"><img src="https://avatars.githubusercontent.com/u/295605?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Scott Walkinshaw</b></sub></a><br /><a href="https://github.com/roots/bud/commits?author=swalkinshaw" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->

<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://kinsta.com/?kaid=OFDHAJIXUDIV">
  <img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="200" height="150">
</a>
<a href="https://k-m.com/">
  <img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150">
</a>
<a href="https://carrot.com/">
  <img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150">
</a>
<a href="https://www.c21redwood.com/">
  <img src="https://cdn.roots.io/app/uploads/c21redwood.svg" alt="C21 Redwood Realty" width="200" height="150">
</a>
<a href="https://wordpress.com/">
  <img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="200" height="150">
</a>
<a href="https://icons8.com/">
  <img src="https://cdn.roots.io/app/uploads/icons8.svg" alt="Icons8" width="200" height="150">
</a>
<a href="https://www.harnessup.com/">
  <img src="https://cdn.roots.io/app/uploads/harness-software.svg" alt="Harness Software" width="200" height="150">
</a>
<a href="https://www.codersclan.com/">
  <img src="https://cdn.roots.io/app/uploads/coders-clan.svg" alt="Coders Clan" width="200" height="150">
</a>
<a href="https://generodigital.com/">
  <img src="https://cdn.roots.io/app/uploads/genero.svg" alt="Genero" width="200" height="150">
</a>
<a href="https://motto.ca/roots">
  <img src="https://cdn.roots.io/app/uploads/motto.svg" alt="Motto" width="200" height="150">
</a>

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
