---
title: Styles
---

First, indicate the directory to resolve style modules from:

```js title=src/index.js
roots.register.styles('./')
```

Then, create `*.style.{js,ts}` modules.

Each should export the required properties of the WordPress block styles API.

### Example

Using named exports:

```js title=src/example.style.js
export const block = `core/list`
export const name = `custom`
export const label = `Custom`
export const isDefault = false
```

Using a default export:

```js title=src/example.style.js
export default {
  block: `core/list`,
  name: `custom`,
  label: `Custom`,
  isDefault: false,
}
```
