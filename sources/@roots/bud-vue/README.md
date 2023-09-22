<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-vue</strong></h1>

<p align="center">
  Adds @vue/vue support to @roots/bud projects
</p>

---

## Installation

Install **@roots/bud-vue** to your project.

Yarn:

```sh
yarn add @roots/bud-vue --dev
```

npm:

```sh
npm install @roots/bud-vue --save-dev
```

## Usage

Once installed, vue should be ready to use in your project. The extension is pre-configured to support Vue 3 single file components (runtime only).

## Disabling runtime only

You can disable the `runtimeOnly` default by adding the following to your config:

```js
export default async (bud) => {
  bud.vue.setRuntimeOnly(false);
};
```

## Compatible transpilers

Developers using JS may wish to consider installing [@roots/bud-babel](https://bud.js.org/extensions/bud-babel) to handle code transforms that are not specific to vue.

For typescript language support, install [@roots/bud-typescript](https://bud.js.org/extensions/bud-typescript) as a peer dependency.

For scss support, install [@roots/bud-sass](https://bud.js.org/extensions/bud-sass) as a peer dependency.

## Using Vue 2

If you are trying to configure **@roots/bud-vue** for use with Vue 2 you will need to install a version of [vue](https://www.npmjs.com/package/vue/v/2.6.14) tagged `legacy` and a compatible version of the [vue-loader](https://www.npmjs.com/package/vue-loader) and [vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler) packages.

If a custom version of vue is included in the project package.json the extension will automatically detect it and configure itself accordingly.

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-vue is licensed under MIT.

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
<a href="https://www.freave.com/">
<img src="https://cdn.roots.io/app/uploads/freave.svg" alt="Freave" width="200" height="150"/>
</a>
