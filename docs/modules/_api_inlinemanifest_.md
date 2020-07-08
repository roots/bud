[@roots/budpack](../globals.md) › ["api/inlineManifest"](_api_inlinemanifest_.md)

# Module: "api/inlineManifest"

## Index

### Functions

* [inlineManifest](_api_inlinemanifest_.md#const-inlinemanifest)

## Functions

### `Const` inlineManifest

▸ **inlineManifest**(`__namedParameters`: object): *["index"](_index_.md)*

*Defined in [api/inlineManifest.js:12](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/api/inlineManifest.js#L12)*

Make a chunk to be inlined directly on the page for optimal code splitting.

**`example`** bud.inlineManifest({name: 'runtime'})

**`example`** bud.inlineManifest() // defaults: enabled, runtime

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`name` | string | "runtime" |

**Returns:** *["index"](_index_.md)*

bud
