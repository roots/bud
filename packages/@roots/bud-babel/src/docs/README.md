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

See what presets are registered:

```js
console.log(bud.babel.presets)
```

Add preset:

```js
bud.babel.setPreset('@babel/preset-env')
```

Remove preset:

```js
bud.babel.unsetPreset('@babel/preset-env')
```

Fully override presets:

```js
bud.babel.setPresets(['@babel/preset-env'])
```

Override any preset options:

```js
bud.babel.setPresetOptions('@babel/preset-env', {
  useBuiltIns: 'entry',
})
```

### Plugins

Plugins has nearly the exact same API already demonstrated by the `presets` docs above.

See what plugins are registered:

```js
console.log(bud.babel.plugins)
```

Add a plugin:

```js
bud.babel.setPlugin('@babel/plugin-transform-runtime')
```

Add a pluginw with options:

```js
bud.babel.setPlugin([
  '@babel/plugin-transform-runtime',
  {helpers: false},
])
```

Fully override plugins:

```js
bud.babel.setPlugins([
  '@babel/plugin-transform-runtime',
  '@babel/plugin-proposal-object-rest-spread',
  ['@babel/plugin-syntax-dynamic-import', {helpers: false}],
])
```

Remove a plugin:

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

This is the default implementation (as provided by this plugin):

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

### Configuring babel-loader

Merge options with existing options by passing the options to merge along with the framework instance:

```js
bud.build.items['babel'].mergeOptions(
  {
    cacheDirectory: ({path}) => path('project', 'tmp'),
  },
  bud,
)
```

Override loader options directly:

```js
bud.build.items['babel'].setOptions({
  cacheDirectory: ({path}) => path('project', 'tmp'),
  presets: Object.values(babel.presets),
  plugins: Object.values(babel.plugins),
})
```

When using `setOptions`, you must include the plugins and presets (as demonstrated above) if you want bud to continue managing these options. Using `setOptions` completely overrides the framework's callbacks.

If you intend to override those callbacks, you need to pass those options along yourself (or use `mergeOptions`):

```js
bud.build.items['babel'].setOptions({
  cacheDirectory: ({path}) => path('project', 'tmp'),
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
  ],
})
```
