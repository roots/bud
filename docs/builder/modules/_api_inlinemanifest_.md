[@roots/budpack](../README.md) › [Globals](../globals.md) › ["api/inlineManifest"](_api_inlinemanifest_.md)

# Module: "api/inlineManifest"

## Index

### Interfaces

* [InlineManifestOptions](../interfaces/_api_inlinemanifest_.inlinemanifestoptions.md)

### Type aliases

* [InlineManifest](_api_inlinemanifest_.md#inlinemanifest)

### Functions

* [inlineManifest](_api_inlinemanifest_.md#const-inlinemanifest)

## Type aliases

###  InlineManifest

Ƭ **InlineManifest**: *function*

*Defined in [api/inlineManifest.ts:31](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/api/inlineManifest.ts#L31)*

#### Type declaration:

▸ (`InlineManifestOptions`: any): *bud*

**Parameters:**

Name | Type |
------ | ------ |
`InlineManifestOptions` | any |

## Functions

### `Const` inlineManifest

▸ **inlineManifest**(`options`: object): *bud*

*Defined in [api/inlineManifest.ts:8](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/api/inlineManifest.ts#L8)*

Inline commons scripts.

```js
bud.inlineManifest({name: 'runtime'})
```

**Parameters:**

▪ **options**: *object*

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *bud*
