# Module: "state/options"

## Variables

### auto

• **auto**: _[auto](_api_auto_.md#auto)_

Defined in state/options.js:6

---

### babel

• **babel**: _any_ = configs_1.configs.babel
? require(configs_1.configs.babel)
: babelFallback

Defined in state/options.js:11

---

### configs_1

• **configs_1**: _["state/configs"](_state_configs_.md)_ = require("./configs")

Defined in state/options.js:5

---

### env_1

• **env_1**: _["state/env"](_state_env_.md)_ = require("./env")

Defined in state/options.js:4

---

### externals

• **externals**: _[externals](_state_options_.md#externals)_

Defined in state/options.js:45

---

### postCss

• **postCss**: _any_ = configs_1.configs.postCss
? require(configs_1.configs.postCss)
: postCssFallback

Defined in state/options.js:49

---

### target

• **target**: _string_ = "web"

Defined in state/options.js:52

---

### typescript

• **typescript**: _any_ = configs_1.configs.typescript
? require(configs_1.configs.typescript)
: {}

Defined in state/options.js:53

## Object literals

### babelFallback

### ▪ **babelFallback**: _object_

Defined in state/options.js:7

### plugins

• **plugins**: _undefined[]_ = []

Defined in state/options.js:9

### presets

• **presets**: _undefined[]_ = []

Defined in state/options.js:8

---

### browserSync

### ▪ **browserSync**: _object_

Defined in state/options.js:14

### host

• **host**: _any_ = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_HOST) ? env_1.env.BROWSERSYNC_HOST
: 'localhost'

Defined in state/options.js:15

### port

• **port**: _any_ = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PORT) ? env_1.env.BROWSERSYNC_PORT : 3000

Defined in state/options.js:17

### proxy

• **proxy**: _any_ = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PROXY) ? env_1.env.BROWSERSYNC_PROXY
: null

Defined in state/options.js:18

---

### copy

### ▪ **copy**: _object_

Defined in state/options.js:21

### patterns

• **patterns**: _undefined[]_ = []

Defined in state/options.js:21

---

### dependencyManifest

### ▪ **dependencyManifest**: _object_

Defined in state/options.js:22

### combineAssets

• **combineAssets**: _undefined_ = undefined

Defined in state/options.js:23

### combinedOutputFile

• **combinedOutputFile**: _undefined_ = undefined

Defined in state/options.js:24

### injectPolyfill

• **injectPolyfill**: _boolean_ = false

Defined in state/options.js:25

### outputFormat

• **outputFormat**: _string_ = "json"

Defined in state/options.js:26

### useDefaults

• **useDefaults**: _boolean_ = true

Defined in state/options.js:27

---

### dev

### ▪ **dev**: _object_

Defined in state/options.js:29

### clientLogLevel

• **clientLogLevel**: _string_ = "none"

Defined in state/options.js:30

### compress

• **compress**: _boolean_ = true

Defined in state/options.js:31

### disableHostCheck

• **disableHostCheck**: _boolean_ = true

Defined in state/options.js:32

### historyApiFallback

• **historyApiFallback**: _boolean_ = true

Defined in state/options.js:36

### hotOnly

• **hotOnly**: _boolean_ = true

Defined in state/options.js:37

### injectHot

• **injectHot**: _boolean_ = true

Defined in state/options.js:38

### open

• **open**: _boolean_ = false

Defined in state/options.js:39

### overlay

• **overlay**: _boolean_ = true

Defined in state/options.js:40

▪ **headers**: _object_

Defined in state/options.js:33

- **Access-Control-Allow-Origin**: _string_ = "\*"

▪ **watchOptions**: _object_

Defined in state/options.js:41

- **aggregateTimeout**: _number_ = 300

---

### options

### ▪ **options**: _object_

Defined in state/options.js:60

Options container.

### alias

• **alias**: _object_

Defined in state/options.js:61

#### Type declaration:

### auto

• **auto**: _[auto](_api_auto_.md#auto)_ = auto

Defined in state/options.js:71

### babel

• **babel**: _any_ = babel

Defined in state/options.js:62

### browserSync

• **browserSync**: _object_ = browserSync

Defined in state/options.js:72

#### Type declaration:

- **host**: _any_ = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_HOST) ? env_1.env.BROWSERSYNC_HOST
  : 'localhost'

- **port**: _any_ = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PORT) ? env_1.env.BROWSERSYNC_PORT : 3000

- **proxy**: _any_ = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.BROWSERSYNC_PROXY) ? env_1.env.BROWSERSYNC_PROXY
  : null

### copy

• **copy**: _object_ = copy

Defined in state/options.js:73

#### Type declaration:

- **patterns**: _undefined[]_ = []

### dependencyManifest

• **dependencyManifest**: _object_ = dependencyManifest

Defined in state/options.js:75

#### Type declaration:

- **combineAssets**: _undefined_ = undefined

- **combinedOutputFile**: _undefined_ = undefined

- **injectPolyfill**: _boolean_ = false

- **outputFormat**: _string_ = "json"

- **useDefaults**: _boolean_ = true

### dev

• **dev**: _object_ = dev

Defined in state/options.js:74

#### Type declaration:

- **clientLogLevel**: _string_ = "none"

- **compress**: _boolean_ = true

- **disableHostCheck**: _boolean_ = true

- **historyApiFallback**: _boolean_ = true

- **hotOnly**: _boolean_ = true

- **injectHot**: _boolean_ = true

- **open**: _boolean_ = false

- **overlay**: _boolean_ = true

- ### **headers**: _object_

  - **Access-Control-Allow-Origin**: _string_ = "\*"

- ### **watchOptions**: _object_

  - **aggregateTimeout**: _number_ = 300

### devtool

• **devtool**: _string_ = "cheap-module-source-map"

Defined in state/options.js:76

### entry

• **entry**: _object_

Defined in state/options.js:77

#### Type declaration:

### env

• **env**: _any_ = env_1.env

Defined in state/options.js:78

### externals

• **externals**: _[externals](_state_options_.md#externals)_ = externals

Defined in state/options.js:79

### postCss

• **postCss**: _any_ = postCss

Defined in state/options.js:63

### target

• **target**: _string_ = target

Defined in state/options.js:86

### typescript

• **typescript**: _any_ = typescript

Defined in state/options.js:64

### vendor

• **vendor**: _object_ = vendor

Defined in state/options.js:105

#### Type declaration:

- **name**: _string_ = "vendor"

▪ **inlineManifest**: _object_

Defined in state/options.js:80

- **name**: _string_ = "runtime"

▪ **splitting**: _object_

Defined in state/options.js:83

- **maxChunks**: _null_ = null

▪ **svg**: _object_

Defined in state/options.js:65

- **use**: _string[]_ = [
  require.resolve('@svgr/webpack'),
  require.resolve('url-loader'),
  ]

▪ **uglify**: _object_

Defined in state/options.js:87

- **cache**: _boolean_ = true

- **extractComments**: _boolean_ = false

- **parallel**: _boolean_ = true

- **chunkFilter**(`_a`: any): _boolean_

- **uglifyOptions**: _object_

  - **compress**: _boolean_ = false

  - **mangle**: _object_

    - **toplevel**: _boolean_ = true

  - **output**: _object_

    - **beautify**: _boolean_ = false

---

### postCssFallback

### ▪ **postCssFallback**: _object_

Defined in state/options.js:46

### plugins

• **plugins**: _undefined[]_ = []

Defined in state/options.js:47

---

### vendor

### ▪ **vendor**: _object_

Defined in state/options.js:56

### name

• **name**: _string_ = "vendor"

Defined in state/options.js:56
