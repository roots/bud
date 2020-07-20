[@roots/budpack](../README.md) › [Globals](../globals.md) › ["base/configs"](_base_configs_.md)

# Module: "base/configs"

## Index

### Type aliases

* [Configs](_base_configs_.md#configs)

### Functions

* [config](_base_configs_.md#const-config)
* [hasConfig](_base_configs_.md#const-hasconfig)
* [maybeConfig](_base_configs_.md#const-maybeconfig)

### Object literals

* [configs](_base_configs_.md#const-configs)

## Type aliases

###  Configs

Ƭ **Configs**: *object*

*Defined in [base/configs.ts:52](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/configs.ts#L52)*

#### Type declaration:

* **babel**: *string*

* **eslint**: *string*

* **postCss**: *string*

* **typescript**: *string*

## Functions

### `Const` config

▸ **config**(`file`: any): *string*

*Defined in [base/configs.ts:11](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/configs.ts#L11)*

Config

**Parameters:**

Name | Type |
------ | ------ |
`file` | any |

**Returns:** *string*

filePath

___

### `Const` hasConfig

▸ **hasConfig**(`file`: any): *any*

*Defined in [base/configs.ts:19](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/configs.ts#L19)*

Has config

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`file` | any | file path (relative to project root) |

**Returns:** *any*

true if file exists

___

### `Const` maybeConfig

▸ **maybeConfig**(`file`: any, `fallback`: any): *any*

*Defined in [base/configs.ts:27](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/configs.ts#L27)*

Maybe config

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`file` | any | - | file path (relative to project root) |
`fallback` | any | null | - |

**Returns:** *any*

## Object literals

### `Const` configs

### ▪ **configs**: *object*

*Defined in [base/configs.ts:38](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/configs.ts#L38)*

Project configuration files.

**`property`** {(string|boolean)} babel   - project babel.config.js

**`property`** {(string|boolean)} eslint  - project .eslintrc.js

**`property`** {(string|boolean)} postcss - project postcss.config.js

**`property`** {(string|boolean)} typescript - project tsconfig.json

###  babel

• **babel**: *any* = maybeConfig('babel.config.js')

*Defined in [base/configs.ts:39](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/configs.ts#L39)*

###  eslint

• **eslint**: *any* = maybeConfig('.eslintrc.js')

*Defined in [base/configs.ts:40](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/configs.ts#L40)*

###  postCss

• **postCss**: *any* = maybeConfig('postcss.config.js')

*Defined in [base/configs.ts:41](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/configs.ts#L41)*

###  typescript

• **typescript**: *any* = maybeConfig('tsconfig.json')

*Defined in [base/configs.ts:42](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/configs.ts#L42)*
