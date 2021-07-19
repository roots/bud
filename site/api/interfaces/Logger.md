---
id: "Logger"
title: "Interface: Logger"
sidebar_label: "Logger"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Logger

## Hierarchy

- [`Bootstrapper`](../classes/Bootstrapper.md)

  ↳ **`Logger`**

## Properties

### instance

• **instance**: `Signale`<`DefaultMethods`\>

#### Defined in

packages/@roots/bud-framework/src/Logger.ts:12

___

### name

• **name**: `any`

Name

#### Inherited from

[Bootstrapper](../classes/Bootstrapper.md).[name](../classes/Bootstrapper.md#name)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:25](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Service.ts#L25)

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

[Bootstrapper](../classes/Bootstrapper.md).[boot](../classes/Bootstrapper.md#boot)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:55](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Service.ts#L55)

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

[Bootstrapper](../classes/Bootstrapper.md).[booted](../classes/Bootstrapper.md#booted)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:61](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Service.ts#L61)

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

[Bootstrapper](../classes/Bootstrapper.md).[bootstrap](../classes/Bootstrapper.md#bootstrap)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:31](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Service.ts#L31)

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

[Bootstrapper](../classes/Bootstrapper.md).[bootstrapped](../classes/Bootstrapper.md#bootstrapped)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:37](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Service.ts#L37)

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

[Bootstrapper](../classes/Bootstrapper.md).[register](../classes/Bootstrapper.md#register)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:43](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Service.ts#L43)

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

[Bootstrapper](../classes/Bootstrapper.md).[registered](../classes/Bootstrapper.md#registered)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:49](https://github.com/roots/bud/blob/017bef370/packages/@roots/bud-framework/src/Service.ts#L49)
