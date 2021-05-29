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

> 👩‍💻 The [**@roots/bud**](https://github.com/roots/bud) CLI runner utility

- [Installation](#installation)
- [Getting started](#getting-started)
- [bud build](#bud-build)
- [bud extensions](#bud-extensions)
- [Running the build with logging](#running-the-build-with-logging)
- [Installing dependencies automatically](#installing-dependencies-automatically)
- [Running the build in CI](#running-the-build-in-ci)
- [Exiting the CLI from `dev` mode](#exiting-the-cli-from-dev-mode)
- [Contributing](#contributing)
- [Bud sponsors](#bud-sponsors)
- [Community](#community)

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

## bud build

Compile assets for production:

```sh
bud build
```

Compile assets for development:

```sh
bud build:dev
```

## bud extensions

List installed extensions:

```sh
bud extensions:list
```

Install extension dependencies:

```sh
bud extensions:install
```

## Running the build with logging

Use the `--log` flag to run the build with logging enabled.

## Installing dependencies automatically

Try the `--install` flag to install packages flagged as required by various extensions.

## Running the build in CI

It is possible, depending on your environment, that Bud's CLI output causes issues. In particular, it's usage of tty `raw mode` can cause issues in CI.

To run the build but not use the [**@roots/bud-cli**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-cli) renderer, there is a `--ci` flag which indicates you want to run the build for these environments.

## Exiting the CLI from `dev` mode

Type `q` to gracefully exit the interface when running in development mode.

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
