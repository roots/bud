---
id: "Service"
title: "Class: Service<T>"
sidebar_label: "Service"
sidebar_position: 0
custom_edit_url: null
---

Abstract

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- [`Bootstrapper`](Bootstrapper.md)<`T`\>

  ↳ **`Service`**

  ↳↳ [`Discovery`](Discovery.md)

  ↳↳ [`Store`](Store.md)

  ↳↳ [`Api`](../interfaces/Api.md)

  ↳↳ [`Build`](../interfaces/Build.md)

  ↳↳ [`Cache`](../interfaces/Cache.md)

  ↳↳ [`Compiler`](../interfaces/Compiler.md)

  ↳↳ [`Dashboard`](../interfaces/Dashboard.md)

  ↳↳ [`Dependencies`](../interfaces/Dependencies.md)

  ↳↳ [`Extensions`](../interfaces/Extensions.md)

  ↳↳ [`Hooks`](../interfaces/Hooks.md)

  ↳↳ [`Server`](../interfaces/Server.md)

## Constructors

### constructor

• **new Service**<`T`\>(`app`)

Class constructor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Overrides

[Bootstrapper](Bootstrapper.md).[constructor](Bootstrapper.md#constructor)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:68](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L68)

## Properties

### \_app

• `Private` **\_app**: () => [`Framework`](Framework.md)

#### Type declaration

▸ (): [`Framework`](Framework.md)

##### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:62](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L62)

___

### name

• **name**: `string`

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:60](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L60)

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

[Bootstrapper](Bootstrapper.md).[boot](Bootstrapper.md#boot)

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

[Bootstrapper](Bootstrapper.md).[booted](Bootstrapper.md#booted)

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

[Bootstrapper](Bootstrapper.md).[bootstrap](Bootstrapper.md#bootstrap)

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

[Bootstrapper](Bootstrapper.md).[bootstrapped](Bootstrapper.md#bootstrapped)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:25](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L25)

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

[Bootstrapper](Bootstrapper.md).[register](Bootstrapper.md#register)

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
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Bootstrapper](Bootstrapper.md).[registered](Bootstrapper.md#registered)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:37](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L37)
