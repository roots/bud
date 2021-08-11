import * as React from 'react'

import {
  Banner,
  Community,
  Contributing,
  License,
  Sponsors,
} from '../components'

export const Body = ({project}) => (
  <>
    <span>
      {`
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

Check out our [dedicated documentation](${project.url.docs.toString()}) to get started.

There are also [example implementations available in the /examples directory of this repo](${project.url.web.toString()}/tree/master/examples).

## Available modules

### Zero-config presets

| Name                                                                      | Usage                                                        | Latest                                                                                                   
| ------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | 
| [**@roots/bud-preset-recommend**](/packages/@roots/bud-preset-recommend)  | [📚 Usage](${
        project.url.docs
      }/extensions/presets/bud-preset-recommend)  | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-recommend.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-preset-wordpress**](/packages/@roots/bud-preset-wordpress)  |[📚 Usage](${
        project.url.docs
      }/extensions/presets/bud-preset-wordpress)  | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-wordpress.svg?color=%23525ddc&style=flat-square) |

### Extensions

| Name                                                                                                                         | Description                                                                                                                                       | Usage                                                                                            | Latest                       |
| ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------- |
| [**@roots/bud-babel**](/packages/@roots/bud-babel)                                   | [**@babel/babel**](https://github.com/babel/babel)                                                                                                 | [📚 Usage](${
        project.url.docs
      }/extensions/bud-babel/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-compress**](/packages/@roots/bud-compress)                             | [**@webpack-contrib/compression-webpack-plugin**](https://github.com/webpack-contrib/compression-webpack-plugin)                                   | [📚 Usage](${
        project.url.docs
      }/extensions/bud-compress/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-compress.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-criticalcss**](/packages/@roots/bud-criticalcss)                       | [**@addyosmani/critical**](https://github.com/addyosmani/critical)                                                                                 | [📚 Usage](${
        project.url.docs
      }/extensions/bud-criticalcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-emotion**](/packages/@roots/bud-emotion)                               | [**@emotion/emotion-css**](https://github.com/emotion/emotion-css)                                                                                 | [📚 Usage](${
        project.url.docs
      }/extensions/bud-emotion/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-entrypoints**](/packages/@roots/bud-entrypoints)                       | [**@roots/entrypoints-webpack-plugin**](/packages/@roots/entrypoints-webpack-plugin)                                                               | [📚 Usage](${
        project.url.docs
      }/extensions/bud-entrypoints/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-esbuild**](/packages/@roots/bud-esbuild)                               | [**@roots/esbuild-loader**](https://github.com/roots/esbuild-loader)                                                                               | [📚 Usage](${
        project.url.docs
      }/extensions/bud-esbuild/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-eslint**](/packages/@roots/bud-eslint)                                 | [**@webpack-contrib/eslint-webpack-plugin**](https://github.com/webpack-contrib/eslint-webpack-plugin)                                             | [📚 Usage](${
        project.url.docs
      }/extensions/bud-eslint/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-imagemin**](/packages/@roots/bud-imagemin)                             | [**@webpack-contrib/image-minimizer-webpack-plugin**](https://github.com/webpack-contrib/image-minimizer-webpack-plugin)                           | [📚 Usage](${
        project.url.docs
      }/extensions/bud-imagemin/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-library**](/packages/@roots/bud-library)                               | [**@asfktz/autodll-webpack-plugin**](https://github.com/asfktz/autodll-webpack-plugin)                                                             | [📚 Usage](${
        project.url.docs
      }/extensions/bud-library/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-mdx**](/packages/@roots/bud-mdx)                                       | [**@mdx-js/mdx**](https://github.com/mdx-js/mdx)                                                                                                   | [📚 Usage](${
        project.url.docs
      }/extensions/bud-mdx/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-postcss**](/packages/@roots/bud-postcss)                               | [**@postcss/postcss**](https://github.com/postcss/postcss)                                                                                         | [📚 Usage](${
        project.url.docs
      }/extensions/bud-postcss/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-prettier**](/packages/@roots/bud-prettier)                             | [**@prettier/prettier**](https://github.com/prettier/prettier)                                                                                     | [📚 Usage](${
        project.url.docs
      }/extensions/bud-prettier/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-purgecss**](/packages/@roots/bud-purgecss)                             | [**@FullHuman/purgecss**](https://github.com/FullHuman/purgecss)                                                                                   | [📚 Usage](${
        project.url.docs
      }/extensions/bud-purgecss/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-react**](/packages/@roots/bud-react)                                   | [**@facebook/react**](https://github.com/facebook/react)                                                                                           | [📚 Usage](${
        project.url.docs
      }/extensions/bud-react/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-sass**](/packages/@roots/bud-sass)                                     | [**@sass/sass**](https://github.com/sass/sass)                                                                                                     | [📚 Usage](${
        project.url.docs
      }/extensions/bud-sass/README.md)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                   |
| [**@roots/bud-solid**](/packages/@roots/bud-solid)                                   | [**@solidjs/solid**](https://github.com/solidjs/solid)                                                                                             | [📚 Usage](${
        project.url.docs
      }/extensions/bud-solid/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-solid.svg?color=%23525ddc&style=flat-square)                   |
| [**@roots/bud-stylelint**](/packages/@roots/bud-stylelint)                           | [**@stylelint/stylelint**](https://github.com/stylelint/stylelint)                                                                                 | [📚 Usage](${
        project.url.docs
      }/extensions/bud-stylelint/README.md)              | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)              |
| [**@roots/bud-tailwindcss**](/packages/@roots/bud-tailwindcss)                       | [**@tailwindlabs/tailwindcss**](https://github.com/tailwindlabs/tailwindcss)                                                                       | [📚 Usage](${
        project.url.docs
      }/extensions/bud-tailwindcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-terser**](/packages/@roots/bud-terser)                                 | [**@terser/terser**](https://github.com/terser/terser)                                                                                             | [📚 Usage](${
        project.url.docs
      }/extensions/bud-terser/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-typescript**](/packages/@roots/bud-typescript)                         | [**@TypeStrong/ts-loader**](https://github.com/TypeStrong/ts-loader)                                                                               | [📚 Usage](${
        project.url.docs
      }/extensions/bud-typescript/README.md)             | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)             |
| [**@roots/bud-vue**](/packages/@roots/bud-vue)                                       | [**@vue/vue**](https://github.com/vue/vue)                                                                                                         | [📚 Usage](${
        project.url.docs
      }/extensions/bud-vue/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-wordpress-dependencies**](/packages/@roots/bud-wordpress-dependencies) | [**@roots/wordpress-dependencies-webpack-plugin**](/packages/@roots/wordpress-dependencies-webpack-plugin) | [📚 Usage](${
        project.url.docs
      }/extensions/bud-wordpress-dependencies/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-wordpress-externals**](/packages/@roots/bud-wordpress-externals)       | [**@roots/wordpress-externals-webpack-plugin**](/packages/@roots/wordpress-externals-webpack-plugin)       | [📚 Usage](${
        project.url.docs
      }/extensions/bud-wordpress-externals/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square)    |
| [**@roots/bud-wordpress-manifests**](/packages/@roots/bud-wordpress-manifests)       | [**@roots/merged-manifest-webpack-plugin**](/packages/@roots/merged-manifest-webpack-plugin)               | [📚 Usage](${
        project.url.docs
      }/extensions/bud-wordpress-manifests/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square)    |

Have you produced a Bud extension and want to share it here? 
Please, create an issue sharing information about your project.
`}
    </span>

    <License />
  </>
)

export const RootTemplate = ({project}) => (
  <>
    <Banner
      description={project.description}
      logo={project.logo}
    />
    <Body project={project} />
    <Community />
    <Contributing />
    <Sponsors project={project} />
  </>
)
