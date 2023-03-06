---
title: Variations
---

First, indicate the directory to resolve variation modules from:

```js title=src/index.js
roots.register.variations('./')
```

Then, create `*.variation.{js,ts}` modules.

Each should export the required properties of the WordPress Editor Variations API.

They should also export the variation `name` (sometimes referred to as `namespace` in WordPress documentation).

### Example

Using named exports:

```js title=src/example.variation.js
export const block = `core/list`
export const name = `custom`
export const label = `Custom`
export const isDefault = false
```

Using a default export:

```js title=src/example.variation.js
export default {
  block: `core/list`,
  name: `custom`,
  label: `Custom`,
  isDefault: false,
}
```
