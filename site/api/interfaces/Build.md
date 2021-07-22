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

[packages/@roots/bud-framework/src/Build.ts:35](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Build.ts#L35)

___

### items

• **items**: `Object`

RuleSetUse item registry

#### Index signature

▪ [key: `string`]: [`Item`](Build.Item-1.md)

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:25](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Build.ts#L25)

___

### loaders

• **loaders**: `Object`

Loader registry

#### Index signature

▪ [key: `string`]: [`Loader`](Build.Loader-1.md)

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:20](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Build.ts#L20)

___

### rules

• **rules**: `Object`

Webpack rules registry

#### Index signature

▪ [key: `string`]: [`Rule`](Build.Rule-1.md)

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:30](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Build.ts#L30)

## Accessors

### app

• `get` **app**(): [`Framework`](../classes/Framework.md)

#### Returns

[`Framework`](../classes/Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service.ts:74](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Service.ts#L74)

## Methods

### rebuild

▸ **rebuild**(): `Configuration`

Regenerate Webpack configuration

#### Returns

`Configuration`

#### Defined in

[packages/@roots/bud-framework/src/Build.ts:40](https://github.com/roots/bud/blob/4498d10b4/packages/@roots/bud-framework/src/Build.ts#L40)
