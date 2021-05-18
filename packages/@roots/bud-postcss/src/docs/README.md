## Overview

> Adds postcss support to `@roots/bud` projects.

## toc

## Installation

Due to changes in PostCss 8 regarding peer dependencies, you should explicitly install `postcss` alongside `@roots/bud-postcss`

```sh
yarn add @roots/bud-postcss postcss --dev
```

## Usage

```js
bud.use('@roots/bud-postcss')
```

## Configuration

Out of the box `@roots/bud-postcss` comes with:

- `postcss-import`
- `postcss-nested`
- `postcss-custom-properties`

If you have a postcss config file set in your project, that configuration will be used instead of the defaults provided by this extension.

Valid config locations:

- `postcss.config.js` file
- `.postcssrc` file
- `postcss` field in your project's `package.json`

The implementation used by `@roots/bud-postcss` internally is the same one intended for use in the project config:

```js
bud.postcss
  .set('postcss-nested')
  .set('postcss-custom-properties')
  .set([
    'postcss-import',
    {path: bud.subscribe('build/resolve/modules')},
  ])
  .setOrder([
    'postcss-import',
    'postcss-nested',
    'postcss-custom-properties',
  ])
```

## API

A configuration API is registered by `@roots/bud-postcss` for your convenience.

All methods return `bud.postcss` for further chaining.

### postcss.set

Add a postcss plugin:

```js
bud.postcss.set('postcss-import')
```

### postcss.unset

Remove a postcss plugin:

```js
bud.postcss.unset('postcss-import')
```

### postcss.setOptions

Override any plugin options:

```js
bud.postcss.setOptions('postcss-import', {
  path: bud.subscribe('build/resolve/modules'),
})
```

### postcss.setOrder

Specify an explicit order in which to load plugins:

```js
bud.postcss.setOrder(['postcss-import', 'postcss-nested'])
```

Note that when using `postcss.set`, each plugin is implicitly added to the end of the order.

## Hooks

You may also customize the postcss config using [docs](hooks) registered by `@roots/bud-postcss`:

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

Modify plugins:

```js
bud.publish({
  'item/postcss/plugins': plugins =>
    plugins.filter(
      ([plugin, options]) => plugin !== 'postcss-import',
    ),
})
```
