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

## Constructors

### constructor

• **new Discovery**(`app`)

Class constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Inherited from

[Service](Service.md).[constructor](Service.md#constructor)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:68](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L68)

## Properties

### name

• **name**: `string`

#### Inherited from

[Service](Service.md).[name](Service.md#name)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:60](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L60)

___

### resolveFrom

• **resolveFrom**: `string`[] = `[]`

Array of paths for webpack to resolve modules from

#### Defined in

[packages/@roots/bud-framework/src/Discovery.ts:14](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Discovery.ts#L14)

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:64](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L64)

## Methods

### boot

▸ `Optional` **boot**(`app`): `any`

Boot

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[boot](Service.md#boot)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:43](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L43)

___

### booted

▸ `Optional` **booted**(`app`): `any`

Post boot callback

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[booted](Service.md#booted)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:49](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L49)

___

### bootstrap

▸ `Optional` **bootstrap**(`app`): `any`

Bootstrap

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[bootstrap](Service.md#bootstrap)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:19](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L19)

___

### bootstrapped

▸ `Optional` **bootstrapped**(`app`): `any`

Bootstrapped

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[bootstrapped](Service.md#bootstrapped)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:25](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L25)

___

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

[packages/@roots/bud-framework/src/Discovery.ts:19](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Discovery.ts#L19)

___

### getProjectInfo

▸ `Abstract` **getProjectInfo**(): `Object`

Get aggregated project info

#### Returns

`Object`

#### Defined in

[packages/@roots/bud-framework/src/Discovery.ts:44](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Discovery.ts#L44)

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

[packages/@roots/bud-framework/src/Discovery.ts:55](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Discovery.ts#L55)

___

### install

▸ `Abstract` **install**(): `void`

Install packages

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Discovery.ts:39](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Discovery.ts#L39)

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

[packages/@roots/bud-framework/src/Discovery.ts:31](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Discovery.ts#L31)

___

### register

▸ `Optional` **register**(`app`): `any`

Register

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[register](Service.md#register)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:31](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L31)

___

### registerDiscovered

▸ `Abstract` **registerDiscovered**(): `void`

Register discovered packages as extensions

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Discovery.ts:26](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Discovery.ts#L26)

___

### registered

▸ `Optional` **registered**(`app`): `any`

Post registered callback

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[registered](Service.md#registered)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:37](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L37)

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

[packages/@roots/bud-framework/src/Discovery.ts:48](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Discovery.ts#L48)
