import {projectConfig} from '@repo/constants'
import React from 'react'

import {
  Banner,
  Community,
  Contributing,
  License,
  Sponsors,
} from '../components/index.js'

export const Body = ({url}) => (
  <>
    <h2>Features</h2>

    <li>
      Zero config by default (seriously, you don&rsquo;t even _need_ a
      config file).
    </li>
    <li>Modular by design. Use only what you need.</li>
    <li>Easily implementable multi-compiler support.</li>
    <li>Heckin&rsquo; fast.</li>
    <li>
      Luxury dev tooling including semi-automated dependency management.
    </li>
    <li>Supports configuration with TypeScript.</li>
    <li>
      Customizable and extensible. Add new features. Swap our core
      components with your own.
    </li>

    <br />

    <img
      src="https://raw.githubusercontent.com/roots/bud/main/sources/@repo/docs/static/casts/babel-build--cache.svg"
      title="bud.js build"
    />

    <h2>Requirements</h2>

    <li>Node 16+</li>
    <li>yarn 1.22 or higher</li>
    <li>npm 8.3 or higher</li>
    <li>
      Windows users must run bud.js under the Windows Subsystem for Linux.
    </li>

    <h2>Getting started</h2>

    <p>
      Check out our [dedicated documentation](
      {url.docs.toString()}) to get started.
    </p>

    <p>
      There are also [example implementations available in the /examples
      directory of this repo]({url.web.toString()}
      /tree/master/examples).
    </p>

    <h2>Available modules</h2>

    <h3>Presets</h3>

    <span>
      {`
| Name                                                                      | Usage                                                          | Latest                                                                                                 |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------| ------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-preset-recommend**](/sources/@roots/bud-preset-recommend)  | [📚 Usage](${url.docs}/extensions/presets/bud-preset-recommend) | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-recommend.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-preset-wordpress**](/sources/@roots/bud-preset-wordpress)  |[📚 Usage](${url.docs}/extensions/presets/bud-preset-wordpress)  | ![npm](https://img.shields.io/npm/v/@roots/bud-preset-wordpress.svg?color=%23525ddc&style=flat-square) |
`}
    </span>

    <h3>Extensions</h3>
    <span>
      {`
| Name                                                                                 | Usage                                                                   | Latest                                                                                                       |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-babel**](/sources/@roots/bud-babel)                                   | [📚 Usage](${url.docs}/extensions/bud-babel/)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-compress**](/sources/@roots/bud-compress)                             | [📚 Usage](${url.docs}/extensions/bud-compress/)               | ![npm](https://img.shields.io/npm/v/@roots/bud-compress.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-criticalcss**](/sources/@roots/bud-criticalcss)                       | [📚 Usage](${url.docs}/extensions/bud-criticalcss/)            | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-emotion**](/sources/@roots/bud-emotion)                               | [📚 Usage](${url.docs}/extensions/bud-emotion/)                | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-entrypoints**](/sources/@roots/bud-entrypoints)                       | [📚 Usage](${url.docs}/extensions/bud-entrypoints/)            | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-esbuild**](/sources/@roots/bud-esbuild)                               | [📚 Usage](${url.docs}/extensions/bud-esbuild/)                | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-eslint**](/sources/@roots/bud-eslint)                                 | [📚 Usage](${url.docs}/extensions/bud-eslint/)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-imagemin**](/sources/@roots/bud-imagemin)                             | [📚 Usage](${url.docs}/extensions/bud-imagemin/)               | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-library**](/sources/@roots/bud-library)                               | [📚 Usage](${url.docs}/extensions/bud-library/)                | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)                |
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
`}
    </span>

    <p>
      Have you produced a Bud extension and want to share it here? Please,
      create an issue sharing information about your project.
    </p>

    <h2>Want to contribute to bud.js?</h2>
    <p>
      Check out [our development guide](https://bud.js.org/dev) to get
      started.
    </p>

    <License />
  </>
)

export const Root = (props: projectConfig) => (
  <>
    <Banner {...props} />
    <Body {...props} />
    <Community />
    <Contributing />
    <Sponsors {...props} />
  </>
)
