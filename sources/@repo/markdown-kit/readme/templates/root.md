{{>banner}}

{{>what}}

## Requirements

{{>requirements}}

## Getting started

Quickly scaffold a new project with `create-bud-app`:

> npx create-bud-app

If you want to add bud.js to an existing project or want to further customize the scaffolded app check out the [Getting Started guide]({{projectConfig.url.docs}}/learn/getting-started).

There are [many example implementations available]({{projectConfig.url.web}}/tree/master/examples).

## Modules

### Presets

> ℹ Presets are a collection of extensions which are commonly used together. There are currently three presets: our general preset, a WordPress specific preset, and the preset used in the [roots/sage](https://github.com/roots/sage) theme.

|  Package name                                                                                                       | Usage                                                                          | Stable Release                                                                                                 | Preview Release |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ | :--- |
| [**@roots/bud-preset-recommend**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-preset-recommend) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-preset-recommend) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-recommend/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-recommend/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-preset-wordpress**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-preset-wordpress) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-preset-wordpress) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-wordpress/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-wordpress/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/sage**]({{projectConfig.url.web}}/tree/main/sources/@roots/sage) | [📚 Docs]({{projectConfig.url.docs}}/extensions/sage) | ![npm](https://img.shields.io/npm/v/@roots/sage/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/sage/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |

### Extensions

#### Language support &amp; module preprocessors

> ℹ These extensions provide support for languages and syntaxes which are not understood by the browser and require compilation.

|  Name                                                                                                       | README                                                                          | Stable Release                                                                                                 | Preview Release |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ | :--- |
| [**@roots/bud-babel**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-babel) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-babel) | ![npm](https://img.shields.io/npm/v/@roots/bud-babel/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-babel/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-esbuild**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-esbuild) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-esbuild) | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-mdx**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-mdx) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-mdx/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-postcss**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-postcss) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-postcss) | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-sass**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-sass) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-sass) | ![npm](https://img.shields.io/npm/v/@roots/bud-sass/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-sass/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-swc**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-swc) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-swc) | ![npm](https://img.shields.io/npm/v/@roots/bud-swc/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-swc/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-typescript**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-typescript) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-typescript) | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |

#### Optimization

> ℹ These extensions optimize compiled code and static assets to help ensure a high quality user experience in your app. They are typically only run in `production` mode.

|  Name                                                                                                       | README                                                                          | Stable Release                                                                                                 | Preview Release |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ | :--- |
| [**@roots/bud-compress**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-compress) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-compress/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-compress/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-compress/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-criticalcss**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-criticalcss) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-criticalcss) | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-imagemin**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-imagemin) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-imagemin) | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-purgecss**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-purgecss) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-purgecss) | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |

#### Features and framework support

> ℹ These extensions provide support for popular application frameworks like React &amp; Vue. Make sure to install [a compatible compiler or preprocessor](#language-support--module-preprocessors).

|  Name                                                                                                       | README                                                                          | Stable Release                                                                                                 | Preview Release |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ | :--- |
| [**@roots/bud-emotion**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-emotion) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-emotion) | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-react**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-react) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-react) | ![npm](https://img.shields.io/npm/v/@roots/bud-react/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-react/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-solid**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-solid) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-solid) | ![npm](https://img.shields.io/npm/v/@roots/bud-solid/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-solid/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-tailwindcss**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-tailwindcss) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-tailwindcss) | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-vue**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-vue) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-vue) | ![npm](https://img.shields.io/npm/v/@roots/bud-vue/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-vue/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |

#### Code quality

> ℹ These extensions ensure source code conforms to a specified style. Linting configuration is expected to be provided by the user, but a base eslint config is available: [@roots/eslint-config](https://npmjs.org/package/@roots/eslint-config).

|  Name                                                                                                       | README                                                                          | Stable Release                                                                                                 | Preview Release |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ | :--- |
| [**@roots/bud-eslint**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-eslint) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-eslint) | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-prettier**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-prettier) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-prettier/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-stylelint**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-stylelint) | [📚 Docs]({{projectConfig.url.docs}}/extensions/bud-stylelint) | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |

#### WordPress specific

> ℹ All of these extensions are included in [@roots/bud-preset-wordpress]({{projectConfig.url.docs}}/extensions/bud-preset-wordpress).

|  Name                                                                                                       | README                                                                          | Stable Release                                                                                                 | Preview Release |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ | :--- |
| [**@roots/bud-tailwindcss-theme-json**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-tailwindcss-theme-json) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-tailwindcss-theme-json/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss-theme-json/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss-theme-json/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-wordpress-dependencies**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-wordpress-dependencies) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-wordpress-dependencies/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-wordpress-externals**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-wordpress-externals) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-wordpress-externals/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-wordpress-theme-json**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-wordpress-theme-json) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-wordpress-theme-json/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-theme-json/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-theme-json/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |

### Community extensions

> ℹ The following extensions are maintained by the community. Please refrain from making issues in this repo regarding these extensions.

|  Name                                                                                                       | README                                                                          | Stable Release                                                                                                 |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ |
| [**bud-embedded**](https://github.com/talss89/bud-embedded) | [📚 README](https://github.com/talss89/bud-embedded/tree/main/README.md) | ![npm](https://img.shields.io/npm/v/bud-embedded/latest.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**bud-localtunnel**](https://github.com/talss89/bud-localtunnel) | [📚 README](https://github.com/talss89/bud-localtunnel/tree/main/README.md) | ![npm](https://img.shields.io/npm/v/bud-localtunnel/latest.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**bud-wp-editor-query**](https://github.com/talss89/bud-wp-editor-query) | [📚 README](https://github.com/talss89/bud-wp-editor-query/tree/main/README.md) | ![npm](https://img.shields.io/npm/v/bud-wp-editor-query/latest.svg?color=%23525ddc&style=flat-square&logo=npm) |

Have you produced a bud.js extension and want to share it here? Please, create an issue sharing information about your project.

For more information on authoring your own extension [consult the documentation](https://bud.js.org/learn/extending/) and the source code of the extensions in this repository.


### Core modules

> ℹ [@roots/bud]({{projectConfig.url.web}}/tree/main/sources/@roots/bud) is actually made up of a number of packages. **You only need to install `@roots/bud` to use bud.js.**

|  Package name                                                                                                       | Usage                                                                          | Stable Release                                                                                                 | Preview Release |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ | :--- |
| [**@roots/bud**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud) | [📚 Docs]({{projectConfig.url.docs}}/learn/getting-started) | ![npm](https://img.shields.io/npm/v/@roots/bud/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-api**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-api) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-api/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-api/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-api/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-build**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-build) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-build/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-build/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-build/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-cache**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-cache) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-cache/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-cache/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-cache/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-client**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-client) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-client/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-client/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-client/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-compiler**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-compiler) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-compiler/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-compiler/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-compiler/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-dashboard**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-dashboard) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-dashboard/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-dashboard/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-dashboard/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-entrypoints**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-entrypoints) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-entrypoints/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-extensions**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-extensions) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-extensions/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-extensions/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-extensions/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-framework**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-framework) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-framework/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-framework/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-framework/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-hooks**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-hooks) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-hooks/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-hooks/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-hooks/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-minify**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-minify) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-minify/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-minify/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-minify/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-server**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-server) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-server/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-server/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-server/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/bud-support**]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-support) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/bud-support/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-support/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/bud-support/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |

### Support modules

> ℹ These packages are not specific to bud.js but are used by the framework. They could be used in other projects outside of the context of bud.js.

|  Name                                                                                                       | README                                                                          | Stable Release                                                                                                 | Preview Release |
| :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ | :--- |
| [**@roots/blade-loader**]({{projectConfig.url.web}}/tree/main/sources/@roots/blade-loader) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/blade-loader/README.md) | ![npm](https://img.shields.io/npm/v/@roots/blade-loader/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/blade-loader/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/browserslist-config**]({{projectConfig.url.web}}/tree/main/sources/@roots/browserslist-config) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/browserslist-config/README.md) | ![npm](https://img.shields.io/npm/v/@roots/browserslist-config/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/browserslist-config/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/container**]({{projectConfig.url.web}}/tree/main/sources/@roots/container) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/container/README.md)| ![npm](https://img.shields.io/npm/v/@roots/container/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/container/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/critical-css-webpack-plugin**]({{projectConfig.url.web}}/tree/main/sources/@roots/critical-css-webpack-plugin) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/critical-css-webpack-plugin/README.md) | ![npm](https://img.shields.io/npm/v/@roots/critical-css-webpack-plugin/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/critical-css-webpack-plugin/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/dependencies**]({{projectConfig.url.web}}/tree/main/sources/@roots/dependencies) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/dependencies/README.md) | ![npm](https://img.shields.io/npm/v/@roots/dependencies/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/dependencies/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/entrypoints-webpack-plugin**]({{projectConfig.url.web}}/tree/main/sources/@roots/entrypoints-webpack-plugin) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/entrypoints-webpack-plugin/README.md) | ![npm](https://img.shields.io/npm/v/@roots/entrypoints-webpack-plugin/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/entrypoints-webpack-plugin/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/eslint-config**]({{projectConfig.url.web}}/tree/main/sources/@roots/eslint-config) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/eslint-config/README.md) | ![npm](https://img.shields.io/npm/v/@roots/eslint-config/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/eslint-config/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/filesystem**]({{projectConfig.url.web}}/tree/main/sources/@roots/filesystem) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/filesystem/README.md) | ![npm](https://img.shields.io/npm/v/@roots/filesystem/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/filesystem/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/wordpress-dependencies-webpack-plugin**]({{projectConfig.url.web}}/tree/main/sources/@roots/wordpress-dependencies-webpack-plugin) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/wordpress-dependencies-webpack-plugin/README.md) | ![npm](https://img.shields.io/npm/v/@roots/wordpress-dependencies-webpack-plugin/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/wordpress-dependencies-webpack-plugin/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/wordpress-externals-webpack-plugin**]({{projectConfig.url.web}}/tree/main/sources/@roots/wordpress-externals-webpack-plugin) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/wordpress-externals-webpack-plugin/README.md) | ![npm](https://img.shields.io/npm/v/@roots/wordpress-externals-webpack-plugin/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/wordpress-externals-webpack-plugin/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/wordpress-hmr**]({{projectConfig.url.web}}/tree/main/sources/@roots/wordpress-hmr) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/wordpress-hmr/README.md) | ![npm](https://img.shields.io/npm/v/@roots/wordpress-hmr/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/wordpress-hmr/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/wordpress-theme-json-webpack-plugin**]({{projectConfig.url.web}}/tree/main/sources/@roots/wordpress-theme-json-webpack-plugin) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/wordpress-theme-json-webpack-plugin/README.md) | ![npm](https://img.shields.io/npm/v/@roots/wordpress-theme-json-webpack-plugin/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/wordpress-theme-json-webpack-plugin/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |
| [**@roots/wordpress-transforms**]({{projectConfig.url.web}}/tree/main/sources/@roots/wordpress-transforms) | [📚 README]({{projectConfig.url.web}}/tree/main/sources/@roots/wordpress-transforms/README.md) | ![npm](https://img.shields.io/npm/v/@roots/wordpress-transforms/latest.svg?color=%23525ddc&style=flat-square&logo=npm) | ![npm](https://img.shields.io/npm/v/@roots/wordpress-transforms/nightly.svg?color=%23525ddc&style=flat-square&logo=npm) |

## Contributing

{{>contributing}}

## License

{{>license}}

## Community

{{>community}}

## Sponsors

{{>sponsors}}
