---
description: Configure the Bud development server.
---

# bud.dev

Configure Bud's default development server.

There are plenty of options here but to get started you can just call `bud.dev()`.

In order to enable hot module reloading, include the `--hot` flag in the terminal invocation or enable with the `hot` option..

## Usage

```js
bud.dev({
  hot: true,
  host: 'localhost',
  port: 5000,
})
```

WordPress users will need to proxy their exiting content. An example config might look like:

```js
bud.dev({
  hot: true,
  host: 'localhost',
  port: 3000,
  from: {
    host: 'example.test', // for existing example.test wp install
    port: 8080, // served over http
  },
})
```

## Signature

```ts
function ({
  /**
   * The development server host
   * @example example.test
   */
  host?: string

  /**
   * The development server port
   * @example 3000
   */
  port?: number

  /**
   * Proxy origin
   */
  from?: {
    /**
     * Proxy origin host
     * @example example.test
     */
    host?: string

    /**
     * Proxy origin port
     * @example 8080
     */
    port?: number
  }

  /**
   * Proxy destination
   */
  to?: {
    /**
     * Proxy destination host
     * @example localhost
     */
    host?: string

    /**
     * Proxy destination port
     * @example 3000
     */
    port?: number
  }

  /**
   * The index path for web server, defaults to "index.html".
   */
  index?: WebpackDevMiddleware.Options['index']

  /**
   * Should hot middleware be used?
   */
  hot?: boolean

  /**
   * The public path that the middleware is bound to.
   */
  publicPath?: WebpackDevMiddleware.Options['publicPath']

  /**
   * Proxy setting: object passed to  https.createServer
   */
  ssl?: ProxyOptions['ssl']

  /**
   * Proxy setting: set to true to verify SSL certificates
   */
  secure?: ProxyOptions['secure']

  /**
   * Proxy setting: proxy websockets.
   */
  ws?: ProxyOptions['ws']

  /**
   * Proxy setting: rewrite the location host/port on (301/302/307/308) redirects based on requested host/port.
   */
  autoRewrite?: ProxyOptions['autoRewrite']

  /**
   * Proxy setting: change the origin of the host header to the target URL
   */
  changeOrigin?: ProxyOptions['changeOrigin']

  disableHostCheck?: WebpackDevMiddleware.Options[]

  /**
   * Proxy setting: specify whether you want to follow redirects
   */
  followRedirects?: ProxyOptions['followRedirects']

  /**
   * Filename to serve as index.
   */
  filename?: WebpackDevMiddleware.Options['filename']

  /**
   * This property allows a user to pass custom HTTP headers on each request. eg. { "X-Custom-Header": "yes" }
   */
  headers?: WebpackDevMiddleware.Options['headers']

  /**
   * This option instructs the module to operate in 'lazy' mode,
   * meaning that it won't recompile when files change, but rather on each request.
   */
  lazy?: WebpackDevMiddleware.Options['lazy']

  /**
   * This property allows a user to pass the list of HTTP request methods accepted by the server.
   * @default [ 'GET', 'HEAD' ]
   */
  methods?: WebpackDevMiddleware.Options['methods']

  /**
   * This property allows a user to register custom mime types or extension mappings
   * @default null
   */
  mimeTypes?:
    | WebpackDevMiddleware.MimeTypeMap
    | WebpackDevMiddleware.OverrideMimeTypeMap
    | null

  /**
   * Instructs the module to enable or disable the server-side rendering mode
   */
  serverSideRender?: WebpackDevMiddleware.Options['serverSideRender']

  /**
   * Specify polling, etc.
   */
  watchOptions?: WebpackOptions.WatchOptions

  /**
   * If true, the option will instruct the module to write files to the configured location on disk as specified in your webpack config file
   * This option also accepts a Function value, which can be used to filter which files are written to disk
   */
  writeToDisk?: WebpackDevMiddleware.Options['writeToDisk']
}): Bud
```

## Parameters

| Name   | Type   |
| ------ | ------ |
| `options` | development server options |

## Returns

The Bud instance
