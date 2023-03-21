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

## API

For full documentation refer to [bud.js.org/docs](https://bud.js.org/docs).

### bud.assets

Include static assets in your compilation even if they aren't referenced in scripts or stylesheets.

### bud.compilePaths

**bud.compilePaths** is used to specify directories which should be treated as source directories.

If you have errors which say something along the lines of `You may need an appropriate loader to handle this file type, currently no
loaders are configured to process this file.`, this is probably the function you want to use to fix that!

By default, **bud.js** treats code outside of [the `@src` directory](https://bud.js.org/docs/bud.path) (likely modules downloaded via npm or yarn) as code that has already been bundled by some other means. This is a huge performance boost for your project! If that code was already compiled by the package author it would be a waste of time and energy to compile it again.

However, some authors may publish uncompiled source code with the expectation that you will transpile it as part of your build process. This function simplifies the process of configuring **bud.js** to handle these cases.

### bud.config

**bud.config** allows you to extend or modify the default Webpack configuration for your project.

### bud.copyDir

**bud.copyDir** copies a directory to the [@dist directory](https://bud.js.org/docs/bud.path).

### bud.copyFile

**bud.copyFile** copies a file to the [@dist directory](https://bud.js.org/docs/bud.path).

### bud.define

**bud.define** replaces variables in your application code and html templates at compile time.

### bud.entry

**bud.entry** is used to specify and group assets to include in the compilation.

If no entrypoint is provided **bud.js** will attempt to compile **src/index.js** to **dist/main.js**.

### bud.html

**bud.html** is used to configure your application's HTML wrapper.

### bud.provide

**bud.provide** makes a variable or module available throughout the entire application.

### bud.proxy

**bud.proxy** is a method that configures a proxy server for your development environment. This is useful when you need to proxy requests to a backend server, such as a WordPress site.

If you only need to modify the [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) of the proxy server you should consider using [bud.setProxyUrl](https://bud.js.org/docs/bud.setProxyUrl) and [bud.setPublicProxyUrl](https://bud.js.org/docs/bud.setPublicProxyUrl).

### bud.serve

**bud.serve** is used to configure the development server.

You don't need to call this function unless you want to change the default server configuration.

If you only need to modify the [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) of the dev server you should consider using [bud.setUrl](https://bud.js.org/docs/bud.setUrl) and [bud.setPublicUrl](https://bud.js.org/docs/bud.setPublicUrl)

### bud.setProxyUrl

**bud.setProxyUrl** is used to specify the URL of the proxy target.

### bud.setPublicProxyUrl

**bud.setPublicProxyUrl** is used to specify the site-accessible URL for the proxy server (if it differs from the internal URL).

For example: a dockerized app that has a service which needs to be accessible from the host at `http://example.test` but serves over `http://0.0.0.0`.

### bud.setUrl

**bud.setUrl** is used to specify the URL for the dev server.

### bud.setPublicUrl

**bud.setPublicUrl** is used to specify the site-accessible URL for the dev server (if it differs from the internal URL).

For example: a dockerized app that needs to be accessible from the host at `http://example.test` but serves over `http://0.0.0.0:8080`.

### bud.watch

**bud.watch** is used to specify files which will trigger a full browser reload when changed.

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

**Bud** is an open source project and completely free to use.

However, the amount of effort needed to maintain and develop new features and projects within the Roots ecosystem is not sustainable without proper financial backing. If you have the capability, please consider [sponsoring Roots](https://github.com/sponsors/roots).

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
<a href="https://worksitesafety.ca/careers/">
<img src="https://cdn.roots.io/app/uploads/worksite-safety.svg" alt="Worksite Safety" width="200" height="150"/>
</a>
<a href="https://www.copiadigital.com/">
<img src="https://cdn.roots.io/app/uploads/copia-digital.svg" alt="Copia Digital" width="200" height="150"/>
</a>
