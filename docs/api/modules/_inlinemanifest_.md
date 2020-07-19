[@roots/budpack](../README.md) › [Globals](../globals.md) › ["inlineManifest"](_inlinemanifest_.md)

# Module: "inlineManifest"

## Index

### Interfaces

* [inlineManifestInterface](../interfaces/_inlinemanifest_.inlinemanifestinterface.md)

### Type aliases

* [InlineManifest](_inlinemanifest_.md#inlinemanifest)

### Functions

* [inlineManifest](_inlinemanifest_.md#const-inlinemanifest)

## Type aliases

###  InlineManifest

Ƭ **InlineManifest**: *[inlineManifestInterface](../interfaces/_inlinemanifest_.inlinemanifestinterface.md)*

*Defined in [inlineManifest.ts:7](https://github.com/roots/bud-support/blob/a7a0906/src/budpack/builder/api/inlineManifest.ts#L7)*

## Functions

### `Const` inlineManifest

▸ **inlineManifest**(`name?`: string): *bud*

*Defined in [inlineManifest.ts:16](https://github.com/roots/bud-support/blob/a7a0906/src/budpack/builder/api/inlineManifest.ts#L16)*

Make a chunk to be inlined directly on the page for optimal code splitting.

```js
bud.inlineManifest({name: 'runtime'})
```

**Parameters:**

Name | Type |
------ | ------ |
`name?` | string |

**Returns:** *bud*
