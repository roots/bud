<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?style=flat-square&color=1da1f2" />
  </a>
  <a href="https://www.npmjs.com/package/@roots/bud-compiler">
    <img src="https://img.shields.io/npm/v/@roots/bud-compiler.svg?color=%23525ddc&style=flat-square" />
  </a>
</p>

<h1 align="center">
  <strong>@roots/bud-compiler</strong>
</h1>

## Overview

The compiler provides controls and renders Bud's built-in development server.

## Installation

```sh
yarn add @roots/bud-compiler --dev
```

## Usage

The compiler is called as a function and expects a valid webpack configuration and an instance of Bud.

It returns an object that includes a `compile` function. This initiates the compiler.

```js
const {compiler} = require('@roots/bud-compiler')
const instance = compiler(bud, config)
instance.compile()
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
