[@roots/budpack](../globals.md) › ["webpack/loaders"](_webpack_loaders_.md)

# Module: "webpack/loaders"

## Index

### Functions

* [babel](_webpack_loaders_.md#const-babel)
* [css](_webpack_loaders_.md#const-css)
* [eslint](_webpack_loaders_.md#const-eslint)
* [images](_webpack_loaders_.md#const-images)
* [loaders](_webpack_loaders_.md#const-loaders)
* [svg](_webpack_loaders_.md#const-svg)

### Object literals

* [loaderModules](_webpack_loaders_.md#const-loadermodules)

## Functions

### `Const` babel

▸ **babel**(`__namedParameters`: object): *object*

*Defined in [webpack/loaders.js:15](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/loaders.js#L15)*

Babel loader

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`babel` | any |
`src` | any |

**Returns:** *object*

* **exclude**: *RegExp‹›* = /node_modules/

* **include**: *any* = src

* **loader**: *string* = loaderModules.babel

* **options**: *any* = babel.options

* **test**: *RegExp‹›* = /\.js$/

___

### `Const` css

▸ **css**(`__namedParameters`: object, `features`: any): *object*

*Defined in [webpack/loaders.js:42](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/loaders.js#L42)*

CSS Loader

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`postCss` | any |
`src` | any |

▪ **features**: *any*

**Returns:** *object*

* **include**: *any* = src

* **test**: *RegExp‹›* = /\.s[ac]ss$/i

* **use**: *any[]* = [
    MiniCssExtractPlugin.loader,
    {
      loader: loaderModules.css,
      options: {url: false},
    },
    ...(features.postCss && postCss.options
      ? [
          {
            loader: loaderModules.postcss,
            options: {
              ...postCss.options,
              importLoaders: 1,
            },
          },
        ]
      : []),
    {
      loader: loaderModules.resolveUrl,
      options: {
        engine: 'postcss',
        sourceMap: false,
        debug: true,
      },
    },
    {
      loader: require.resolve('sass-loader'),
      options: {
        sourceMap: true,
      },
    },
  ]

___

### `Const` eslint

▸ **eslint**(`__namedParameters`: object): *object*

*Defined in [webpack/loaders.js:26](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/loaders.js#L26)*

Eslint loader

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`eslint` | any |
`src` | any |

**Returns:** *object*

* **enforce**: *string* = "pre"

* **exclude**: *RegExp‹›* = /node_modules/

* **include**: *any* = src

* **loader**: *string* = loaderModules.eslint

* **test**: *RegExp‹›* = /\.js$/

* ### **options**: *object*

  * **configFile**: *any* = eslint.config

  * **failOnError**: *boolean* = true

  * **formatter**: *string* = "codeframe"

___

### `Const` images

▸ **images**(): *object*

*Defined in [webpack/loaders.js:82](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/loaders.js#L82)*

Static loader

**Returns:** *object*

* **test**: *RegExp‹›* = /\.jpe?g$|\.gif$|\.png$/i

* **use**: *object[]* = [
    {
      loader: loaderModules.file,
      options: {
        name: '[path][name].[ext]',
      },
    },
  ]

___

### `Const` loaders

▸ **loaders**(`__namedParameters`: object): *object*

*Defined in [webpack/loaders.js:105](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/loaders.js#L105)*

Webpack loaders

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`configs` | any |
`features` | any |
`options` | any |

**Returns:** *object*

* ### **module**: *object*

  * **rules**: *object | object[]* = [
      ...(features.eslint && configs.eslint
        ? [eslint(configs)]
        : []),
      ...(features.babel && options.babel
        ? [babel(options)]
        : []),
      css(options, features),
      images(),
      svg(options),
    ]

  * **strictExportPresence**: *boolean* = true

___

### `Const` svg

▸ **svg**(`__namedParameters`: object): *object*

*Defined in [webpack/loaders.js:97](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/loaders.js#L97)*

SVG loader

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`svg` | any |

**Returns:** *object*

* **test**: *RegExp‹›* = /\.svg$/

* **use**: *any* = svg.use

## Object literals

### `Const` loaderModules

### ▪ **loaderModules**: *object*

*Defined in [webpack/loaders.js:3](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/loaders.js#L3)*

###  babel

• **babel**: *string* = require.resolve('babel-loader')

*Defined in [webpack/loaders.js:4](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/loaders.js#L4)*

###  css

• **css**: *string* = require.resolve('css-loader')

*Defined in [webpack/loaders.js:5](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/loaders.js#L5)*

###  eslint

• **eslint**: *string* = require.resolve('eslint-loader')

*Defined in [webpack/loaders.js:6](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/loaders.js#L6)*

###  file

• **file**: *string* = require.resolve('file-loader')

*Defined in [webpack/loaders.js:7](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/loaders.js#L7)*

###  postcss

• **postcss**: *string* = require.resolve('postcss-loader')

*Defined in [webpack/loaders.js:8](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/loaders.js#L8)*

###  resolveUrl

• **resolveUrl**: *string* = require.resolve('resolve-url-loader')

*Defined in [webpack/loaders.js:9](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/webpack/loaders.js#L9)*
