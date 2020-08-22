---
description: Install extensions to meet your unique project needs.
---

# Extensions

Bud includes support for extending the framework with optional functionality.

## Usage

Import plugins at the top of your `bud.config.js` file

```js
const {eslint} = require('@roots/bud-eslint')
```

Call the `bud.use` method in order to register the extension. Extensions will be invoked in the provided order.

```js
bud.use([eslint])
```

Some extensions may provide additional configuration methods. Obviously, you can't call an extension-provided method without first registering that extension, which is one of the reasons it's  generally a good idea to import and register everything at the top of your config.

```js
bud
  .use([dependencyExtraction])
  .dependencyExtraction({
    injectPolyfill: true,
  })
```

### First-party extensions

There are a number of Roots maintained extensions available to kickstart your projects.

| Extension | Description | Usage |
|------|-------------|-------|
| @roots/bud-dependency-extraction | Adds @wordpress/dependency-extraction-webpack-plugin support. | [↗](bud-dependency-extraction.md)
| @roots/bud-eslint | Adds eslint support. | [↗](bud-eslint.md) |
| @roots/sass | Adds sass support. | [↗](bud-sass.md) |
| @roots/bud-stylelint | Adds stylelint support. | [↗](bud-stylelint.md) |
| @roots/bud-tailwind | Adds tailwindcss support. | [↗](bud-tailwind.md) |
| @roots/bud-vue | Adds Vue framework support. | [↗](bud-vue.md) |
