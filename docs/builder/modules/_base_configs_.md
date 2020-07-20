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

*Defined in [base/configs.ts:50](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/configs.ts#L50)*

#### Type declaration:

* **babel**: *string*

* **eslint**: *string*

* **postCss**: *string*

* **typescript**: *string*

## Functions

### `Const` config

▸ **config**(`file`: any): *string*

*Defined in [base/configs.ts:10](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/configs.ts#L10)*

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

*Defined in [base/configs.ts:18](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/configs.ts#L18)*

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

*Defined in [base/configs.ts:26](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/configs.ts#L26)*

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

*Defined in [base/configs.ts:36](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/configs.ts#L36)*

Project configuration files.

**`property`** {(string|boolean)} babel   - project babel.config.js

**`property`** {(string|boolean)} eslint  - project .eslintrc.js

**`property`** {(string|boolean)} postcss - project postcss.config.js

###  babel

• **babel**: *any* = maybeConfig('babel.config.js')

*Defined in [base/configs.ts:37](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/configs.ts#L37)*

###  eslint

• **eslint**: *any* = maybeConfig('.eslintrc.js')

*Defined in [base/configs.ts:38](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/configs.ts#L38)*

###  postCss

• **postCss**: *any* = maybeConfig('postcss.config.js')

*Defined in [base/configs.ts:39](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/configs.ts#L39)*

###  typescript

• **typescript**: *any* = maybeConfig('tsconfig.json')

*Defined in [base/configs.ts:40](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/configs.ts#L40)*
