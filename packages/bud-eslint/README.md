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
  <strong>@roots/bud-eslint</strong>
</h1>

## Overview

Adds eslint support to @roots/bud projects.

## Installation

```sh
yarn add @roots/bud-eslint --dev
```

## Usage

```js
bud.extend([require('@roots/bud-eslint').plugin])
```

You're all set. Bud will automatically detect a eslint config in your project root and give you feedback during compilation.

Do note the `.plugin` affixed to the require statement. Unlike other plugins, `@roots/bud-eslint` is not a default export.

That's because it also exports some ready-made presets for you to utilize in your `.eslintrc.js` configuration.

```js
const {presets} = require('@roots/bud-eslint').presets
module.exports = {
  root: true,
  extends: presets.roots,
  rules: {
    //...
  },
}
```

Exported presets:

| Preset    | Description              |
| --------- | ------------------------ |
| roots     | Baseline configuration   |
| wordpress | WordPress specific rules |
| react     | React rules and plugins  |

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
