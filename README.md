<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://codeclimate.com/github/roots/bud-support/maintainability">
    <img src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://codeclimate.com/github/roots/bud-support/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/4153714e5382c885560e/maintainability" />
  </a>
</p>

<h1 align="center">
  <strong>@roots/bud</strong>
</h1>

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Configuration API](#configuration-api)
- [Running a build](#running-a-build)
  - [Running for production](#running-in-production-mode)
  - [Running for development](#running-in-development-mode)
- [Extensions](#extending-core)
- [Documentation](#details)

## Overview

A webpack framework combining the best parts of Laravel Mix and Symfony Encore.

## Installation

```sh
yarn add @roots/bud --dev
```

Once installed you can use the CLI to generate a starter configuration file, if you need a jumping off point:

```sh
yarn bud publish bud.config.js
```

## Configuration

Bud centers around a configuration file situated in the root of the project.

Dead simple example:

```js
const {bud} = require('@roots/bud')

bud.entry('app', ['app.js']).run()
```

The framework can do many more things. But a central philosophy of the framework is that more is not always better for many common use cases. In fact, just using `entry` and `run` you can already compile project files. For many people this may very well be enough.

A more advanced configuration might look like this:

```js
const {bud} = require('@roots/bud')

bud
  .use([
    '@roots/bud-babel',
    '@roots/bud-postcss',
    '@roots/bud-react',
  ])

  .library(['react', 'react-dom'])

  .entry({
    app: ['app.js', 'app.css'],
    landing: 'landing.js',
  })

  .when(
    bud.mode.is('production'),
    bud => bud.minify(),
    bud => bud.devtool('eval-source-map'),
  )

  .run()
```

### Configuration API

| Tool            | Description                         | Documentation                                                                                     |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| bud.addPlugin   | Use a Webpack plugin                | [docs/config-addPlugin.md](https://github.com/roots/bud/tree/stable/docs/config-addPlugin.md)     |
| bud.alias       | Easy module imports                 | [docs/config-alias.md](https://github.com/roots/bud/tree/stable/docs/config-alias.md)             |
| bud.brotli      | Apply brotli compression            | [docs/config-brotli.md](https://github.com/roots/bud/tree/stable/docs/config-brotli.md)           |
| bud.copy        | Copy files                          | [docs/config-copy.md](https://github.com/roots/bud/tree/stable/docs/config-copy.md)               |
| bud.define      | Define global constants             | [docs/config-define.md](https://github.com/roots/bud/tree/stable/docs/config-define.md)           |
| bud.dev         | Configure dev server                | [docs/config-dev.md](https://github.com/roots/bud/tree/stable/docs/config-dev.md)                 |
| bud.devtool     | Configure sourcemaps                | [docs/config-devtool.md](https://github.com/roots/bud/tree/stable/docs/config-devtool.md)         |
| bud.dist        | Get the `dist` dir path             | [docs/config-dist.md](https://github.com/roots/bud/tree/stable/docs/config-dist.md)               |
| bud.distPath    | Define the `dist` dir path          | [docs/config-distPath.md](https://github.com/roots/bud/tree/stable/docs/config-distPath.md)       |
| bud.entry       | Add source files                    | [docs/config-entry.md](https://github.com/roots/bud/tree/stable/docs/config-entry.md)             |
| bud.glob        | Create an entrypoint with wildcards | [docs/config-glob.md](https://github.com/roots/bud/tree/stable/docs/config-glob.md)               |
| bud.gzip        | Apply gzip compression              | [docs/config-gzip.md](https://github.com/roots/bud/tree/stable/docs/config-gzip.md)               |
| bud.hash        | Add version string to assets        | [docs/config-glob.md](https://github.com/roots/bud/tree/stable/docs/config-hash.md)               |
| bud.library     | Create a DLL                        | [docs/config-library.md](https://github.com/roots/bud/tree/stable/docs/config-library.md)         |
| bud.minify      | Minify assets                       | [docs/config-minify.md](https://github.com/roots/bud/tree/stable/docs/config-minify.md)           |
| bud.pipe        | Declare a series of build steps     | [docs/config-pipe.md](https://github.com/roots/bud/tree/stable/docs/config-pipe.md)               |
| bud.project     | Get the project root                | [docs/config-project.md](https://github.com/roots/bud/tree/stable/docs/config-project.md)         |
| bud.projectPath | Define the project root dir         | [docs/config-projectPath.md](https://github.com/roots/bud/tree/stable/docs/config-projectPath.md) |
| bud.provide     | Make a module available globally    | [docs/config-provide.md](https://github.com/roots/bud/tree/stable/docs/config-provide.md)         |
| bud.publicPath  | Define the browser URI of assets.   | [docs/config-publicPath.md](https://github.com/roots/bud/tree/stable/docs/config-publicPath.md)   |
| bud.runtime     | Code split with a runtime chunk     | [docs/config-runtime.md](https://github.com/roots/bud/tree/stable/docs/config-runtime.md)         |
| bud.src         | Get the `src` dir path              | [docs/config-src.md](https://github.com/roots/bud/tree/stable/docs/config-src.md)                 |
| bud.srcPath     | Define the `src` dir path           | [docs/config-srcPath.md](https://github.com/roots/bud/tree/stable/docs/config-srcPath.md)         |
| bud.template    | Generate HTML boilerplate           | [docs/config-template.md](https://github.com/roots/bud/tree/stable/docs/config-template.md)       |
| bud.terser      | Configure the terser minifier       | [docs/config-terser.md](https://github.com/roots/bud/tree/stable/docs/config-terser.md)           |
| bud.use         | Extend Bud's core functionality     | [docs/config-use.md](https://github.com/roots/bud/tree/stable/docs/config-use.md)                 |
| bud.vendor      | Separate vendor code from app code  | [docs/config-vendor.md](https://github.com/roots/bud/tree/stable/docs/config-vendor.md)           |
| bud.when        | Conditional control of build steps  | [docs/config-when.md](https://github.com/roots/bud/tree/stable/docs/config-when.md)               |

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

## Extending core

Bud, by itself, provides an intentionally sparse set of features.

In fact, much of the core of Bud is actually made up of extensions. This is to make it easy for developers and extension authors to swap out parts of the framework as needed.

Suffice to say, extensibility is a fundamental design tenant of Bud as software. You will likely want to utilize extensions in your project.

### First-party extensions

There are a number of Roots maintained extensions available to kickstart your projects. For more information on using them refer to [the documentation on `bud.use`](https://github.com/roots/bud/tree/stable/docs/config-use.md) and the extension's README.

| Name                           | Description                     | Usage                                                                                                |
| ------------------------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| @roots/bud-babel               | Adds babel support.             | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-babel/README.md)               |
| @roots/bud-eslint              | Adds eslint support.            | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-eslint/README.md)              |
| @roots/bud-wordpress-manifests | WP specific build tooling.      | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-wordpress-manifests/README.md) |
| @roots/bud-purgecss            | Adds purgecss support.          | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-purgecss/README.md)            |
| @roots/bud-react               | Adds react support.             | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-react/README.md)               |
| @roots/bud-sass                | Adds sass preprocessor support. | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-sass/README.md)                |
| @roots/bud-stylelint           | Adds stylelint support.         | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-stylelint/README.md)           |
| @roots/bud-tailwindcss         | Adds tailwindcss support.       | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-tailwindcss/README.md)         |
| @roots/bud-typescript          | Adds typescript support.        | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-typescript/README.md)          |
| @roots/bud-vue                 | Adds Vue framework support.     | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-vue/README.md)                 |

### Third-party extensions

Have you produced a Bud extension and want to share it here? Please, create an issue sharing information about your project.

## Details

- [Configuration](config.md)
- [Setting the compilation mode](components-mode.md)
- [Working with containers](components-container.md)
- [Working with env values](components-env.md)
- [Toggling feature flags](components-features.md)
- [Working with the filesystem](components-filesystem.md)
- [Using hooks](components-hooks.md)
- [Bud CLI](cli.md)

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/tree/stable/@ter/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
