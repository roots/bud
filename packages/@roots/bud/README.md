<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/@roots/bud">
    <img src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
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
  <strong>@roots/bud</strong>
</h1>

- [Overview](#overview)
- [Installation](#installation)
- [Getting started](#getting-started)
- [Running a build](#running-a-build)
- [Extensions](#extending-core)
- [Documentation](#details)

## Overview

> A webpack framework combining the best parts of Laravel Mix and Symfony Encore.

## Installation

Install `@roots/bud` and `@roots/bud-cli` to your project:

```sh
yarn add @roots/bud @roots/bud-cli --dev
```

## Getting started

Bud can either be configured with a static config file (`json`/`yml`) or a builder module (`js`/`ts`).

Dead simple `bud.config.js` example:

```js
module.exports = bud => bud.entry('app', ['app.js'])
```

Or, as `bud.config.yml`:

```yml
entry:
  app: 'app.js'
```

A more advanced configuration might look like this:

```ts
import {Bud} from '@roots/bud'

/**
 * This config is written in typescript, which is the recommended
 * approach for builder fn configurations.
 */
export default (bud: Bud) =>
  bud
    /**
     * Extend bud with additional functionality.
     * You could also use imports.
     */
    .use([
      require('@roots/bud-babel'),
      require('@roots/bud-postcss'),
      require('@roots/bud-react'),
    ])

    /**
     * Create a dynamic link library for fast compilation
     * of the react runtime.
     */
    .library(['react', 'react-dom'])

    /**
     * Compile two separate sets of files.
     */
    .entry({app: ['app.{js,css}']})

    /**
     * When building for production, minify assets.
     * When in development, use source-maps.
     */
    .when(
      bud.isProduction,
      ({minimize}) => minimize(),
      ({devtool}) => devtool('eval-source-map'),
    )
```

Which could also be expressed in a set of `yml` files:

```yml
# bud.config.yml
extensions:
  - '@roots/bud-babel'
  - '@roots/bud-postcss'
  - '@roots/bud-react'
library:
  - 'react'
  - 'react-dom'
entry:
  app: 'app.{js,css}'
```

```yml
# bud.production.config.yml
minimize: true
```

```yml
# bud.development.config.yml
devtool: 'eval-source-map'
```

## Running a build

Once you've set up your configuration file the following command will run the build:

```sh
yarn bud build:production
```

You should see your built assets in the `dist` directory of your project.

### Running in `production` mode

```sh
yarn bud build:production
```

### Running in `development` mode

```sh
yarn bud build:development
```

## Example implementations

There are [example implementations available for reference in `/examples`](https://github.com/roots/bud/tree/stable/examples).

## Extending

Bud, by itself, provides an intentionally sparse set of out-of-the-box features.

In fact, much of the core of Bud is actually made up of extensions. This is to make it easy for developers and extension authors to swap out parts of the framework as needed.

Suffice to say, extensibility is a fundamental design tenet of Bud as software. You will likely want to utilize extensions in your project.

You can add an extension in a couple ways:

```ts
import * as babel from '@roots/bud-babel'

// bud.use
bud.use(babel)

// bud.extensions.add
bud.extensions.add(babel)
```

### First-party extensions

There are a number of Roots maintained extensions available to kickstart your projects. For more information on using them refer to the extension's documentation.

| Name                              | Description             | Usage                                                                                           | Package                                                                                                      |
| --------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| @roots/bud-babel                  | Babel support.          | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-babel)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)                  |
| @roots/bud-compress               | Gzip/Brotli compression | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-compress)               | ![npm](https://img.shields.io/npm/v/@roots/bud-compress.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-criticalcss            | Adds criticalcss.       | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-criticalcss)            | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss.svg?color=%23525ddc&style=flat-square)            |
| @roots/bud-emotion                | Adds emotion.           | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-emotion)                | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion.svg?color=%23525ddc&style=flat-square)                |
| @roots/bud-entrypoints            | Asset manifest.         | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-entrypoints)            | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)            |
| @roots/bud-esbuild                | Adds esbuild.           | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-esbuild)                | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild.svg?color=%23525ddc&style=flat-square)                |
| @roots/bud-eslint                 | Adds eslint support.    | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-eslint)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)                 |
| @roots/bud-imagemin               | Compress image assets   | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-imagemin)               | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-library                | DLL support             | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-library)                | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)                |
| @roots/bud-mdx                    | DLL support             | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-mdx)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx.svg?color=%23525ddc&style=flat-square)                    |
| @roots/bud-postcss                | PostCss support.        | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-postcss)                | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)                |
| @roots/bud-prettier               | Prettier support.       | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-prettier)               | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-purgecss               | PurgeCss support.       | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-purgecss)               | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-react                  | React support.          | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-react)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)                  |
| @roots/bud-sass                   | Sass support.           | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-sass)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                   |
| @roots/bud-stylelint              | Stylelint support.      | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-stylelint)              | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)              |
| @roots/bud-tailwindcss            | Tailwindcss support.    | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-tailwindcss)            | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)            |
| @roots/bud-terser                 | Terser support.         | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-terser)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)                 |
| @roots/bud-typescript             | TypeScript support.     | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-typescript)             | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)             |
| @roots/bud-vue                    | Vue framework support.  | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-vue)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                    |
| @roots/bud-wordpress-dependencies | WP dependencies.        | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-wordpress-dependencies) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies.svg?color=%23525ddc&style=flat-square) |
| @roots/bud-wordpress-externals    | WP externals.           | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-wordpress-externals)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square)    |
| @roots/bud-wordpress-manifests    | WP asset manifest.      | [README ↗](https://github.com/roots/bud/tree/stable/packages/@roots/bud-wordpress-manifests)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square)    |

### Third-party extensions

Have you produced a Bud extension and want to share it here? Please, create an issue sharing information about your project.

## Documentation and details

- [Documentation](https://github.com/roots/bud/tree/stable/docs/README.md)
- [Getting started](https://github.com/roots/bud/tree/stable/docs/getting-started.md)
- [CLI](https://github.com/roots/bud/tree/stable/docs/cli.md)

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
