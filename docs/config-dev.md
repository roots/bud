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

These default values are customizable using this function, `bud.dev`. You will need to handle resolving the domain yourself.

## Usage

```ts
bud.dev({
  host: 'my-local-site.example',
  port: 5000,
})
```

## Proxying

Users building on top of an existing backend framework like WordPress, Laravel, RoR, etc. will likely want to proxy their established development server.

Bud has a function specfically for configuring a proxy server: [`bud.proxy`](/docs/config-proxy.md). But you may also configure the proxy from `bud.dev` if that works better for you.

```js
bud.dev({
  host: 'example.test',
  port: 3000,
  proxy: {
    host: 'example.test',
    port: 8080,
  },
})
```

The only advantage `bud.proxy` has is its optional `enabled` property -- which is used to explicitly toggle the proxy server on and off.

## Parameters

| Name                       | Type                                                     |
| -------------------------- | -------------------------------------------------------- |
| `options.host`             | Host host                                                |
| `options.port`             | Port                                                     |
| `options.proxy`            | Proxy destination                                        |
| `options.proxy.host`       | Proxy host                                               |
| `options.proxy.port`       | Proxy port port                                          |
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

## Signature

```ts
function (options: {
  host?: string
  port?: number
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
  proxy?: {
    host?: string
    port?: number
  }
}): Framework.Bud
```

## Returns

`Framework.Bud`: The Bud instance
