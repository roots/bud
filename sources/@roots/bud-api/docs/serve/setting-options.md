---
title: Options
---

**bud.serve** also supports an options object for more specific configurations:

```ts title=bud.config.ts
bud.serve({
  host: `dev.example.test`,
})
```

You can also pass `options` as a second parameter to `bud.serve`. This can be convenient when you want to specify _some_ options but want to keep the simple configuration syntax for the rest:

```ts title=bud.config.ts
bud.serve(`https://dev.example.test`, {
  cert: bud.path('example.test.crt'),
  key: bud.path('example.test.key'),
})
```

### All options

| Property | Type                                                        | Description                                                                      |
| -------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------- |
| host     | `string`                                                    | [URL['hostname']](https://developer.mozilla.org/en-US/docs/Web/API/URL/hostname) |
| port     | `number`                                                    | [URL['port']](https://developer.mozilla.org/en-US/docs/Web/API/URL/port)         |
| url      | [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) | [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)                      |
| ssl      | `boolean`                                                   | Is the server `https` enabled?                                                   |
| cert     | `string`                                                    | The ssl certificate path                                                         |
| key      | `string`                                                    | The ssl key path                                                                 |
| options  | [`Https.ServerOptions`](https://nodejs.org/api/https.html)  | Direct access to the server options                                              |

### Setting the origin

You can use `host` and `port` to set the server origin:

```ts title=bud.config.ts
bud.serve({
  host: 'dev.example.test',
  port: 3000,
})
```

Alternatively, you can set the origin with a using the `url` property:

```ts title=bud.config.ts
bud.serve({
  url: new URL('http://dev.example.test:3000'),
})
```

### SSL

Use the `ssl` option to indicate that the server should be `https` enabled. This requires that `cert` and `key` options to be set as well.

```ts title=bud.config.ts
bud.serve({
  ssl: true,
  host: 'dev.example.test',
  cert: bud.path('example.test.crt'),
  key: bud.path('example.test.key'),
})
```

Note in the example above that the `cert` and `key` are paths. This is different than [the Node API](https://nodejs.org/api/https.html), which both expect a [Buffer](https://nodejs.org/api/buffer.html).

You don't need to include `ssl` if you are using the `url` property. It will be inferred from the URL's protocol.

### Using the Node API

If you want to use [the node API](https://nodejs.org/api/https.html) more directly you can use the `options` property:

```ts title=bud.config.ts
const cert = await bud.fs.read('example.test.crt')
const key = await bud.fs.read('example.test.key')

bud.serve(`https://dev.example.test`, {
  options: {cert, key},
})
```
