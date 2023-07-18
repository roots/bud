<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>bud.js</strong></h1>

<p align="center">
  Configurable, extensible build tools for modern single and multi-page web applications
</p>

---

## What is bud.js?

Configurable, extensible build tools for modern single and multi-page web applications.

### Goals

**bud.js** wants to be:

- **Reliable**, yielding consistent and predictable behaviors regardless of specified options.
- **Fast**, leveraging parallel processing, smart caching and an asyncronous events based API to keep build times minimal.
- **Extensible**, with a fully featured plugin system to support an ecosystem of packaged modules
- **Simple**, to get started and straight forward to maintain

### Features

- Zero config by default. Check out this [codesandbox template with react, postcss modules and no config](https://codesandbox.io/s/bud-zero-config-or4tby).
- Modular by design. Use only what you need.
- Multi-compiler support.
- Heckin&rsquo; fast.
- Lux developer tooling and semi-automated dependency management.
- Support for configuration files authored with TypeScript, JSON, YML, CJS and ESM.
- Support for CDNs like skypack and unpkg.
- Customizable and extensible.

## Requirements

- Node 16+
- yarn 1.22 or higher
- npm 8.3 or higher
- Windows users must run **bud.js** under the Windows Subsystem for Linux.

## Getting started

Quickly scaffold a new project with `create-bud-app`:

> npx create-bud-app

If you want to add bud.js to an existing project or want to further customize the scaffolded app check out the [Getting Started guide](https://bud.js.org/guides/getting-started).

There are [many example implementations available](https://github.com/roots/bud/tree/master/examples).

## Modules

### Presets

| Name                                                                                                          | Usage                                                                  | Latest                                                                                                 |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-preset-recommend**](https://github.com/roots/bud/tree/main/sources/@roots/bud-preset-recommend) | [📚 Usage](https://bud.js.org/extensions/presets/bud-preset-recommend) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-recommend.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-preset-wordpress**](https://github.com/roots/bud/tree/main/sources/@roots/bud-preset-wordpress) | [📚 Usage](https://bud.js.org/extensions/presets/bud-preset-wordpress) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-wordpress.svg?color=%23525ddc&style=flat-square) |
| [**@roots/sage**](https://github.com/roots/bud/tree/main/sources/@roots/sage)                                 | [📚 Usage](https://bud.js.org/extensions/presets/sage)                 | ![npm](https://img.shields.io/npm/v/@roots/sage.svg?color=%23525ddc&style=flat-square)                 |

### Extensions

| Name                                                                                                                              | Usage                                                                     | Latest                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-babel**](https://github.com/roots/bud/tree/main/sources/@roots/bud-babel)                                           | [📚 Usage](https://bud.js.org/extensions/bud-babel/)                      | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-compress**](https://github.com/roots/bud/tree/main/sources/@roots/bud-compress)                                     | [📚 Usage](https://bud.js.org/extensions/bud-compress/)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-compress.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-criticalcss**](https://github.com/roots/bud/tree/main/sources/@roots/bud-criticalcss)                               | [📚 Usage](https://bud.js.org/extensions/bud-criticalcss/)                | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-emotion**](https://github.com/roots/bud/tree/main/sources/@roots/bud-emotion)                                       | [📚 Usage](https://bud.js.org/extensions/bud-emotion/)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-entrypoints**](https://github.com/roots/bud/tree/main/sources/@roots/bud-entrypoints)                               | [📚 Usage](https://bud.js.org/extensions/bud-entrypoints/)                | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-esbuild**](https://github.com/roots/bud/tree/main/sources/@roots/bud-esbuild)                                       | [📚 Usage](https://bud.js.org/extensions/bud-esbuild/)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-eslint**](https://github.com/roots/bud/tree/main/sources/@roots/bud-eslint)                                         | [📚 Usage](https://bud.js.org/extensions/bud-eslint/)                     | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-imagemin**](https://github.com/roots/bud/tree/main/sources/@roots/bud-imagemin)                                     | [📚 Usage](https://bud.js.org/extensions/bud-imagemin/)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-mdx**](https://github.com/roots/bud/tree/main/sources/@roots/bud-mdx)                                               | [📚 Usage](https://bud.js.org/extensions/bud-mdx/)                        | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-postcss**](https://github.com/roots/bud/tree/main/sources/@roots/bud-postcss)                                       | [📚 Usage](https://bud.js.org/extensions/bud-postcss/)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-prettier**](https://github.com/roots/bud/tree/main/sources/@roots/bud-prettier)                                     | [📚 Usage](https://bud.js.org/extensions/bud-prettier/)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-purgecss**](https://github.com/roots/bud/tree/main/sources/@roots/bud-purgecss)                                     | [📚 Usage](https://bud.js.org/extensions/bud-purgecss/)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-react**](https://github.com/roots/bud/tree/main/sources/@roots/bud-react)                                           | [📚 Usage](https://bud.js.org/extensions/bud-react/)                      | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-sass**](https://github.com/roots/bud/tree/main/sources/@roots/bud-sass)                                             | [📚 Usage](https://bud.js.org/extensions/bud-sass/)                       | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                   |
| [**@roots/bud-solid**](https://github.com/roots/bud/tree/main/sources/@roots/bud-solid)                                           | [📚 Usage](https://bud.js.org/extensions/bud-solid/)                      | ![npm](https://img.shields.io/npm/v/@roots/bud-solid.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-stylelint**](https://github.com/roots/bud/tree/main/sources/@roots/bud-stylelint)                                   | [📚 Usage](https://bud.js.org/extensions/bud-stylelint/)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)              |
| [**@roots/bud-swc**](https://github.com/roots/bud/tree/main/sources/@roots/bud-swc)                                               | [📚 Usage](https://bud.js.org/extensions/bud-swc/)                        | ![npm](https://img.shields.io/npm/v/@roots/bud-swc.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-tailwindcss**](https://github.com/roots/bud/tree/main/sources/@roots/bud-tailwindcss)                               | [📚 Usage](https://bud.js.org/extensions/bud-tailwindcss/)                | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-bud-tailwindcss-theme-json**](https://github.com/roots/bud/tree/main/sources/@roots/bud-bud-tailwindcss-theme-json) | [📚 Usage](https://bud.js.org/extensions/bud-bud-tailwindcss-theme-json/) | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-minify**](https://github.com/roots/bud/tree/main/sources/@roots/bud-minify)                                         | [📚 Usage](https://bud.js.org/extensions/bud-terser/)                     | ![npm](https://img.shields.io/npm/v/@roots/bud-minify.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-typescript**](https://github.com/roots/bud/tree/main/sources/@roots/bud-typescript)                                 | [📚 Usage](https://bud.js.org/extensions/bud-typescript/)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)             |
| [**@roots/bud-vue**](https://github.com/roots/bud/tree/main/sources/@roots/bud-vue)                                               | [📚 Usage](https://bud.js.org/extensions/bud-vue/)                        | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-wordpress-dependencies**](https://github.com/roots/bud/tree/main/sources/@roots/bud-wordpress-dependencies)         | [📚 Usage](https://bud.js.org/extensions/bud-wordpress-dependencies/)     | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-wordpress-externals**](https://github.com/roots/bud/tree/main/sources/@roots/bud-wordpress-externals)               | [📚 Usage](https://bud.js.org/extensions/bud-wordpress-externals/)        | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square)    |
| [**@roots/bud-wordpress-theme-json**](https://github.com/roots/bud/tree/main/sources/@roots/bud-wordpress-theme-json)             | [📚 Usage](https://bud.js.org/extensions/bud-wordpress-theme-json/)       | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-theme-json.svg?color=%23525ddc&style=flat-square)   |

Have you produced a bud.js extension and want to share it here? Please, create an issue sharing information about your project.

For more information on authoring your own extension [consult the documentation](https://bud.js.org/guides/extending/) and the source code of the extensions in this repository.

### Packages

Also included in the bud monorepo are packages which are not specific to bud.js but are used by the framework. These packages could conceivably be used in other projects.

| Name                                                                                                                                            | Latest                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [**@roots/blade-loader**](https://github.com/roots/bud/tree/main/sources/@roots/blade-loader)                                                   | ![npm](https://img.shields.io/npm/v/@roots/blade-loader.svg?color=%23525ddc&style=flat-square)                          |
| [**@roots/browserslist-config**](https://github.com/roots/bud/tree/main/sources/@roots/browserslist-config)                                     | ![npm](https://img.shields.io/npm/v/@roots/browserslist-config.svg?color=%23525ddc&style=flat-square)                   |
| [**@roots/container**](https://github.com/roots/bud/tree/main/sources/@roots/container)                                                         | ![npm](https://img.shields.io/npm/v/@roots/container.svg?color=%23525ddc&style=flat-square)                             |
| [**@roots/critical-css-webpack-plugin**](https://github.com/roots/bud/tree/main/sources/@roots/critical-css-webpack-plugin)                     | ![npm](https://img.shields.io/npm/v/@roots/critical-css-webpack-plugin.svg?color=%23525ddc&style=flat-square)           |
| [**@roots/dependencies**](https://github.com/roots/bud/tree/main/sources/@roots/dependencies)                                                   | ![npm](https://img.shields.io/npm/v/@roots/dependencies.svg?color=%23525ddc&style=flat-square)                          |
| [**@roots/entrypoints-webpack-plugin**](https://github.com/roots/bud/tree/main/sources/@roots/entrypoints-webpack-plugin)                       | ![npm](https://img.shields.io/npm/v/@roots/entrypoints-webpack-plugin.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/eslint-config**](https://github.com/roots/bud/tree/main/sources/@roots/eslint-config)                                                 | ![npm](https://img.shields.io/npm/v/@roots/eslint-config.svg?color=%23525ddc&style=flat-square)                         |
| [**@roots/filesystem**](https://github.com/roots/bud/tree/main/sources/@roots/filesystem)                                                       | ![npm](https://img.shields.io/npm/v/@roots/filesystem.svg?color=%23525ddc&style=flat-square)                            |
| [**@roots/wordpress-dependencies-webpack-plugin**](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-dependencies-webpack-plugin) | ![npm](https://img.shields.io/npm/v/@roots/wordpress-dependencies-webpack-plugin.svg?color=%23525ddc&style=flat-square) |
| [**@roots/wordpress-externals-webpack-plugin**](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-externals-webpack-plugin)       | ![npm](https://img.shields.io/npm/v/@roots/wordpress-externals-webpack-plugin.svg?color=%23525ddc&style=flat-square)    |
| [**@roots/wordpress-hmr**](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-hmr)                                                 | ![npm](https://img.shields.io/npm/v/@roots/wordpress-hmr.svg?color=%23525ddc&style=flat-square)                         |
| [**@roots/wordpress-theme-json-webpack-plugin**](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-theme-json-webpack-plugin)     | ![npm](https://img.shields.io/npm/v/@roots/wordpress-theme-json-webpack-plugin.svg?color=%23525ddc&style=flat-square)   |
| [**@roots/wordpress-transforms**](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-transforms)                                   | ![npm](https://img.shields.io/npm/v/@roots/wordpress-transforms.svg?color=%23525ddc&style=flat-square)                  |

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

bud.js is licensed under MIT.

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
