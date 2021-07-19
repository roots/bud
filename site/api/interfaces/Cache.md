---
id: "Cache"
title: "Interface: Cache"
sidebar_label: "Cache"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Cache

Handles cache invalidation, version generation, and build.cache config hooks.

Interfaces with:

 - [Discovery](../classes/Discovery.md) to determine project dependencies for snapshotting/validation.
 - [Build](Build.md) via [Hooks](Hooks.md) to update config.

Facades:

 - [Api](Api.md) can toggle cache settings with {@link Bud.Persist}

## Hierarchy

- [`Service`](../classes/Service.md)

  ↳ **`Cache`**

## Properties

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.md).[name](../classes/Service.md#name)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:60](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Service.ts#L60)

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

### buildDependencies

▸ **buildDependencies**(): `string`[]

## cache.buildDependencies

Dependencies which should be checked to determine cache
validity.

#### Returns

`string`[]

#### Defined in

[packages/@roots/bud-framework/src/Cache.ts:28](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Cache.ts#L28)

___

### directory

▸ **directory**(): `string`

## cache.cacheLocation

#### Returns

`string`

#### Defined in

[packages/@roots/bud-framework/src/Cache.ts:33](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Cache.ts#L33)

___

### hash

▸ **hash**(): `string`

## cache.hash

#### Returns

`string`

#### Defined in

[packages/@roots/bud-framework/src/Cache.ts:38](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Cache.ts#L38)

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

___

### version

▸ **version**(): `string`

## cache.version

A hash created from the stringified contents of the project config files
and its dependencies.

#### Returns

`string`

#### Defined in

[packages/@roots/bud-framework/src/Cache.ts:46](https://github.com/roots/bud/blob/1a11bae56/packages/@roots/bud-framework/src/Cache.ts#L46)
