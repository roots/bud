---
id: "Service.Service-1"
title: "Class: Service<T>"
sidebar_label: "Service"
custom_edit_url: null
---

[Service](../modules/Service.md).Service

Service

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- [`Bootstrapper`](Service.Bootstrapper.md)<`T`\>

  ↳ **`Service`**

  ↳↳ [`Build`](../interfaces/Build.Build-2.md)

  ↳↳ [`Compiler`](../interfaces/Compiler.Compiler-2.md)

  ↳↳ [`Dashboard`](../interfaces/Dashboard.Dashboard-1.md)

  ↳↳ [`Extensions`](../interfaces/Extensions.Extensions-2.md)

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
| `app` | [`Framework`](Framework.Framework-2.md) |

#### Overrides

Bootstrapper&lt;T\&gt;.constructor

#### Defined in

[bud-framework/src/Service/index.ts:59](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L59)

## Properties

### \_app

• `Private` **\_app**: () => [`Framework`](Framework.Framework-2.md)

#### Type declaration

▸ (): [`Framework`](Framework.Framework-2.md)

##### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Service/index.ts:53](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L53)

___

### name

• **name**: `string`

#### Defined in

[bud-framework/src/Service/index.ts:51](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L51)

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.Framework-2.md)

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Service/index.ts:55](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L55)
