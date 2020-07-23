# Module: "state/paths"

## Variables

###  frameworkDir

• **frameworkDir**: *string* = path_1.resolve(__dirname, './../../../')

Defined in state/paths.js:12

Bud framework dir.

___

###  path_1

• **path_1**: *PlatformPath* = require("path")

Defined in state/paths.js:4

___

###  projectDir

• **projectDir**: *string* = process.cwd()

Defined in state/paths.js:8

Current working dir.

## Object literals

###  paths

### ▪ **paths**: *object*

Defined in state/paths.js:16

Path references.

###  dist

• **dist**: *string* = path_1.join(projectDir, '')

Defined in state/paths.js:20

###  framework

• **framework**: *string* = frameworkDir

Defined in state/paths.js:18

###  project

• **project**: *string* = projectDir

Defined in state/paths.js:17

###  public

• **public**: *string* = ""

Defined in state/paths.js:21

###  src

• **src**: *string* = path_1.join(projectDir, '')

Defined in state/paths.js:19
