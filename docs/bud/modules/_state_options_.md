# Module: "state/options"

## Variables

###  auto

• **auto**: *[auto](_api_auto_.md#auto)*

Defined in state/options.js:6

___

###  babel

• **babel**: *any* = configs_1.configs.babel
    ? require(configs_1.configs.babel)
    : babelFallback

Defined in state/options.js:11

___

###  configs_1

• **configs_1**: *["state/configs"](_state_configs_.md)* = require("./configs")

Defined in state/options.js:5

___

###  env_1

• **env_1**: *["state/env"](_state_env_.md)* = require("./env")

Defined in state/options.js:4

___

###  externals

• **externals**: *[externals](_state_options_.md#externals)*

Defined in state/options.js:45

___

###  postCss

• **postCss**: *any* = configs_1.configs.postCss
    ? require(configs_1.configs.postCss)
    : postCssFallback

Defined in state/options.js:49

___

###  target

• **target**: *string* = "web"

Defined in state/options.js:52

___

###  typescript

• **typescript**: *any* = configs_1.configs.typescript
    ? require(configs_1.configs.typescript)
    : {}

Defined in state/options.js:53

## Object literals

###  babelFallback

### ▪ **babelFallback**: *object*

Defined in state/options.js:7

###  plugins

• **plugins**: *undefined[]* = []

Defined in state/options.js:9

###  presets

• **presets**: *undefined[]* = []

Defined in state/options.js:8

___

###  browserSync

### ▪ **browserSync**: *object*

Defined in state/options.js:14

###  host

• **host**: *any* = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_HOST) ? env_1.env.BROWSERSYNC_HOST
        : 'localhost'

Defined in state/options.js:15

###  port

• **port**: *any* = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PORT) ? env_1.env.BROWSERSYNC_PORT : 3000

Defined in state/options.js:17

###  proxy

• **proxy**: *any* = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PROXY) ? env_1.env.BROWSERSYNC_PROXY
        : null

Defined in state/options.js:18

___

###  copy

### ▪ **copy**: *object*

Defined in state/options.js:21

###  patterns

• **patterns**: *undefined[]* = []

Defined in state/options.js:21

___

###  dependencyManifest

### ▪ **dependencyManifest**: *object*

Defined in state/options.js:22

###  combineAssets

• **combineAssets**: *undefined* = undefined

Defined in state/options.js:23

###  combinedOutputFile

• **combinedOutputFile**: *undefined* = undefined

Defined in state/options.js:24

###  injectPolyfill

• **injectPolyfill**: *boolean* = false

Defined in state/options.js:25

###  outputFormat

• **outputFormat**: *string* = "json"

Defined in state/options.js:26

###  useDefaults

• **useDefaults**: *boolean* = true

Defined in state/options.js:27

___

###  dev

### ▪ **dev**: *object*

Defined in state/options.js:29

###  clientLogLevel

• **clientLogLevel**: *string* = "none"

Defined in state/options.js:30

###  compress

• **compress**: *boolean* = true

Defined in state/options.js:31

###  disableHostCheck

• **disableHostCheck**: *boolean* = true

Defined in state/options.js:32

###  historyApiFallback

• **historyApiFallback**: *boolean* = true

Defined in state/options.js:36

###  hotOnly

• **hotOnly**: *boolean* = true

Defined in state/options.js:37

###  injectHot

• **injectHot**: *boolean* = true

Defined in state/options.js:38

###  open

• **open**: *boolean* = false

Defined in state/options.js:39

###  overlay

• **overlay**: *boolean* = true

Defined in state/options.js:40

▪ **headers**: *object*

Defined in state/options.js:33

* **Access-Control-Allow-Origin**: *string* = "*"

▪ **watchOptions**: *object*

Defined in state/options.js:41

* **aggregateTimeout**: *number* = 300

___

###  options

### ▪ **options**: *object*

Defined in state/options.js:60

Options container.

###  alias

• **alias**: *object*

Defined in state/options.js:61

#### Type declaration:

###  auto

• **auto**: *[auto](_api_auto_.md#auto)* = auto

Defined in state/options.js:71

###  babel

• **babel**: *any* = babel

Defined in state/options.js:62

###  browserSync

• **browserSync**: *object* = browserSync

Defined in state/options.js:72

#### Type declaration:

* **host**: *any* = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_HOST) ? env_1.env.BROWSERSYNC_HOST
        : 'localhost'

* **port**: *any* = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PORT) ? env_1.env.BROWSERSYNC_PORT : 3000

* **proxy**: *any* = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PROXY) ? env_1.env.BROWSERSYNC_PROXY
        : null

###  copy

• **copy**: *object* = copy

Defined in state/options.js:73

#### Type declaration:

* **patterns**: *undefined[]* = []

###  dependencyManifest

• **dependencyManifest**: *object* = dependencyManifest

Defined in state/options.js:75

#### Type declaration:

* **combineAssets**: *undefined* = undefined

* **combinedOutputFile**: *undefined* = undefined

* **injectPolyfill**: *boolean* = false

* **outputFormat**: *string* = "json"

* **useDefaults**: *boolean* = true

###  dev

• **dev**: *object* = dev

Defined in state/options.js:74

#### Type declaration:

* **clientLogLevel**: *string* = "none"

* **compress**: *boolean* = true

* **disableHostCheck**: *boolean* = true

* **historyApiFallback**: *boolean* = true

* **hotOnly**: *boolean* = true

* **injectHot**: *boolean* = true

* **open**: *boolean* = false

* **overlay**: *boolean* = true

* ### **headers**: *object*

  * **Access-Control-Allow-Origin**: *string* = "*"

* ### **watchOptions**: *object*

  * **aggregateTimeout**: *number* = 300

###  devtool

• **devtool**: *string* = "cheap-module-source-map"

Defined in state/options.js:76

###  entry

• **entry**: *object*

Defined in state/options.js:77

#### Type declaration:

###  env

• **env**: *any* = env_1.env

Defined in state/options.js:78

###  externals

• **externals**: *[externals](_state_options_.md#externals)* = externals

Defined in state/options.js:79

###  postCss

• **postCss**: *any* = postCss

Defined in state/options.js:63

###  target

• **target**: *string* = target

Defined in state/options.js:86

###  typescript

• **typescript**: *any* = typescript

Defined in state/options.js:64

###  vendor

• **vendor**: *object* = vendor

Defined in state/options.js:105

#### Type declaration:

* **name**: *string* = "vendor"

▪ **inlineManifest**: *object*

Defined in state/options.js:80

* **name**: *string* = "runtime"

▪ **splitting**: *object*

Defined in state/options.js:83

* **maxChunks**: *null* = null

▪ **svg**: *object*

Defined in state/options.js:65

* **use**: *string[]* = [
            require.resolve('@svgr/webpack'),
            require.resolve('url-loader'),
        ]

▪ **uglify**: *object*

Defined in state/options.js:87

* **cache**: *boolean* = true

* **extractComments**: *boolean* = false

* **parallel**: *boolean* = true

* **chunkFilter**(`_a`: any): *boolean*

* **uglifyOptions**: *object*

  * **compress**: *boolean* = false

  * **mangle**: *object*

    * **toplevel**: *boolean* = true

  * **output**: *object*

    * **beautify**: *boolean* = false

___

###  postCssFallback

### ▪ **postCssFallback**: *object*

Defined in state/options.js:46

###  plugins

• **plugins**: *undefined[]* = []

Defined in state/options.js:47

___

###  vendor

### ▪ **vendor**: *object*

Defined in state/options.js:56

###  name

• **name**: *string* = "vendor"

Defined in state/options.js:56
