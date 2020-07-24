# Module: "bud/state/configs"

## Functions

### `Const` config

▸ **config**(`file`: any): *string*

*Defined in [src/bud/state/configs.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L12)*

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

*Defined in [src/bud/state/configs.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L20)*

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

*Defined in [src/bud/state/configs.ts:28](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L28)*

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

*Defined in [src/bud/state/configs.ts:39](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L39)*

Project configuration files.

**`property`** {(string|boolean)} babel   - project babel.config.js

**`property`** {(string|boolean)} eslint  - project .eslintrc.js

**`property`** {(string|boolean)} postcss - project postcss.config.js

**`property`** {(string|boolean)} typescript - project tsconfig.json

###  babel

• **babel**: *any* = maybeConfig('babel.config.js')

*Defined in [src/bud/state/configs.ts:40](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L40)*

###  eslint

• **eslint**: *any* = maybeConfig('.eslintrc.js')

*Defined in [src/bud/state/configs.ts:41](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L41)*

###  postCss

• **postCss**: *any* = maybeConfig('postcss.config.js')

*Defined in [src/bud/state/configs.ts:42](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L42)*

###  typescript

• **typescript**: *any* = maybeConfig('tsconfig.json')

*Defined in [src/bud/state/configs.ts:43](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/configs.ts#L43)*
