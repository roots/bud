---
id: "Bootstrapper"
title: "Class: Bootstrapper<T>"
sidebar_label: "Bootstrapper"
sidebar_position: 0
custom_edit_url: null
---

**`abstract`** Bootstrapper

[Service](Service.md) base class.

[Logger](../interfaces/Logger.md) and [Store](Store.md) extend this directly
since they are needed before the lifecycle even starts up.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- `Container`<`T`\>

  ↳ **`Bootstrapper`**

  ↳↳ [`Service`](Service.md)

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

#### Defined in

bud-framework/src/Service.ts:43

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

#### Defined in

bud-framework/src/Service.ts:49

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

#### Defined in

bud-framework/src/Service.ts:19

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

#### Defined in

bud-framework/src/Service.ts:25

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

#### Defined in

bud-framework/src/Service.ts:31

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

#### Defined in

bud-framework/src/Service.ts:37
