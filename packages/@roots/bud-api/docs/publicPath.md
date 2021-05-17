# bud.publicPath

Get the application publicPath.

By default it is assumed that assets are served from webroot (`/`).

To set the path itself you may use [setPublicPath](https://github.com/roots/bud/tree/stable/docs/config/setPublicPath.md).

## Usage

Get the public path:

```js
bud.publicPath();
```

## Hooks

You may also get at this value using the `build/output/publicPath` hook:

```ts
bud.hooks.on("build/output/publicPath", "/dist/");
```

You can modify an existant value using a function:

```ts
bud.hooks.on("build/output/publicPath", (path) => {
  return path.replace("segment/", "new-segment/");
});
```
