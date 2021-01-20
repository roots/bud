---
description: Extending Bud
---

## Adding an extension

First, install the extension.

Once installed, [bud.use](config-use.md) is used to register the extension with Bud.

```js
bud.use([require('@roots/bud-sass')])
```

## Configuring an extension

Some extensions may add additional configuration functions to the `bud` object. Refer to the extension documentation for possible details.

## First-party extensions

| Name                           | Description            | Package                                                                                                   |
| ------------------------------ | ---------------------- | --------------------------------------------------------------------------------------------------------- |
| @roots/bud-babel               | Babel support.         | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-entrypoints         | Asset manifest.        | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)         |
| @roots/bud-eslint              | Adds eslint support.   | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)              |
| @roots/bud-imagemin            | Compress image assets  | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)            |
| @roots/bud-library             | DLL support            | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)             |
| @roots/bud-postcss             | PostCss support.       | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)             |
| @roots/bud-purgecss            | PurgeCss support.      | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)            |
| @roots/bud-react               | React support.         | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-sass                | Sass support.          | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                |
| @roots/bud-stylelint           | Stylelint support.     | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)           |
| @roots/bud-tailwindcss         | Tailwindcss support.   | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)         |
| @roots/bud-terser              | Terser support.        | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)              |
| @roots/bud-typescript          | TypeScript support.    | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)          |
| @roots/bud-vue                 | Vue framework support. | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                 |
| @roots/bud-wordpress-externals | WP dependencies.       | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square) |
| @roots/bud-wordpress-manifests | WP asset manifest.     | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square) |
