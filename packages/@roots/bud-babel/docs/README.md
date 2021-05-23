<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/@roots/bud-babel">
    <img src="https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://codeclimate.com/github/roots/bud-support/maintainability">
    <img src="https://img.shields.io/codeclimate/maintainability/roots/bud-support?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://github.com/roots/bud/actions/workflows/build">
    <img src="https://github.com/roots/bud/actions/workflows/build.yml/badge.svg" />
  </a>
  <a href="Typescript" src="https://github.com/roots/bud/tree/stable/typings">
    <img src="https://img.shields.io/badge/typings-%40roots%2Fbud--typings-%23525ddc" />
  </a>
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
  </a>
</p>

<h1 align="center">
  <strong>@roots/bud-babel</strong>
</h1>

> **description**

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Presets](#presets)
  - [Plugins](#plugins)
  - [Configuration example](#configuration-example)
  - [Configuring babel-loader](#configuring-babel-loader)
- [Contributing](#contributing)
- [Bud sponsors](#bud-sponsors)
- [Community](#community)

## Installation

```sh
yarn add @roots/bud-babel --dev
```

## Usage

```js
bud.use("@roots/bud-babel");
```

## Configuration

Out of the box [**@roots/bud-babel**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-babel) comes with:

- `@babel/preset-env`
- `@babel/plugin-transform-runtime`
- `@babel/plugin-proposal-object-rest-spread`
- `@babel/plugin-syntax-dynamic-import`

If this works for you, great! No need to keep reading. But, if you need something more specialized, there is a configuration utility registered by [**@roots/bud-babel**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-babel) designed to help you out.

### Presets

See what presets are registered:

```js
console.log(bud.babel.presets);
```

Add preset:

```js
bud.babel.setPreset("@babel/preset-env");
```

Remove preset:

```js
bud.babel.unsetPreset("@babel/preset-env");
```

Fully override presets:

```js
bud.babel.setPresets(["@babel/preset-env"]);
```

Override any preset options:

```js
bud.babel.setPresetOptions("@babel/preset-env", {
  useBuiltIns: "entry",
});
```

### Plugins

Plugins has nearly the exact same API already demonstrated by the `presets` docs above.

See what plugins are registered:

```js
console.log(bud.babel.plugins);
```

Add a plugin:

```js
bud.babel.setPlugin("@babel/plugin-transform-runtime");
```

Add a pluginw with options:

```js
bud.babel.setPlugin(["@babel/plugin-transform-runtime", { helpers: false }]);
```

Fully override plugins:

```js
bud.babel.setPlugins([
  "@babel/plugin-transform-runtime",
  "@babel/plugin-proposal-object-rest-spread",
  ["@babel/plugin-syntax-dynamic-import", { helpers: false }],
]);
```

Remove a plugin:

```js
bud.babel.unsetPlugin("@babel/plugin-transform-runtime");
```

Override any plugin options:

```js
bud.babel.setPluginOptions("@babel/plugin-transform-runtime", {
  helpers: false,
});
```

### Configuration example

This is the default implementation (as provided by this plugin):

```js
app.babel
  .setPreset("@babel/preset-env")
  .setPlugins([
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
  ])
  .setPluginOptions("@babel/plugin-transform-runtime", {
    helpers: false,
  });
```

### Configuring babel-loader

Merge options with existing options by passing the options to merge along with the framework instance:

```js
bud.build.items["babel"].mergeOptions(
  {
    cacheDirectory: ({ path }) => path("project", "tmp"),
  },
  bud
);
```

Override loader options directly:

```js
bud.build.items["babel"].setOptions({
  cacheDirectory: ({ path }) => path("project", "tmp"),
  presets: Object.values(babel.presets),
  plugins: Object.values(babel.plugins),
});
```

When using `setOptions`, you must include the plugins and presets (as demonstrated above) if you want bud to continue managing these options. Using `setOptions` completely overrides the framework's callbacks.

If you intend to override those callbacks, you need to pass those options along yourself (or use `mergeOptions`):

```js
bud.build.items["babel"].setOptions({
  cacheDirectory: ({ path }) => path("project", "tmp"),
  presets: ["@babel/preset-env"],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
  ],
});
```

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://kinsta.com/?kaid=OFDHAJIXUDIV">
  <img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="200" height="150">
</a>
<a href="https://k-m.com/">
  <img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150">
</a>
<a href="https://carrot.com/">
  <img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150">
</a>
<a href="https://www.c21redwood.com/">
  <img src="https://cdn.roots.io/app/uploads/c21redwood.svg" alt="C21 Redwood Realty" width="200" height="150">
</a>
<a href="https://wordpress.com/">
  <img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="200" height="150">
</a>
<a href="https://icons8.com/">
  <img src="https://cdn.roots.io/app/uploads/icons8.svg" alt="Icons8" width="200" height="150">
</a>
<a href="https://www.harnessup.com/">
  <img src="https://cdn.roots.io/app/uploads/harness-software.svg" alt="Harness Software" width="200" height="150">
</a>
<a href="https://www.codersclan.com/">
  <img src="https://cdn.roots.io/app/uploads/coders-clan.svg" alt="Coders Clan" width="200" height="150">
</a>
<a href="https://generodigital.com/">
  <img src="https://cdn.roots.io/app/uploads/genero.svg" alt="Genero" width="200" height="150">
</a>
<a href="https://motto.ca/roots">
  <img src="https://cdn.roots.io/app/uploads/motto.svg" alt="Motto" width="200" height="150">
</a>

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
