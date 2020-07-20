[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/base/paths"](_builder_base_paths_.md)

# Module: "builder/base/paths"

## Index

### Variables

* [frameworkDir](_builder_base_paths_.md#const-frameworkdir)
* [projectDir](_builder_base_paths_.md#const-projectdir)

### Object literals

* [paths](_builder_base_paths_.md#const-paths)

## Variables

### `Const` frameworkDir

• **frameworkDir**: *string* = resolve(__dirname, './../../../..')

Defined in src/builder/base/paths.js:11

Bud framework dir.

___

### `Const` projectDir

• **projectDir**: *string* = process.cwd()

Defined in src/builder/base/paths.js:6

Current working dir.

## Object literals

### `Const` paths

### ▪ **paths**: *object*

Defined in src/builder/base/paths.js:22

Path references.

**`property`** {string} framework - project root path

**`property`** {string} project - module root path

**`property`** {string} src - project src path

**`property`** {string} dist - project dist path

**`property`** {string} public - project public path

###  dist

• **dist**: *string* = join(projectDir, '')

Defined in src/builder/base/paths.js:26

###  framework

• **framework**: *string* = frameworkDir

Defined in src/builder/base/paths.js:24

###  project

• **project**: *string* = projectDir

Defined in src/builder/base/paths.js:23

###  public

• **public**: *string* = ""

Defined in src/builder/base/paths.js:27

###  src

• **src**: *string* = join(projectDir, '')

Defined in src/builder/base/paths.js:25
