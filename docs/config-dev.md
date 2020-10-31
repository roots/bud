---
description: Configure the Bud development server.
---

# bud.dev

Configure Bud's development server.

## Server information

By default the server is available in `development` mode at this address:

| Property   | Value     |
| ---------- | --------- |
| host       | localhost |
| port       | 3000      |
| publicPath | `/`       |

These default values are customizable using this function, `bud.dev`.

## Usage

```ts
bud.dev({
  host: 'my-local-site.example',
  port: 5000,
})
```

Users building on top of an existing backend framework like WordPress, Laravel, RoR, etc. will likely want to proxy their established development server. An example config for a hypothetical `example.test` domain might look like:

```js
bud.dev({
  host: 'localhost',
  port: 3000,
  proxy: {
    host: 'example.test',
    port: 8080,
  },
})
```

Users who's assets are not served from web root should specify the `publicPath` option. For instance, if your main JS file is accessed in a browser at `mysite.com/assets/app.js` your publicPath should be set to `assets`.

This example covers the typical publicPath of assets for a [@roots/sage](https://github.com/roots/sage) theme:

```ts
bud.dev({
  publicPath: 'app/themes/sage/dist',
})
```

## Signature

```ts
function (options: {
  host?: string
  port?: number
  proxy?: {
    host?: string
    port?: number
  }
  index?: WebpackDevMiddleware.Options['index']
  publicPath?: WebpackDevMiddleware.Options['publicPath']
  ssl?: ProxyOptions['ssl']
  secure?: ProxyOptions['secure']
  ws?: ProxyOptions['ws']
  autoRewrite?: ProxyOptions['autoRewrite']
  changeOrigin?: ProxyOptions['changeOrigin']
  disableHostCheck?: WebpackDevMiddleware.Options[]
  followRedirects?: ProxyOptions['followRedirects']
  filename?: WebpackDevMiddleware.Options['filename']
  headers?: WebpackDevMiddleware.Options['headers']
  methods?: WebpackDevMiddleware.Options['methods']
  writeToDisk?: WebpackDevMiddleware.Options['writeToDisk']
}): Framework.Bud
```

## Parameters

| Name                       | Type                                                     |
| -------------------------- | -------------------------------------------------------- |
| `options.host`             | The development server host                              |
| `options.port`             | The development server port                              |
| `options.proxy`            | Proxy destination                                        |
| `options.proxy.host`       | Proxy destination host                                   |
| `options.proxy.port`       | Proxy destination port                                   |
| `options.index`            | The index path for web server, defaults to "index.html". |
| `options.publicPath`       | The path that the middleware is bound to.                |
| `options.ssl`              | Object passed to https.createServer                      |
| `options.secure`           | Should SSL certificates be verified?                     |
| `options.ws`               | Should websockets be proxied?                            |
| `options.autoRewrite`      | Rewrite the host/port on (301/302/307/308) redirects.    |
| `options.changeOrigin`     | Change the origin of the host header to the target URL   |
| `options.disableHostCheck` | Escape hatch for Webpack's host check security feature.  |
| `options.followRedirects`  | Whether you want to follow proxied redirects             |
| `options.filename`         | Index filename                                           |
| `options.headers`          | Custom HTTP headers                                      |
| `options.methods`          | HTTP request methods accepted by the server.             |
| `options.writeToDisk`      | Should files be written to disk.                         |

## Returns

`Framework.Bud`: The Bud instance
