[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/base/configs"](_builder_base_configs_.md)

# Module: "builder/base/configs"

## Index

### Type aliases

* [Configs](_builder_base_configs_.md#configs)

### Functions

* [config](_builder_base_configs_.md#const-config)
* [hasConfig](_builder_base_configs_.md#const-hasconfig)
* [maybeConfig](_builder_base_configs_.md#const-maybeconfig)

### Object literals

* [configs](_builder_base_configs_.md#const-configs)

## Type aliases

###  Configs

Ƭ **Configs**: *object*

Defined in src/builder/base/configs.ts:47

#### Type declaration:

* **babel**: *string | null*

* **eslint**: *string | null*

* **postCss**: *string | null*

* **typescript**: *string | null*

## Functions

### `Const` config

▸ **config**(`file`: any): *string*

Defined in src/builder/base/configs.ts:11

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

Defined in src/builder/base/configs.ts:19

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

Defined in src/builder/base/configs.ts:27

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

Defined in src/builder/base/configs.ts:38

Project configuration files.

**`property`** {(string|boolean)} babel   - project babel.config.js

**`property`** {(string|boolean)} eslint  - project .eslintrc.js

**`property`** {(string|boolean)} postcss - project postcss.config.js

**`property`** {(string|boolean)} typescript - project tsconfig.json

###  babel

• **babel**: *any* = maybeConfig('babel.config.js')

Defined in src/builder/base/configs.ts:39

###  eslint

• **eslint**: *any* = maybeConfig('.eslintrc.js')

Defined in src/builder/base/configs.ts:40

###  postCss

• **postCss**: *any* = maybeConfig('postcss.config.js')

Defined in src/builder/base/configs.ts:41

###  typescript

• **typescript**: *any* = maybeConfig('tsconfig.json')

Defined in src/builder/base/configs.ts:42
