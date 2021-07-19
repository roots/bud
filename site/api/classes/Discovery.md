---
id: "Discovery"
title: "Class: Discovery"
sidebar_label: "Discovery"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Discovery

## Hierarchy

- [`Service`](Service.md)

  ↳ **`Discovery`**

## Properties

### name

• **name**: `string`

#### Inherited from

[Service](Service.md).[name](Service.md#name)

#### Defined in

bud-framework/src/Service.ts:60

___

### resolveFrom

• **resolveFrom**: `string`[] = `[]`

Array of paths for webpack to resolve modules from

#### Defined in

bud-framework/src/Discovery.ts:14

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

#### Returns

[`Framework`](Framework.md)

#### Defined in

bud-framework/src/Service.ts:64

## Methods

### discover

▸ `Abstract` **discover**(`type`): `void`

Collect packages.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"dependencies"`` \| ``"devDependencies"`` |

#### Returns

`void`

#### Defined in

bud-framework/src/Discovery.ts:19

___

### getProjectInfo

▸ `Abstract` **getProjectInfo**(): `Object`

Get aggregated project info

#### Returns

`Object`

#### Defined in

bud-framework/src/Discovery.ts:44

___

### hasPeerDependency

▸ `Abstract` **hasPeerDependency**(`pkg`): `boolean`

Returns a boolean representing if
the project has a given pkg listed as a dependency
or devDependency

#### Parameters

| Name | Type |
| :------ | :------ |
| `pkg` | `string` |

#### Returns

`boolean`

#### Defined in

bud-framework/src/Discovery.ts:55

___

### install

▸ `Abstract` **install**(): `void`

Install packages

#### Returns

`void`

#### Defined in

bud-framework/src/Discovery.ts:39

___

### mapConfig

▸ `Abstract` **mapConfig**(`pkg`): `void`

Gather information on packages

#### Parameters

| Name | Type |
| :------ | :------ |
| `pkg` | `Object` |
| `pkg.dir` | `string` |
| `pkg.name` | `string` |

#### Returns

`void`

#### Defined in

bud-framework/src/Discovery.ts:31

___

### registerDiscovered

▸ `Abstract` **registerDiscovered**(): `void`

Register discovered packages as extensions

#### Returns

`void`

#### Defined in

bud-framework/src/Discovery.ts:26

___

### resolvePeers

▸ `Abstract` **resolvePeers**(`pkg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pkg` | `any` |

#### Returns

`void`

#### Defined in

bud-framework/src/Discovery.ts:48
