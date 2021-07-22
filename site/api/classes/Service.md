---
id: "Service"
title: "Class: Service<T>"
sidebar_label: "Service"
sidebar_position: 0
custom_edit_url: null
---

**`abstract`** Service

Atomic unit of Framework functionality. Container instance.

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

[packages/@roots/bud-framework/src/Service.ts:78](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Service.ts#L78)

## Properties

### \_app

• `Private` **\_app**: () => [`Framework`](Framework.md)

#### Type declaration

▸ (): [`Framework`](Framework.md)

##### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:72](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Service.ts#L72)

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:74](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Service.ts#L74)
