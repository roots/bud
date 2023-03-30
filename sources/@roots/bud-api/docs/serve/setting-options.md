---
title: Options
---

**bud.serve** also supports an options object for more specific configurations:

```ts title='bud.config.js'
bud.serve({
  host: `dev.example.test`,
})
```

You can also pass `options` as a second parameter to `bud.serve`. This can be convenient when you want to specify _some_ options but want to keep the simple configuration syntax for the rest:

```ts title='bud.config.js'
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
| cert     | `string`                                                    | The SSL certificate path                                                         |
| key      | `string`                                                    | The SSL key path                                                                 |
| options  | [`Https.ServerOptions`](https://nodejs.org/api/https.html)  | Direct access to the server options                                              |

### Setting the origin

You can use `host` and `port` to set the server origin:

```ts title='bud.config.js'
bud.serve({
  host: 'dev.example.test',
  port: 3000,
})
```

Alternatively, you can set the origin with a using the `url` property:

```ts title='bud.config.js'
bud.serve({
  url: new URL('http://dev.example.test:3000'),
})
```

### SSL

Use the `ssl` option to indicate that the server should be `https` enabled. This requires that `cert` and `key` options to be set as well.

```ts title='bud.config.js'
bud.serve({
  ssl: true,
  host: 'dev.example.test',
  cert: bud.path('example.test.crt'),
  key: bud.path('example.test.key'),
})
```

Note in the example above that the `cert` and `key` are paths. This is different than [the Node API](https://nodejs.org/api/https.html), which both expect a [Buffer](https://nodejs.org/api/buffer.html). If you don't already have a certificate and key available (likely the case in local development), see the section on the subject below.

You don't need to include `ssl` if you are using the `url` property. It will be inferred from the URL's protocol.

#### Generating an SSL certificate and key for local development

You can use [`mkcert`][mkcert-repo] to quickly (yes, quickly!) generate an SSL cert and key (for local development only).

In short, that might look something like this if you're on macOS and want to use the default `0.0.0.0` aka `localhost` setting:

```sh
brew install mkcert
mkcert -install 
mkcert localhost
```

The above commands should result in the creation of two `.pem` files in your current directory -- **make sure to add `*.pem` to your `.gitignore` if it's not already there!**

Then you can specify those files in your config:

```ts title='bud.config.js'
bud.serve({
  ssl: true,
  host: 'localhost',
  port: 3000,
  cert: bud.path('localhost.pem'),
  key: bud.path('localhost-key.pem'),
})
```

For more info, check out the "How to use HTTPS for local development" [tutorial from the Google Chrome Developer Relations team on `web.dev`][mkcert-guide]. 

[mkcert-repo]: https://github.com/FiloSottile/mkcert
[mkcert-guide]: https://web.dev/how-to-use-local-https/

### Using the Node API

If you want to use [the node API](https://nodejs.org/api/https.html) more directly you can use the `options` property:

```ts title='bud.config.js'
const cert = await bud.fs.read('example.test.crt')
const key = await bud.fs.read('example.test.key')

bud.serve(`https://dev.example.test`, {
  options: {cert, key},
})
```
