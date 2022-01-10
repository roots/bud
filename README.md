<p align="center">
  <img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="Bud" />
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" /> <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" /> <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center">
  <strong>bud.js</strong>
</h1>

<p align="center">
  ⚡️ Lightning fast frontend build tools combining the best parts of Symfony Encore and Laravel Mix
</p>

## Features

- Zero config by default (seriously, you don’t even _need_ a config file).
- Modular by design. Use only what you need.
- Easily implementable multi-compiler support.
- Heckin’ fast.
- Luxury dev tooling including semi-automated dependency management.
- Supports configuration with TypeScript.
- Customizable and extensible. Add new features. Swap our core components with your own.

![bud.js build](https://raw.githubusercontent.com/roots/bud/next/site/static/casts/babel-build--cache.svg)

## Requirements

- Node 16+

## Getting started

Check out our [dedicated documentation](https://budjs.netlify.app) to get started.

There are also [example implementations available in the /examples directory of this repo](https://github.com/roots/bud/tree/master/examples).

## Available modules

### Presets

| Name                                                                    | Usage                                                                         | Latest                                                                                                 |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-preset-recommend**](/sources/@roots/bud-preset-recommend) | [📚 Usage](https://budjs.netlify.app/extensions/presets/bud-preset-recommend) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-recommend.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-preset-wordpress**](/sources/@roots/bud-preset-wordpress) | [📚 Usage](https://budjs.netlify.app/extensions/presets/bud-preset-wordpress) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-wordpress.svg?color=%23525ddc&style=flat-square) |

### Extensions

| Name                                                                                | Usage                                                                                 | Latest                                                                                                       |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-babel**](/sources/@roots/bud-babel)                                   | [📚 Usage](https://budjs.netlify.app/extensions/bud-babel/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-compress**](/sources/@roots/bud-compress)                             | [📚 Usage](https://budjs.netlify.app/extensions/bud-compress/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-compress.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-criticalcss**](/sources/@roots/bud-criticalcss)                       | [📚 Usage](https://budjs.netlify.app/extensions/bud-criticalcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-emotion**](/sources/@roots/bud-emotion)                               | [📚 Usage](https://budjs.netlify.app/extensions/bud-emotion/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-entrypoints**](/sources/@roots/bud-entrypoints)                       | [📚 Usage](https://budjs.netlify.app/extensions/bud-entrypoints/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-esbuild**](/sources/@roots/bud-esbuild)                               | [📚 Usage](https://budjs.netlify.app/extensions/bud-esbuild/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-eslint**](/sources/@roots/bud-eslint)                                 | [📚 Usage](https://budjs.netlify.app/extensions/bud-eslint/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-imagemin**](/sources/@roots/bud-imagemin)                             | [📚 Usage](https://budjs.netlify.app/extensions/bud-imagemin/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-library**](/sources/@roots/bud-library)                               | [📚 Usage](https://budjs.netlify.app/extensions/bud-library/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-mdx**](/sources/@roots/bud-mdx)                                       | [📚 Usage](https://budjs.netlify.app/extensions/bud-mdx/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-postcss**](/sources/@roots/bud-postcss)                               | [📚 Usage](https://budjs.netlify.app/extensions/bud-postcss/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-prettier**](/sources/@roots/bud-prettier)                             | [📚 Usage](https://budjs.netlify.app/extensions/bud-prettier/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-purgecss**](/sources/@roots/bud-purgecss)                             | [📚 Usage](https://budjs.netlify.app/extensions/bud-purgecss/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-react**](/sources/@roots/bud-react)                                   | [📚 Usage](https://budjs.netlify.app/extensions/bud-react/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-sass**](/sources/@roots/bud-sass)                                     | [📚 Usage](https://budjs.netlify.app/extensions/bud-sass/README.md)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                   |
| [**@roots/bud-solid**](/sources/@roots/bud-solid)                                   | [📚 Usage](https://budjs.netlify.app/extensions/bud-solid/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-solid.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-stylelint**](/sources/@roots/bud-stylelint)                           | [📚 Usage](https://budjs.netlify.app/extensions/bud-stylelint/README.md)              | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)              |
| [**@roots/bud-tailwindcss**](/sources/@roots/bud-tailwindcss)                       | [📚 Usage](https://budjs.netlify.app/extensions/bud-tailwindcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-terser**](/sources/@roots/bud-terser)                                 | [📚 Usage](https://budjs.netlify.app/extensions/bud-terser/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-typescript**](/sources/@roots/bud-typescript)                         | [📚 Usage](https://budjs.netlify.app/extensions/bud-typescript/README.md)             | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)             |
| [**@roots/bud-vue**](/sources/@roots/bud-vue)                                       | [📚 Usage](https://budjs.netlify.app/extensions/bud-vue/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-wordpress-dependencies**](/sources/@roots/bud-wordpress-dependencies) | [📚 Usage](https://budjs.netlify.app/extensions/bud-wordpress-dependencies/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-wordpress-externals**](/sources/@roots/bud-wordpress-externals)       | [📚 Usage](https://budjs.netlify.app/extensions/bud-wordpress-externals/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square)    |
| [**@roots/bud-wordpress-manifests**](/sources/@roots/bud-wordpress-manifests)       | [📚 Usage](https://budjs.netlify.app/extensions/bud-wordpress-manifests/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square)    |

Have you produced a Bud extension and want to share it here? Please, create an issue sharing information about your project.

## Licensing

Bud is licensed MIT.

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
