## Overview

> Adds postcss support to `@roots/bud` projects.

## toc

## Installation

Install `@roots/bud-postcss` as a project dependency

```sh
yarn add @roots/bud-postcss --dev
```

After installation, run the `bud init` command to install required peer dependencies:

```sh
yarn bud init
```

## Usage

Add the extension to your config:

```js
bud.use(require('@roots/bud-postcss'))
```

## Configuration

Out of the box `@roots/bud-postcss` supports:

- `postcss-import`
- `postcss-preset-env`

If you have a postcss config file set in your project, that configuration will be used instead of the defaults provided by this extension.

Valid config locations:

- `postcss.config.js` file

The API used by `@roots/bud-postcss` internally is the same one intended for use in the project config. Here are the defaults expressed in a few different ways:

```js
bud.postcss.setPlugins({
  import: 'postcss-import',
  ['preset-env']: ['postcss-preset-env', {stage: 1}],
})

bud.postcss
  .setPlugin('import', ['postcss-import'])
  .setPlugin('preset-env', ['postcss-preset-env', {stage: 1}])

bud.postcss
  .setPlugin('import', ['postcss-import'])
  .setPlugin('preset-env', ['postcss-preset-env'])
  .setPluginOptions('preset-env', {stage: 1})
```

## API

A configuration API is registered by `@roots/bud-postcss` for your convenience.

### postcss.setPlugin

Add a postcss plugin. Takes two parameters: the first is a unique key for the plugin, so that it can be referenced later by other extensions. The second can either be the path to the plugin, the resolvable plugin module name, or a postcss PluginCreator function.

```js
bud.postcss.setPlugin(
  'import',
  require.resolve('postcss-import'),
)
```

### postcss.unsetPlugin

Remove a postcss plugin:

```js
bud.postcss.unsetPlugin('import')
```

### postcss.setPluginOptions

Override any plugin options:

```js
bud.postcss.setPluginOptions('import', {
  path: bud.filter('build/resolve/modules'),
})
```
