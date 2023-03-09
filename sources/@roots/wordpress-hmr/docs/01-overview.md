---
title: Overview
parts:
  - usage/blocks.md
  - usage/plugins.md
  - usage/styles.md
  - usage/filters.md
  - usage/formats.md
  - usage/variations.md
---

This library adds support for registering `blocks`, `filters`, `formats`, `styles`, `variations` and `plugins`.

All modules registered with this API are registered in production and development. In development additional hot module reloading support is added.

## Adding support to your application

There are two steps:

- Making the root registration call for a given type or types.
- Adding modules to your application

In general, the above steps are the same for working with any of the supported APIs.

### Making the root registration call

In your app (recommendation: entrypoint) call `roots.register.[type]`, supplying the root directory where registrables are found.

For example, to register blocks in your application, you'd add this call:

```js title=src/index.js
roots.register.blocks('./')

/** Don't forget to accept any module updates! */
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error)
}
```

### Adding modules to your application

bud.js will look for modules in the directory indicated in the root registration call. Modules are named like `*.[type].[ext]`.

The module should export the required settings and the `name` of the entity.

Modules can be created using either default exports or named exports.

## What are the advantages

Without this library, if you have modified the content of a block you are developing in the editor and then make changes to a block's code _that cause it to render differently_, WordPress may mark the block as invalid.

This library intercepts the module update and caches the state of the block outside of WordPress' state tree. It then completely unregisters the block and then re-registers it. If the block was selected before the module update, it also deselects and reselects it.

WordPress is now looking at a different situation: a newly registered block with newly registered state. There is no discrepency and so the block is not flagged as invalid.

This library also provides a more declarative way of registering modules with WordPress than the default API, and is less prone to understandable errors importing the wrong registration functions, etc.
