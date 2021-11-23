<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" />
</p>

<p align="center">
  <img
    alt="MIT License"
    src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square"
  />
  <a
    href="https://app.fossa.com/projects/git%2Bgithub.com%2Froots%2Fbud?ref=badge_small"
    alt="FOSSA Status"
  >
    <img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Froots%2Fbud.svg?type=small" />
  </a>
  <a href="https://www.npmjs.com/package/@roots/bud">
    <img src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://codecov.io/gh/roots/bud">
    <img src="https://codecov.io/gh/roots/bud/branch/next/graph/badge.svg?token=DRJ28OD8XD" />
  </a>
  <a href="https://twitter.com/rootswp">
    <img
      alt="Follow Roots"
      src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square"
    />
  </a>
</p>

<h1 align="center">
  <strong>bud.js</strong>
</h1>

⚡️ Lightning fast frontend build tools combining the best parts of Symfony Encore and Laravel Mix

## Features

- Zero config by default (seriously, you don't even _need_ a config file).
- Modular by design. Use only what you need.
- Easily implementable multi-compiler support.
- Heckin' fast.
- Luxury dev tooling including semi-automated dependency management.
- Supports configuration with TypeScript.
- Customizable and extensible. Add new features. Swap our core components with your own.

![Image](https://raw.githubusercontent.com/roots/bud/next/site/static/casts/babel-build--cache.svg)

## Requirements

- Node v14+. Bud is developed using Node v16.

## Getting Started

Check out our [dedicated documentation](https://budjs.netlify.app) to get started.

There are also [example implementations available in the /examples directory of this repo](https://github.com/roots/bud/tree/master/examples).

## Available modules

### Zero-config presets

| Name                                                                     | Usage                                                                         | Latest                                                                                                 |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-preset-recommend**](/packages/@roots/bud-preset-recommend) | [📚 Usage](https://budjs.netlify.app/extensions/presets/bud-preset-recommend) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-recommend.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-preset-wordpress**](/packages/@roots/bud-preset-wordpress) | [📚 Usage](https://budjs.netlify.app/extensions/presets/bud-preset-wordpress) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-wordpress.svg?color=%23525ddc&style=flat-square) |

### Extensions

| Name                                                                                 | Description                                                                                                              | Usage                                                                                 | Latest                                                                                                       |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-babel**](/packages/@roots/bud-babel)                                   | [**@babel/babel**](https://github.com/babel/babel)                                                                       | [📚 Usage](https://budjs.netlify.app/extensions/bud-babel/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-compress**](/packages/@roots/bud-compress)                             | [**@webpack-contrib/compression-webpack-plugin**](https://github.com/webpack-contrib/compression-webpack-plugin)         | [📚 Usage](https://budjs.netlify.app/extensions/bud-compress/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-compress.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-criticalcss**](/packages/@roots/bud-criticalcss)                       | [**@addyosmani/critical**](https://github.com/addyosmani/critical)                                                       | [📚 Usage](https://budjs.netlify.app/extensions/bud-criticalcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-emotion**](/packages/@roots/bud-emotion)                               | [**@emotion/emotion-css**](https://github.com/emotion/emotion-css)                                                       | [📚 Usage](https://budjs.netlify.app/extensions/bud-emotion/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-entrypoints**](/packages/@roots/bud-entrypoints)                       | [**@roots/entrypoints-webpack-plugin**](/packages/@roots/entrypoints-webpack-plugin)                                     | [📚 Usage](https://budjs.netlify.app/extensions/bud-entrypoints/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-esbuild**](/packages/@roots/bud-esbuild)                               | [**@roots/esbuild-loader**](https://github.com/roots/esbuild-loader)                                                     | [📚 Usage](https://budjs.netlify.app/extensions/bud-esbuild/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-eslint**](/packages/@roots/bud-eslint)                                 | [**@webpack-contrib/eslint-webpack-plugin**](https://github.com/webpack-contrib/eslint-webpack-plugin)                   | [📚 Usage](https://budjs.netlify.app/extensions/bud-eslint/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-imagemin**](/packages/@roots/bud-imagemin)                             | [**@webpack-contrib/image-minimizer-webpack-plugin**](https://github.com/webpack-contrib/image-minimizer-webpack-plugin) | [📚 Usage](https://budjs.netlify.app/extensions/bud-imagemin/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-library**](/packages/@roots/bud-library)                               | [**@asfktz/autodll-webpack-plugin**](https://github.com/asfktz/autodll-webpack-plugin)                                   | [📚 Usage](https://budjs.netlify.app/extensions/bud-library/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-mdx**](/packages/@roots/bud-mdx)                                       | [**@mdx-js/mdx**](https://github.com/mdx-js/mdx)                                                                         | [📚 Usage](https://budjs.netlify.app/extensions/bud-mdx/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-postcss**](/packages/@roots/bud-postcss)                               | [**@postcss/postcss**](https://github.com/postcss/postcss)                                                               | [📚 Usage](https://budjs.netlify.app/extensions/bud-postcss/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-prettier**](/packages/@roots/bud-prettier)                             | [**@prettier/prettier**](https://github.com/prettier/prettier)                                                           | [📚 Usage](https://budjs.netlify.app/extensions/bud-prettier/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-purgecss**](/packages/@roots/bud-purgecss)                             | [**@FullHuman/purgecss**](https://github.com/FullHuman/purgecss)                                                         | [📚 Usage](https://budjs.netlify.app/extensions/bud-purgecss/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-react**](/packages/@roots/bud-react)                                   | [**@facebook/react**](https://github.com/facebook/react)                                                                 | [📚 Usage](https://budjs.netlify.app/extensions/bud-react/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-sass**](/packages/@roots/bud-sass)                                     | [**@sass/sass**](https://github.com/sass/sass)                                                                           | [📚 Usage](https://budjs.netlify.app/extensions/bud-sass/README.md)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                   |
| [**@roots/bud-solid**](/packages/@roots/bud-solid)                                   | [**@solidjs/solid**](https://github.com/solidjs/solid)                                                                   | [📚 Usage](https://budjs.netlify.app/extensions/bud-solid/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-solid.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-stylelint**](/packages/@roots/bud-stylelint)                           | [**@stylelint/stylelint**](https://github.com/stylelint/stylelint)                                                       | [📚 Usage](https://budjs.netlify.app/extensions/bud-stylelint/README.md)              | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)              |
| [**@roots/bud-tailwindcss**](/packages/@roots/bud-tailwindcss)                       | [**@tailwindlabs/tailwindcss**](https://github.com/tailwindlabs/tailwindcss)                                             | [📚 Usage](https://budjs.netlify.app/extensions/bud-tailwindcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-terser**](/packages/@roots/bud-terser)                                 | [**@terser/terser**](https://github.com/terser/terser)                                                                   | [📚 Usage](https://budjs.netlify.app/extensions/bud-terser/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-typescript**](/packages/@roots/bud-typescript)                         | [**@TypeStrong/ts-loader**](https://github.com/TypeStrong/ts-loader)                                                     | [📚 Usage](https://budjs.netlify.app/extensions/bud-typescript/README.md)             | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)             |
| [**@roots/bud-vue**](/packages/@roots/bud-vue)                                       | [**@vue/vue**](https://github.com/vue/vue)                                                                               | [📚 Usage](https://budjs.netlify.app/extensions/bud-vue/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-wordpress-dependencies**](/packages/@roots/bud-wordpress-dependencies) | [**@roots/wordpress-dependencies-webpack-plugin**](/packages/@roots/wordpress-dependencies-webpack-plugin)               | [📚 Usage](https://budjs.netlify.app/extensions/bud-wordpress-dependencies/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-wordpress-externals**](/packages/@roots/bud-wordpress-externals)       | [**@roots/wordpress-externals-webpack-plugin**](/packages/@roots/wordpress-externals-webpack-plugin)                     | [📚 Usage](https://budjs.netlify.app/extensions/bud-wordpress-externals/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square)    |
| [**@roots/bud-wordpress-manifests**](/packages/@roots/bud-wordpress-manifests)       | [**@roots/merged-manifest-webpack-plugin**](/packages/@roots/merged-manifest-webpack-plugin)                             | [📚 Usage](https://budjs.netlify.app/extensions/bud-wordpress-manifests/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square)    |

Have you produced a Bud extension and want to share it here?
Please, create an issue sharing information about your project.

[object Object][object object][object Object]

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)

## Contributing

Contributions are welcome from everyone.
We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).
<a href="https://kinsta.com/?kaid=OFDHAJIXUDIV"><img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="200" height="150"/></a>
<a href="https://k-m.com/"><img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"/></a>
<a href="https://carrot.com/"><img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150"/></a>
<a href="https://www.c21redwood.com/"><img src="https://cdn.roots.io/app/uploads/c21redwood.svg" alt="C21 Redwood Realty" width="200" height="150"/></a>
<a href="https://wordpress.com/"><img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="200" height="150"/></a>
<a href="https://pantheon.io/"><img src="https://cdn.roots.io/app/uploads/pantheon.svg" alt="Pantheon" width="200" height="150"/></a>
