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

There are [example implementations available for reference in `/examples`]([[base]]/examples).

## Extending

Bud provides an intentionally sparse set of out-of-the-box features.

In fact, much of the core of Bud is actually made up of extensions. This is to make it easy for devs to swap out parts of the framework as needed.

That said, you will likely want to utilize extensions in your project.

If you're unsure where to start or what you need you can try the `@roots/bud-preset-recommend` preset. But, all of our first-party extensions are designed with ease-of-use in mind. Most require zero configuration.

### First-party extensions

There are a number of Roots maintained extensions available to kickstart your projects. For more information on using them refer to the extension's documentation.

| Name                              | Description             | Usage                                                           | Package                                                                                                      |
| --------------------------------- | ----------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| @roots/bud-babel                  | Babel support.          | [README ↗]([[base]]/packages/@roots/bud-babel)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)                  |
| @roots/bud-compress               | Gzip/Brotli compression | [README ↗]([[base]]/packages/@roots/bud-compress)               | ![npm](https://img.shields.io/npm/v/@roots/bud-compress.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-criticalcss            | Adds criticalcss.       | [README ↗]([[base]]/packages/@roots/bud-criticalcss)            | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss.svg?color=%23525ddc&style=flat-square)            |
| @roots/bud-emotion                | Adds emotion.           | [README ↗]([[base]]/packages/@roots/bud-emotion)                | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion.svg?color=%23525ddc&style=flat-square)                |
| @roots/bud-entrypoints            | Asset manifest.         | [README ↗]([[base]]/packages/@roots/bud-entrypoints)            | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)            |
| @roots/bud-esbuild                | Adds esbuild.           | [README ↗]([[base]]/packages/@roots/bud-esbuild)                | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild.svg?color=%23525ddc&style=flat-square)                |
| @roots/bud-eslint                 | Adds eslint support.    | [README ↗]([[base]]/packages/@roots/bud-eslint)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)                 |
| @roots/bud-imagemin               | Compress image assets   | [README ↗]([[base]]/packages/@roots/bud-imagemin)               | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-library                | DLL support             | [README ↗]([[base]]/packages/@roots/bud-library)                | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)                |
| @roots/bud-mdx                    | MDX support             | [README ↗]([[base]]/packages/@roots/bud-mdx)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx.svg?color=%23525ddc&style=flat-square)                    |
| @roots/bud-postcss                | PostCss support.        | [README ↗]([[base]]/packages/@roots/bud-postcss)                | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)                |
| @roots/bud-prettier               | Prettier support.       | [README ↗]([[base]]/packages/@roots/bud-prettier)               | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-purgecss               | PurgeCss support.       | [README ↗]([[base]]/packages/@roots/bud-purgecss)               | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-react                  | React support.          | [README ↗]([[base]]/packages/@roots/bud-react)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)                  |
| @roots/bud-sass                   | Sass support.           | [README ↗]([[base]]/packages/@roots/bud-sass)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                   |
| @roots/bud-stylelint              | Stylelint support.      | [README ↗]([[base]]/packages/@roots/bud-stylelint)              | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)              |
| @roots/bud-tailwindcss            | Tailwindcss support.    | [README ↗]([[base]]/packages/@roots/bud-tailwindcss)            | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)            |
| @roots/bud-terser                 | Terser support.         | [README ↗]([[base]]/packages/@roots/bud-terser)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)                 |
| @roots/bud-typescript             | TypeScript support.     | [README ↗]([[base]]/packages/@roots/bud-typescript)             | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)             |
| @roots/bud-vue                    | Vue framework support.  | [README ↗]([[base]]/packages/@roots/bud-vue)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                    |
| @roots/bud-wordpress-dependencies | WP dependencies.        | [README ↗]([[base]]/packages/@roots/bud-wordpress-dependencies) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies.svg?color=%23525ddc&style=flat-square) |
| @roots/bud-wordpress-externals    | WP externals.           | [README ↗]([[base]]/packages/@roots/bud-wordpress-externals)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square)    |
| @roots/bud-wordpress-manifests    | WP asset manifest.      | [README ↗]([[base]]/packages/@roots/bud-wordpress-manifests)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square)    |

### Third-party extensions

Have you produced a Bud extension and want to share it here? Please, create an issue sharing information about your project.

## Documentation and details

- [Documentation]([[base]]/docs/README.md)
- [Getting started]([[base]]/docs/getting-started.md)
- [CLI]([[base]]/docs/cli.md)
