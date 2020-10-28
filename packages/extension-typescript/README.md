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
  <strong>@roots/bud-typescript</strong>
</h1>

## Overview

Adds support for compiling `.ts` and `.tsx` source files to the @roots/bud framework.

## Installation

```sh
yarn add @roots/bud-typescript --dev
```

## Usage

```js
bud.extend([require('@roots/bud-typescript')])
```

You should now be good to utilize typescript in your project.

You will also need a `tsconfig.json` file in your project root directory.

Consult the typescript docs for more information on Typescript usage.

If your `tsconfig.json` is not located in your project root you can
configure the plugin to point to its location.

```js
bud.typescript({
  configFile: bud.project('config/tsconfig.json'),
})
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
