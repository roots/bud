[@roots/budpack](../globals.md) › ["base/paths"](_base_paths_.md)

# Module: "base/paths"

## Index

### Variables

* [frameworkDir](_base_paths_.md#const-frameworkdir)
* [projectDir](_base_paths_.md#const-projectdir)

### Object literals

* [paths](_base_paths_.md#const-paths)

## Variables

### `Const` frameworkDir

• **frameworkDir**: *string* = resolve(__dirname, './../../../..')

*Defined in [base/paths.js:13](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/paths.js#L13)*

Framework dir.

___

### `Const` projectDir

• **projectDir**: *string* = process.cwd()

*Defined in [base/paths.js:7](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/paths.js#L7)*

Current working dir.

## Object literals

### `Const` paths

### ▪ **paths**: *object*

*Defined in [base/paths.js:24](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/paths.js#L24)*

Paths

**`property`** {string} framework - project root path

**`property`** {string} project - module root path

**`property`** {string} src - project src path

**`property`** {string} dist - project dist path

**`property`** {string} public - project public path

###  dist

• **dist**: *string* = join(projectDir, 'dist')

*Defined in [base/paths.js:28](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/paths.js#L28)*

###  framework

• **framework**: *string* = frameworkDir

*Defined in [base/paths.js:26](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/paths.js#L26)*

###  project

• **project**: *string* = projectDir

*Defined in [base/paths.js:25](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/paths.js#L25)*

###  public

• **public**: *string* = "dist"

*Defined in [base/paths.js:29](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/paths.js#L29)*

###  src

• **src**: *string* = join(projectDir, 'src')

*Defined in [base/paths.js:27](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/base/paths.js#L27)*
