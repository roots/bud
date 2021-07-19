---
id: "Extensions"
title: "Interface: Extensions"
sidebar_label: "Extensions"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Extensions

Extensions service

## Hierarchy

- [`Service`](../classes/Service.md)

  ↳ **`Extensions`**

## Properties

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.md).[name](../classes/Service.md#name)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:60](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L60)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:64](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L64)

## Methods

### add

▸ **add**(`extension`): `void`

Add an extension

#### Parameters

| Name | Type |
| :------ | :------ |
| `extension` | [`Module`](Module.md)<`any`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Extensions.ts:17](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Extensions.ts#L17)

___

### boot

▸ `Optional` **boot**(`app`): `any`

Boot

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/Service.md).[boot](../classes/Service.md#boot)

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
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/Service.md).[booted](../classes/Service.md#booted)

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
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/Service.md).[bootstrap](../classes/Service.md#bootstrap)

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
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/Service.md).[bootstrapped](../classes/Service.md#bootstrapped)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:25](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L25)

___

### make

▸ **make**(): [`PluginOutput`](../modules/Extensions.md#pluginoutput)[]

Produce Webpack Plugins

#### Returns

[`PluginOutput`](../modules/Extensions.md#pluginoutput)[]

#### Defined in

[packages/@roots/bud-framework/src/Extensions.ts:22](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Extensions.ts#L22)

___

### register

▸ `Optional` **register**(`app`): `any`

Register

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/Service.md).[register](../classes/Service.md#register)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:31](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L31)

___

### registered

▸ `Optional` **registered**(`app`): `any`

Post registered callback

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/Service.md).[registered](../classes/Service.md#registered)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:37](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L37)
