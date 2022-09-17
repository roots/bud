<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-sass</strong></h1>

<p align="center">
  Sass support for @roots/bud projects.
</p>

---

## Installation

Install **@roots/bud-sass** to your project.

Yarn:

```sh
yarn add @roots/bud-sass --dev
```

npm:

```sh
npm install @roots/bud-sass --save-dev
```

## Usage

### Basics

After installation, sass will automatically preprocess any `.scss` or `.sass` modules in your project with sass.

Additionally, if [@roots/bud-postcss](https://bud.js.org/extensions/bud-postcss) is available, postcss will be applied to your `.scss` and `.sass` source files.

If you are using [@roots/bud-preset-recommend](https://bud.js.org/extensions/bud-preset-recommend), [@roots/bud-preset-wordpress](https://bud.js.org/extensions/bud-preset-wordpress), or [@roots/sage](https://bud.js.org/extensions/sage) then postcss is automatically applied.

### Global Imports

Use the `bud.sass.importGlobal` function to ensure a module is made available throughout your sass stylesheets, regardless of scope.

```ts
bud.sass.importGlobal("@src/styles/variables");
```

If you have more than one stylesheet to import, you may use an array:

```ts
bud.sass.importGlobal([
  "@src/styles/variables",
  "@src/styles/mixins",
  "@src/styles/functions",
]);
```

### Global Values

Use the `bud.sass.registerGlobal` function to ensure global styles are made available throughout your sass stylesheets, regardless of scope.

This function differs from `bud.sass.importGlobal` in that it can be passed arbitrary values.

```ts
bud.sass.registerGlobal("$foo: rgba(0, 0, 0, 1);");
```

If you want to divide these values up using an array, you may do so.

```ts
bud.sass.registerGlobal([
  "$foo: rgba(0, 0, 0, 1);",
  "$bar: rgba(255, 255, 255, 1);",
]);
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-sass is licensed under MIT.

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
