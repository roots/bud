<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?style=flat-square&color=1da1f2" />
  </a>
</p>

<h1 align="center">
  <strong>@roots/bud</strong>
</h1>

<h3 align="center">
  <em>Bud is a high-level webpack framework combining the best parts of Laravel Mix and Symfony Encore.</em>
</h3>

## Overview

A webpack framework combining the best parts of Laravel Mix and Symfony Encore.

## Installation

`yarn add @roots/bud --dev`

## Geting started

Bud is designed to be utilized in a config file situated in your project's root directory.

Create a file in your project root. For the sake of convention let's call it `bud.config.js`.

```js
const bud = require('@roots/bud')

bud.entry('app', ['app.js', 'app.css'])

bud.run()
```

You can run this build by running `node bud.config.js` in the terminal. When the process completes you should find an `app.js` and `app.css` file in the `dist` directory.

By default Bud assumes `app.js` and `app.css` are available in a `src` directory and that assets will be built to `dist`.

You can customize this behavior with a couple more functions: `bud.srcPath` and `bud.distPath`. Here's an example where assets are built from a directory called `scripts` into a directory called `build`.

```js
const bud = require('@roots/bud')

bud
  .srcPath('scripts')
  .distPath('build')
  .entry('app', ['app.js'])
  .run()
```

Note that we have left `bud` off of the function calls following the first. This is because most of the functions exposed in the configuration API return the Bud framework itself which lets us chain the calls. This is sometimes referred to as a fluent interface. It is only intended to make things less repetitive to read and type. If you don't like it you can still type `bud` before each function. It's totally the same.

Bud can do many more things. But a central philosophy of the framework is that more is not always better for many common use cases. With just `bud`, `entry` and `run` you can already compile ES6 and postcss into a syntax that browsers can understand. For many people this may very well be enough.

## Extensions

Bud, by itself, provides an intentionally sparse, baseline configuration. In fact, much of the core of Bud is actually made up of extensions. That is to say -- extensibility is a fundamental design tenant of Bud as software.

The point being that users will likely want to install at least one or two extensions. But, this is not required.

### Usage

Extensions are registered using the `bud.use` method. Extensions will be called in the order provided.

```js
bud.use('@roots/bud-eslint')
```

We recommend adding all the extensions you want to use at the very top of your configuration file. For many extensions the oder in which they are called is a non-issue, but for other extensions the ordering may be important. For instance, if you are adding React support to your application with `@roots/bud-react`, you are going to want to add that extension after `@roots/bud-babel`. Likewise, `@roots/bud-purgecss` adds a postcss plugin and so it should be included after `@roots/bud-postcss`.

In the future it is likely there will be an API for extension authors to declare dependencies so that Bud can infer an order without the user having to know what depends on what. But, for now, this is the case.

Some extensions may attach additional configuration functions to the `bud` object for you to utilize.

```js
bud.use('@roots/bud-purgecss').purgecss({
  /** purgecss configuration */
})
```

### First-party extensions

There are a number of Roots maintained extensions available to kickstart your projects.

| Name                   | Description                                                                                                      | Usage                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| @roots/bud-babel       | Adds babel support.                                                                                              | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-babel/README.md)       |
| @roots/bud-eslint      | Adds eslint support.                                                                                             | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-eslint/README.md)      |
| @roots/bud-manifests   | For WordPress projects. Adds WP dependency extraction support and manifests more suitabl for WordPress projects. | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-manifests/README.md)   |
| @roots/bud-purgecss    | Adds purgecss support.                                                                                           | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-purgecss/README.md)    |
| @roots/bud-react       | Adds react support.                                                                                              | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-react/README.md)       |
| @roots/bud-sass        | Adds sass preprocessor support.                                                                                  | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-sass/README.md)        |
| @roots/bud-stylelint   | Adds stylelint support.                                                                                          | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-stylelint/README.md)   |
| @roots/bud-tailwindcss | Adds tailwindcss support.                                                                                        | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-tailwindcss/README.md) |
| @roots/bud-typescript  | Adds typescript support.                                                                                         | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-typescript/README.md)  |
| @roots/bud-vue         | Adds Vue framework support.                                                                                      | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-vue/README.md)         |

## Alternative syntax

More advanced users may want to configure Bud's options more directly. The `@roots/bud-framework` container API allows for that.

Set the webpack context:

```js
bud.config.set('context', path.join(__dirname, 'src'))
```

Set filetypes for webpack to resolve:

```js
bud.config.mutate('resolve.extensions', extensions => [
  ...extensions,
  '.ts',
  '.tsx',
])
```

Enable specific features:

```js
bud.features.set('hot', true)
```

## Framework

Users who want even less boilerplate can start by installing `@roots/bud-framework` instead of `@roots/bud`. This will allow them to configure everything, including their development server, transpiler etc., exactly to their liking. Those users may wish to fork `@roots/bud` so as to have a starting point to configure from.

## Writing extensions

An extension can be defined either as an object or an es module. Bud's core extensions are defined as modules, and this is the preferred approach. Typescript makes this pretty easy to do while remaining cross compatible with older module APIs.

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
