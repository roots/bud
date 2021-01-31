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
  - [Configuration API](#configuration-api)
- [Extensions](#extending-core)
- [Documentation](#details)

## Overview

> A webpack framework combining the best parts of Laravel Mix and Symfony Encore.

## Installation

```sh
yarn add @roots/bud --dev
```

## Getting started

Bud centers around a configuration file situated in the root of the project. By default this file should be named `bud.config.js`.

You can use the CLI to generate a starter configuration file, if you need a jumping off point:

```sh
yarn bud publish @roots/bud-support bud.config.js
```

Dead simple `bud.config.js` example:

```js
const {bud} = require('@roots/bud')

bud.entry('app', ['app.js']).run()
```

The framework can do many more things. But, one of Bud's flagpole axioms is that more is not always better for many common use cases. In fact, just using `entry` and `run` you can already compile project files. For many people this may very well be enough.

A more advanced configuration might look like this:

```js
const {bud} = require('@roots/bud')

/**
 * Extend bud with additional functionality
 */
bud.use([
  require('@roots/bud-babel'),
  require('@roots/bud-postcss'),
  require('@roots/bud-react'),
])

/**
 * Create a dynamic link library for fast compilation
 * of the react runtime.
 */
bud.library(['react', 'react-dom'])

/**
 * Compile two separate sets of files.
 */
bud.entry({
  app: ['app.js', 'app.css'],
  landing: 'landing.js',
})

/**
 * When building for production, minify assets.
 * When in development, use verbose source-maps.
 */
bud.when(
  bud.options.is('mode', 'production')
  bud => bud.minify(),
  bud => bud.devtool('eval-source-map'),
)

/**
 * Run the build and cache the results for
 * faster rebuilds when modules are unchanged.
 */
bud.run()
```

## Example implementations

There are [example implementations available for reference in `/examples`](/examples).

## Running a build

Once you've set up your configuration file the following command will run the build:

```sh
yarn bud build
```

You should see your built assets in the `dist` directory of your project.

### Running in `production` mode

```sh
yarn bud build --mode production
```

### Running in `development` mode

```sh
yarn bud build --mode development
```

## Configuration API

The following is a (hopefully) exhaustive list of the utilities designed to make setting up your build as easy as possible.

| Tool            | Description                  | Documentation                          |
| --------------- | ---------------------------- | -------------------------------------- |
| bud.alias       | Easy module imports          | [README ↗](docs/config-alias.md)       |
| bud.cache       | Cache                        | [README ↗](docs/config-cache.md)       |
| bud.copy        | Copy files                   | [README ↗](docs/config-copy.md)        |
| bud.define      | Define global constants      | [README ↗](docs/config-define.md)      |
| bud.dev         | Configure dev server         | [README ↗](docs/config-dev.md)         |
| bud.devtool     | Configure sourcemaps         | [README ↗](docs/config-devtool.md)     |
| bud.dist        | Get the `dist` dir           | [README ↗](docs/config-dist.md)        |
| bud.distPath    | Define the `dist` dir        | [README ↗](docs/config-distPath.md)    |
| bud.entry       | Add source files             | [README ↗](docs/config-entry.md)       |
| bud.glob        | bud.entry but with wildcards | [README ↗](docs/config-glob.md)        |
| bud.hash        | Add version string to assets | [README ↗](docs/config-hash.md)        |
| bud.html        | Set an HTML template         | [README ↗](docs/config-html.md)        |
| bud.minify      | Minify assets                | [README ↗](docs/config-minify.md)      |
| bud.project     | Get the project root         | [README ↗](docs/config-project.md)     |
| bud.projectPath | Define the project root dir  | [README ↗](docs/config-projectPath.md) |
| bud.provide     | Define global vars           | [README ↗](docs/config-provide.md)     |
| bud.proxy       | Configure proxy server       | [README ↗](docs/config-proxy.md)       |
| bud.publicPath  | Define the public path       | [README ↗](docs/config-publicPath.md)  |
| bud.runtime     | Extract boilerplate          | [README ↗](docs/config-runtime.md)     |
| bud.src         | Get the `src` dir            | [README ↗](docs/config-src.md)         |
| bud.srcPath     | Define the `src` dir         | [README ↗](docs/config-srcPath.md)     |
| bud.storage     | Define artifacts dir         | [README ↗](docs/config-storage.md)     |
| bud.vendor      | Extract vendor code          | [README ↗](docs/config-vendor.md)      |

This isn't the last word on what is possible with Bud, just a collection of functions intended to simplify common developer needs/wants to as great a degree as possible. There are many valid ways to interact with Bud that utilize none of these functions.

## Extending

Bud, by itself, provides an intentionally sparse set of features.

In fact, much of the core of Bud is actually made up of extensions. This is to make it easy for developers and extension authors to swap out parts of the framework as needed.

Suffice to say, extensibility is a fundamental design tenant of Bud as software. You will likely want to utilize extensions in your project.

### First-party extensions

There are a number of Roots maintained extensions available to kickstart your projects. For more information on using them refer to the extension's documentation.

| Name                           | Description            | Usage                                              | Package                                                                                                   |
| ------------------------------ | ---------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| @roots/bud-babel               | Babel support.         | [README ↗](packages/extension-babel)               | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-entrypoints         | Asset manifest.        | [README ↗](packages/extension-entrypoints)         | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)         |
| @roots/bud-eslint              | Adds eslint support.   | [README ↗](packages/extension-eslint)              | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)              |
| @roots/bud-imagemin            | Compress image assets  | [README ↗](packages/extension-imagemin)            | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)            |
| @roots/bud-library             | DLL support            | [README ↗](packages/extension-library)             | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)             |
| @roots/bud-postcss             | PostCss support.       | [README ↗](packages/extension-postcss)             | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)             |
| @roots/bud-purgecss            | PurgeCss support.      | [README ↗](packages/extension-purgecss)            | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)            |
| @roots/bud-react               | React support.         | [README ↗](packages/extension-react)               | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-sass                | Sass support.          | [README ↗](packages/extension-sass)                | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                |
| @roots/bud-stylelint           | Stylelint support.     | [README ↗](packages/extension-stylelint)           | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)           |
| @roots/bud-tailwindcss         | Tailwindcss support.   | [README ↗](packages/extension-tailwindcss)         | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)         |
| @roots/bud-terser              | Terser support.        | [README ↗](packages/extension-terser)              | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)              |
| @roots/bud-typescript          | TypeScript support.    | [README ↗](packages/extension-typescript)          | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)          |
| @roots/bud-vue                 | Vue framework support. | [README ↗](packages/extension-vue)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                 |
| @roots/bud-wordpress-externals | WP dependencies.       | [README ↗](packages/extension-wordpress-externals) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square) |
| @roots/bud-wordpress-manifests | WP asset manifest.     | [README ↗](packages/extension-wordpress-manifests) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square) |

### Third-party extensions

Have you produced a Bud extension and want to share it here? Please, create an issue sharing information about your project.

## Documentation and details

- [Documentation index](docs/README.md)
- [Configuration guide](docs/config.md)
- [Setting the compilation mode](docs/components-mode.md)
- [Working with containers](docs/components-container.md)
- [Working with env values](docs/components-env.md)
- [Toggling feature flags](docs/components-features.md)
- [Working with the filesystem](docs/components-filesystem.md)
- [Using hooks](docs/components-hooks.md)
- [Bud CLI](docs/cli.md)

## Typescript

Bud is written in TypeScript but supports JS and TS projects. For TS users most project typings can be sourced from [@roots/bud-typings](packages/typings).

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/tree/stable/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
