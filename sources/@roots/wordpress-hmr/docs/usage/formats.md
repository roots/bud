---
title: Formats
---

First, indicate the directory to resolve format modules from:

```js title=src/index.js
roots.register.formats('./')
```

Then, create `*.format.{js,ts}` modules.

Each should export the required properties of the WordPress Editor Format API. They should also export the format `name` (sometimes referred to as `namespace` in WordPress documentation).

### Example

Using named exports:

```js title=src/example.format.js
export const name = `bud-project/example-format`
export const title = `Example format`
export const tagName = 'span'
export const className = 'example-format'
```

Using a default export:

```js title=src/example.format.js
export default {
  name: `bud-project/example-format`,
  title: `Example format`,
  tagName: 'span',
  className: 'example-format',
}
```


