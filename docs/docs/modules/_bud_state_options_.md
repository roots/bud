# Module: "bud/state/options"

## Variables

### `Const` auto

• **auto**: *Object*

*Defined in [src/bud/state/options.ts:15](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L15)*

___

### `Const` babel

• **babel**: *[BabelConfiguration](_bud_state_types_.md#babelconfiguration)* = configs.babel
  ? require(configs.babel)
  : babelFallback

*Defined in [src/bud/state/options.ts:22](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L22)*

___

### `Const` externals

• **externals**: *[Externals](_bud_state_types_.md#externals)*

*Defined in [src/bud/state/options.ts:63](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L63)*

___

### `Const` postCss

• **postCss**: *[PostCssConfiguration](_bud_state_types_.md#postcssconfiguration)* = configs.postCss
  ? require(configs.postCss)
  : postCssFallback

*Defined in [src/bud/state/options.ts:68](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L68)*

___

### `Const` target

• **target**: *[Target](_bud_state_types_.md#target)* = "web"

*Defined in [src/bud/state/options.ts:72](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L72)*

___

### `Const` typescript

• **typescript**: *any* = configs.typescript
  ? require(configs.typescript)
  : {}

*Defined in [src/bud/state/options.ts:74](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L74)*

## Object literals

### `Const` babelFallback

### ▪ **babelFallback**: *object*

*Defined in [src/bud/state/options.ts:17](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L17)*

###  plugins

• **plugins**: *[]* = []

*Defined in [src/bud/state/options.ts:19](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L19)*

###  presets

• **presets**: *[]* = []

*Defined in [src/bud/state/options.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L18)*

___

### `Const` browserSync

### ▪ **browserSync**: *object*

*Defined in [src/bud/state/options.ts:26](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L26)*

###  host

• **host**: *any* = env?.BROWSERSYNC_HOST
    ? env.BROWSERSYNC_HOST
    : 'localhost'

*Defined in [src/bud/state/options.ts:27](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L27)*

###  port

• **port**: *any* = env?.BROWSERSYNC_PORT ? env.BROWSERSYNC_PORT : 3000

*Defined in [src/bud/state/options.ts:30](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L30)*

###  proxy

• **proxy**: *any* = env?.BROWSERSYNC_PROXY
    ? env.BROWSERSYNC_PROXY
    : null

*Defined in [src/bud/state/options.ts:31](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L31)*

___

### `Const` copy

### ▪ **copy**: *object*

*Defined in [src/bud/state/options.ts:36](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L36)*

###  patterns

• **patterns**: *undefined[]* = []

*Defined in [src/bud/state/options.ts:36](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L36)*

___

### `Const` dependencyManifest

### ▪ **dependencyManifest**: *object*

*Defined in [src/bud/state/options.ts:38](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L38)*

###  combineAssets

• **combineAssets**: *undefined* = undefined

*Defined in [src/bud/state/options.ts:39](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L39)*

###  combinedOutputFile

• **combinedOutputFile**: *undefined* = undefined

*Defined in [src/bud/state/options.ts:40](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L40)*

###  injectPolyfill

• **injectPolyfill**: *false* = false

*Defined in [src/bud/state/options.ts:41](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L41)*

###  outputFormat

• **outputFormat**: *"json"* = "json"

*Defined in [src/bud/state/options.ts:42](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L42)*

###  useDefaults

• **useDefaults**: *true* = true

*Defined in [src/bud/state/options.ts:43](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L43)*

___

### `Const` dev

### ▪ **dev**: *object*

*Defined in [src/bud/state/options.ts:46](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L46)*

###  clientLogLevel

• **clientLogLevel**: *string* = "none"

*Defined in [src/bud/state/options.ts:47](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L47)*

###  compress

• **compress**: *boolean* = true

*Defined in [src/bud/state/options.ts:48](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L48)*

###  disableHostCheck

• **disableHostCheck**: *boolean* = true

*Defined in [src/bud/state/options.ts:49](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L49)*

###  historyApiFallback

• **historyApiFallback**: *boolean* = true

*Defined in [src/bud/state/options.ts:53](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L53)*

###  hotOnly

• **hotOnly**: *boolean* = true

*Defined in [src/bud/state/options.ts:54](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L54)*

###  injectHot

• **injectHot**: *boolean* = true

*Defined in [src/bud/state/options.ts:55](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L55)*

###  open

• **open**: *boolean* = false

*Defined in [src/bud/state/options.ts:56](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L56)*

###  overlay

• **overlay**: *boolean* = true

*Defined in [src/bud/state/options.ts:57](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L57)*

▪ **headers**: *object*

*Defined in [src/bud/state/options.ts:50](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L50)*

* **Access-Control-Allow-Origin**: *string* = "*"

▪ **watchOptions**: *object*

*Defined in [src/bud/state/options.ts:58](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L58)*

* **aggregateTimeout**: *number* = 300

___

### `Const` options

### ▪ **options**: *object*

*Defined in [src/bud/state/options.ts:83](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L83)*

Options container.

###  alias

• **alias**: *object*

*Defined in [src/bud/state/options.ts:84](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L84)*

#### Type declaration:

###  auto

• **auto**: *Object*

*Defined in [src/bud/state/options.ts:94](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L94)*

###  babel

• **babel**: *object*

*Defined in [src/bud/state/options.ts:85](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L85)*

#### Type declaration:

* **plugins**: *[]*

* **presets**: *[]*

###  browserSync

• **browserSync**: *Object*

*Defined in [src/bud/state/options.ts:95](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L95)*

###  copy

• **copy**: *object*

*Defined in [src/bud/state/options.ts:96](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L96)*

#### Type declaration:

* **patterns**: *object[]*

###  dependencyManifest

• **dependencyManifest**: *object*

*Defined in [src/bud/state/options.ts:98](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L98)*

#### Type declaration:

* **combineAssets**: *boolean | undefined*

* **combinedOutputFile**: *string | null*

* **injectPolyfill**: *boolean*

* **outputFormat**: *"json" | "php"*

* **requestToExternal**? : *RequestToExternal | undefined*

* **requestToHandle**? : *RequestToHandle | undefined*

* **useDefaults**: *boolean*

###  dev

• **dev**: *any*

*Defined in [src/bud/state/options.ts:97](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L97)*

###  devtool

• **devtool**: *string* = "cheap-module-source-map"

*Defined in [src/bud/state/options.ts:99](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L99)*

###  entry

• **entry**: *object*

*Defined in [src/bud/state/options.ts:100](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L100)*

#### Type declaration:

###  env

• **env**: *any* = env

*Defined in [src/bud/state/options.ts:101](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L101)*

###  externals

• **externals**: *ExternalsObjectElement*

*Defined in [src/bud/state/options.ts:102](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L102)*

###  postCss

• **postCss**: *object*

*Defined in [src/bud/state/options.ts:86](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L86)*

#### Type declaration:

* **plugins**: *[]*

###  target

• **target**: *"web"*

*Defined in [src/bud/state/options.ts:109](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L109)*

###  typescript

• **typescript**: *any*

*Defined in [src/bud/state/options.ts:87](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L87)*

###  vendor

• **vendor**: *object*

*Defined in [src/bud/state/options.ts:125](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L125)*

#### Type declaration:

* **name**: *String*

▪ **inlineManifest**: *object*

*Defined in [src/bud/state/options.ts:103](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L103)*

* **name**: *string* = "runtime"

▪ **splitting**: *object*

*Defined in [src/bud/state/options.ts:106](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L106)*

* **maxChunks**: *null* = null

▪ **svg**: *object*

*Defined in [src/bud/state/options.ts:88](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L88)*

* **use**: *string[]* = [
      require.resolve('@svgr/webpack'),
      require.resolve('url-loader'),
    ]

▪ **uglify**: *object*

*Defined in [src/bud/state/options.ts:110](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L110)*

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

___

### `Const` postCssFallback

### ▪ **postCssFallback**: *object*

*Defined in [src/bud/state/options.ts:65](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L65)*

###  plugins

• **plugins**: *[]* = []

*Defined in [src/bud/state/options.ts:66](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L66)*

___

### `Const` vendor

### ▪ **vendor**: *object*

*Defined in [src/bud/state/options.ts:78](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L78)*

###  name

• **name**: *string* = "vendor"

*Defined in [src/bud/state/options.ts:78](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/options.ts#L78)*
