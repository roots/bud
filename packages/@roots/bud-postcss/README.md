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

> Adds postcss support to [**@roots/bud**](https://github.com/roots/bud) projects

- [Overview](#overview)
- [toc](#toc-1)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API](#api)
  - [postcss.setPlugin](#postcsssetplugin)
  - [postcss.unsetPlugin](#postcssunsetplugin)
  - [postcss.setPluginOptions](#postcsssetpluginoptions)
- [Contributing](#contributing)
- [Bud sponsors](#bud-sponsors)
- [Community](#community)

## Overview

> Adds postcss support to [**@roots/bud**](https://github.com/roots/bud/tree/stable/packages/@roots/bud) projects.

## toc

## Installation

Install [**@roots/bud-postcss**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-postcss) as a project dependency

```sh
yarn add @roots/bud-postcss --dev
```

After installation, run the `bud init` command to install required peer dependencies:

```sh
yarn bud init
```

## Usage

Add the extension to your config:

```js
bud.use(require("@roots/bud-postcss"));
```

## Configuration

Out of the box [**@roots/bud-postcss**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-postcss) supports:

- `postcss-import`
- `postcss-preset-env`

If you have a postcss config file set in your project, that configuration will be used instead of the defaults provided by this extension.

Valid config locations:

- `postcss.config.js` file

The implementation used by [**@roots/bud-postcss**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-postcss) internally is the same one intended for use in the project config:

```js
bud.postcss
  .setPlugin("postcss-import")
  .setPlugin("postcss-preset-env")
  .setPluginOptions("postcss-preset-env", { stage: 1 });
```

## API

A configuration API is registered by [**@roots/bud-postcss**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-postcss) for your convenience.

### postcss.setPlugin

Add a postcss plugin:

```js
bud.postcss.set("postcss-import");
```

### postcss.unsetPlugin

Remove a postcss plugin:

```js
bud.postcss.removePlugin("postcss-import");
```

### postcss.setPluginOptions

Override any plugin options:

```js
bud.postcss.setPluginOptions("postcss-import", {
  path: bud.subscribe("build/resolve/modules"),
});
```

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

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
