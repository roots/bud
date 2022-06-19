<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-typescript</strong></h1>

<p align="center">
  Adds Typescript support to Bud.
</p>

---

## Installation

Install **@roots/bud-typescript** to your project.

Yarn:

```sh
yarn add @roots/bud-typescript --dev
```

npm:

```sh
npm install @roots/bud-typescript --save-dev
```

## Usage

### Typechecking

:::info

This step is optional but recommended.

:::

:::danger Known issue

**`bud.typescript.typecheck.enable()` will die when using `ts-bud`**

It is unclear what the problem is as of right now ([see #1480](https://github.com/roots/bud/issues/1480)). **In order to enable typechecking you must author your config file in JS until this is resolved.**

:::

By default TypeScript files will only be compiled to JS during builds.
If you also want typechecking, you can enable it in your bud configuration:

```js title="bud.config.mjs"
bud.typescript.typecheck.enable();
```

### Usage

If you are authoring your config file in TypeScript you must use the `ts-bud` command instead of `bud`.

General ts configuration is handled using a standard **tsconfig.json** in your project root. See [the TypeScript docs on tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for more information.

There is a base tsconfig available for you to extend:

```json title="tsconfig.json"
{
  "extends": "@roots/bud-typescript/tsconfig/tsconfig.json"
}
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-typescript is licensed under MIT.

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
