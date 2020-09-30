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
  <strong>@roots/bud-babel</strong>
</h1>

## Overview

Babel utilities.

## Installation

`yarn add @roots/bud --dev`

## Usage

```js
const {bud} = require('@roots/bud')

bud.bundle('app', ['app.js', 'app.css']).compile()
```

Bud can do many more things. But a central philosophy of the framework is that more is not always better for many common use cases.

## Plugins

### Usage

Plugins are registered using `bud.extend` method. Plugins will be called in the provided order.

```js
bud.extend([require('@roots/bud-eslint')])
```

Some plugins may attach additional configuration methods to the `bud` object for you to utilize.

Obviously, you can't call a plugin-provided method without first registering that plugin, which is one of the reasons it's generally a good idea to import and register everything at the top of your config.

```js
bud.extend([require('@roots/bud-purgecss')]).purgecss({
  /** purgecss configuration */
})
```

### First-party plugins

There are a number of Roots maintained plugins available to kickstart your projects.

| Name                                            | Description                                                    | Usage                                                                                                          |
| ----------------------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| @roots/bud-dependency-extraction-webpack-plugin | Adds @wordpress/dependency-extraction-webpack-plugin support.  | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-dependency-extraction/README.md) |
| @roots/bud-eslint                               | Adds eslint support.                                           | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-eslint/README.md)                |
| @roots/bud-palette-webpack-plugin               | Adds palette-webpack-plugin support.                           | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-palette-plugin/README.md)        |
| @roots/bud-purgecss                             | Adds purgecss support.                                         | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-purgecss/README.md)              |
| @roots/bud-react                                | Adds react support.                                            | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-react/README.md)                 |
| @roots/bud-sass                                 | Adds sass preprocessor support.                                | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-sass/README.md)                  |
| @roots/bud-stylelint                            | Adds stylelint support.                                        | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-stylelint/README.md)             |
| @roots/bud-tailwindcss                          | Adds tailwindcss support.                                      | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-tailwindcss/README.md)           |
| @roots/bud-typescript                           | Adds typescript support.                                       | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-typescript/README.md)            |
| @roots/bud-vue                                  | Adds Vue framework support.                                    | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-vue/README.md)                   |
| @roots/bud-wordpress-manifests                  | Adds WordPress specific asset manifests for simpler enqueuing. | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/bud-wordpress-manifests/README.md)   |

## Alternative syntax

More advanced users may want to configure Bud's options more directly. The `@roots/bud-framework` container API allows for that.

Set the source directory path:

```js
bud.paths.set('src', path.join(__dirname, 'inputDir'))
```

Set filetypes for webpack to resolve:

```js
bud.options.set('webpack.resolve.extensions', ['.ts', '.tsx'])
```

Enable specific features:

```js
bud.features.set('hot', true)
```

## Hooks

Bud provides a system of 'hooks' to expose values in the webpack config for modification, replacement, testing, etc.

Here are some examples

```js
bud.hooks.on('webpack.externals', externals => ({
  $: 'jquery',
})

bud.hooks.on('webpack.output.filename', filename => '[name].[hash:4]')

bud.hooks.on('webpack.module.rules.css.test', /\.css$/)
```

You may also add new filters. This is probably most helpful in the context of authoring plugins.

```js
const filteredValue = bud.hooks.filter(
  'plugin.filter.key',
  defaultValue,
)
```

Now, other plugins or the user can modify this value, same as above:

```js
bud.hooks.on('plugin.filter.key', defaultValue =>
  defaultValue.shift(),
)
```

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
