---
title: Developer contribution guide
description: Be a pal. Contribute to bud.
sidebar_label: Introduction
slug: /
---

:::info

This is a work-in-progress.

:::

How to get started with **bud.js** locally.

## Installation

- Clone [roots/bud](https://github.com/roots/bud)
- Run `yarn`. This will install all the dependencies and build everything out.

Make sure you're using the exact version of node used in the repo. If you use [Volta](https://volta.sh) to manage Node versions this will be handled for you automatically,

## Repo structure

For the most part public packages are found in `sources/@roots`.

Private packages are found in `sources/@repo`. The `config` directory contains most configuration files that support it.

`storage` contains various artifacts and caches for tooling used in the repo, not tracked in version control.

## @bud cli

Development is aided by the @bud cli. Common tasks should be included in this documentation but you can run `yarn @bud` to see examples sourced from all the development subcommands.

The `@bud` cli source code is found in `sources/@repo`.

## Development

You can start up tsc, vitest and docusaurus in `watch` mode with one command:

```sh
yarn @bud dev
```

## Building

Run `yarn @bud tsc` to build all tsc managed paths. Ensure packages are fully rebuilt with the force flag: `yarn @bud tsc --force`.

## Testing

Tests are run with [vitest](https://vitest.dev).

### Unit testing

```sh
yarn @bud test unit
```

Unit tests are co-located with the package they test, in a directory named `test`.

### Integration testing

Note that the `run` argument is mandatory for running integration tests (integration tests do not support `watch` mode).

```sh
yarn @bud test run integration
```

All integration tests are located in `tests/integration`.

### e2e testing

Note that the `run` argument is mandatory for running e2e tests (e2e tests do not support `watch` mode).

```sh
yarn @bud test run e2e
```

All e2e tests are located in `tests/e2e`.

## Linting

Run eslint:

```sh
yarn @bud lint
```

Run prettier:

```sh
yarn @bud lint format
```

Lint for package duplication:

```sh
yarn @bud lint dependencies
```

Validate package.json and package exports:

```sh
yarn @bud lint exports
```

## Using the local registry

The local package registry is initialized when you install from monorepo root.

After installation, you should see the registry running at [http://localhost:4873](http://localhost:4873).

You can manually start and stop the registry like so:

```sh
yarn @bud registry start
yarn @bud registry stop
```

### Publishing to the registry

You can do a local release to the registry and install it from other projects running on your machine.

To release:

```sh
yarn @bud release --tag latest
```

After the release finishes, you can install it to any project in your dev environment using the `--registry` flag:

```sh
yarn add @roots/bud@latest --dev --registry http://localhost:4873
```

### Rebuilding packages

If you want to make a change and try it again, first clean the existing packages and then rerun the release:

```sh
yarn @bud registry clean
yarn @bud build --force
yarn @bud release --tag latest
```

## Documentation

**bud.js** documentation is generated with [docusaurus](https://docusaurus.io/).

The `yarn @bud docs` command will build all documentation and README.

### READMEs

Don't edit package README files directly. They are generated and your work will be overwritten.

Each package supports a `docs` directory. Contents of files in the `docs` directory will be concatenated and merged in the package readme.

### Site docs

Site docs can be found in the `sources/@repo/docs/content` directory.

Extension docs may have markdown sourced from the package's `docs` directory. You'll see an import at the top of the documentation, if so. This is so docs can be reused in the package README and the site documentation.

## Updating contributors

The `package.json` contributors field for all packages in `sources/@roots` can be updated like so:

```sh
yarn workspace @repo/markdown-kit node contributors/index.js
```
