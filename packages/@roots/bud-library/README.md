<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/@roots/bud-library">
    <img src="https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square" />
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
  <strong>@roots/bud-library</strong>
</h1>

## Overview

> Adds DLL caching support to [**@roots/bud**](https://github.com/roots/bud/tree/stable/packages/@roots/bud) projects. This can significantly improve build times for vendored dependencies which do not frequently change.

- [Summary](#summary)
- [Installation](#installation)
- [Usage](#usage)

## Summary

`app.library` differs from `app.vendor` in that it doesn't just separate the vendored code from the application code, but actually stops the vendored assets from needing to be rebuilt at all.

The first build will likely take longer as the DLL will need to be compiled, but subsequent builds should see a noticeable reduction in build time.

## Installation

```sh
yarn add @roots/bud-library --dev
```

## Usage

```js
module.exports = (app) =>
  app.use("@roots/bud-library").library(["react", "react-dom", "react-forms"]);
```

Pass `app.library` the module you would like to add to the DLL cache:

```js
app.library("jquery");
```

Multiple modules can be added using an array:

```js
app.library(["jquery", "bootstrap"]);
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
