[@roots/budpack](../README.md) › [Globals](../globals.md) › ["base/paths"](_base_paths_.md)

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

*Defined in [base/paths.js:11](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/paths.js#L11)*

Bud framework dir.

___

### `Const` projectDir

• **projectDir**: *string* = process.cwd()

*Defined in [base/paths.js:6](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/paths.js#L6)*

Current working dir.

## Object literals

### `Const` paths

### ▪ **paths**: *object*

*Defined in [base/paths.js:22](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/paths.js#L22)*

Path references.

**`property`** {string} framework - project root path

**`property`** {string} project - module root path

**`property`** {string} src - project src path

**`property`** {string} dist - project dist path

**`property`** {string} public - project public path

###  dist

• **dist**: *string* = join(projectDir, '')

*Defined in [base/paths.js:26](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/paths.js#L26)*

###  framework

• **framework**: *string* = frameworkDir

*Defined in [base/paths.js:24](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/paths.js#L24)*

###  project

• **project**: *string* = projectDir

*Defined in [base/paths.js:23](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/paths.js#L23)*

###  public

• **public**: *string* = ""

*Defined in [base/paths.js:27](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/paths.js#L27)*

###  src

• **src**: *string* = join(projectDir, '')

*Defined in [base/paths.js:25](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/paths.js#L25)*
