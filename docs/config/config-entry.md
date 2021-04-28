---
description: Specify source assets to be compiled.
---

# bud.entry

`bud.entry` is used to define source assets to be compiled.

::: tip 🕵️‍♂️ Guide available
Details on the usage of this method are available in [the Configuration Guide](config.md). See the [Bundling source files](config/#bundle-source-files) section.
:::

## Usage

The simplest usage is just a name for the entrypoint and the asset to compile:

```js
bud.entry('app', 'app.js')
```

It is also possible to pass an array of assets. Assets do not have to be the same filetype to be grouped together as a single entrypoint.

```js
bud.entry('app', ['app.js', 'app.css'])
```

## Hooks

You could do the same thing with the `build/entry` hook.

```js
bud.hooks.on('build/entry', {
  app: ['app.js', 'app.css'],
  another: ['another.js'],
})
```
