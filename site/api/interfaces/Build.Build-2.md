---
id: "Build.Build-2"
title: "Interface: Build"
sidebar_label: "Build"
custom_edit_url: null
---

[Build](../modules/Build.md).Build

Build

Responsible for assembling the webpack config used
by the compiler.

Access the config with `build.config`. It can be rebuilt
with `build.generate`.

## Hierarchy

- [`Service`](../classes/Service.Service-1.md)

  ↳ **`Build`**

## Properties

### config

• **config**: `Configuration`

## config

Webpack configuration

#### Defined in

[bud-framework/src/Build/index.ts:21](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L21)

___

### items

• **items**: `Object`

## items

RuleSetUse item registry

#### Index signature

▪ [key: `string`]: [`Item`](Build.Build-1.Item-1.md)

#### Defined in

[bud-framework/src/Build/index.ts:42](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L42)

___

### loaders

• **loaders**: `Object`

## loaders

Loader registry

#### Index signature

▪ [key: `string`]: [`Loader`](Build.Build-1.Loader-1.md)

#### Defined in

[bud-framework/src/Build/index.ts:35](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L35)

___

### name

• **name**: `string`

#### Inherited from

[Service](../classes/Service.Service-1.md).[name](../classes/Service.Service-1.md#name)

#### Defined in

[bud-framework/src/Service/index.ts:51](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L51)

___

### rules

• **rules**: `Object`

## rules

Webpack rules registry

#### Index signature

▪ [key: `string`]: [`Rule`](Build.Build-1.Rule-1.md)

#### Defined in

[bud-framework/src/Build/index.ts:49](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L49)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.Framework-2.md)

#### Returns

[`Framework`](../classes/Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Service/index.ts:55](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Service/index.ts#L55)

## Methods

### rebuild

▸ **rebuild**(): `Configuration`

## rebuild

Regenerate Webpack configuration

#### Returns

`Configuration`

#### Defined in

[bud-framework/src/Build/index.ts:28](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Build/index.ts#L28)
