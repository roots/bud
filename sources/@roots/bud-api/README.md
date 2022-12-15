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

### bud.entry

**bud.entry** is used to specify and group assets to include in the compilation.

If no entrypoint is provided **bud.js** will attempt to compile **src/index.js** to **dist/main.js**.

### bud.html

**bud.html** is used to configure your application's HTML wrapper.

### bud.provide

**bud.provide** makes a variable or module available throughout the entire application.

### bud.proxy

**bud.proxy** is a method that configures a proxy server for your development environment. This is useful when you need to proxy requests to a backend server, such as a WordPress site.

### bud.serve

**bud.serve** is used to configure the development server.

You don't need to call this function unless you want to change the default server configuration.

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
