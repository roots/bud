<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-swc</strong></h1>

<p align="center">
  SWC transpilation extension for Bud projects
</p>

---

## Installation

Install **@roots/bud-swc** to your project.

Yarn:

```sh
yarn add @roots/bud-swc --dev
```

npm:

```sh
npm install @roots/bud-swc --save-dev
```

## Configuration

### .swcrc

Including a `.swcrc` config file in the root of your project will replace all default options.

Be aware that extensions may still modify the options even if you use `.swcrc`. For example, [@roots/bud-react](https://bud.js.org/extensions/bud-react) will modify the `jsc.transform` option to support react refresh if `bud.react.refresh` is enabled.

### API

You can modify swc options directly using `bud.swc`. These options are passed in more or less directly to swc-loader.

```ts
bud.swc.set(`jsc.parser.dynamicImport`, false);
```

```ts
bud.swc.setOptions((options) => ({
  ...options,
  jsc: {
    ...(options?.jsc ?? {}),
    parser: {
      ...(options?.jsc?.parser ?? {}),
      dynamicImports: false,
    },
  },
}));
```

## Typechecking

`@roots/bud-swc` does not currently support typechecking during compilation as swc does not natively support it yet.

Our recommendation is to run typechecking as a separate process. You can use `tsc` directly: `tsc --noEmit`.

You could also add the `fork-ts-webpack-plugin`.

Subscribe to [swc-project/swc#571](https://github.com/swc-project/swc/issues/571) for more information on where swc-project is at with its typecheck implementation.

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-swc is licensed under MIT.

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
