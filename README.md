<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud</strong></h1>

<p align="center">
  Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
</p>

---

## What is bud.js?

**bud.js** is a javascript build framework with add-on support for Babel, React, PostCSS, Sass, Typescript, esbuild, ESLint, Prettier, and more.

### Goals

**bud.js** wants to be:

- **Reliable**, yielding consistent and predictable behaviors regardless of specified options.
- **Fast**, leveraging parallel processing, smart caching and an asyncronous events based API to keep build times minimal.
- **Extensible**, with a fully featured plugin system to support an ecosystem of packaged modules
- **Simple**, to get started and straight forward to maintain

### Features

- Zero config by default (seriously, you don&rsquo;t even _need_ a config file).
- Modular by design. Use only what you need.
- Easily implementable multi-compiler support.
- Heckin&rsquo; fast.
- Luxury dev tooling including semi-automated dependency management.
- Supports configuration with TypeScript.
- Customizable and extensible. Add new features. Swap our core components with your own.

### Comparison

| Feature                           | Laravel Mix | Symfony Encore | bud.js |
| :-------------------------------- | :---------- | :------------- | :----- |
| ESNext compatible                 | ❌          | ❌             | ✅     |
| Zero config                       | ❌          | ❌             | ✅     |
| Typed                             | 🤷🏼‍♂️          | ❌             | ✅     |
| Multi-compiler                    | ❌          | ✅             | ✅     |
| Modular                           | ❌          | ❌             | ✅     |
| TS config                         | ❌          | ❌             | ✅     |
| YML config                        | ❌          | ❌             | ✅     |
| JS config                         | ✅          | ✅             | ✅     |
| JSON config                       | ❌          | ❌             | ✅     |
| Compatible with webpack CLI       | ❌          | ✅             | ✅     |
| Babel support                     | ✅          | ✅             | ✅     |
| React support                     | ✅          | ✅             | ✅     |
| Vue support                       | ✅          | ✅             | ✅     |
| Sass support                      | ✅          | ✅             | ✅     |
| PostCSS support                   | ✅          | ✅             | ✅     |
| Stylus support                    | ✅          | ✅             | ❌     |
| Typescript support                | ✅          | ✅             | ✅     |
| LESS support                      | ✅          | ✅             | ❌     |
| Emotion support                   | ❌          | ❌             | ✅     |
| Markdown support                  | ❌          | ❌             | ✅     |
| MDX support                       | ❌          | ❌             | ✅     |
| esbuild support                   | ❌          | ❌             | ✅     |
| Loader config API                 | ❌          | ✅             | ✅     |
| Rule config API                   | ❌          | ✅             | ✅     |
| Plugin config API                 | ❌          | ✅             | ✅     |
| WordPress specific support        | ❌          | ❌             | ✅     |
| Laravel specific support          | ✅          | ❌             | ❌     |
| Symfony specific support          | ❌          | ✅             | ❌     |
| Dependency management CLI tooling | ❌          | ❌             | ✅     |

<img
  src="https://raw.githubusercontent.com/roots/bud/main/sources/@repo/docs/static/casts/babel-build--cache.svg"
  title="bud.js build"
/>

## Requirements

- Node 16+
- yarn 1.22 or higher
- npm 8.3 or higher
- Windows users must run **bud.js** under the Windows Subsystem for Linux.

## Getting started

