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

## Alternative

If you want to pass all of your assets without repeatedly calling `bud.entry` you might consider either setting the config directly:

```js
bud.config.set('entry', {
  app: ['app.js', 'app.css'],
  another: ['another.js'],
})

/***
 * You might also want to append multiple entries,
 * rather than overwriting them:
 */
bud.config.mutate('entry', entry => ({
  ...entry,
  app: ['app.js', 'app.css'],
  another: ['another.js'],
}))
```

You could also use the `bud.hooks` system:

```js
bud.hooks.on('webpack.entry', entry => ({
  app: ['app.js', 'app.css'],
  another: ['another.js'],
}))
```

## Signature

```ts
function (
  name: string,
  entry: string | string[]
): Bud
```

## Parameters

| Name      | Type     |
| --------- | -------- |
| `name`    | string   |
| `entry` | string | string[] |

## Returns

`Framework.Bud`: The Bud instance.
