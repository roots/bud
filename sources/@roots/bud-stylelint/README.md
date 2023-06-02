<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-stylelint</strong></h1>

<p align="center">
  Adds stylelint support to Bud
</p>

---

## Installation

Install **@roots/bud-stylelint** to your project.

Yarn:

```sh
yarn add @roots/bud-stylelint --dev
```

npm:

```sh
npm install @roots/bud-stylelint --save-dev
```

## configuration

You can configure Stylelint in two ways:

- [Using a stylelint config file](#using-a-stylelint-config-file)
- [Employing the `bud.stylelint` API](#configuring-stylelint-with-budstylelint)

### Using a stylelint config file

You can configure stylelint [using a stylelint config file](https://stylelint.io/user-guide/configure).

bud.js allows for you to write your stylelint config in CommonJS, ESM, TypeScript, JSON or YML. This file should be placed in the root of your project or the project `./config` directory.

```js title=stylelint.config.js
export default {
  extends: [`@roots/bud-stylelint/config`],
  rules: { "no-descending-specificity": null },
};
```

### Configuring stylelint with `bud.stylelint`

You can configure stylelint directly in `bud.config.js` using the `bud.stylelint` API.

```ts title=bud.config.js
bud.stylelint
  .extends([`@roots/bud-stylelint/config`])
  .setRules({ "no-descending-specificity": null })
  .setFailOnError(bud.isProduction)
  .setFailOnWarning(false)
  .setFix(true);
```

### Extends

You can extend a stylelint config by passing an array of stylelint config files to `bud.stylelint.extends`.

```ts title=bud.config.js
bud.stylelint.extends([`@roots/bud-stylelint/config`]);
```

### Rules

You can set stylelint rules by passing an object to `bud.stylelint.setRules`.

```ts title=bud.config.js
bud.stylelint.setRules({ "no-descending-specificity": null });
```

### Fail on error

By default, stylelint will fail on error in production mode. You can change this behavior by setting
`bud.stylelint.failOnError` to `false`.

```ts title=bud.config.js
bud.stylelint.setFailOnError(false);
```

### Fail on warning

By default, stylelint will not fail on warning. You can change this behavior by setting
`bud.stylelint.failOnWarning` to `true`.

```ts title=bud.config.js
bud.stylelint.setFailOnWarning(true);
```

### Fix

By default, stylelint will not fix errors. You can change this behavior by setting
`bud.stylelint.fix` to `true`.

```ts title=bud.config.js
bud.stylelint.setFix(true);
```

### Stylelint path

By default, bud.js will use the stylelint version installed in your project if it is installed. Otherwise it will fallback to the version included with the extension.
You can specify an explicit path to the stylelint binary by setting `bud.stylelint.stylelintPath`.

```ts title=bud.config.js
bud.stylelint.setStylelintPath("/path/to/stylelint");
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-stylelint is licensed under MIT.

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
