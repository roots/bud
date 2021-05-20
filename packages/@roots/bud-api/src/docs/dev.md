# bud.dev

Configure the `@roots/bud` development server.

## Server information

By default the server is available in `development` mode at this address:

| Property   | Value     |
| ---------- | --------- |
| host       | localhost |
| port       | 3000      |
| publicPath | `/`       |

These default values are customizable using this function, `bud.dev`. You will need to handle resolving custom domains yourself if you don't want to use localhost.

## Usage

```ts
bud.dev({
  host: 'my-local-site.example',
  port: 5000,
})
```

## Proxying

Users building on top of an existing backend framework like WordPress, Laravel, RoR, etc. will likely want to proxy their established development server.

Bud has a function specfically for configuring a proxy server: [`bud.proxy`](docs:config/proxy). But you may also configure the proxy from `bud.dev`, if desired.

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

## Middleware

You may enable or disable middleware using the middleware key.

Example disabling all server middleware:

```js
bud.dev({
  middleware: {
    dev: false,
    hot: false,
    proxy: false,
  },
})
```

## Browser development scripts

Bud comes with a logging utility and live reload indicators which run in the browser (in dev mode).

These can be toggled using the `browser` config options:

```js
bud.dev({
  browser: {
    log?: boolean
    indicator?: boolean
    overlay?: boolean
  }
})
```

- `log` will enable/disable the logger.
- `indicator` will enable/disable the live reload indicator.
- `overlay` will enable/disable the error overlay.
