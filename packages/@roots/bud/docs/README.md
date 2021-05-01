<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/roots/bud">
    <img src="https://img.shields.io/npm/v/roots/bud.svg?color=%23525ddc&style=flat-square" />
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

## Overview

> A webpack framework combining the best parts of Laravel Mix and Symfony Encore.

# Table of Contents

## Installation

Install `@roots/bud` and `@roots/bud-cli` to your project:

```sh
yarn add @roots/bud @roots/bud-cli --dev
```

## Getting started

Bud can either be configured with a static config file (`json`/`yml`) or a builder module (`js`/`ts`).

Dead simple `bud.config.js` example:

```js
module.exports = (bud) => bud.entry("app", ["app.js"]);
```

Or, as `bud.config.yml`:

```yml
entry:
  app: "app.js"
```

A more advanced configuration might look like this:

```ts
import { Bud } from "@roots/bud";

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
      require("@roots/bud-babel"),
      require("@roots/bud-postcss"),
      require("@roots/bud-react"),
    ])

    /**
     * Create a dynamic link library for fast compilation
     * of the react runtime.
     */
    .library(["react", "react-dom"])

    /**
     * Compile two separate sets of files.
     */
    .entry({ app: ["app.{js,css}"] })

    /**
     * When building for production, minify assets.
     * When in development, use source-maps.
     */
    .when(
      bud.isProduction,
      ({ minimize }) => minimize(),
      ({ devtool }) => devtool("eval-source-map")
    );
```

Which could also be expressed in a set of `yml` files:

```yml
# bud.config.yml
extensions:
  - "@roots/bud-babel"
  - "@roots/bud-postcss"
  - "@roots/bud-react"
library:
  - "react"
  - "react-dom"
entry:
  app: "app.{js,css}"
```

```yml
# bud.production.config.yml
minimize: true
```

```yml
# bud.development.config.yml
devtool: "eval-source-map"
```

## Running a build

Once you've set up your configuration file the following command will run the build:

```sh
yarn bud build
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

There are [example implementations available](https://github.com/roots/bud/tree/stable/examples).

## Extending

Bud provides an intentionally sparse set of out-of-the-box features.

In fact, much of the core of Bud is actually made up of extensions. This is to make it easy for devs to swap out parts of the framework as needed.

That said, you will likely want to utilize extensions in your project.

If you're unsure where to start or what you need you can try the `@roots/bud-preset-recommend` preset. But, all of our first-party extensions are designed with ease-of-use in mind. Most require zero configuration.

### First-party extensions

There are a number of Roots maintained extensions available to kickstart your projects.

| Name                                                                                                                                  | Description             | Usage                                                                                                        | Package                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-babel**](https://github.com/roots/bud/tree/stable/packages/roots/bud-babel/README.md)                                   | Babel support.          | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-babel/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-compress**](https://github.com/roots/bud/tree/stable/packages/roots/bud-compress/README.md)                             | Gzip/Brotli compression | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-compress/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-compress.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-criticalcss**](https://github.com/roots/bud/tree/stable/packages/roots/bud-criticalcss/README.md)                       | Adds criticalcss.       | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-criticalcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-emotion**](https://github.com/roots/bud/tree/stable/packages/roots/bud-emotion/README.md)                               | Adds emotion.           | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-emotion/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-entrypoints**](https://github.com/roots/bud/tree/stable/packages/roots/bud-entrypoints/README.md)                       | Asset manifest.         | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-entrypoints/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-esbuild**](https://github.com/roots/bud/tree/stable/packages/roots/bud-esbuild/README.md)                               | Adds esbuild.           | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-esbuild/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-eslint**](https://github.com/roots/bud/tree/stable/packages/roots/bud-eslint/README.md)                                 | Adds eslint support.    | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-eslint/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-imagemin**](https://github.com/roots/bud/tree/stable/packages/roots/bud-imagemin/README.md)                             | Compress image assets   | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-imagemin/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-library**](https://github.com/roots/bud/tree/stable/packages/roots/bud-library/README.md)                               | DLL support             | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-library/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-mdx**](https://github.com/roots/bud/tree/stable/packages/roots/bud-mdx/README.md)                                       | MDX support             | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-mdx/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-postcss**](https://github.com/roots/bud/tree/stable/packages/roots/bud-postcss/README.md)                               | PostCss support.        | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-postcss/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-prettier**](https://github.com/roots/bud/tree/stable/packages/roots/bud-prettier/README.md)                             | Prettier support.       | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-prettier/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-purgecss**](https://github.com/roots/bud/tree/stable/packages/roots/bud-purgecss/README.md)                             | PurgeCss support.       | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-purgecss/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-react**](https://github.com/roots/bud/tree/stable/packages/roots/bud-react/README.md)                                   | React support.          | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-react/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-sass**](https://github.com/roots/bud/tree/stable/packages/roots/bud-sass/README.md)                                     | Sass support.           | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-sass/README.md)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                   |
| [**@roots/bud-stylelint**](https://github.com/roots/bud/tree/stable/packages/roots/bud-stylelint/README.md)                           | Stylelint support.      | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-stylelint/README.md)              | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)              |
| [**@roots/bud-tailwindcss**](https://github.com/roots/bud/tree/stable/packages/roots/bud-tailwindcss/README.md)                       | Tailwindcss support.    | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-tailwindcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-terser**](https://github.com/roots/bud/tree/stable/packages/roots/bud-terser/README.md)                                 | Terser support.         | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-terser/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-typescript**](https://github.com/roots/bud/tree/stable/packages/roots/bud-typescript/README.md)                         | TypeScript support.     | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-typescript/README.md)             | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)             |
| [**@roots/bud-vue**](https://github.com/roots/bud/tree/stable/packages/roots/bud-vue/README.md)                                       | Vue framework support.  | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-vue/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-wordpress-dependencies**](https://github.com/roots/bud/tree/stable/packages/roots/bud-wordpress-dependencies/README.md) | WP dependencies.        | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-wordpress-dependencies/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-wordpress-externals**](https://github.com/roots/bud/tree/stable/packages/roots/bud-wordpress-externals/README.md)       | WP externals.           | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-wordpress-externals/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square)    |
| [**@roots/bud-wordpress-manifests**](https://github.com/roots/bud/tree/stable/packages/roots/bud-wordpress-manifests/README.md)       | WP asset manifest.      | [**README ↗**](https://github.com/roots/bud/tree/stable/packages/roots/bud-wordpress-manifests/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square)    |

### Third-party extensions

Have you produced a Bud extension and want to share it here? Please, create an issue sharing information about your project.

## Documentation and details

- [Documentation]([[base]]/README.md)
- [Getting started]([[base]]/getting-started.md)
- [CLI]([[base]]/cli.md)

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
