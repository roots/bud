---
title: Blocks
---

First, indicate the directory to resolve block modules from:

```js title=src/index.js
roots.register.blocks('./')
```

Then, in your application you can create `*.block.{js,ts}` modules.

Each should export the required properties of the WordPress Block API. They should also export the block `name` (sometimes referred to as `namespace` in WordPress documentation).

### Example

Using named exports:

```js title=src/blocks/example.block.js
export const name = `bud-project/example-block`
export const title = `Example block`
export const edit = () => <div><h1>Hello world!</h1></div>
```

Using a default export:

```js title=src/blocks/example.block.js
export default {
  name: `bud-project/example-block`,
  title: `Example block`,
  edit: () => <div><h1>Hello world!</h1></div>,
}
```
