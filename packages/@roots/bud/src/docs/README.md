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

There are [example implementations available](https://github.com/roots/bud/tree/stable/examples).

## Extending

Bud provides an intentionally sparse set of out-of-the-box features.

In fact, much of the core of Bud is actually made up of extensions. This is to make it easy for devs to swap out parts of the framework as needed.

That said, you will likely want to utilize extensions in your project.

If you're unsure where to start or what you need you can try the `@roots/bud-preset-recommend` preset. But, all of our first-party extensions are designed with ease-of-use in mind. Most require zero configuration.

### First-party extensions

There are a number of Roots maintained extensions available to kickstart your projects.

| Name                              | Description             | Usage                                | Package                           |
| --------------------------------- | ----------------------- | ------------------------------------ | --------------------------------- |
| [dir](bud-babel)                  | Babel support.          | [readme](bud-babel)                  | [pkg](bud-babel)                  |
| [dir](bud-compress)               | Gzip/Brotli compression | [readme](bud-compress)               | [pkg](bud-compress)               |
| [dir](bud-criticalcss)            | Adds criticalcss.       | [readme](bud-criticalcss)            | [pkg](bud-criticalcss)            |
| [dir](bud-emotion)                | Adds emotion.           | [readme](bud-emotion)                | [pkg](bud-emotion)                |
| [dir](bud-entrypoints)            | Asset manifest.         | [readme](bud-entrypoints)            | [pkg](bud-entrypoints)            |
| [dir](bud-esbuild)                | Adds esbuild.           | [readme](bud-esbuild)                | [pkg](bud-esbuild)                |
| [dir](bud-eslint)                 | Adds eslint support.    | [readme](bud-eslint)                 | [pkg](bud-eslint)                 |
| [dir](bud-imagemin)               | Compress image assets   | [readme](bud-imagemin)               | [pkg](bud-imagemin)               |
| [dir](bud-library)                | DLL support             | [readme](bud-library)                | [pkg](bud-library)                |
| [dir](bud-mdx)                    | MDX support             | [readme](bud-mdx)                    | [pkg](bud-mdx)                    |
| [dir](bud-postcss)                | PostCss support.        | [readme](bud-postcss)                | [pkg](bud-postcss)                |
| [dir](bud-prettier)               | Prettier support.       | [readme](bud-prettier)               | [pkg](bud-prettier)               |
| [dir](bud-purgecss)               | PurgeCss support.       | [readme](bud-purgecss)               | [pkg](bud-purgecss)               |
| [dir](bud-react)                  | React support.          | [readme](bud-react)                  | [pkg](bud-react)                  |
| [dir](bud-sass)                   | Sass support.           | [readme](bud-sass)                   | [pkg](bud-sass)                   |
| [dir](bud-stylelint)              | Stylelint support.      | [readme](bud-stylelint)              | [pkg](bud-stylelint)              |
| [dir](bud-tailwindcss)            | Tailwindcss support.    | [readme](bud-tailwindcss)            | [pkg](bud-tailwindcss)            |
| [dir](bud-terser)                 | Terser support.         | [readme](bud-terser)                 | [pkg](bud-terser)                 |
| [dir](bud-typescript)             | TypeScript support.     | [readme](bud-typescript)             | [pkg](bud-typescript)             |
| [dir](bud-vue)                    | Vue framework support.  | [readme](bud-vue)                    | [pkg](bud-vue)                    |
| [dir](bud-wordpress-dependencies) | WP dependencies.        | [readme](bud-wordpress-dependencies) | [pkg](bud-wordpress-dependencies) |
| [dir](bud-wordpress-externals)    | WP externals.           | [readme](bud-wordpress-externals)    | [pkg](bud-wordpress-externals)    |
| [dir](bud-wordpress-manifests)    | WP asset manifest.      | [readme](bud-wordpress-manifests)    | [pkg](bud-wordpress-manifests)    |

### Third-party extensions

Have you produced a Bud extension and want to share it here? Please, create an issue sharing information about your project.

## Documentation and details

- [Documentation]([[base]]/README.md)
- [Getting started]([[base]]/getting-started.md)
- [CLI]([[base]]/cli.md)
