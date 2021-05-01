---
description: CLI utilities.
---

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

## bud build:[env]

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

To run the build but not use the `bud-cli` renderer, there is a `--ci` flag which indicates you want to run the build for these environments.

## Exiting the CLI from `dev` mode

Type `q` to gracefully exit the interface when running in development mode.
