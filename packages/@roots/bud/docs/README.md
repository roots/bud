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

> A frontend build tooling framework combining the best parts of Symfony Encore and Laravel Mix

- [Installation](#installation)
- [Getting started](#getting-started)
- [Running a build](#running-a-build)
  - [Running in `production` mode](#running-in-production-mode)
  - [Running in `development` mode](#running-in-development-mode)
- [Example implementations](#example-implementations)
- [Extending](#extending)
  - [First-party extensions](#first-party-extensions)
  - [Third-party extensions](#third-party-extensions)
- [Documentation and details](#documentation-and-details)
- [Contributing](#contributing)
- [Bud sponsors](#bud-sponsors)
- [Community](#community)

## Installation

Install [**@roots/bud**](https://github.com/roots/bud/tree/stable/packages/@roots/bud) and [**@roots/bud-cli**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-cli) to your project

```sh
yarn add @roots/bud @roots/bud-cli --dev
```

## Getting started

Bud can either be configured with a static config file (`json`/`yml`) or a builder module (`js`/`ts`).

Dead simple example

```js
/**
 * bud.config.js
 */
module.exports = (bud) => bud.entry("app", ["app.js"]);
```

Or, as yml

```yml
# bud.config.yml
entry:
  app: "app.js"
```

A more advanced configuration might look like

```ts
/**
 * bud.config.ts
 */
import { Framework } from "@roots/bud";

export default (bud: Framework) =>
  bud
    .use([
      require("@roots/bud-babel"),
      require("@roots/bud-postcss"),
      require("@roots/bud-react"),
    ])

    .library(["react", "react-dom"])

    .entry({ app: ["app.{js,css}"] })

    .when(
      bud.isProduction,
      ({ minimize }) => minimize(),
      ({ devtool }) => devtool("eval-source-map")
    );
```

Which could also be expressed in a set of `yml` files

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

For more on configuring [**@roots/bud**](https://github.com/roots/bud/tree/stable/packages/@roots/bud) check out the [dedicated documentation](https://github.com/roots/bud/tree/stable/docs/config/README.md).

## Running a build

![Terminal usage](/dev/assets/cli.svg)

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

If you're unsure where to start or what you need you can try the [**@roots/bud-preset-recommend**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-preset-recommend) preset. Most require zero configuration.

### First-party extensions

There are a number of Roots maintained extensions available to kickstart your project

| Name                                                                                                                         | Project home                                                                                                                                       | Extension docs                                                                                             | Latest                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-babel**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-babel)                                   | [**@babel/babel**](https://github.com/babel/babel)                                                                                                 | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-babel/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-compress**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-compress)                             | [**@webpack-contrib/compression-webpack-plugin**](https://github.com/webpack-contrib/compression-webpack-plugin)                                   | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-compress/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-compress.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-criticalcss**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-criticalcss)                       | [**@addyosmani/critical**](https://github.com/addyosmani/critical)                                                                                 | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-criticalcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-emotion**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-emotion)                               | [**@emotion/emotion-css**](https://github.com/emotion/emotion-css)                                                                                 | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-emotion/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-entrypoints**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-entrypoints)                       | [**@roots/entrypoints-webpack-plugin**](https://github.com/roots/bud/tree/stable/packages/@roots/entrypoints-webpack-plugin)                       | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-entrypoints/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-esbuild**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-esbuild)                               | [**@roots/esbuild-loader**](https://github.com/roots/esbuild-loader)                                                                               | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-esbuild/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-eslint**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-eslint)                                 | [**@webpack-contrib/eslint-webpack-plugin**](https://github.com/webpack-contrib/eslint-webpack-plugin)                                             | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-eslint/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-imagemin**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-imagemin)                             | [**@webpack-contrib/image-minimizer-webpack-plugin**](https://github.com/webpack-contrib/image-minimizer-webpack-plugin)                           | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-imagemin/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-library**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-library)                               | [**@asfktz/autodll-webpack-plugin**](https://github.com/asfktz/autodll-webpack-plugin)                                                             | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-library/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-mdx**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-mdx)                                       | [**@mdx-js/mdx**](https://github.com/mdx-js/mdx)                                                                                                   | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-mdx/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-postcss**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-postcss)                               | [**@postcss/postcss**](https://github.com/postcss/postcss)                                                                                         | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-postcss/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-prettier**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-prettier)                             | [**@prettier/prettier**](https://github.com/prettier/prettier)                                                                                     | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-prettier/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-purgecss**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-purgecss)                             | [**@FullHuman/purgecss**](https://github.com/FullHuman/purgecss)                                                                                   | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-purgecss/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-react**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-react)                                   | [**@facebook/react**](https://github.com/facebook/react)                                                                                           | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-react/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-sass**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-sass)                                     | [**@sass/sass**](https://github.com/sass/sass)                                                                                                     | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-sass/README.md)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                   |
| [**@roots/bud-stylelint**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-stylelint)                           | [**@stylelint/stylelint**](https://github.com/stylelint/stylelint)                                                                                 | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-stylelint/README.md)              | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)              |
| [**@roots/bud-tailwindcss**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-tailwindcss)                       | [**@tailwindlabs/tailwindcss**](https://github.com/tailwindlabs/tailwindcss)                                                                       | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-tailwindcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-terser**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-terser)                                 | [**@terser/terser**](https://github.com/terser/terser)                                                                                             | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-terser/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-typescript**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-typescript)                         | [**@TypeStrong/ts-loader**](https://github.com/TypeStrong/ts-loader)                                                                               | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-typescript/README.md)             | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)             |
| [**@roots/bud-vue**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-vue)                                       | [**@vue/vue**](https://github.com/vue/vue)                                                                                                         | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-vue/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-wordpress-dependencies**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-wordpress-dependencies) | [**@roots/wordpress-dependencies-webpack-plugin**](https://github.com/roots/bud/tree/stable/packages/@roots/wordpress-dependencies-webpack-plugin) | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-wordpress-dependencies/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-wordpress-externals**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-wordpress-externals)       | [**@roots/wordpress-externals-webpack-plugin**](https://github.com/roots/bud/tree/stable/packages/@roots/wordpress-externals-webpack-plugin)       | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-wordpress-externals/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square)    |
| [**@roots/bud-wordpress-manifests**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-wordpress-manifests)       | [**@roots/merged-manifest-webpack-plugin**](https://github.com/roots/bud/tree/stable/packages/@roots/merged-manifest-webpack-plugin)               | [📚 README](https://github.com/roots/bud/tree/stable/packages/@roots/bud-wordpress-manifests/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square)    |

### Third-party extensions

Have you produced a Bud extension and want to share it here? Please, create an issue sharing information about your project.

## Documentation and details

- [Documentation](https://github.com/roots/bud/tree/stable/docs/README.md)
- [Getting started](https://github.com/roots/bud/tree/stable/docs/getting-started.md)
- [Configuration](https://github.com/roots/bud/tree/stable/docs/config/README.md)
- [CLI](https://github.com/roots/bud/tree/stable/docs/cli.md)

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://kinsta.com/?kaid=OFDHAJIXUDIV">
  <img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="200" height="150">
</a>
<a href="https://k-m.com/">
  <img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150">
</a>
<a href="https://carrot.com/">
  <img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150">
</a>
<a href="https://www.c21redwood.com/">
  <img src="https://cdn.roots.io/app/uploads/c21redwood.svg" alt="C21 Redwood Realty" width="200" height="150">
</a>
<a href="https://wordpress.com/">
  <img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="200" height="150">
</a>
<a href="https://icons8.com/">
  <img src="https://cdn.roots.io/app/uploads/icons8.svg" alt="Icons8" width="200" height="150">
</a>
<a href="https://www.harnessup.com/">
  <img src="https://cdn.roots.io/app/uploads/harness-software.svg" alt="Harness Software" width="200" height="150">
</a>
<a href="https://www.codersclan.com/">
  <img src="https://cdn.roots.io/app/uploads/coders-clan.svg" alt="Coders Clan" width="200" height="150">
</a>
<a href="https://generodigital.com/">
  <img src="https://cdn.roots.io/app/uploads/genero.svg" alt="Genero" width="200" height="150">
</a>
<a href="https://motto.ca/roots">
  <img src="https://cdn.roots.io/app/uploads/motto.svg" alt="Motto" width="200" height="150">
</a>

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
