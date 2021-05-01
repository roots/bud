<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/@roots/bud-imagemin">
    <img src="https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square" />
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
  <strong>@roots/bud-imagemin</strong>
</h1>

## Overview

> Minimize image assets in [**@roots/bud**](https://github.com/roots/bud) projects.

## Installation

```sh
yarn add @roots/bud-imagemin --dev
```

## Usage

```js
bud.use(["@roots/bud-imagemin"]);
```

Out of the box [@roots/bud-imagemin]([[base]]/packages/@roots/bud-imagemin) applies the following configuration:

| Plugin   | Options                               |
| -------- | ------------------------------------- |
| gifsicle | `{interlaced: true}`                  |
| jpegtran | `{progressive: true}`                 |
| optipng  | `{optimizationLevel: 5}`              |
| svgo     | `{plugins: [{removeViewBox: false}]}` |

## Configuration

Customize imagemin plugins with `bud.imagemin`.

```js
bud.imagemin([
  ["gifsicle", { interlaced: true }],
  ["jpegtran", { progressive: true }],
  ["optipng", { optimizationLevel: 5 }],
  ["svgo", { plugins: [{ removeViewBox: false }] }],
]);
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
