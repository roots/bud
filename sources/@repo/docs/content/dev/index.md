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

Before install we need to have [verdaccio](https://verdaccio.org/) available locally over port 4873.

Either install verdaccio globally:

```sh
yarn global add verdaccio
pm2 start verdaccio -- --config ./config/verdaccio/config.yaml
```

or, run it with docker:

```sh
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

With that done, you can then proceed with installing and building the repo packages:

```sh
yarn
yarn @bud build
```

## Setup

Generally speaking, you will probably want to use vscode and utilize the recommended extensions. Not mandatory, but definitely recommended.

## Integration testing

Before running integration tests you must release and publish the code to the verdaccio registry.

```sh
yarn @bud release --tag latest
```

Once the release command finalizes, you can run the integration tests:

```sh
yarn @bud test integration --verbose
```

In addition to the integration test suite you can also try out the locally published version of the release in any project in your dev environment using the `--registry` flag:

```
yarn add @roots/bud@latest --dev --registry http://localhost:4873
```

If you want to make a change and try it again, rerun `yarn @bud release --tag latest`. Don't worry about incrementing versions, the integration command will delete the old packages before publishing again.

## Unit testing

```sh
yarn @bud build
yarn @bud test unit --verbose
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
