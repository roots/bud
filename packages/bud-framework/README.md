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
  <strong>@roots/bud</strong>
</h1>

## Overview

A webpack framework combining the best parts of Laravel Mix and Symfony Encore.

## Installation

`yarn add @roots/bud --dev`

## Plugins

### Usage

Import plugins at the top of your `bud.config.js` file

```js
const {eslint} = require('@roots/bud-eslint')
```

Then, utilize the `bud.use` method and register the plugin. Plugins will be called in the provided order.

```js
bud.use([eslint])
```

Some plugins may provide additional configuration methods. Obviously, you can't call a plugin-provided method without first registering that plugin, which is one of the reasons it's  generally a good idea to import and register everything at the top of your config.

```js
bud
  .use([dependencyExtraction])
  .dependencyExtraction({
    injectPolyfill: true,
  })
```

### First-party plugins

There are a number of Roots maintained plugins available to kickstart your projects.

| Name | Description | Usage |
|------|-------------|-------|
| @roots/bud-dependency-extraction | Adds @wordpress/dependency-extraction-webpack-plugin support. | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-dependency-extraction/README.md)
| @roots/bud-eslint | Adds eslint support. | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-eslint/README.md) |
| @roots/bud-palette-plugin | Adds palette-webpack-plugin support. | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-palette-plugin/README.md) |
| @roots/bud-purgecss | Adds purgecss support. | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-purgecss/README.md) |
| @roots/bud-react | Adds react support. | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-react/README.md) |
| @roots/bud-sass | Adds sass preprocessor support. | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-sass/README.md) |
| @roots/bud-stylelint | Adds stylelint support. | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-stylelint/README.md) |
| @roots/bud-tailwind | Adds tailwindcss support. | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-tailwindcss/README.md) |
| @roots/bud-typescript | Adds typescript support. | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-typescript/README.md) |
| @roots/bud-vue | Adds Vue framework support. | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-vue/README.md) |

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
