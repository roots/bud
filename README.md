<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" />
</p>

<p align="center">
  <img
    alt="MIT License"
    src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square"
  />
  <a href="https://www.npmjs.com/package/@roots/bud">
    <img src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://codeclimate.com/github/roots/bud-support/maintainability">
    <img src="https://img.shields.io/codeclimate/maintainability/roots/bud-support?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://twitter.com/rootswp">
    <img
      alt="Follow Roots"
      src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square"
    />
  </a>
</p>

<h1 align="center">
  <strong>@roots/bud</strong>
</h1>

> A frontend build tooling framework combining the best parts of Symfony Encore and Laravel Mix

![Terminal usage](/static/img/cli.svg)

## Getting started

Check out the [dedicated documentation](/docs/config/README.md) for usage details.

## Example implementations

There are [example implementations available](/examples).

## Extending

Bud provides an intentionally sparse set of out-of-the-box features.

You will likely want to utilize extensions in your project.

If you're unsure where to start or what you need you can try the 
[**@roots/bud-preset-recommend**](/packages/@roots/bud-preset-recommend) preset. 
Most require zero configuration.

| Name                                                                                                                         | Project home                                                                                                                                       | Extension docs                                                                                             | Latest                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [**@roots/bud-babel**](/packages/@roots/bud-babel)                                   | [**@babel/babel**](https://github.com/babel/babel)                                                                                                 | [📚 README](/packages/@roots/bud-babel/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-babel.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-compress**](/packages/@roots/bud-compress)                             | [**@webpack-contrib/compression-webpack-plugin**](https://github.com/webpack-contrib/compression-webpack-plugin)                                   | [📚 README](/packages/@roots/bud-compress/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-compress.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-criticalcss**](/packages/@roots/bud-criticalcss)                       | [**@addyosmani/critical**](https://github.com/addyosmani/critical)                                                                                 | [📚 README](/packages/@roots/bud-criticalcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-criticalcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-emotion**](/packages/@roots/bud-emotion)                               | [**@emotion/emotion-css**](https://github.com/emotion/emotion-css)                                                                                 | [📚 README](/packages/@roots/bud-emotion/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-emotion.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-entrypoints**](/packages/@roots/bud-entrypoints)                       | [**@roots/entrypoints-webpack-plugin**](/packages/@roots/entrypoints-webpack-plugin)                       | [📚 README](/packages/@roots/bud-entrypoints/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-entrypoints.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-esbuild**](/packages/@roots/bud-esbuild)                               | [**@roots/esbuild-loader**](https://github.com/roots/esbuild-loader)                                                                               | [📚 README](/packages/@roots/bud-esbuild/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-esbuild.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-eslint**](/packages/@roots/bud-eslint)                                 | [**@webpack-contrib/eslint-webpack-plugin**](https://github.com/webpack-contrib/eslint-webpack-plugin)                                             | [📚 README](/packages/@roots/bud-eslint/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-eslint.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-imagemin**](/packages/@roots/bud-imagemin)                             | [**@webpack-contrib/image-minimizer-webpack-plugin**](https://github.com/webpack-contrib/image-minimizer-webpack-plugin)                           | [📚 README](/packages/@roots/bud-imagemin/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-imagemin.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-library**](/packages/@roots/bud-library)                               | [**@asfktz/autodll-webpack-plugin**](https://github.com/asfktz/autodll-webpack-plugin)                                                             | [📚 README](/packages/@roots/bud-library/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-library.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-mdx**](/packages/@roots/bud-mdx)                                       | [**@mdx-js/mdx**](https://github.com/mdx-js/mdx)                                                                                                   | [📚 README](/packages/@roots/bud-mdx/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-mdx.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-postcss**](/packages/@roots/bud-postcss)                               | [**@postcss/postcss**](https://github.com/postcss/postcss)                                                                                         | [📚 README](/packages/@roots/bud-postcss/README.md)                | ![npm](https://img.shields.io/npm/v/@roots/bud-postcss.svg?color=%23525ddc&style=flat-square)                |
| [**@roots/bud-prettier**](/packages/@roots/bud-prettier)                             | [**@prettier/prettier**](https://github.com/prettier/prettier)                                                                                     | [📚 README](/packages/@roots/bud-prettier/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-prettier.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-purgecss**](/packages/@roots/bud-purgecss)                             | [**@FullHuman/purgecss**](https://github.com/FullHuman/purgecss)                                                                                   | [📚 README](/packages/@roots/bud-purgecss/README.md)               | ![npm](https://img.shields.io/npm/v/@roots/bud-purgecss.svg?color=%23525ddc&style=flat-square)               |
| [**@roots/bud-react**](/packages/@roots/bud-react)                                   | [**@facebook/react**](https://github.com/facebook/react)                                                                                           | [📚 README](/packages/@roots/bud-react/README.md)                  | ![npm](https://img.shields.io/npm/v/@roots/bud-react.svg?color=%23525ddc&style=flat-square)                  |
| [**@roots/bud-sass**](/packages/@roots/bud-sass)                                     | [**@sass/sass**](https://github.com/sass/sass)                                                                                                     | [📚 README](/packages/@roots/bud-sass/README.md)                   | ![npm](https://img.shields.io/npm/v/@roots/bud-sass.svg?color=%23525ddc&style=flat-square)                   |
| [**@roots/bud-stylelint**](/packages/@roots/bud-stylelint)                           | [**@stylelint/stylelint**](https://github.com/stylelint/stylelint)                                                                                 | [📚 README](/packages/@roots/bud-stylelint/README.md)              | ![npm](https://img.shields.io/npm/v/@roots/bud-stylelint.svg?color=%23525ddc&style=flat-square)              |
| [**@roots/bud-tailwindcss**](/packages/@roots/bud-tailwindcss)                       | [**@tailwindlabs/tailwindcss**](https://github.com/tailwindlabs/tailwindcss)                                                                       | [📚 README](/packages/@roots/bud-tailwindcss/README.md)            | ![npm](https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square)            |
| [**@roots/bud-terser**](/packages/@roots/bud-terser)                                 | [**@terser/terser**](https://github.com/terser/terser)                                                                                             | [📚 README](/packages/@roots/bud-terser/README.md)                 | ![npm](https://img.shields.io/npm/v/@roots/bud-terser.svg?color=%23525ddc&style=flat-square)                 |
| [**@roots/bud-typescript**](/packages/@roots/bud-typescript)                         | [**@TypeStrong/ts-loader**](https://github.com/TypeStrong/ts-loader)                                                                               | [📚 README](/packages/@roots/bud-typescript/README.md)             | ![npm](https://img.shields.io/npm/v/@roots/bud-typescript.svg?color=%23525ddc&style=flat-square)             |
| [**@roots/bud-vue**](/packages/@roots/bud-vue)                                       | [**@vue/vue**](https://github.com/vue/vue)                                                                                                         | [📚 README](/packages/@roots/bud-vue/README.md)                    | ![npm](https://img.shields.io/npm/v/@roots/bud-vue.svg?color=%23525ddc&style=flat-square)                    |
| [**@roots/bud-wordpress-dependencies**](/packages/@roots/bud-wordpress-dependencies) | [**@roots/wordpress-dependencies-webpack-plugin**](/packages/@roots/wordpress-dependencies-webpack-plugin) | [📚 README](/packages/@roots/bud-wordpress-dependencies/README.md) | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-dependencies.svg?color=%23525ddc&style=flat-square) |
| [**@roots/bud-wordpress-externals**](/packages/@roots/bud-wordpress-externals)       | [**@roots/wordpress-externals-webpack-plugin**](/packages/@roots/wordpress-externals-webpack-plugin)       | [📚 README](/packages/@roots/bud-wordpress-externals/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-externals.svg?color=%23525ddc&style=flat-square)    |
| [**@roots/bud-wordpress-manifests**](/packages/@roots/bud-wordpress-manifests)       | [**@roots/merged-manifest-webpack-plugin**](/packages/@roots/merged-manifest-webpack-plugin)               | [📚 README](/packages/@roots/bud-wordpress-manifests/README.md)    | ![npm](https://img.shields.io/npm/v/@roots/bud-wordpress-manifests.svg?color=%23525ddc&style=flat-square)    |

Have you produced a Bud extension and want to share it here? 
Please, create an issue sharing information about your project.

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
<a href="https://icons8.com/"><img src="https://cdn.roots.io/app/uploads/icons8.svg" alt="Icons8" width="200" height="150"/></a>
<a href="https://www.harnessup.com/"><img src="https://cdn.roots.io/app/uploads/harness-software.svg" alt="Harness Software" width="200" height="150"/></a>
<a href="https://www.codersclan.com/"><img src="https://cdn.roots.io/app/uploads/coders-clan.svg" alt="Coders Clan" width="200" height="150"/></a>
<a href="https://generodigital.com/"><img src="https://cdn.roots.io/app/uploads/genero.svg" alt="Genero" width="200" height="150"/></a>
<a href="https://motto.ca/roots"><img src="https://cdn.roots.io/app/uploads/motto.svg" alt="Motto" width="200" height="150"/></a>