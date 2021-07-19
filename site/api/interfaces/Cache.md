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

bud-framework/src/Service.ts:60

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

bud-framework/src/Service.ts:64

## Methods

### buildDependencies

▸ **buildDependencies**(): `string`[]

## cache.buildDependencies

Dependencies which should be checked to determine cache
validity.

#### Returns

`string`[]

#### Defined in

bud-framework/src/Cache.ts:28

___

### directory

▸ **directory**(): `string`

## cache.cacheLocation

#### Returns

`string`

#### Defined in

bud-framework/src/Cache.ts:33

___

### hash

▸ **hash**(): `string`

## cache.hash

#### Returns

`string`

#### Defined in

bud-framework/src/Cache.ts:38

___

### version

▸ **version**(): `string`

## cache.version

A hash created from the stringified contents of the project config files
and its dependencies.

#### Returns

`string`

#### Defined in

bud-framework/src/Cache.ts:46
