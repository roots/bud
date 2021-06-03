## Installation

Install `@roots/bud` and `@roots/bud-cli` to your project

```sh
yarn add @roots/bud @roots/bud-cli --dev
```

## Getting started

Bud can either be configured with a static config file (`json`/`yml`) or a builder module (`js`/`ts`).

Dead simple example

```js
/**
 * bud.config.js
 */
module.exports = bud => bud.entry('app', ['app.js'])
```

Or, as yml

```yml
# bud.config.yml
entry:
  app: 'app.js'
```

A more advanced configuration might look like

```ts
/**
 * bud.config.ts
 */
import {Framework} from '@roots/bud'

export default (bud: Framework) =>
  bud
    .use([
      require('@roots/bud-babel'),
      require('@roots/bud-postcss'),
      require('@roots/bud-react'),
    ])

    .library(['react', 'react-dom'])

    .entry({app: ['app.{js,css}']})

    .when(
      bud.isProduction,
      ({minimize}) => minimize(),
      ({devtool}) => devtool('eval-source-map'),
    )
```

Which could also be expressed in a set of `yml` files

```yml
# bud.config.yml
extensions:
  - '@roots/bud-babel'
  - '@roots/bud-postcss'
  - '@roots/bud-react'
library:
  - 'react'
  - 'react-dom'
entry:
  app: 'app.{js,css}'
```

```yml
# bud.production.config.yml
minimize: true
```

```yml
# bud.development.config.yml
devtool: 'eval-source-map'
```

For more on configuring `@roots/bud` check out the [dedicated documentation](docs:config/README).

## Running a build

![Terminal usage](/dev/assets/cli.svg)

Once you've set up your configuration file the following command will run the build:

```sh
yarn bud build
```

You should see your built assets in the `dist` directory of your project.

### Running in `production` mode

```sh
yarn bud build:production
```

### Running in `development` mode

```sh
yarn bud build:development
```

## Example implementations

There are [example implementations available](url:examples).

## Extending

Bud provides an intentionally sparse set of out-of-the-box features.

In fact, much of the core of Bud is actually made up of extensions. This is to make it easy for devs to swap out parts of the framework as needed.

That said, you will likely want to utilize extensions in your project.

If you're unsure where to start or what you need you can try the `@roots/bud-preset-recommend` preset. Most require zero configuration.

### First-party extensions

There are a number of Roots maintained extensions available to kickstart your project

| Name                                | Project home                                    | Extension docs                              | Latest                                         |
| ----------------------------------- | ----------------------------------------------- | ------------------------------------------- | ---------------------------------------------- |
| `@roots/bud-babel`                  | @babel/babel                                    | [readme](@roots/bud-babel)                  | [badge](npm:@roots/bud-babel)                  |
| `@roots/bud-compress`               | @webpack-contrib/compression-webpack-plugin     | [readme](@roots/bud-compress)               | [badge](npm:@roots/bud-compress)               |
| `@roots/bud-criticalcss`            | @addyosmani/critical                            | [readme](@roots/bud-criticalcss)            | [badge](npm:@roots/bud-criticalcss)            |
| `@roots/bud-emotion`                | @emotion/emotion-css                            | [readme](@roots/bud-emotion)                | [badge](npm:@roots/bud-emotion)                |
| `@roots/bud-entrypoints`            | `@roots/entrypoints-webpack-plugin`             | [readme](@roots/bud-entrypoints)            | [badge](npm:@roots/bud-entrypoints)            |
| `@roots/bud-esbuild`                | @roots/esbuild-loader                           | [readme](@roots/bud-esbuild)                | [badge](npm:@roots/bud-esbuild)                |
| `@roots/bud-eslint`                 | @webpack-contrib/eslint-webpack-plugin          | [readme](@roots/bud-eslint)                 | [badge](npm:@roots/bud-eslint)                 |
| `@roots/bud-imagemin`               | @webpack-contrib/image-minimizer-webpack-plugin | [readme](@roots/bud-imagemin)               | [badge](npm:@roots/bud-imagemin)               |
| `@roots/bud-library`                | @asfktz/autodll-webpack-plugin                  | [readme](@roots/bud-library)                | [badge](npm:@roots/bud-library)                |
| `@roots/bud-mdx`                    | @mdx-js/mdx                                     | [readme](@roots/bud-mdx)                    | [badge](npm:@roots/bud-mdx)                    |
| `@roots/bud-postcss`                | @postcss/postcss                                | [readme](@roots/bud-postcss)                | [badge](npm:@roots/bud-postcss)                |
| `@roots/bud-prettier`               | @prettier/prettier                              | [readme](@roots/bud-prettier)               | [badge](npm:@roots/bud-prettier)               |
| `@roots/bud-purgecss`               | @FullHuman/purgecss                             | [readme](@roots/bud-purgecss)               | [badge](npm:@roots/bud-purgecss)               |
| `@roots/bud-react`                  | @facebook/react                                 | [readme](@roots/bud-react)                  | [badge](npm:@roots/bud-react)                  |
| `@roots/bud-sass`                   | @sass/sass                                      | [readme](@roots/bud-sass)                   | [badge](npm:@roots/bud-sass)                   |
| `@roots/bud-stylelint`              | @stylelint/stylelint                            | [readme](@roots/bud-stylelint)              | [badge](npm:@roots/bud-stylelint)              |
| `@roots/bud-tailwindcss`            | @tailwindlabs/tailwindcss                       | [readme](@roots/bud-tailwindcss)            | [badge](npm:@roots/bud-tailwindcss)            |
| `@roots/bud-terser`                 | @terser/terser                                  | [readme](@roots/bud-terser)                 | [badge](npm:@roots/bud-terser)                 |
| `@roots/bud-typescript`             | @TypeStrong/ts-loader                           | [readme](@roots/bud-typescript)             | [badge](npm:@roots/bud-typescript)             |
| `@roots/bud-vue`                    | @vue/vue                                        | [readme](@roots/bud-vue)                    | [badge](npm:@roots/bud-vue)                    |
| `@roots/bud-wordpress-dependencies` | `@roots/wordpress-dependencies-webpack-plugin`  | [readme](@roots/bud-wordpress-dependencies) | [badge](npm:@roots/bud-wordpress-dependencies) |
| `@roots/bud-wordpress-externals`    | `@roots/wordpress-externals-webpack-plugin`     | [readme](@roots/bud-wordpress-externals)    | [badge](npm:@roots/bud-wordpress-externals)    |
| `@roots/bud-wordpress-manifests`    | `@roots/merged-manifest-webpack-plugin`         | [readme](@roots/bud-wordpress-manifests)    | [badge](npm:@roots/bud-wordpress-manifests)    |

### Third-party extensions

Have you produced a Bud extension and want to share it here? Please, create an issue sharing information about your project.

## Documentation and details

- [Documentation](docs:README)
- [Getting started](docs:getting-started)
- [Configuration](docs:config/README)
- [CLI](docs:cli)
