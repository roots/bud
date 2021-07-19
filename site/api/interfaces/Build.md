---
id: "Build"
title: "Interface: Build"
sidebar_label: "Build"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Build

Assembles the webpack config used by the [Compiler](Compiler.md).

Final configuration is accessible [Build.config](Build.md#config).
It can be rebuilt with [Build.rebuild](Build.md#rebuild).

## Hierarchy

- [`Service`](../classes/Service.md)

  ↳ **`Build`**

## Properties

### config

• **config**: `Configuration`

Webpack configuration

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:35](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Build.ts#L35)

___

### items

• **items**: `Object`

RuleSetUse item registry

#### Index signature

▪ [key: `string`]: [`Item`](Build.Item-1.md)

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:25](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Build.ts#L25)

___

### loaders

• **loaders**: `Object`

Loader registry

#### Index signature

▪ [key: `string`]: [`Loader`](Build.Loader-1.md)

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:20](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Build.ts#L20)

___

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.md).[name](../classes/Service.md#name)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:60](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L60)

___

### rules

• **rules**: `Object`

Webpack rules registry

#### Index signature

▪ [key: `string`]: [`Rule`](Build.Rule-1.md)

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:30](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Build.ts#L30)

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

### rebuild

▸ **rebuild**(): `Configuration`

Regenerate Webpack configuration

#### Returns

`Configuration`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:40](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Build.ts#L40)

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
