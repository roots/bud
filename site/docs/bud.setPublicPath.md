# bud.setPublicPath

By default it is assumed that the public path of compiled assets is '/'. For projects where assets are served from a subdirectory there is the `setPublicPath` method.

To utilize the path set here you may use [publicPath](/docs/bud.publicPath)

## Usage

Set the public path using a string

```js
bud.setPublicPath("/app/themes/sage/dist");
```

Set the public path using a function

```js
bud.setPublicPath((publicPath) => {
  return `https://cdn.com/${publicPath}`;
});
```
