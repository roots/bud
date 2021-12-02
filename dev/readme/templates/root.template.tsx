import React from 'react'

import {
  Banner,
  Community,
  Contributing,
  License,
  Sponsors,
} from '../components'

export interface RootTemplateProps {
  name: string
  description: string
  logo: string
  url: string
}

export const Body = ({url}) => (
  <>
    <h2>Features</h2>

    <li>
      Zero config by default (seriously, you don't even _need_ a
      config file).
    </li>
    <li>Modular by design. Use only what you need.</li>
    <li>Easily implementable multi-compiler support.</li>
    <li>Heckin' fast.</li>
    <li>
      Luxury dev tooling including semi-automated dependency
      management.
    </li>
    <li>Supports configuration with TypeScript.</li>
    <li>
      Customizable and extensible. Add new features. Swap our
      core components with your own.
    </li>

    <img
      src="https://raw.githubusercontent.com/roots/bud/next/site/static/casts/babel-build--cache.svg"
      title="bud.js build"
    />

    <h2>Requirements</h2>

    <li>Node 16+</li>

    <h2>Getting started</h2>

    <p>
      Check out our [dedicated documentation](
      {url.docs.toString()}) to get started.
    </p>

    <p>
      There are also [example implementations available in the
      /examples directory of this repo]({url.web.toString()}
      /tree/master/examples).
    </p>

    <h2>Available modules</h2>

    <h3>Zero-config presets</h3>

    <span>
      {`
| Name                                                                      | Usage                                                        | Latest
| ------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-preset-recommend**](/packages/@roots/bud-preset-recommend)  | [📚 Usage](${url.docs}/extensions/presets/bud-preset-recommend)  | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-recommend.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-preset-wordpress**](/packages/@roots/bud-preset-wordpress)  |[📚 Usage](${url.docs}/extensions/presets/bud-preset-wordpress)  | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-wordpress.svg?color=%23525ddc&style=flat-square) |
`}
    </span>

    <h3>Extensions</h3>
    <span>
      {`
| Name                                                                                                                         | Description                                                                                                                                       | Usage                                                                                            | Latest                       |
| ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------- |
| [**@roots/bud-babel**](/packages/@roots/bud-babel)                                   | [**@babel/babel**](https://github.com/babel/babel)                                                                                                 | [📚 Usage](${url.docs}/extensions/bud-babel/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-compress**](/packages/@roots/bud-compress)                             | [**@webpack-contrib/compression-webpack-plugin**](https://github.com/webpack-contrib/compression-webpack-plugin)                                   | [📚 Usage](${url.docs}/extensions/bud-compress/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-compress.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-criticalcss**](/packages/@roots/bud-criticalcss)                       | [**@addyosmani/critical**](https://github.com/addyosmani/critical)                                                                                 | [📚 Usage](${url.docs}/extensions/bud-criticalcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-emotion**](/packages/@roots/bud-emotion)                               | [**@emotion/emotion-css**](https://github.com/emotion/emotion-css)                                                                                 | [📚 Usage](${url.docs}/extensions/bud-emotion/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-entrypoints**](/packages/@roots/bud-entrypoints)                       | [**@roots/entrypoints-webpack-plugin**](/packages/@roots/entrypoints-webpack-plugin)                                                               | [📚 Usage](${url.docs}/extensions/bud-entrypoints/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-esbuild**](/packages/@roots/bud-esbuild)                               | [**@roots/esbuild-loader**](https://github.com/roots/esbuild-loader)                                                                               | [📚 Usage](${url.docs}/extensions/bud-esbuild/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-eslint**](/packages/@roots/bud-eslint)                                 | [**@webpack-contrib/eslint-webpack-plugin**](https://github.com/webpack-contrib/eslint-webpack-plugin)                                             | [📚 Usage](${url.docs}/extensions/bud-eslint/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-imagemin**](/packages/@roots/bud-imagemin)                             | [**@webpack-contrib/image-minimizer-webpack-plugin**](https://github.com/webpack-contrib/image-minimizer-webpack-plugin)                           | [📚 Usage](${url.docs}/extensions/bud-imagemin/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-library**](/packages/@roots/bud-library)                               | [**@asfktz/autodll-webpack-plugin**](https://github.com/asfktz/autodll-webpack-plugin)                                                             | [📚 Usage](${url.docs}/extensions/bud-library/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-mdx**](/packages/@roots/bud-mdx)                                       | [**@mdx-js/mdx**](https://github.com/mdx-js/mdx)                                                                                                   | [📚 Usage](${url.docs}/extensions/bud-mdx/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-postcss**](/packages/@roots/bud-postcss)                               | [**@postcss/postcss**](https://github.com/postcss/postcss)                                                                                         | [📚 Usage](${url.docs}/extensions/bud-postcss/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-prettier**](/packages/@roots/bud-prettier)                             | [**@prettier/prettier**](https://github.com/prettier/prettier)                                                                                     | [📚 Usage](${url.docs}/extensions/bud-prettier/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-purgecss**](/packages/@roots/bud-purgecss)                             | [**@FullHuman/purgecss**](https://github.com/FullHuman/purgecss)                                                                                   | [📚 Usage](${url.docs}/extensions/bud-purgecss/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-react**](/packages/@roots/bud-react)                                   | [**@facebook/react**](https://github.com/facebook/react)                                                                                           | [📚 Usage](${url.docs}/extensions/bud-react/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-sass**](/packages/@roots/bud-sass)                                     | [**@sass/sass**](https://github.com/sass/sass)                                                                                                     | [📚 Usage](${url.docs}/extensions/bud-sass/README.md)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                   |
| [**@roots/bud-solid**](/packages/@roots/bud-solid)                                   | [**@solidjs/solid**](https://github.com/solidjs/solid)                                                                                             | [📚 Usage](${url.docs}/extensions/bud-solid/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-solid.svg?color=%23525ddc&style=flat-square)                   |
| [**@roots/bud-stylelint**](/packages/@roots/bud-stylelint)                           | [**@stylelint/stylelint**](https://github.com/stylelint/stylelint)                                                                                 | [📚 Usage](${url.docs}/extensions/bud-stylelint/README.md)              | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)              |
| [**@roots/bud-tailwindcss**](/packages/@roots/bud-tailwindcss)                       | [**@tailwindlabs/tailwindcss**](https://github.com/tailwindlabs/tailwindcss)                                                                       | [📚 Usage](${url.docs}/extensions/bud-tailwindcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-terser**](/packages/@roots/bud-terser)                                 | [**@terser/terser**](https://github.com/terser/terser)                                                                                             | [📚 Usage](${url.docs}/extensions/bud-terser/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-typescript**](/packages/@roots/bud-typescript)                         | [**@TypeStrong/ts-loader**](https://github.com/TypeStrong/ts-loader)                                                                               | [📚 Usage](${url.docs}/extensions/bud-typescript/README.md)             | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)             |
| [**@roots/bud-vue**](/packages/@roots/bud-vue)                                       | [**@vue/vue**](https://github.com/vue/vue)                                                                                                         | [📚 Usage](${url.docs}/extensions/bud-vue/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-wordpress-dependencies**](/packages/@roots/bud-wordpress-dependencies) | [**@roots/wordpress-dependencies-webpack-plugin**](/packages/@roots/wordpress-dependencies-webpack-plugin) | [📚 Usage](${url.docs}/extensions/bud-wordpress-dependencies/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-wordpress-externals**](/packages/@roots/bud-wordpress-externals)       | [**@roots/wordpress-externals-webpack-plugin**](/packages/@roots/wordpress-externals-webpack-plugin)       | [📚 Usage](${url.docs}/extensions/bud-wordpress-externals/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square)    |
| [**@roots/bud-wordpress-manifests**](/packages/@roots/bud-wordpress-manifests)       | [**@roots/merged-manifest-webpack-plugin**](/packages/@roots/merged-manifest-webpack-plugin)               | [📚 Usage](${url.docs}/extensions/bud-wordpress-manifests/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square)    |
`}
    </span>

    <p>
      Have you produced a Bud extension and want to share it
      here? Please, create an issue sharing information about
      your project.
    </p>

    <License />
  </>
)

export const Root = (props: RootTemplateProps) => (
  <>
    <Banner {...props} />
    <Body {...props} />
    <Community />
    <Contributing />
    <Sponsors {...props} />
  </>
)
