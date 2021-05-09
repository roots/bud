<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/@roots/merged-manifest-webpack-plugin">
    <img src="https://img.shields.io/npm/v/@roots/merged-manifest-webpack-plugin.svg?color=%23525ddc&style=flat-square" />
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
  <strong>@roots/merged-manifest-webpack-plugin</strong>
</h1>

> undefined

- [Overview](#overview)
- [Really, three plugins?](#really-three-plugins)
- [Requirements](#requirements)
- [Usage](#usage)
- [Options](#options)
- [Contributing](#contributing)
- [Bud sponsors](#bud-sponsors)
- [Community](#community)

## Overview

When utilizing both [**@roots/entrypoints-webpack-plugin**](https://github.com/roots/bud/tree/stable/packages/@roots/entrypoints-webpack-plugin) and [**@roots/wordpress-externals-webpack-plugin**](https://github.com/roots/bud/tree/stable/packages/@roots/wordpress-externals-webpack-plugin) redundant manifests are generated.

This plugin merges the dependencies arrays from `wordpress.json` into the `entrypoints.json` manifest. It then deletes `wordpress.json`.

This plugin can be used separately from the Bud framework.

## Really, three plugins?

Yes, because:

1.  `entrypoints.json` has utility outside of WordPress ecosystem.
2.  `wordpress.json` has utility even if you don't use `entrypoints.json`
3.  If using both plugins then you end up with three manifest artifacts, `entrypoints.json`, `manifest.json` and `wordpress.json`. This is unnecessary.

## Requirements

- [**@roots/entrypoints-webpack-plugin**](https://github.com/roots/bud/tree/stable/packages/@roots/entrypoints-webpack-plugin)
- [**@roots/wordpress-externals-webpack-plugin**](https://github.com/roots/bud/tree/stable/packages/@roots/wordpress-externals-webpack-plugin)

## Usage

```js
// webpack.config.js

module.exports = {
  plugins: [
    // Include required companion plugins.
    new EntrypointsWebpackPlugin(),
    new WordPressExternalsPlugin(),
    // Instantiate the plugin object.
    new MergedManifestPlugin(),
  ],
};
```

## Options

| Option          | type   | Description                                 |
| --------------- | ------ | ------------------------------------------- |
| entrypointsName | string | `entrypoints.json` filename (if customized) |
| wordpressName   | string | `wordpress.json` filename (if customized)   |
| file            | string | filename for final entrypoints manifest     |

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
