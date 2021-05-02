<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/@roots/bud-cli">
    <img src="https://img.shields.io/npm/v/@roots/bud-cli.svg?color=%23525ddc&style=flat-square" />
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
  <strong>@roots/bud-cli</strong>
</h1>

## Overview

> CLI utilities for [**@roots/bud**](https://github.com/roots/bud/tree/stable/packages/@roots/bud) projects.

## Table of contents

- [Installation](#installation)
- [Getting started](#getting-started)
- [bud build:\[env\]](#bud-buildenv)
- [Running the build in CI](#running-the-build-in-ci)
- [Exiting the CLI from `dev` mode](#exiting-the-cli-from-dev-mode)

## Installation

With [yarn](https://classic.yarnpkg.com).

```sh
yarn add @roots/bud-cli --dev
```

With npm:

```sh
npm install @roots/bud-cli --save-dev
```

## Getting started

The CLI includes detailed usage instructions:

```sh
yarn bud --help
```

## bud build:\[env]

Compile assets for production:

```sh
bud build:production
```

Compile assets for development:

```sh
bud build:dev
```

## Running the build in CI

It is possible, depending on your environment, that Bud's CLI output causes issues. In particular, it's usage of tty `raw mode` can cause issues with CI tools.

To run the build but not use the [**@roots/bud-cli**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-cli) renderer, there is a `--ci` flag which indicates you want to run the build for these environments.

## Exiting the CLI from `dev` mode

Type `q` to gracefully exit the interface when running in development mode.

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
