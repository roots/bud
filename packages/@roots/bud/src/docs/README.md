## Overview

> A webpack framework combining the best parts of Laravel Mix and Symfony Encore.

## Table of Contents

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

For more on configuring @roots/bud check out the [dedicated documentation](docs:config/README).

## Running a build

Once you've set up your configuration file the following command will run the build:

```sh
yarn bud build
```

You should see your built assets in the `dist` urlectory of your project.

### Running in `production` mode

```sh
yarn bud build:production
```

### Running in `development` mode

```sh
yarn bud build:development
```

## Example implementations

There are [example implementations available](url:examples).

## Extending

Bud provides an intentionally sparse set of out-of-the-box features.

In fact, much of the core of Bud is actually made up of extensions. This is to make it easy for devs to swap out parts of the framework as needed.

That said, you will likely want to utilize extensions in your project.

If you're unsure where to start or what you need you can try the @roots/bud-preset-recommend preset. But, all of our first-party extensions are designed with ease-of-use in mind. Most require zero configuration.

### First-party extensions

There are a number of Roots maintained extensions available to kickstart your projects :fire:

| Name                              | Project home             | Extension docs                                | Latest                          |
| --------------------------------- | ----------------------- | ------------------------------------ | --------------------------------- |
| `@roots/bud-babel`              | @babel/babel    | readme`@roots/bud-babel`              | npm`@roots/bud-babel`
| `@roots/bud-compress`               | @webpack-contrib/compression-webpack-plugin | readme`@roots/bud-compress`              | npm`@roots/bud-compress`               |
| `@roots/bud-criticalcss`            | @addyosmani/critical       | readme`@roots/bud-criticalcss`            | npm`@roots/bud-criticalcss`            |
| `@roots/bud-emotion`                | @emotion/emotion-css          | readme`@roots/bud-emotion`                | npm`@roots/bud-emotion`                |
| `@roots/bud-entrypoints`           | `@roots/entrypoints-webpack-plugin`         | readme`@roots/bud-entrypoints`            | npm`@roots/bud-entrypoints`            |
| `@roots/bud-esbuild`               | @roots/esbuild-loader          | readme`@roots/bud-esbuild`                | npm`@roots/bud-esbuild`                |
| `@roots/bud-eslint`                 | @webpack-contrib/eslint-webpack-plugin   | readme`@roots/bud-eslint`                 | npm`@roots/bud-eslint`                 |
| `@roots/bud-imagemin`               | @webpack-contrib/image-minimizer-webpack-plugin   | readme`@roots/bud-imagemin`               | npm`@roots/bud-imagemin`               |
| `@roots/bud-library`                | @asfktz/autodll-webpack-plugin           | readme`@roots/bud-library`                | npm`@roots/bud-library`                |
| `@roots/bud-mdx`                    | @mdx-js/mdx           | readme`@roots/bud-mdx`                   | npm`@roots/bud-mdx`                    |
| `@roots/bud-postcss`                | @postcss/postcss        | readme`@roots/bud-postcss`                | npm`@roots/bud-postcss`                |
| `@roots/bud-prettier`               | adds prettier       | readme`@roots/bud-prettier`               | npm`@roots/bud-prettier`               |
| `@roots/bud-purgecss`               | removes unused styles       | readme`@roots/bud-purgecss`              | npm`@roots/bud-purgecss`               |
| `@roots/bud-react`                 | adds react/jsx         | readme`@roots/bud-react`                | npm`@roots/bud-react`                  |
| `@roots/bud-sass`                   | adds sass          | readme`@roots/bud-sass`                 | npm`@roots/bud-sass`                   |
| `@roots/bud-stylelint`              | lint stylesheets      | readme`@roots/bud-stylelint`              | npm`@roots/bud-stylelint`              |
| `@roots/bud-tailwindcss`            | Tailwindcss support.    | readme`@roots/bud-tailwindcss`           | npm`@roots/bud-tailwindcss`            |
| `@roots/bud-terser`                 | Terser support.         | readme`@roots/bud-terser`                 | npm`@roots/bud-terser`                 |
| `@roots/bud-typescript`             | TypeScript support.     | readme`@roots/bud-typescript`             | npm`@roots/bud-typescript`             |
| `@roots/bud-vue`                    | Vue framework support.  | readme`@roots/bud-vue`                | npm`@roots/bud-vue`                    |
| `@roots/bud-wordpress-dependencies` | WP dependencies.        | readme`@roots/bud-wordpress-dependencies` | npm`@roots/bud-wordpress-dependencies` |
| `@roots/bud-wordpress-externals`    | WP externals.           | readme`@roots/bud-wordpress-externals`   | npm`@roots/bud-wordpress-externals`    |
| `@roots/bud-wordpress-manifests`    | WP asset manifest.      | readme`@roots/bud-wordpress-manifests`    | npm`@roots/bud-wordpress-manifests`    |

### Third-party extensions

Have you produced a Bud extension and want to share it here? Please, create an issue sharing information about your project.

## Documentation and details

- [Documentation](docs`README`)
- [Getting started](docs`getting-started`)
- [Configuration](docs`config/README`)
- [CLI](docs`cli`)
