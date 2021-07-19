---
id: "Dependencies"
title: "Interface: Dependencies"
sidebar_label: "Dependencies"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Dependencies

## Hierarchy

- [`Service`](../classes/Service.md)

  ↳ **`Dependencies`**

## Properties

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.md).[name](../classes/Service.md#name)

#### Defined in

bud-framework/src/Service.ts:60

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

bud-framework/src/Service.ts:64

## Methods

### install

▸ **install**(`dependencies`): `void`

Install production dependencies

#### Parameters

| Name | Type |
| :------ | :------ |
| `dependencies` | { `name`: `string` ; `source`: `string` ; `type`: ``"dependencies"`` \| ``"devDependencies"`` ; `ver`: `string`  }[] |

#### Returns

`void`

#### Defined in

[bud-framework/src/Dependencies/index.ts:10](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Dependencies/index.ts#L10)
