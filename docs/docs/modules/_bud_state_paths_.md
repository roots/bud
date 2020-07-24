# Module: "bud/state/paths"

## Variables

### `Const` frameworkDir

• **frameworkDir**: *[Directory](_bud_state_types_.md#directory)* = resolve(
  __dirname,
  './../../../',
)

*Defined in [src/bud/state/paths.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L12)*

Bud framework dir.

___

### `Const` projectDir

• **projectDir**: *[Directory](_bud_state_types_.md#directory)* = process.cwd()

*Defined in [src/bud/state/paths.ts:7](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L7)*

Current working dir.

## Object literals

### `Const` paths

### ▪ **paths**: *object*

*Defined in [src/bud/state/paths.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L20)*

Path references.

###  dist

• **dist**: *string* = join(projectDir, '')

*Defined in [src/bud/state/paths.ts:24](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L24)*

###  framework

• **framework**: *string* = frameworkDir

*Defined in [src/bud/state/paths.ts:22](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L22)*

###  project

• **project**: *string* = projectDir

*Defined in [src/bud/state/paths.ts:21](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L21)*

###  public

• **public**: *string* = ""

*Defined in [src/bud/state/paths.ts:25](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L25)*

###  src

• **src**: *string* = join(projectDir, '')

*Defined in [src/bud/state/paths.ts:23](https://github.com/roots/bud-support/blob/bd00b72/src/bud/state/paths.ts#L23)*
