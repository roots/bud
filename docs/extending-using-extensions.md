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

| Name                           | Description            | Usage                                              | Package                                                                                                   |
| ------------------------------ | ---------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| @roots/bud-babel               | Babel support.         | [README ↗](packages/extension-babel)               | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-entrypoints         | Asset manifest.        | [README ↗](packages/extension-entrypoints)         | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)         |
| @roots/bud-eslint              | Adds eslint support.   | [README ↗](packages/extension-eslint)              | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)              |
| @roots/bud-imagemin            | Compress image assets  | [README ↗](packages/extension-imagemin)            | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)            |
| @roots/bud-library             | DLL support            | [README ↗](packages/extension-library)             | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)             |
| @roots/bud-postcss             | PostCss support.       | [README ↗](packages/extension-postcss)             | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)             |
| @roots/bud-purgecss            | PurgeCss support.      | [README ↗](packages/extension-purgecss)            | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)            |
| @roots/bud-react               | React support.         | [README ↗](packages/extension-react)               | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)               |
| @roots/bud-sass                | Sass support.          | [README ↗](packages/extension-sass)                | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                |
| @roots/bud-stylelint           | Stylelint support.     | [README ↗](packages/extension-stylelint)           | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)           |
| @roots/bud-tailwindcss         | Tailwindcss support.   | [README ↗](packages/extension-tailwindcss)         | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)         |
| @roots/bud-terser              | Terser support.        | [README ↗](packages/extension-terser)              | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)              |
| @roots/bud-typescript          | TypeScript support.    | [README ↗](packages/extension-typescript)          | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)          |
| @roots/bud-vue                 | Vue framework support. | [README ↗](packages/extension-vue)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                 |
| @roots/bud-wordpress-externals | WP dependencies.       | [README ↗](packages/extension-wordpress-externals) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square) |
| @roots/bud-wordpress-manifests | WP asset manifest.     | [README ↗](packages/extension-wordpress-manifests) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square) |