Check out [bud.js.org](https://bud.js.org/) and the [Getting Started guide](https://bud.js.org/guides/getting-started).

There are many example [implementations available in the /examples directory of this repo](https://github.com/roots/bud/tree/master/examples), including projects written using both CommonJS and ESM.

## Available modules

## Presets

| Name                                                                    | Usage                                                           | Latest                                                                                                 |
| ----------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-preset-recommend**](/sources/@roots/bud-preset-recommend) | [📚 Usage](${url.docs}/extensions/presets/bud-preset-recommend) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-recommend.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-preset-wordpress**](/sources/@roots/bud-preset-wordpress) | [📚 Usage](${url.docs}/extensions/presets/bud-preset-wordpress) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-wordpress.svg?color=%23525ddc&style=flat-square) |
| [**@roots/sage**](/sources/@roots/sage)                                 | [📚 Usage](${url.docs}/extensions/presets/sage)                 | ![npm](https://img.shields.io/npm/v/@roots/sage.svg?color=%23525ddc&style=flat-square)                 |

### Extensions

| Name                                                                                | Usage                                                          | Latest                                                                                                       |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-babel**](/sources/@roots/bud-babel)                                   | [📚 Usage](${url.docs}/extensions/bud-babel/)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-compress**](/sources/@roots/bud-compress)                             | [📚 Usage](${url.docs}/extensions/bud-compress/)               | ![npm](https://img.shields.io/npm/v/@roots/bud-compress.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-criticalcss**](/sources/@roots/bud-criticalcss)                       | [📚 Usage](${url.docs}/extensions/bud-criticalcss/)            | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-emotion**](/sources/@roots/bud-emotion)                               | [📚 Usage](${url.docs}/extensions/bud-emotion/)                | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-entrypoints**](/sources/@roots/bud-entrypoints)                       | [📚 Usage](${url.docs}/extensions/bud-entrypoints/)            | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-esbuild**](/sources/@roots/bud-esbuild)                               | [📚 Usage](${url.docs}/extensions/bud-esbuild/)                | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-eslint**](/sources/@roots/bud-eslint)                                 | [📚 Usage](${url.docs}/extensions/bud-eslint/)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-imagemin**](/sources/@roots/bud-imagemin)                             | [📚 Usage](${url.docs}/extensions/bud-imagemin/)               | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-mdx**](/sources/@roots/bud-mdx)                                       | [📚 Usage](${url.docs}/extensions/bud-mdx/)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-postcss**](/sources/@roots/bud-postcss)                               | [📚 Usage](${url.docs}/extensions/bud-postcss/)                | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-prettier**](/sources/@roots/bud-prettier)                             | [📚 Usage](${url.docs}/extensions/bud-prettier/)               | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-purgecss**](/sources/@roots/bud-purgecss)                             | [📚 Usage](${url.docs}/extensions/bud-purgecss/)               | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-react**](/sources/@roots/bud-react)                                   | [📚 Usage](${url.docs}/extensions/bud-react/)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-sass**](/sources/@roots/bud-sass)                                     | [📚 Usage](${url.docs}/extensions/bud-sass/)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                   |
| [**@roots/bud-solid**](/sources/@roots/bud-solid)                                   | [📚 Usage](${url.docs}/extensions/bud-solid/)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-solid.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-stylelint**](/sources/@roots/bud-stylelint)                           | [📚 Usage](${url.docs}/extensions/bud-stylelint/)              | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)              |
| [**@roots/bud-tailwindcss**](/sources/@roots/bud-tailwindcss)                       | [📚 Usage](${url.docs}/extensions/bud-tailwindcss/)            | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-terser**](/sources/@roots/bud-terser)                                 | [📚 Usage](${url.docs}/extensions/bud-terser/)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-typescript**](/sources/@roots/bud-typescript)                         | [📚 Usage](${url.docs}/extensions/bud-typescript/)             | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)             |
| [**@roots/bud-vue**](/sources/@roots/bud-vue)                                       | [📚 Usage](${url.docs}/extensions/bud-vue/)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-wordpress-dependencies**](/sources/@roots/bud-wordpress-dependencies) | [📚 Usage](${url.docs}/extensions/bud-wordpress-dependencies/) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-wordpress-externals**](/sources/@roots/bud-wordpress-externals)       | [📚 Usage](${url.docs}/extensions/bud-wordpress-externals/)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square)    |
| [**@roots/bud-wordpress-manifests**](/sources/@roots/bud-wordpress-manifests)       | [📚 Usage](${url.docs}/extensions/bud-wordpress-manifests/)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square)    |

Have you produced a Bud extension and want to share it here? Please, create an issue sharing information about your project.

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud is licensed under MIT.

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
