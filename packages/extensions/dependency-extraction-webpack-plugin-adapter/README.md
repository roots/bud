<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?style=flat-square&color=1da1f2" />
  </a>
</p>

<h1 align="center">
  <strong>@roots/bud-dependency-extraction-webpack-plugin</strong>
</h1>

## 🚩 Deprecated

This extension is deprecated. Please switch to `@roots/wordpress-manifests`.

Alternatively, you can also implement the `@wordpress/dependency-extraction-webpack-plugin` package in your configuration file.

## Overview

Adds @wordpress/dependency-extraction-webpack-plugin support to @roots/bud projects.

## Installation

```js
yarn add @roots/bud-dependency-extraction-webpack-plugin --dev
```

## Usage

```js
const {extraction} = require('@roots/bud-dependency-extraction')

bud.use([extraction])
```

Optionally, you can configure the behavior of this plugin using the `dependencyExtraction()` function this extension attaches to the `bud` object.

```js
bud.dependencyExtraction({
  injectPolyfill: true,
})
```

Please refer to the @wordpress/dependency-extraction-webpack-plugin documentation for details.

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
