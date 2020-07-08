[@roots/budpack](../globals.md) › ["base/options"](_base_options_.md)

# Module: "base/options"

## Index

### Variables

* [env](_base_options_.md#const-env)

### Object literals

* [options](_base_options_.md#const-options)

## Variables

### `Const` env

• **env**: *DotenvConfigOutput* = dotenv.config({path: join(paths.project, '.env')})

*Defined in [base/options.js:11](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/options.js#L11)*

Environment variables container.

## Object literals

### `Const` options

### ▪ **options**: *object*

*Defined in [base/options.js:17](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/options.js#L17)*

Options container.

###  auto

• **auto**: *object*

*Defined in [base/options.js:19](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/options.js#L19)*

#### Type declaration:

###  devtool

• **devtool**: *string* = "cheap-module-source-map"

*Defined in [base/options.js:38](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/options.js#L38)*

###  entry

• **entry**: *object*

*Defined in [base/options.js:39](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/options.js#L39)*

#### Type declaration:

###  env

• **env**: *DotenvParseOutput* = env.parsed

*Defined in [base/options.js:40](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/options.js#L40)*

▪ **browserSync**: *object*

*Defined in [base/options.js:20](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/options.js#L20)*

* **host**: *string* = "localhost"

* **port**: *string* = "3000"

* **proxy**: *string* = ""

▪ **copy**: *object*

*Defined in [base/options.js:25](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/options.js#L25)*

* **patterns**: *undefined[]* = []

▪ **dependencyManifest**: *object*

*Defined in [base/options.js:47](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/options.js#L47)*

* **injectPolyfill**: *boolean* = false

* **outputFormat**: *string* = "json"

* **useDefaults**: *boolean* = true

▪ **dev**: *object*

*Defined in [base/options.js:28](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/options.js#L28)*

* **disableHostCheck**: *boolean* = true

* **hot**: *boolean* = true

* **headers**: *object*

  * **Access-Control-Allow-Origin**: *string* = "*"

* **watchOptions**: *object*

  * **aggregateTimeout**: *number* = 300

▪ **inlineManifest**: *object*

*Defined in [base/options.js:41](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/options.js#L41)*

* **name**: *string* = "runtime"

▪ **splitting**: *object*

*Defined in [base/options.js:44](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/options.js#L44)*

* **maxChunks**: *null* = null
