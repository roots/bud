# Module: "state/configs"

## Variables

### fs_extra_1

• **fs_extra_1**: _any_ = require("fs-extra")

Defined in state/configs.js:5

---

### path_1

• **path_1**: _PlatformPath_ = require("path")

Defined in state/configs.js:4

---

### paths_1

• **paths_1**: _["state/paths"](_state_paths_.md)_ = require("./paths")

Defined in state/configs.js:6

## Functions

### config

▸ **config**(`file`: any): _string_

Defined in state/configs.js:13

Config

**Parameters:**

| Name   | Type |
| ------ | ---- |
| `file` | any  |

**Returns:** _string_

filePath

---

### hasConfig

▸ **hasConfig**(`file`: string): _boolean_

Defined in state/configs.js:21

Has config

**Parameters:**

| Name   | Type   | Description                          |
| ------ | ------ | ------------------------------------ |
| `file` | string | file path (relative to project root) |

**Returns:** _boolean_

true if file exists

---

### maybeConfig

▸ **maybeConfig**(`file`: string, `fallback`: any): _any_

Defined in state/configs.js:29

Maybe config

**Parameters:**

| Name       | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| `file`     | string | file path (relative to project root) |
| `fallback` | any    | -                                    |

**Returns:** _any_

## Object literals

### configs

### ▪ **configs**: _object_

Defined in state/configs.js:42

Project configuration files.

**`property`** {(string|boolean)} babel - project babel.config.js

**`property`** {(string|boolean)} eslint - project .eslintrc.js

**`property`** {(string|boolean)} postcss - project postcss.config.js

**`property`** {(string|boolean)} typescript - project tsconfig.json

### babel

• **babel**: _any_ = maybeConfig('babel.config.js')

Defined in state/configs.js:43

### eslint

• **eslint**: _any_ = maybeConfig('.eslintrc.js')

Defined in state/configs.js:44

### postCss

• **postCss**: _any_ = maybeConfig('postcss.config.js')

Defined in state/configs.js:45

### typescript

• **typescript**: _any_ = maybeConfig('tsconfig.json')

Defined in state/configs.js:46
