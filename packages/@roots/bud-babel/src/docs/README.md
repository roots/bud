## Installation

```sh
yarn add @roots/bud-babel --dev
```

## Usage

```js
bud.use('@roots/bud-babel')
```

## Configuration

Out of the box `@roots/bud-babel` comes with:

- `@babel/preset-env`
- `@babel/plugin-transform-runtime`
- `@babel/plugin-proposal-object-rest-spread`
- `@babel/plugin-syntax-dynamic-import`

If this works for you, great! No need to keep reading. But, if you need something more specialized, there is a configuration utility registered by `@roots/bud-babel` designed to help you out.

### Presets

Add babel preset:

```js
bud.babel.setPreset('@babel/preset-env')
```

Remove babel preset:

```js
bud.babel.unsetPreset('@babel/preset-env')
```

Override any preset options:

```js
bud.babel.setPresetOptions('@babel/preset-env', {
  /** custom config */
})
```

### Plugins

Add a babel plugin:

```js
bud.babel.setPlugin('@babel/plugin-transform-runtime')
```

Remove a babel plugin:

```js
bud.babel.unsetPlugin('@babel/plugin-transform-runtime')
```

Override any plugin options:

```js
bud.babel.setPluginOptions('@babel/plugin-transform-runtime', {
  helpers: false,
})
```

### Configuration example

The implementation used by `@roots/bud-babel` internally is identical to the one intended for use in bud config files:

```js
app.babel
  .setPreset('@babel/preset-env')
  .setPlugins([
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
  ])
  .setPluginOptions('@babel/plugin-transform-runtime', {
    helpers: false,
  })
```

## Hooks

You can also customize the babel config using hooks registered by `@roots/bud-babel`:

| Hooks                                 | Description                                                                                  |
| ------------------------------------- | -------------------------------------------------------------------------------------------- |
| **loader/babel**                      | Babel loader implementation [default: `require.resolve('babel-loader')`]                     |
| **item/babel**                        | The full babel RuleSetUse definition                                                         |
| **item/babel/options**                | `babel-loader` options                                                                       |
| **item/babel/options/root**           | The root directory supplied to `babel-loader` [default: `app.subscribe('location/project')`] |
| **item/babel/options/cacheDirectory** | The cache directory supplied to `babel-loader`                                               |
| **item/babel/options/presets**        | Babel presets                                                                                |
| **item/babel/options/plugins**        | Babel plugins                                                                                |

### Examples

Get a list of all registered presets and their configurations:

```js
bud.subscribe('item/babel/options/presets')
```

Override the cache directory:

```js
bud.publish({
  'item/babel/options/cacheDirectory': () => bud.project('tmp'),
})
```

Modify the plugins (in this case filter out the `@emotion` babel plugin):

```js
bud.publish({
  'item/babel/options/plugins': plugins =>
    plugins.filter(([plugin, options]) => plugin !== '@emotion'),
})
```
