# bud.setPublicPath

By default it is assumed that assets are served from webroot (`/`). For projects where assets are served from a subdirectory there is the `setPublicPath` method.

To utilize the path set here you may use [publicPath](https://github.com/roots/bud/tree/stable/docs/config/publicPath.md)

## Usage

Set the public path:

```js
bud.setPublicPath("/app/themes/sage/dist");
```
