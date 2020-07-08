[@roots/budpack](../globals.md) › ["base/configs"](_base_configs_.md)

# Module: "base/configs"

## Index

### Functions

* [config](_base_configs_.md#const-config)
* [hasConfig](_base_configs_.md#const-hasconfig)

### Object literals

* [configs](_base_configs_.md#const-configs)

## Functions

### `Const` config

▸ **config**(`relativePath`: string): *string*

*Defined in [base/configs.js:11](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/configs.js#L11)*

Returns absolute path to a project config file

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relativePath` | string | relative path (from project root) |

**Returns:** *string*

filePath

___

### `Const` hasConfig

▸ **hasConfig**(`file`: string): *boolean*

*Defined in [base/configs.js:20](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/configs.js#L20)*

Returns a boolean representing if a file can be located in the project root.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`file` | string | file path (relative to project root) |

**Returns:** *boolean*

## Object literals

### `Const` configs

### ▪ **configs**: *object*

*Defined in [base/configs.js:29](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/configs.js#L29)*

Project configuration files.

**`property`** {(string|boolean)} babel   - project babel.config.js

**`property`** {(string|boolean)} eslint  - project .eslintrc.js

**`property`** {(string|boolean)} postcss - project postcss.config.js

###  babel

• **babel**: *string | false | true* = hasConfig('babel.config.js')
    ? config('babel.config.js')
    : false

*Defined in [base/configs.js:30](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/configs.js#L30)*

###  eslint

• **eslint**: *string | false | true* = hasConfig('.eslintrc.js')
    ? config('.eslintrc.js')
    : false

*Defined in [base/configs.js:33](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/configs.js#L33)*

###  postCss

• **postCss**: *string | false | true* = hasConfig('postcss.config.js')
    ? config('postcss.config.js')
    : false

*Defined in [base/configs.js:36](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/configs.js#L36)*
