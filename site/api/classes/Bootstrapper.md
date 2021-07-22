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
since they are needed before lifecycle methods are invoked.

Container instance.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- `Container`<`T`\>

  ↳ **`Bootstrapper`**

  ↳↳ [`Service`](Service.md)

  ↳↳ [`Logger`](../interfaces/Logger.md)

## Properties

### name

• **name**: `any`

Name

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:25](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Service.ts#L25)

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

[packages/@roots/bud-framework/src/Service.ts:55](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Service.ts#L55)

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

[packages/@roots/bud-framework/src/Service.ts:61](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Service.ts#L61)

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

[packages/@roots/bud-framework/src/Service.ts:31](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Service.ts#L31)

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

[packages/@roots/bud-framework/src/Service.ts:37](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Service.ts#L37)

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

[packages/@roots/bud-framework/src/Service.ts:43](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Service.ts#L43)

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

[packages/@roots/bud-framework/src/Service.ts:49](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Service.ts#L49)
