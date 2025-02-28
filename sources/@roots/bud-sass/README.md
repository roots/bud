<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
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

## Basic usage

After installation, sass will automatically preprocess any `.scss` or `.sass` modules in your project with sass.

Additionally, if [@roots/bud-postcss](https://bud.js.org/extensions/bud-postcss) is available, postcss will be applied to your `.scss` and `.sass` source files.

If you are using [@roots/bud-preset-recommend](https://bud.js.org/extensions/bud-preset-recommend), [@roots/bud-preset-wordpress](https://bud.js.org/extensions/bud-preset-wordpress), or [@roots/sage](https://bud.js.org/extensions/sage) then postcss is automatically applied.

## Global imports

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

## Global values

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

## URL imports

When using `@roots/bud-sass`, you will find that the `url()` function is not working as expected. This is because the `url()` function is relative to the target file, not the source file and Sass does not support url rewriting.

A few options are available to work around this.

### Strategies

#### prefix with `~`

The `~` prefix is a convention used to indicate that the path should be resolved by webpack. It works with [aliases](https://bud.js.org/docs/bud.alias).

Let's say you have an alias set up for `@fonts`:

```scss
url(~@fonts/muh-font.woff)
```

#### use an absolute path

bud.js will resolve absolute paths to whatever you have set as the `@src` directory.

```scss
url(/fonts/muh-font.woff)
```

#### use a relative path

This is the simplest option to understand and the most annoying to maintain. It is on you to ensure that the relative path is correct.

```scss
url(../fonts/muh-font.woff)
```

## License

@roots/bud-sass is licensed under MIT.
