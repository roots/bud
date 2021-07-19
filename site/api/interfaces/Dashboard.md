---
id: "Dashboard"
title: "Interface: Dashboard"
sidebar_label: "Dashboard"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Service`](../classes/Service.md)

  ↳ **`Dashboard`**

## Properties

### instance

• **instance**: `Instance`

Instance

#### Defined in

[packages/@roots/bud-framework/src/Dashboard/index.ts:13](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Dashboard/index.ts#L13)

___

### name

• **name**: `any`

Service name

#### Overrides

[Service](../classes/Service.md).[name](../classes/Service.md#name)

#### Defined in

[packages/@roots/bud-framework/src/Dashboard/index.ts:8](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Dashboard/index.ts#L8)

___

### render

• **render**: `any`

Render

#### Defined in

[packages/@roots/bud-framework/src/Dashboard/index.ts:28](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Dashboard/index.ts#L28)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

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

### register

▸ **register**(): `void`

Register service

#### Returns

`void`

#### Overrides

[Service](../classes/Service.md).[register](../classes/Service.md#register)

#### Defined in

[packages/@roots/bud-framework/src/Dashboard/index.ts:18](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Dashboard/index.ts#L18)

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

___

### renderError

▸ **renderError**(`body`, `title`): `Instance`

Render error

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | `string` |
| `title` | `string` |

#### Returns

`Instance`

#### Defined in

[packages/@roots/bud-framework/src/Dashboard/index.ts:33](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Dashboard/index.ts#L33)

___

### run

▸ **run**(): `void`

Mount CLI

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Dashboard/index.ts:23](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Dashboard/index.ts#L23)
