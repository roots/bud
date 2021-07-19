---
id: "Build"
title: "Interface: Build"
sidebar_label: "Build"
sidebar_position: 0
custom_edit_url: null
---

**`interface`** Build

Responsible for assembling the webpack config used
by the compiler.

Access the config with `build.config`.
It can be rebuilt with `build.rebuild()`.

## Hierarchy

- [`Service`](../classes/Service.md)

  ↳ **`Build`**

## Properties

### config

• **config**: `Configuration`

## config

Webpack configuration

#### Defined in

bud-framework/src/Build.ts:19

___

### items

• **items**: `Object`

## items

RuleSetUse item registry

#### Index signature

▪ [key: `string`]: [`Item`](Build.Item-1.md)

#### Defined in

bud-framework/src/Build.ts:40

___

### loaders

• **loaders**: `Object`

## loaders

Loader registry

#### Index signature

▪ [key: `string`]: [`Loader`](Build.Loader-1.md)

#### Defined in

bud-framework/src/Build.ts:33

___

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.md).[name](../classes/Service.md#name)

#### Defined in

bud-framework/src/Service.ts:60

___

### rules

• **rules**: `Object`

## rules

Webpack rules registry

#### Index signature

▪ [key: `string`]: [`Rule`](Build.Rule-1.md)

#### Defined in

bud-framework/src/Build.ts:47

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

bud-framework/src/Service.ts:64

## Methods

### rebuild

▸ **rebuild**(): `Configuration`

## rebuild

Regenerate Webpack configuration

#### Returns

`Configuration`

#### Defined in

bud-framework/src/Build.ts:26
