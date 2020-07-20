[@roots/budpack](../README.md) › [Globals](../globals.md) › ["base/options"](_base_options_.md)

# Module: "base/options"

## Index

### Object literals

* [babelFallback](_base_options_.md#const-babelfallback)
* [options](_base_options_.md#const-options)
* [postCssFallback](_base_options_.md#const-postcssfallback)

## Object literals

### `Const` babelFallback

### ▪ **babelFallback**: *object*

*Defined in [base/options.js:4](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L4)*

###  plugins

• **plugins**: *undefined[]* = []

*Defined in [base/options.js:6](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L6)*

###  presets

• **presets**: *undefined[]* = []

*Defined in [base/options.js:5](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L5)*

___

### `Const` options

### ▪ **options**: *object*

*Defined in [base/options.js:16](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L16)*

Options container.

###  auto

• **auto**: *object*

*Defined in [base/options.js:32](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L32)*

#### Type declaration:

###  babel

• **babel**: *any* = configs.babel
    ? require(configs.babel)
    : babelFallback

*Defined in [base/options.js:17](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L17)*

###  devtool

• **devtool**: *string* = "cheap-module-source-map"

*Defined in [base/options.js:63](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L63)*

###  entry

• **entry**: *object*

*Defined in [base/options.js:64](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L64)*

#### Type declaration:

###  env

• **env**: *object* = env

*Defined in [base/options.js:65](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L65)*

#### Type declaration:

###  postCss

• **postCss**: *any* = configs.postCss
    ? require(configs.postCss)
    : postCssFallback

*Defined in [base/options.js:20](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L20)*

###  target

• **target**: *string* = "web"

*Defined in [base/options.js:79](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L79)*

###  typescript

• **typescript**: *any* = configs.typescript
    ? require(configs.typescript)
    : {}

*Defined in [base/options.js:23](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L23)*

▪ **browserSync**: *object*

*Defined in [base/options.js:33](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L33)*

* **host**: *any* = env?.BROWSERSYNC_HOST
      ? env.BROWSERSYNC_HOST
      : 'localhost'

* **port**: *any* = env?.BROWSERSYNC_PORT
      ? env.BROWSERSYNC_PORT
      : 3000

* **proxy**: *any* = env?.BROWSERSYNC_PROXY
      ? env.BROWSERSYNC_PROXY
      : null

▪ **copy**: *object*

*Defined in [base/options.js:44](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L44)*

* **patterns**: *undefined[]* = []

▪ **dependencyManifest**: *object*

*Defined in [base/options.js:99](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L99)*

* **combineAssets**: *boolean* = false

* **injectPolyfill**: *boolean* = false

* **outputFormat**: *string* = "json"

▪ **dev**: *object*

*Defined in [base/options.js:47](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L47)*

* **clientLogLevel**: *string* = "none"

* **compress**: *boolean* = true

* **disableHostCheck**: *boolean* = true

* **historyApiFallback**: *boolean* = true

* **hotOnly**: *boolean* = true

* **injectHot**: *boolean* = true

* **open**: *boolean* = false

* **overlay**: *boolean* = true

* **headers**: *object*

  * **Access-Control-Allow-Origin**: *string* = "*"

* **watchOptions**: *object*

  * **aggregateTimeout**: *number* = 300

▪ **externals**: *object*

*Defined in [base/options.js:66](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L66)*

* **jquery**: *string* = "jQuery"

* **lodash**: *string* = "lodash"

* **moment**: *string* = "moment"

* **react**: *string* = "React"

* **react-dom**: *string* = "ReactDOM"

▪ **inlineManifest**: *object*

*Defined in [base/options.js:73](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L73)*

* **name**: *string* = "runtime"

▪ **splitting**: *object*

*Defined in [base/options.js:76](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L76)*

* **maxChunks**: *null* = null

▪ **svg**: *object*

*Defined in [base/options.js:26](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L26)*

* **use**: *string[]* = [
      require.resolve('@svgr/webpack'),
      require.resolve('url-loader'),
    ]

▪ **uglify**: *object*

*Defined in [base/options.js:80](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L80)*

* **cache**: *boolean* = true

* **extractComments**: *boolean* = false

* **parallel**: *boolean* = true

* **chunkFilter**(`__namedParameters`: object): *boolean*

* **uglifyOptions**: *object*

  * **compress**: *boolean* = false

  * **mangle**: *object*

    * **toplevel**: *boolean* = true

  * **output**: *object*

    * **beautify**: *boolean* = false

▪ **vendor**: *object*

*Defined in [base/options.js:95](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L95)*

* **name**: *string* = "vendor"

* **vendors**: *undefined[]* = []

___

### `Const` postCssFallback

### ▪ **postCssFallback**: *object*

*Defined in [base/options.js:9](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L9)*

###  plugins

• **plugins**: *undefined[]* = []

*Defined in [base/options.js:10](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/options.js#L10)*
