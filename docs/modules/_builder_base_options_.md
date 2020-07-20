[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/base/options"](_builder_base_options_.md)

# Module: "builder/base/options"

## Index

### Object literals

* [babelFallback](_builder_base_options_.md#const-babelfallback)
* [options](_builder_base_options_.md#const-options)
* [postCssFallback](_builder_base_options_.md#const-postcssfallback)

## Object literals

### `Const` babelFallback

### ▪ **babelFallback**: *object*

Defined in src/builder/base/options.js:4

###  plugins

• **plugins**: *undefined[]* = []

Defined in src/builder/base/options.js:6

###  presets

• **presets**: *undefined[]* = []

Defined in src/builder/base/options.js:5

___

### `Const` options

### ▪ **options**: *object*

Defined in src/builder/base/options.js:16

Options container.

###  auto

• **auto**: *object*

Defined in src/builder/base/options.js:32

#### Type declaration:

###  babel

• **babel**: *any* = configs.babel
    ? require(configs.babel)
    : babelFallback

Defined in src/builder/base/options.js:17

###  devtool

• **devtool**: *string* = "cheap-module-source-map"

Defined in src/builder/base/options.js:63

###  entry

• **entry**: *object*

Defined in src/builder/base/options.js:64

#### Type declaration:

###  env

• **env**: *object* = env

Defined in src/builder/base/options.js:65

#### Type declaration:

###  postCss

• **postCss**: *any* = configs.postCss
    ? require(configs.postCss)
    : postCssFallback

Defined in src/builder/base/options.js:20

###  target

• **target**: *string* = "web"

Defined in src/builder/base/options.js:79

###  typescript

• **typescript**: *any* = configs.typescript
    ? require(configs.typescript)
    : {}

Defined in src/builder/base/options.js:23

▪ **browserSync**: *object*

Defined in src/builder/base/options.js:33

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

Defined in src/builder/base/options.js:44

* **patterns**: *undefined[]* = []

▪ **dependencyManifest**: *object*

Defined in src/builder/base/options.js:99

* **combineAssets**: *boolean* = false

* **injectPolyfill**: *boolean* = false

* **outputFormat**: *string* = "json"

▪ **dev**: *object*

Defined in src/builder/base/options.js:47

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

Defined in src/builder/base/options.js:66

* **jquery**: *string* = "jQuery"

* **lodash**: *string* = "lodash"

* **moment**: *string* = "moment"

* **react**: *string* = "React"

* **react-dom**: *string* = "ReactDOM"

▪ **inlineManifest**: *object*

Defined in src/builder/base/options.js:73

* **name**: *string* = "runtime"

▪ **splitting**: *object*

Defined in src/builder/base/options.js:76

* **maxChunks**: *null* = null

▪ **svg**: *object*

Defined in src/builder/base/options.js:26

* **use**: *string[]* = [
      require.resolve('@svgr/webpack'),
      require.resolve('url-loader'),
    ]

▪ **uglify**: *object*

Defined in src/builder/base/options.js:80

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

Defined in src/builder/base/options.js:95

* **name**: *string* = "vendor"

* **vendors**: *undefined[]* = []

___

### `Const` postCssFallback

### ▪ **postCssFallback**: *object*

Defined in src/builder/base/options.js:9

###  plugins

• **plugins**: *undefined[]* = []

Defined in src/builder/base/options.js:10
