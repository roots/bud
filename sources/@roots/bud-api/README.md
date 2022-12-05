<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-api</strong></h1>

<p align="center">
  bud.js core module
</p>

---

## Installation

Install **@roots/bud-api** to your project.

Yarn:

```sh
yarn add @roots/bud-api --dev
```

npm:

```sh
npm install @roots/bud-api --save-dev
```

For a better reading experience refer to [bud.js.org/docs](https://bud.js.org/docs).

## bud.provide

**bud.provide** makes a variable or module available throughout the entire application

[💡 Documentation](https://bud.js.org/docs/bud.provide)

## bud.proxy

**bud.proxy** is a method that configures a proxy server for your development environment. This is useful when you need to proxy requests to a backend server, such as a WordPress site.

[💡 Documentation](https://bud.js.org/docs/bud.proxy)

### Options

You can pass a function to **bud.proxy** to manipulate all options. You must return them or the options will not be set!

```ts title='bud.config.ts'
bud.proxy((options = {}) => {
  options.target = "https://example.test";
  return options;
});
```

You can also pass an object to **bud.proxy** to set options. This will not overwrite unspecified defaults or options set elsewhere:

```ts title='bud.config.ts'
bud.proxy({
  target: "https://example.test",
  changeOrigin: false,
});
```

Options can be specified as a second parameter (instead of the URL replacement array):

```ts title='bud.config.ts'
bud.proxy("https://example.test", {
  changeOrigin: false,
});
```

### Usage

The following specifies that `$` is the default `jquery` export:

```js
bud.provide({ jquery: "$" });
```

Now, in any module in our application, we can invoke `jquery` with `$`. There is no need to import it.

```js
$(`#modal`); // it just works
```

If you have multiple references to resolve against a module, you can specify them with an array:

```js
bud.provide({
  jquery: ["$", "jQuery"],
});
```

### URL replacement

Instances of the proxy URL's base URL with the dev server's base URL in responses.
Otherwise, absolute URLs would still point to the proxied server.

This won't work for all setups. But, **bud.proxy** takes a second, optional parameter to customize this default behavior.

Each search/replace is expressed with a `tuple`. The first item is the
search string, and the second is the replacement:

```ts
const replacement = ["search string", "replace string"];
```

These are stored by **bud.js** as an array:

```ts
const replacements = [
  ["find", "replace"],
  ["find2", "replace2"],
];
```

You can add additional replacements using a callback:

```ts title='bud.config.ts'
bud.proxy("https://example.test", (replacements = []) => {
  replacements.push(["https://find.test", "https://replace.test"]);
  return replacements;
});
```

To fully ovewrite these search/replace tasks, you can pass the array
without a callback:

```ts title='bud.config.ts'
bud.proxy("https://example.test", [
  ["https://find.test", "https://replace.test"],
]);
```

### Usage

By default, **bud.proxy** will target `http://0.0.0.0`.

```ts title='bud.config.ts'
bud.proxy();
bud.proxy(true); // these are equivalent
```

The proxy can be disabled with `false`.

```ts bud.config.ts
bud.proxy(false);
```

You may use a `String` to set the proxy target:

```ts title='bud.config.ts'
bud.proxy("https://example.test");
```

Or, a `URL` object:

```ts title='bud.config.ts'
bud.proxy(new URL("https://example.test"));
```

### Available options

See documentation of available options in [the proxy middleware's README](https://github.com/chimurai/http-proxy-middleware#http-proxy-middleware).

Below are the available options and their default values:

| Option                | Type                                                                                                     | Default                                                                                                       | Description                                                                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| agent                 | [Agent](https://nodejs.org/api/http.html#http_class_http_agent)                                          | `undefined`                                                                                                   | The agent used for proxying                                                                                                          |
| auth                  | `string`                                                                                                 | `undefined`                                                                                                   | Basic authentication i.e. 'user:password' to compute an Authorization header                                                         |
| autoRewrite           | `boolean`                                                                                                | `true`                                                                                                        | Automatically rewrite the location host/port                                                                                         |
| buffer                | `Stream`                                                                                                 | `undefined`                                                                                                   | A writable stream to serve as the response buffer                                                                                    |
| changeOrigin          | `boolean`                                                                                                | `true`                                                                                                        | Changes the origin of the host header to the target URL                                                                              |
| cookieDomainRewrite   | `Record<string, string>`                                                                                 | key is host set by [bud.serve](https://bud.js.org/docs/bud.serve), value is the `target` host                 | Rewrite cookie domains                                                                                                               |
| cookiePathRewrite     | `Record<string, string>`                                                                                 | `undefined`                                                                                                   | Rewrite cookie paths                                                                                                                 |
| ejectPlugins          | `boolean`                                                                                                | `undefined`                                                                                                   | Ejects all plugins                                                                                                                   |
| followRedirects       | `boolean`                                                                                                | `false`                                                                                                       | Follow HTTP 3xx responses as redirects                                                                                               |
| forward               | `URL`                                                                                                    | `undefined`                                                                                                   | The URL to forward to.                                                                                                               |
| headers               | `Record<string, string>`                                                                                 | `undefined`                                                                                                   | Additional headers                                                                                                                   |
| hostRewrite           | `string`                                                                                                 | Set by [bud.serve](https://bud.js.org/docs/bud.serve)                                                         | Rewrites the location hostname on (301 / 302 / 307 / 308) redirects                                                                  |
| ignorePath            | `boolean`                                                                                                | `undefined`                                                                                                   | Ignore the proxy path of the incoming request                                                                                        |
| localAddress          | `string`                                                                                                 | `undefined`                                                                                                   | Local interface string to bind for outgoing connections                                                                              |
| logger                | `Console`                                                                                                | bud.js implementation                                                                                         | A logger object. Needs to implement `warn`, `info`, and `error`.                                                                     |
| on                    | [Proxy Events](https://github.com/chimurai/http-proxy-middleware#http-proxy-events)                      | bud.js implementation                                                                                         | Event listeners. Note that setting this option will unset `onProxyReq` and `onProxyRes`                                              |
| onProxyReq            | [ProxyReqCallback](https://github.com/chimurai/http-proxy-middleware#http-proxy-events)                  | bud.js implementation                                                                                         | Callback function to modify the proxy request                                                                                        |
| onProxyRes            | [ProxyResCallback](https://github.com/chimurai/http-proxy-middleware#http-proxy-events)                  | bud.js implementation                                                                                         | Callback function to modify the proxy response                                                                                       |
| pathFilter            | `Array<string>`                                                                                          | `['!/bud/**']`                                                                                                | Filters the paths to proxy                                                                                                           |
| pathRewrite           | `Record<string, string>`                                                                                 | `undefined`                                                                                                   | Rewrites the location path on (301 / 302 / 307 / 308) redirects                                                                      |
| plugins               | `Array<(proxyServer: HttpProxy, options: ServerOptions) => void>`                                        | `undefined`                                                                                                   | Array of plugins to apply to the proxy server                                                                                        |
| prependPath           | `boolean`                                                                                                | `undefined`                                                                                                   | Prepend the target's path to the proxy path                                                                                          |
| preserveHeaderKeyCase | `boolean`                                                                                                | `undefined`                                                                                                   | Preserve the case of response header keys                                                                                            |
| protocolRewrite       | `http` \| `https`                                                                                        | `https` if the protocol of the URL set by [bud.serve](https://bud.js.org/docs/bud.serve) resolved to `https:` | Rewrites the location protocol on (301 / 302 / 307 / 308) redirects                                                                  |
| proxyTimeout          | `number`                                                                                                 | `undefined`                                                                                                   | Specifies the number of milliseconds before the proxy times out                                                                      |
| replacements          | `Array<[string, string]>`                                                                                | A tuple with the `target` origin paired with the dev server origin                                            | Replaces `dev server url` with `proxy url` in the response body. This will never be called if `on` or `onProxyRequest` is overridden |
| router                | `Record<string, ProxyTargetUrl \| ProxyTarget>`                                                          | `undefined`                                                                                                   | A map of regular expressions (`string`) to proxy options                                                                             |
| secure                | `boolean`                                                                                                | `false`                                                                                                       | Verify that connection is secure                                                                                                     |
| selfHandleResponse    | `boolean`                                                                                                | `true`                                                                                                        | Self handle the response. If this is set to `true` (default) then the supplied `onProxyRes` must return a response                   |
| ssl                   | [HttpsServerOptions](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) | `undefined`                                                                                                   | SSL certificate options                                                                                                              |
| target                | `URL`                                                                                                    | `http://0.0.0.0`                                                                                              | The target URL                                                                                                                       |
| timeout               | `number`                                                                                                 | `undefined`                                                                                                   | Specifies the number of milliseconds before the proxy response times out                                                             |
| toProxy               | `boolean`                                                                                                | `true`                                                                                                        | Proxy to another server                                                                                                              |
| xfwd                  | `boolean`                                                                                                | `undefined`                                                                                                   | Adds x-forward headers                                                                                                               |
| ws                    | `boolean`                                                                                                | `undefined`                                                                                                   | Proxy websockets                                                                                                                     |

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-api is licensed under MIT.

## Community

Keep track of development and community news.

- Join us on Roots Slack by becoming a [GitHub
  sponsor](https://github.com/sponsors/roots)
- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)

## Sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://k-m.com/">
<img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"/>
</a>
<a href="https://carrot.com/">
<img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150"/>
</a>
<a href="https://wordpress.com/">
<img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="200" height="150"/>
</a>
<a href="https://pantheon.io/">
<img src="https://cdn.roots.io/app/uploads/pantheon.svg" alt="Pantheon" width="200" height="150"/>
</a>
