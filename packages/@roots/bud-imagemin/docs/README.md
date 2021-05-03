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

> Adds imagemin support to Bud

## Overview

> Minimize image assets in [**@roots/bud**](https://github.com/roots/bud) projects.

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)

## Installation

```sh
yarn add @roots/bud-imagemin --dev
```

## Usage

```js
bud.use(["@roots/bud-imagemin"]);
```

Out of the box [**@roots/bud-imagemin**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-imagemin) applies the following configuration:

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
