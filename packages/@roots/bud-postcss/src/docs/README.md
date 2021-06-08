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

The implementation used by `@roots/bud-postcss` internally is the same one intended for use in the project config:

```js
bud.postcss
  .setPlugin('postcss-import')
  .setPlugin('postcss-preset-env')
  .setPluginOptions('postcss-preset-env', {stage: 1})
```

## API

A configuration API is registered by `@roots/bud-postcss` for your convenience.

### postcss.setPlugin

Add a postcss plugin:

```js
bud.postcss.set('postcss-import')
```

### postcss.unsetPlugin

Remove a postcss plugin:

```js
bud.postcss.removePlugin('postcss-import')
```

### postcss.setPluginOptions

Override any plugin options:

```js
bud.postcss.setPluginOptions('postcss-import', {
  path: bud.subscribe('build/resolve/modules'),
})
```
