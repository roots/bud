<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
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

## License

@roots/bud-vue is licensed under MIT.
