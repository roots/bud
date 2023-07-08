---
title: Usage
---

The simplest usage is a string reference to your application's entrypoint.

```js title='bud.config.mjs'
export default async bud => {
  bud.entry('app')
}
```

For more control over naming, you may pass two parameters. The first will be used as the name, and the second as the asset signifier.

```js title='bud.config.mjs'
export default async bud => {
  bud.entry('app', 'app.js')
}
```

It is also possible to pass an array of assets (with or without an entrypoint name). Assets do not have to be the same filetype to be grouped together as a single entrypoint.

```js title='bud.config.mjs'
export default async bud => {
  bud.entry('app', ['app.js', 'app.css'])
}
```

You may also specify multiple entrypoints in one call using object syntax:

```js title='bud.config.mjs'
export default async bud => {
  bud.entry({
    app: ['app.js', 'app.css'],
    admin: ['admin.js', 'admin.css'],
  })
}
```

The entire [EntryObject API](https://webpack.js.org/concepts/entry-points/#object-syntax) is available to you.

As an example, you might use [`publicPath`](https://webpack.js.org/configuration/output/#outputpublicpath) to specify a CDN for your a particular entry.

```ts title='bud.config.mjs'
export default async bud => {
  bud.entry({
    react: ['react', 'react-dom'],
    app: {
      import: ['app.js', 'app.css'],
      dependOn: ['react'],
      publicPath: 'https://cdn.example.com/app/',
    },
  })
}
```

## Globbing

**bud.entry** can be used with [bud.glob](/reference/bud.glob) to find matching files.

```js title='bud.config.mjs'
export default async bud => {
  bud.entry({
    app: await bud.glob('./src/*.{css,js}'),
  })
}
```
