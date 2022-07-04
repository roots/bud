---
title: Developer contribution guide
description: Be a pal. Contribute to bud.
sidebar_label: Introduction
slug: /
---

:::info

This is a work-in-progress.

:::

You can [reference API documentation here](https://bud.js.org/dev/api/).

## Installation

```sh
yarn
```

## Setup

Generally speaking, you will probably want to use vscode and utilize the recommended extensions. Not mandatory, but definitely recommended.

## Building

You can start up tsc, jest and docusaurus in `--watch` mode with one command:

```sh
yarn @bud dev
```

You can also just build the packages and exit with:

```sh
yarn @bud tsc
```

## Testing

Unit and integration tests are run with swc-jest.

Most tests are stored in `tests/`.

### Unit testing

```sh
yarn @bud test unit  --verbose
```

### Integration testing

```sh
yarn @bud test integration --verbose
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

If you want to make a change and try it again, rerun `yarn @bud release --tag latest`. Don't worry about incrementing versions, the integration command will delete the old packages before publishing again.

### Stopping the registry

```sh
yarn @bud registry stop
```

## Documentation

bud.js documentation is generated with [docusaurus](https://docusaurus.io/).

The `yarn @bud docs` command will build all documentation and README.

### READMEs

Don't edit README files directly. They are generated and your work will be overwritten.

Each package supports a `docs` directory. Contents of files in the `docs` directory will be concatenated and merged in the package readme.

The README section will have its heading sourced from the title of the file. Hyphens will be converted to spaces and capitalization will be automatically handled, even if it's imperfect.

You can lead the markdown file with a number to indicate the desired position.

#### Example:

```md title="./sources/@roots/bud/docs/01-getting-started.md"
For more detailed usage information consult the [Getting Started guide on bud.js.org](https://bud.js.org/guides/getting-started)
```

```md title="./sources/@roots/bud/README.md"
...

### Getting Started

For more detailed usage information consult the [Getting Started guide on bud.js.org](https://bud.js.org/guides/getting-started)

...
```

## Site docs

Site docs can be found in the `sources/@repo/docs/content` directory.

Extension docs may have markdown sourced from the package's `docs` directory. You'll see an import at the top of the documentation, if so. This is so docs can be reused in the package README and the site documentation.
