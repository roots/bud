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
      Zero config by default (seriously, you don&rsquo;t even
      _need_ a config file).
    </li>
    <li>Modular by design. Use only what you need.</li>
    <li>Easily implementable multi-compiler support.</li>
    <li>Heckin&rsquo; fast.</li>
    <li>
      Luxury dev tooling including semi-automated dependency
      management.
    </li>
    <li>Supports configuration with TypeScript.</li>
    <li>
      Customizable and extensible. Add new features. Swap our
      core components with your own.
    </li>

    <br />

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

    <h3>Presets</h3>

    <span>
      {`
| Name                                                                      | Usage                                                          | Latest                                                                                                 |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------| ------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-preset-recommend**](/packages/@roots/bud-preset-recommend)  | [📚 Usage](${url.docs}/extensions/presets/bud-preset-recommend) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-recommend.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-preset-wordpress**](/packages/@roots/bud-preset-wordpress)  |[📚 Usage](${url.docs}/extensions/presets/bud-preset-wordpress)  | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-wordpress.svg?color=%23525ddc&style=flat-square) |
`}
    </span>

    <h3>Extensions</h3>
    <span>
      {`
| Name                                                                                 | Usage                                                                   | Latest                                                                                                       |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-babel**](/packages/@roots/bud-babel)                                   | [📚 Usage](${url.docs}/extensions/bud-babel/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-compress**](/packages/@roots/bud-compress)                             | [📚 Usage](${url.docs}/extensions/bud-compress/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-compress.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-criticalcss**](/packages/@roots/bud-criticalcss)                       | [📚 Usage](${url.docs}/extensions/bud-criticalcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-emotion**](/packages/@roots/bud-emotion)                               | [📚 Usage](${url.docs}/extensions/bud-emotion/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-entrypoints**](/packages/@roots/bud-entrypoints)                       | [📚 Usage](${url.docs}/extensions/bud-entrypoints/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-esbuild**](/packages/@roots/bud-esbuild)                               | [📚 Usage](${url.docs}/extensions/bud-esbuild/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-eslint**](/packages/@roots/bud-eslint)                                 | [📚 Usage](${url.docs}/extensions/bud-eslint/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-imagemin**](/packages/@roots/bud-imagemin)                             | [📚 Usage](${url.docs}/extensions/bud-imagemin/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-library**](/packages/@roots/bud-library)                               | [📚 Usage](${url.docs}/extensions/bud-library/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-mdx**](/packages/@roots/bud-mdx)                                       | [📚 Usage](${url.docs}/extensions/bud-mdx/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-postcss**](/packages/@roots/bud-postcss)                               | [📚 Usage](${url.docs}/extensions/bud-postcss/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-prettier**](/packages/@roots/bud-prettier)                             | [📚 Usage](${url.docs}/extensions/bud-prettier/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-purgecss**](/packages/@roots/bud-purgecss)                             | [📚 Usage](${url.docs}/extensions/bud-purgecss/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-react**](/packages/@roots/bud-react)                                   | [📚 Usage](${url.docs}/extensions/bud-react/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-sass**](/packages/@roots/bud-sass)                                     | [📚 Usage](${url.docs}/extensions/bud-sass/README.md)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                   |
| [**@roots/bud-solid**](/packages/@roots/bud-solid)                                   | [📚 Usage](${url.docs}/extensions/bud-solid/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-solid.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-stylelint**](/packages/@roots/bud-stylelint)                           | [📚 Usage](${url.docs}/extensions/bud-stylelint/README.md)              | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)              |
| [**@roots/bud-tailwindcss**](/packages/@roots/bud-tailwindcss)                       | [📚 Usage](${url.docs}/extensions/bud-tailwindcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-terser**](/packages/@roots/bud-terser)                                 | [📚 Usage](${url.docs}/extensions/bud-terser/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-typescript**](/packages/@roots/bud-typescript)                         | [📚 Usage](${url.docs}/extensions/bud-typescript/README.md)             | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)             |
| [**@roots/bud-vue**](/packages/@roots/bud-vue)                                       | [📚 Usage](${url.docs}/extensions/bud-vue/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-wordpress-dependencies**](/packages/@roots/bud-wordpress-dependencies) | [📚 Usage](${url.docs}/extensions/bud-wordpress-dependencies/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-wordpress-externals**](/packages/@roots/bud-wordpress-externals)       | [📚 Usage](${url.docs}/extensions/bud-wordpress-externals/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square)    |
| [**@roots/bud-wordpress-manifests**](/packages/@roots/bud-wordpress-manifests)       | [📚 Usage](${url.docs}/extensions/bud-wordpress-manifests/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square)    |
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
