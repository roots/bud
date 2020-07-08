[@roots/budpack](../globals.md) › ["inlineManifest"](_inlinemanifest_.md)

# Module: "inlineManifest"

## Index

### Functions

* [inlineManifest](_inlinemanifest_.md#const-inlinemanifest)

## Functions

### `Const` inlineManifest

▸ **inlineManifest**(`__namedParameters`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [inlineManifest.js:12](https://github.com/roots/bud-support/blob/5442f65/src/budpack/builder/api/inlineManifest.js#L12)*

Make a chunk to be inlined directly on the page for optimal code splitting.

**`example`** bud.inlineManifest({name: 'runtime'})

**`example`** bud.inlineManifest() // defaults: enabled, runtime

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`name` | string | "runtime" |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud
