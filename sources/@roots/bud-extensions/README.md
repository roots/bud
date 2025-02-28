<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-extensions</strong></h1>

<p align="center">
  bud.js core module
</p>

---

## Installation

Install **@roots/bud-extensions** to your project.

Yarn:

```sh
yarn add @roots/bud-extensions --dev
```

npm:

```sh
npm install @roots/bud-extensions --save-dev
```

## Exports

| label                                                       | description                                                                                                       | exposed |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------- |
| @roots/bud-extensions/cdn                                   | Adds remote import functionality                                                                                  | bud.cdn |
| @roots/bud-extensions/esm                                   | Adds ESM support functionality                                                                                    | bud.esm |
| @roots/bud-extensions/clean-webpack-plugin                  | Cleans output directory on build                                                                                  |         |
| @roots/bud-extensions/copy-webpack-plugin                   | Copies assets (used by [bud.assets](https://bud.js.org/docs/bud.assets))                                          |         |
| @roots/bud-extensions/fix-style-only-entrypoints            | Removes JS output from entrypoints which only contain CSS                                                         |         |
| @roots/bud-extensions/html-webpack-plugin                   | HTML functionality (used by [bud.html](https://bud.js.org/docs/bud.html))                                         |         |
| @roots/bud-extensions/interpolate-html-webpack-plugin       | Adds `create-react-app`-like template variable support for HTML files                                             |         |
| @roots/bud-extensions/mini-css-extract-plugin               | Optimized CSS loading                                                                                             |         |
| @roots/bud-extensions/webpack-define-plugin                 | Defines variables which can be used in the application (used by [bud.define](https://bud.js.org/docs/bud.define)) |         |
| @roots/bud-extensions/webpack-hot-module-replacement-plugin | Adds HMR support                                                                                                  |         |
| @roots/bud-extensions/webpack-manifest-plugin               | Emits `manifest.json`                                                                                             |         |
| @roots/bud-extensions/webpack-provide-plugin                | Provides import(s) globally to the application                                                                    |         |

## License

@roots/bud-extensions is licensed under MIT.
