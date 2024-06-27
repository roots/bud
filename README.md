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

## Goals

**bud.js** wants to be:

- **Reliable**, yielding consistent and predictable behaviors regardless of specified options.
- **Fast**, leveraging parallel processing, smart caching and an asyncronous events based API to keep build times minimal.
- **Extensible**, with a fully featured plugin system to support an ecosystem of packaged modules.
- **Simple**, to get started and straight forward to maintain.

## Features

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

If you want to add bud.js to an existing project or want to further customize the scaffolded app check out the [Getting Started guide](https://bud.js.org/learn/getting-started).

There are [many example implementations available](https://github.com/roots/bud/tree/master/examples).

## Modules

### Presets

> ℹ Presets are a collection of extensions which are commonly used together. There are currently three presets: our general preset, a WordPress specific preset, and the preset used in the [roots/sage](https://github.com/roots/sage) theme.

| Package name                                                                                                  | Usage                                                         | Stable Release                                                                                                         | Preview Release                                                                                                         |
| :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| [**@roots/bud-preset-recommend**](https://github.com/roots/bud/tree/main/sources/@roots/bud-preset-recommend) | [📚 Docs](https://bud.js.org/extensions/bud-preset-recommend) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-recommend/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-recommend/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-preset-wordpress**](https://github.com/roots/bud/tree/main/sources/@roots/bud-preset-wordpress) | [📚 Docs](https://bud.js.org/extensions/bud-preset-wordpress) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-wordpress/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-wordpress/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/sage**](https://github.com/roots/bud/tree/main/sources/@roots/sage)                                 | [📚 Docs](https://bud.js.org/extensions/sage)                 | ![npm](https://img.shields.io/npm/v/@roots/sage/latest.svg?color=%23525ddc&style=flat-square&logo=npm)                 | ![npm](https://img.shields.io/npm/v/@roots/sage/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)                 |

### Extensions

#### Language support &amp; module preprocessors

> ℹ These extensions provide support for languages and syntaxes which are not understood by the browser and require compilation.

| Name                                                                                              | README                                                                               | Stable Release                                                                                                   | Preview Release                                                                                                   |
| :------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| [**@roots/bud-babel**](https://github.com/roots/bud/tree/main/sources/@roots/bud-babel)           | [📚 Docs](https://bud.js.org/extensions/bud-babel)                                   | ![npm](https://img.shields.io/npm/v/@roots/bud-babel/latest.svg?color=%23525ddc&style=flat-square&logo=npm)      | ![npm](https://img.shields.io/npm/v/@roots/bud-babel/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)      |
| [**@roots/bud-esbuild**](https://github.com/roots/bud/tree/main/sources/@roots/bud-esbuild)       | [📚 Docs](https://bud.js.org/extensions/bud-esbuild)                                 | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild/latest.svg?color=%23525ddc&style=flat-square&logo=npm)    | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)    |
| [**@roots/bud-mdx**](https://github.com/roots/bud/tree/main/sources/@roots/bud-mdx)               | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-mdx/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx/latest.svg?color=%23525ddc&style=flat-square&logo=npm)        | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)        |
| [**@roots/bud-postcss**](https://github.com/roots/bud/tree/main/sources/@roots/bud-postcss)       | [📚 Docs](https://bud.js.org/extensions/bud-postcss)                                 | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss/latest.svg?color=%23525ddc&style=flat-square&logo=npm)    | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)    |
| [**@roots/bud-sass**](https://github.com/roots/bud/tree/main/sources/@roots/bud-sass)             | [📚 Docs](https://bud.js.org/extensions/bud-sass)                                    | ![npm](https://img.shields.io/npm/v/@roots/bud-sass/latest.svg?color=%23525ddc&style=flat-square&logo=npm)       | ![npm](https://img.shields.io/npm/v/@roots/bud-sass/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)       |
| [**@roots/bud-swc**](https://github.com/roots/bud/tree/main/sources/@roots/bud-swc)               | [📚 Docs](https://bud.js.org/extensions/bud-swc)                                     | ![npm](https://img.shields.io/npm/v/@roots/bud-swc/latest.svg?color=%23525ddc&style=flat-square&logo=npm)        | ![npm](https://img.shields.io/npm/v/@roots/bud-swc/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)        |
| [**@roots/bud-typescript**](https://github.com/roots/bud/tree/main/sources/@roots/bud-typescript) | [📚 Docs](https://bud.js.org/extensions/bud-typescript)                              | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |

#### Optimization

> ℹ These extensions optimize compiled code and static assets to help ensure a high quality user experience in your app. They are typically only run in `production` mode.

| Name                                                                                                | README                                                                                    | Stable Release                                                                                                    | Preview Release                                                                                                    |
| :-------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| [**@roots/bud-compress**](https://github.com/roots/bud/tree/main/sources/@roots/bud-compress)       | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-compress/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-compress/latest.svg?color=%23525ddc&style=flat-square&logo=npm)    | ![npm](https://img.shields.io/npm/v/@roots/bud-compress/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)    |
| [**@roots/bud-criticalcss**](https://github.com/roots/bud/tree/main/sources/@roots/bud-criticalcss) | [📚 Docs](https://bud.js.org/extensions/bud-criticalcss)                                  | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-imagemin**](https://github.com/roots/bud/tree/main/sources/@roots/bud-imagemin)       | [📚 Docs](https://bud.js.org/extensions/bud-imagemin)                                     | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin/latest.svg?color=%23525ddc&style=flat-square&logo=npm)    | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)    |
| [**@roots/bud-purgecss**](https://github.com/roots/bud/tree/main/sources/@roots/bud-purgecss)       | [📚 Docs](https://bud.js.org/extensions/bud-purgecss)                                     | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss/latest.svg?color=%23525ddc&style=flat-square&logo=npm)    | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)    |

#### Features and framework support

> ℹ These extensions provide support for popular application frameworks like React &amp; Vue. Make sure to install [a compatible compiler or preprocessor](#language-support--module-preprocessors).

| Name                                                                                                | README                                                   | Stable Release                                                                                                    | Preview Release                                                                                                    |
| :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| [**@roots/bud-emotion**](https://github.com/roots/bud/tree/main/sources/@roots/bud-emotion)         | [📚 Docs](https://bud.js.org/extensions/bud-emotion)     | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion/latest.svg?color=%23525ddc&style=flat-square&logo=npm)     | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)     |
| [**@roots/bud-react**](https://github.com/roots/bud/tree/main/sources/@roots/bud-react)             | [📚 Docs](https://bud.js.org/extensions/bud-react)       | ![npm](https://img.shields.io/npm/v/@roots/bud-react/latest.svg?color=%23525ddc&style=flat-square&logo=npm)       | ![npm](https://img.shields.io/npm/v/@roots/bud-react/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)       |
| [**@roots/bud-solid**](https://github.com/roots/bud/tree/main/sources/@roots/bud-solid)             | [📚 Docs](https://bud.js.org/extensions/bud-solid)       | ![npm](https://img.shields.io/npm/v/@roots/bud-solid/latest.svg?color=%23525ddc&style=flat-square&logo=npm)       | ![npm](https://img.shields.io/npm/v/@roots/bud-solid/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)       |
| [**@roots/bud-tailwindcss**](https://github.com/roots/bud/tree/main/sources/@roots/bud-tailwindcss) | [📚 Docs](https://bud.js.org/extensions/bud-tailwindcss) | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-vue**](https://github.com/roots/bud/tree/main/sources/@roots/bud-vue)                 | [📚 Docs](https://bud.js.org/extensions/bud-vue)         | ![npm](https://img.shields.io/npm/v/@roots/bud-vue/latest.svg?color=%23525ddc&style=flat-square&logo=npm)         | ![npm](https://img.shields.io/npm/v/@roots/bud-vue/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)         |

#### Code quality

> ℹ These extensions ensure source code conforms to a specified style. Linting configuration is expected to be provided by the user, but a base eslint config is available: [@roots/eslint-config](https://npmjs.org/package/@roots/eslint-config).

| Name                                                                                            | README                                                                                    | Stable Release                                                                                                  | Preview Release                                                                                                  |
| :---------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| [**@roots/bud-eslint**](https://github.com/roots/bud/tree/main/sources/@roots/bud-eslint)       | [📚 Docs](https://bud.js.org/extensions/bud-eslint)                                       | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint/latest.svg?color=%23525ddc&style=flat-square&logo=npm)    | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)    |
| [**@roots/bud-prettier**](https://github.com/roots/bud/tree/main/sources/@roots/bud-prettier)   | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-prettier/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier/latest.svg?color=%23525ddc&style=flat-square&logo=npm)  | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)  |
| [**@roots/bud-stylelint**](https://github.com/roots/bud/tree/main/sources/@roots/bud-stylelint) | [📚 Docs](https://bud.js.org/extensions/bud-stylelint)                                    | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |

#### WordPress specific

> ℹ All of these extensions are included in [@roots/bud-preset-wordpress](https://bud.js.org/extensions/bud-preset-wordpress).

| Name                                                                                                                      | README                                                                                                  | Stable Release                                                                                                               | Preview Release                                                                                                               |
| :------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| [**@roots/bud-tailwindcss-theme-json**](https://github.com/roots/bud/tree/main/sources/@roots/bud-tailwindcss-theme-json) | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-tailwindcss-theme-json/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss-theme-json/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss-theme-json/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-wordpress-dependencies**](https://github.com/roots/bud/tree/main/sources/@roots/bud-wordpress-dependencies) | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-wordpress-dependencies/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-wordpress-externals**](https://github.com/roots/bud/tree/main/sources/@roots/bud-wordpress-externals)       | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-wordpress-externals/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals/latest.svg?color=%23525ddc&style=flat-square&logo=npm)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)    |
| [**@roots/bud-wordpress-theme-json**](https://github.com/roots/bud/tree/main/sources/@roots/bud-wordpress-theme-json)     | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-wordpress-theme-json/README.md)   | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-theme-json/latest.svg?color=%23525ddc&style=flat-square&logo=npm)   | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-theme-json/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)   |

### Community extensions

> ℹ The following extensions are maintained by the community. Please refrain from making issues in this repo regarding these extensions.

| Name                                                                      | README                                                                          | Stable Release                                                                                                 |
| :------------------------------------------------------------------------ | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------- |
| [**bud-embedded**](https://github.com/talss89/bud-embedded)               | [📚 README](https://github.com/talss89/bud-embedded/tree/main/README.md)        | ![npm](https://img.shields.io/npm/v/bud-embedded/latest.svg?color=%23525ddc&style=flat-square&logo=npm)        |
| [**bud-localtunnel**](https://github.com/talss89/bud-localtunnel)         | [📚 README](https://github.com/talss89/bud-localtunnel/tree/main/README.md)     | ![npm](https://img.shields.io/npm/v/bud-localtunnel/latest.svg?color=%23525ddc&style=flat-square&logo=npm)     |
| [**bud-wp-editor-query**](https://github.com/talss89/bud-wp-editor-query) | [📚 README](https://github.com/talss89/bud-wp-editor-query/tree/main/README.md) | ![npm](https://img.shields.io/npm/v/bud-wp-editor-query/latest.svg?color=%23525ddc&style=flat-square&logo=npm) |

Have you produced a bud.js extension and want to share it here? Please, create an issue sharing information about your project.

For more information on authoring your own extension [consult the documentation](https://bud.js.org/learn/extending/) and the source code of the extensions in this repository.

### Core modules

> ℹ [@roots/bud](https://github.com/roots/bud/tree/main/sources/@roots/bud) is actually made up of a number of packages. **You only need to install `@roots/bud` to use bud.js.**

| Package name                                                                                        | Usage                                                                                        | Stable Release                                                                                                    | Preview Release                                                                                                    |
| :-------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| [**@roots/bud**](https://github.com/roots/bud/tree/main/sources/@roots/bud)                         | [📚 Docs](https://bud.js.org/learn/getting-started)                                          | ![npm](https://img.shields.io/npm/v/@roots/bud/latest.svg?color=%23525ddc&style=flat-square&logo=npm)             | ![npm](https://img.shields.io/npm/v/@roots/bud/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)             |
| [**@roots/bud-api**](https://github.com/roots/bud/tree/main/sources/@roots/bud-api)                 | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-api/README.md)         | ![npm](https://img.shields.io/npm/v/@roots/bud-api/latest.svg?color=%23525ddc&style=flat-square&logo=npm)         | ![npm](https://img.shields.io/npm/v/@roots/bud-api/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)         |
| [**@roots/bud-build**](https://github.com/roots/bud/tree/main/sources/@roots/bud-build)             | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-build/README.md)       | ![npm](https://img.shields.io/npm/v/@roots/bud-build/latest.svg?color=%23525ddc&style=flat-square&logo=npm)       | ![npm](https://img.shields.io/npm/v/@roots/bud-build/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)       |
| [**@roots/bud-cache**](https://github.com/roots/bud/tree/main/sources/@roots/bud-cache)             | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-cache/README.md)       | ![npm](https://img.shields.io/npm/v/@roots/bud-cache/latest.svg?color=%23525ddc&style=flat-square&logo=npm)       | ![npm](https://img.shields.io/npm/v/@roots/bud-cache/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)       |
| [**@roots/bud-client**](https://github.com/roots/bud/tree/main/sources/@roots/bud-client)           | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-client/README.md)      | ![npm](https://img.shields.io/npm/v/@roots/bud-client/latest.svg?color=%23525ddc&style=flat-square&logo=npm)      | ![npm](https://img.shields.io/npm/v/@roots/bud-client/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)      |
| [**@roots/bud-compiler**](https://github.com/roots/bud/tree/main/sources/@roots/bud-compiler)       | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-compiler/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-compiler/latest.svg?color=%23525ddc&style=flat-square&logo=npm)    | ![npm](https://img.shields.io/npm/v/@roots/bud-compiler/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)    |
| [**@roots/bud-dashboard**](https://github.com/roots/bud/tree/main/sources/@roots/bud-dashboard)     | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-dashboard/README.md)   | ![npm](https://img.shields.io/npm/v/@roots/bud-dashboard/latest.svg?color=%23525ddc&style=flat-square&logo=npm)   | ![npm](https://img.shields.io/npm/v/@roots/bud-dashboard/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)   |
| [**@roots/bud-entrypoints**](https://github.com/roots/bud/tree/main/sources/@roots/bud-entrypoints) | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-entrypoints/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-extensions**](https://github.com/roots/bud/tree/main/sources/@roots/bud-extensions)   | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-extensions/README.md)  | ![npm](https://img.shields.io/npm/v/@roots/bud-extensions/latest.svg?color=%23525ddc&style=flat-square&logo=npm)  | ![npm](https://img.shields.io/npm/v/@roots/bud-extensions/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)  |
| [**@roots/bud-framework**](https://github.com/roots/bud/tree/main/sources/@roots/bud-framework)     | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-framework/README.md)   | ![npm](https://img.shields.io/npm/v/@roots/bud-framework/latest.svg?color=%23525ddc&style=flat-square&logo=npm)   | ![npm](https://img.shields.io/npm/v/@roots/bud-framework/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)   |
| [**@roots/bud-hooks**](https://github.com/roots/bud/tree/main/sources/@roots/bud-hooks)             | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-hooks/README.md)       | ![npm](https://img.shields.io/npm/v/@roots/bud-hooks/latest.svg?color=%23525ddc&style=flat-square&logo=npm)       | ![npm](https://img.shields.io/npm/v/@roots/bud-hooks/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)       |
| [**@roots/bud-minify**](https://github.com/roots/bud/tree/main/sources/@roots/bud-minify)           | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-minify/README.md)      | ![npm](https://img.shields.io/npm/v/@roots/bud-minify/latest.svg?color=%23525ddc&style=flat-square&logo=npm)      | ![npm](https://img.shields.io/npm/v/@roots/bud-minify/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)      |
| [**@roots/bud-server**](https://github.com/roots/bud/tree/main/sources/@roots/bud-server)           | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-server/README.md)      | ![npm](https://img.shields.io/npm/v/@roots/bud-server/latest.svg?color=%23525ddc&style=flat-square&logo=npm)      | ![npm](https://img.shields.io/npm/v/@roots/bud-server/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)      |
| [**@roots/bud-support**](https://github.com/roots/bud/tree/main/sources/@roots/bud-support)         | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/bud-support/README.md)     | ![npm](https://img.shields.io/npm/v/@roots/bud-support/latest.svg?color=%23525ddc&style=flat-square&logo=npm)     | ![npm](https://img.shields.io/npm/v/@roots/bud-support/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)     |

### Support modules

> ℹ These packages are not specific to bud.js but are used by the framework. They could be used in other projects outside of the context of bud.js.

| Name                                                                                                                                            | README                                                                                                             | Stable Release                                                                                                                          | Preview Release                                                                                                                          |
| :---------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| [**@roots/blade-loader**](https://github.com/roots/bud/tree/main/sources/@roots/blade-loader)                                                   | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/blade-loader/README.md)                          | ![npm](https://img.shields.io/npm/v/@roots/blade-loader/latest.svg?color=%23525ddc&style=flat-square&logo=npm)                          | ![npm](https://img.shields.io/npm/v/@roots/blade-loader/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)                          |
| [**@roots/browserslist-config**](https://github.com/roots/bud/tree/main/sources/@roots/browserslist-config)                                     | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/browserslist-config/README.md)                   | ![npm](https://img.shields.io/npm/v/@roots/browserslist-config/latest.svg?color=%23525ddc&style=flat-square&logo=npm)                   | ![npm](https://img.shields.io/npm/v/@roots/browserslist-config/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)                   |
| [**@roots/container**](https://github.com/roots/bud/tree/main/sources/@roots/container)                                                         | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/container/README.md)                             | ![npm](https://img.shields.io/npm/v/@roots/container/latest.svg?color=%23525ddc&style=flat-square&logo=npm)                             | ![npm](https://img.shields.io/npm/v/@roots/container/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)                             |
| [**@roots/critical-css-webpack-plugin**](https://github.com/roots/bud/tree/main/sources/@roots/critical-css-webpack-plugin)                     | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/critical-css-webpack-plugin/README.md)           | ![npm](https://img.shields.io/npm/v/@roots/critical-css-webpack-plugin/latest.svg?color=%23525ddc&style=flat-square&logo=npm)           | ![npm](https://img.shields.io/npm/v/@roots/critical-css-webpack-plugin/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)           |
| [**@roots/dependencies**](https://github.com/roots/bud/tree/main/sources/@roots/dependencies)                                                   | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/dependencies/README.md)                          | ![npm](https://img.shields.io/npm/v/@roots/dependencies/latest.svg?color=%23525ddc&style=flat-square&logo=npm)                          | ![npm](https://img.shields.io/npm/v/@roots/dependencies/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)                          |
| [**@roots/entrypoints-webpack-plugin**](https://github.com/roots/bud/tree/main/sources/@roots/entrypoints-webpack-plugin)                       | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/entrypoints-webpack-plugin/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/entrypoints-webpack-plugin/latest.svg?color=%23525ddc&style=flat-square&logo=npm)            | ![npm](https://img.shields.io/npm/v/@roots/entrypoints-webpack-plugin/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)            |
| [**@roots/eslint-config**](https://github.com/roots/bud/tree/main/sources/@roots/eslint-config)                                                 | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/eslint-config/README.md)                         | ![npm](https://img.shields.io/npm/v/@roots/eslint-config/latest.svg?color=%23525ddc&style=flat-square&logo=npm)                         | ![npm](https://img.shields.io/npm/v/@roots/eslint-config/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)                         |
| [**@roots/filesystem**](https://github.com/roots/bud/tree/main/sources/@roots/filesystem)                                                       | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/filesystem/README.md)                            | ![npm](https://img.shields.io/npm/v/@roots/filesystem/latest.svg?color=%23525ddc&style=flat-square&logo=npm)                            | ![npm](https://img.shields.io/npm/v/@roots/filesystem/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)                            |
| [**@roots/wordpress-dependencies-webpack-plugin**](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-dependencies-webpack-plugin) | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-dependencies-webpack-plugin/README.md) | ![npm](https://img.shields.io/npm/v/@roots/wordpress-dependencies-webpack-plugin/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/wordpress-dependencies-webpack-plugin/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/wordpress-externals-webpack-plugin**](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-externals-webpack-plugin)       | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-externals-webpack-plugin/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/wordpress-externals-webpack-plugin/latest.svg?color=%23525ddc&style=flat-square&logo=npm)    | ![npm](https://img.shields.io/npm/v/@roots/wordpress-externals-webpack-plugin/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)    |
| [**@roots/wordpress-hmr**](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-hmr)                                                 | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-hmr/README.md)                         | ![npm](https://img.shields.io/npm/v/@roots/wordpress-hmr/latest.svg?color=%23525ddc&style=flat-square&logo=npm)                         | ![npm](https://img.shields.io/npm/v/@roots/wordpress-hmr/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)                         |
| [**@roots/wordpress-theme-json-webpack-plugin**](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-theme-json-webpack-plugin)     | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-theme-json-webpack-plugin/README.md)   | ![npm](https://img.shields.io/npm/v/@roots/wordpress-theme-json-webpack-plugin/latest.svg?color=%23525ddc&style=flat-square&logo=npm)   | ![npm](https://img.shields.io/npm/v/@roots/wordpress-theme-json-webpack-plugin/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)   |
| [**@roots/wordpress-transforms**](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-transforms)                                   | [📚 README](https://github.com/roots/bud/tree/main/sources/@roots/wordpress-transforms/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/wordpress-transforms/latest.svg?color=%23525ddc&style=flat-square&logo=npm)                  | ![npm](https://img.shields.io/npm/v/@roots/wordpress-transforms/nightly.svg?color=%23525ddc&style=flat-square&logo=npm)                  |

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

**bud.js** is an open source project and completely free to use.

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
<a href="https://worksitesafety.ca/careers/">
<img src="https://cdn.roots.io/app/uploads/worksite-safety.svg" alt="Worksite Safety" width="200" height="150"/>
</a>
<a href="https://www.itineris.co.uk/">
<img src="https://cdn.roots.io/app/uploads/itineris.svg" alt="Itineris" width="200" height="150"/>
</a>
