# bud.dev

Configure the `@roots/bud` development server.

## Server information

By default the server is available in `development` mode at this address:

| Property   | Value     |
| ---------- | --------- |
| host       | localhost |
| port       | 3000      |
| publicPath | `/`       |

These default values are customizable using this function, `bud.dev`. You will need to handle adding the `vhost` yourself.

## Usage

```ts
bud.dev({
  host: 'my-local-site.example',
  port: 5000,
})
```

## Proxying

Users building on top of an existing backend framework like WordPress, Laravel, RoR, etc. will likely want to proxy their established development server.

Bud has a function specfically for configuring a proxy server: [`bud.proxy`](docs:config/proxy). But you may also configure the proxy from `bud.dev` if desired.

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
