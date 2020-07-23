# Module: "state/paths"

## Variables

### frameworkDir

• **frameworkDir**: _string_ = path_1.resolve(\_\_dirname, './../../../')

Defined in state/paths.js:12

Bud framework dir.

---

### path_1

• **path_1**: _PlatformPath_ = require("path")

Defined in state/paths.js:4

---

### projectDir

• **projectDir**: _string_ = process.cwd()

Defined in state/paths.js:8

Current working dir.

## Object literals

### paths

### ▪ **paths**: _object_

Defined in state/paths.js:16

Path references.

### dist

• **dist**: _string_ = path_1.join(projectDir, '')

Defined in state/paths.js:20

### framework

• **framework**: _string_ = frameworkDir

Defined in state/paths.js:18

### project

• **project**: _string_ = projectDir

Defined in state/paths.js:17

### public

• **public**: _string_ = ""

Defined in state/paths.js:21

### src

• **src**: _string_ = path_1.join(projectDir, '')

Defined in state/paths.js:19
