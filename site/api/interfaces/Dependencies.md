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

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:74](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Service.ts#L74)

## Methods

### install

▸ **install**(`dependencies`): `void`

Install dependencies

#### Parameters

| Name | Type |
| :------ | :------ |
| `dependencies` | { `name`: `string` ; `source`: `string` ; `type`: ``"dependencies"`` \| ``"devDependencies"`` ; `ver`: `string`  }[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Dependencies.ts:14](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Dependencies.ts#L14)

___

### notify

▸ **notify**(`notices`): `void`

Prints notices to console.

#### Parameters

| Name | Type |
| :------ | :------ |
| `notices` | { `msg`: `string` ; `src`: `string`  }[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Dependencies.ts:40](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Dependencies.ts#L40)

___

### pkg

▸ **pkg**(): `string`

Returns project package.json as an object

#### Returns

`string`

#### Defined in

[packages/@roots/bud-framework/src/Dependencies.ts:35](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Dependencies.ts#L35)

___

### shouldInstall

▸ **shouldInstall**(`dep`, `type`): `boolean`

Returns a boolean indicating whether `dep` is
required to be installed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `dep` | `string` |
| `type` | ``"dependencies"`` \| ``"devDependencies"`` |

#### Returns

`boolean`

#### Defined in

[packages/@roots/bud-framework/src/Dependencies.ts:27](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Dependencies.ts#L27)
