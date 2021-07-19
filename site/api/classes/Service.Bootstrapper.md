---
id: "Service.Bootstrapper"
title: "Class: Bootstrapper<T>"
sidebar_label: "Bootstrapper"
custom_edit_url: null
---

[Service](../modules/Service.md).Bootstrapper

Bootstrapper

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- `Container`<`T`\>

  ↳ **`Bootstrapper`**

  ↳↳ [`Service`](Service.Service-1.md)

## Methods

### boot

▸ `Optional` **boot**(`app`): `any`

Boot

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.Framework-2.md) |

#### Returns

`any`

#### Defined in

[bud-framework/src/Service/index.ts:37](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L37)

___

### booted

▸ `Optional` **booted**(`app`): `any`

Post boot callback

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.Framework-2.md) |

#### Returns

`any`

#### Defined in

[bud-framework/src/Service/index.ts:43](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L43)

___

### bootstrap

▸ `Optional` **bootstrap**(`app`): `any`

Bootstrap

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.Framework-2.md) |

#### Returns

`any`

#### Defined in

[bud-framework/src/Service/index.ts:13](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L13)

___

### bootstrapped

▸ `Optional` **bootstrapped**(`app`): `any`

Bootstrapped

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.Framework-2.md) |

#### Returns

`any`

#### Defined in

[bud-framework/src/Service/index.ts:19](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L19)

___

### register

▸ `Optional` **register**(`app`): `any`

Register

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.Framework-2.md) |

#### Returns

`any`

#### Defined in

[bud-framework/src/Service/index.ts:25](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L25)

___

### registered

▸ `Optional` **registered**(`app`): `any`

Post registered callback

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.Framework-2.md) |

#### Returns

`any`

#### Defined in

[bud-framework/src/Service/index.ts:31](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L31)
