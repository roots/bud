<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-react</strong></h1>

<p align="center">
  React support for @roots/bud projects.
</p>

---

## Installation

Install **@roots/bud-react** to your project.

Yarn:

```sh
yarn add @roots/bud-react --dev
```

npm:

```sh
npm install @roots/bud-react --save-dev
```

## Usage

### React Refresh

`@roots/bud-react` enables [react-refresh](https://www.npmjs.com/package/react-refresh) in development automatically. It uses [@pmmmwh/react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin).

For usage guidance, consult [the react-refresh-webpack-plugin API documentation](https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/API.md).

### Configuring react-refresh

To enable react-refresh:

```ts
bud.react.refresh.enable();
```

To disable react-refresh:

```ts
bud.react.refresh.disable();
```

Any react-refresh-webpack-plugin options can can be passed using an object to `bud.react.refresh.configure`:

```ts
bud.react.refresh.configure({ forceEnable: true });
```

Again, consult the [react-refresh-webpack-plugin documentation for guidance on how these options work](https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/API.md#reactrefreshpluginoptions).

### react-refresh compatibility

react-refresh is fully compatible with `@roots/bud-babel`. This is the integration that is supported out-of-the-box.

#### TypeScript

If you are using `@roots/bud-typescript` and have configured it to not use babel:

```ts
bud.typescript.useBabel(false);
```

then the `react-refresh-typescript` transformer will be automatically enabled. To disable this:

```ts
bud.react.refresh.disable();
```

#### SWC

This is not currently supported but will be in the near future.

#### ESBuild

There isn't currently any support for esbuild mentioned in the react-refresh-webpack-plugin documentation.

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-react is licensed under MIT.

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
<a href="https://www.c21redwood.com/">
<img src="https://cdn.roots.io/app/uploads/c21redwood.svg" alt="C21 Redwood Realty" width="200" height="150"/>
</a>
<a href="https://wordpress.com/">
<img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="200" height="150"/>
</a>
<a href="https://pantheon.io/">
<img src="https://cdn.roots.io/app/uploads/pantheon.svg" alt="Pantheon" width="200" height="150"/>
</a>
