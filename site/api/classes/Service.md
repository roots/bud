---
id: "Service"
title: "Class: Service<T>"
sidebar_label: "Service"
sidebar_position: 0
custom_edit_url: null
---

**`abstract`** Service

The atomic unit of Framework functionality.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- [`Bootstrapper`](Bootstrapper.md)<`T`\>

  ↳ **`Service`**

  ↳↳ [`Api`](../interfaces/Api.md)

  ↳↳ [`Build`](../interfaces/Build.md)

  ↳↳ [`Discovery`](Discovery.md)

  ↳↳ [`Extensions`](../interfaces/Extensions.md)

  ↳↳ [`Store`](Store.md)

  ↳↳ [`Cache`](../interfaces/Cache.md)

  ↳↳ [`Compiler`](../interfaces/Compiler.md)

  ↳↳ [`Dashboard`](../interfaces/Dashboard.md)

  ↳↳ [`Dependencies`](../interfaces/Dependencies.md)

  ↳↳ [`Hooks`](../interfaces/Hooks.md)

  ↳↳ [`Server`](../interfaces/Server.md)

## Constructors

### constructor

• **new Service**<`T`\>(`app`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Overrides

Bootstrapper&lt;T\&gt;.constructor

#### Defined in

bud-framework/src/Service.ts:68

## Properties

### \_app

• `Private` **\_app**: () => [`Framework`](Framework.md)

#### Type declaration

▸ (): [`Framework`](Framework.md)

##### Returns

[`Framework`](Framework.md)

#### Defined in

bud-framework/src/Service.ts:62

___

### name

• **name**: `string`

#### Defined in

bud-framework/src/Service.ts:60

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

#### Returns

[`Framework`](Framework.md)

#### Defined in

bud-framework/src/Service.ts:64
