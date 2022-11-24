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

## Pre-development

You will probably want to use vscode and utilize the recommended extensions. Not mandatory, but recommended.

## Installation

**bud.js** is managed with yarn.

## Development

You can start up tsc, vitest and docusaurus in `--watch` mode with one command:

```sh
yarn @bud dev
```

Build the packages:

```sh
yarn @bud build
```

## Testing

Unit and integration tests are run with [vitest](https://vitest.dev).

Most tests are stored in `tests/`. Integration and e2e tests have too complex a setup to be run in watchmode.

### Unit testing

```sh
yarn @bud test unit
```

### Integration testing

```sh
yarn @bud test run integration
```

### e2e testing

```sh
yarn @bud test run e2e
```

## Linting

Run eslint:

```sh
yarn @bud lint
yarn @bud lint --fix
```

Run prettier:

```sh
yarn @bud lint format
yarn @bud lint format --fix
```

Check for public packages which depend on different versions of the same package:

```sh
yarn @bud lint dependencies
```

Validate public package exports with skypack cli:

```sh
yarn @bud lint exports
```

## Using the local registry

### Starting the registry

You can try out the locally published version of code by starting the registry:

```sh
yarn @bud registry start
```

### Publishing to the registry

With the registry running, cut a release:

```sh
yarn @bud release --tag latest
```

### Using the registry

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

### Stopping the registry

```sh
yarn @bud registry stop
```

## Documentation

**bud.js** documentation is generated with [docusaurus](https://docusaurus.io/).

The `yarn @bud docs` command will build all documentation and README.

### READMEs

Don't edit README files directly. They are generated and your work will be overwritten.

Each package supports a `docs` directory. Contents of files in the `docs` directory will be concatenated and merged in the package readme.

You can start the markdown filename with a number to indicate the desired position within the README.

#### Example

```md title="./sources/@roots/bud/docs/01-getting-started.md"
---
title: Getting started
---

For more detailed usage information consult the [Getting Started guide on bud.js.org](https://bud.js.org/guides/getting-started)
```

## Site docs

Site docs can be found in the `sources/@repo/docs/content` directory.

Extension docs may have markdown sourced from the package's `docs` directory. You'll see an import at the top of the documentation, if so. This is so docs can be reused in the package README and the site documentation.
