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

To run the build but not use the `@roots/bud-cli` renderer, there is a `--ci` flag which indicates you want to run the build for these environments.

## Exiting the CLI from `dev` mode

Type `q` to gracefully exit the interface when running in development mode.
