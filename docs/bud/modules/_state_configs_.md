# Module: "state/configs"

## Variables

###  fs_extra_1

• **fs_extra_1**: *any* = require("fs-extra")

Defined in state/configs.js:5

___

###  path_1

• **path_1**: *PlatformPath* = require("path")

Defined in state/configs.js:4

___

###  paths_1

• **paths_1**: *["state/paths"](_state_paths_.md)* = require("./paths")

Defined in state/configs.js:6

## Functions

###  config

▸ **config**(`file`: any): *string*

Defined in state/configs.js:13

Config

**Parameters:**

Name | Type |
------ | ------ |
`file` | any |

**Returns:** *string*

filePath

___

###  hasConfig

▸ **hasConfig**(`file`: string): *boolean*

Defined in state/configs.js:21

Has config

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`file` | string | file path (relative to project root) |

**Returns:** *boolean*

true if file exists

___

###  maybeConfig

▸ **maybeConfig**(`file`: string, `fallback`: any): *any*

Defined in state/configs.js:29

Maybe config

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`file` | string | file path (relative to project root) |
`fallback` | any | - |

**Returns:** *any*

## Object literals

###  configs

### ▪ **configs**: *object*

Defined in state/configs.js:42

Project configuration files.

**`property`** {(string|boolean)} babel   - project babel.config.js

**`property`** {(string|boolean)} eslint  - project .eslintrc.js

**`property`** {(string|boolean)} postcss - project postcss.config.js

**`property`** {(string|boolean)} typescript - project tsconfig.json

###  babel

• **babel**: *any* = maybeConfig('babel.config.js')

Defined in state/configs.js:43

###  eslint

• **eslint**: *any* = maybeConfig('.eslintrc.js')

Defined in state/configs.js:44

###  postCss

• **postCss**: *any* = maybeConfig('postcss.config.js')

Defined in state/configs.js:45

###  typescript

• **typescript**: *any* = maybeConfig('tsconfig.json')

Defined in state/configs.js:46
