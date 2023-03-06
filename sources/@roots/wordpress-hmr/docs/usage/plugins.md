---
title: Plugins
---

First, indicate the directory to resolve plugin modules from:

```js title=src/index.js
roots.register.plugins('./')
```

Then, create `*.plugin.{js,ts}` modules.

Each should export the required properties of the WordPress Editor Plugin API. They should also export the plugin `name` (sometimes referred to as `namespace` in WordPress documentation).

### Example

Using named exports:

```js title=src/example.plugin.js
export const name = `example-plugin`
export const title = `Example plugin`
export const render = () => null
```

Using a default export:

```js title=src/example.plugins.js
export default {
  name: `example-plugin`,
  title: `Example plugin`,
  render: () => null,
}
```
