## Overview

> Adds postcss support to [@roots/bud]([[base]]/README.md) projects.

- [Installation](#Installation)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Presets](#presets)
  - [Plugins](#plugins)
  - [Configuration example](#configuration-example)
- [Hooks](#hooks)
  - [Hooks examples](#Examples)

## Installation

```sh
yarn add @roots/bud-postcss --dev
```

## Usage

```js
bud.use('@roots/bud-postcss')
```

## Configuration

Out of the box [@roots/bud-postcss]([[base]]/packages/@roots/bud-postcss) comes with:

- `postcss-import`
- `postcss-nested`
- `postcss-custom-properties`

If this works for you, great! No need to keep reading. But, if you need something more specialized, there is a configuration utility registered by [@roots/bud-postcss]([[base]]/packages/@roots/bud-postcss) designed to help you out.

### Plugins

Add a postcss plugin:

```js
bud.postcss.setPlugin('postcss-import')
```

Remove a postcss plugin:

```js
bud.postcss.unsetPlugin('postcss-import')
```

Override any plugin options:

```js
bud.postcss.setPluginOptions('postcss-import', {
  path: bud.subscribe('build/resolve/modules'),
})
```

### Configuration example

The implementation used by [@roots/bud-postcss]([[base]]/packages/@roots/bud-postcss) internally is identical to the one intended for use in bud config files:

```js
bud.postcss
  .setPlugin('postcss-nested')
  .setPlugin('postcss-custom-properties')
  .setPlugin([
    'postcss-import',
    {path: bud.subscribe('build/resolve/modules')},
  ])
  .enable([
    'postcss-import',
    'postcss-nested',
    'postcss-custom-properties',
  ])
```

## Hooks

You can also customize the postcss config using hooks registered by [@roots/bud-postcss]([[base]]/packages/@roots/bud-postcss):

| Hooks                      | Description                                                                                                                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **loader/postcss**         | postcss loader implementation [default: `require.resolve('postcss-loader')`]                                                                                                                                                       |
| **item/postcss/options**   | `postcss-loader` options                                                                                                                                                                                                           |
| **item/postcss/sourceMap** | Should sourcemaps be enabled [default: `true`, mandatory for `url-resolve`]                                                                                                                                                        |
| **item/postcss/config**    | Should a configuration file take precdedence over `postcss`/`@roots/bud-postcss` config? [default: `true` if `postcss.config.js`/`.postcssrc` file is present in project directory, or a `postcss` field is set in `package.json`] |
| **item/postcss/plugins**   | postcss plugins                                                                                                                                                                                                                    |

### Examples

Get a list of all registered plugins and their configurations:

```js
bud.subscribe('item/postcss/plugins')
```

Override the sourcemap option:

```js
bud.publish({
  'item/postcss/sourceMap': () => false,
})
```

Modify the plugins (in this case filter out `postcss-import`):

```js
bud.publish({
  'item/postcss/plugins': plugins =>
    plugins.filter(
      ([plugin, options]) => plugin !== 'postcss-import',
    ),
})
```
