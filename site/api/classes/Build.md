---
id: "Build"
title: "Class: Build"
sidebar_label: "Build"
sidebar_position: 0
custom_edit_url: null
---

Builds the Webpack configuration object

**`remarks`**
For typescript users who wish to maintain typing accuracy while adding support for
various loaders, items and rules:

- [loaders](Build.md#loaders) should be declared by augmenting the [Framework.Loaders](../interfaces/Framework.Loaders.md) interface
- [items](Build.md#items) should be declared by augmenting the [Framework.Items](../interfaces/Framework.Items.md) interface
- [rules](Build.md#rules) should be declared by augmenting the [Framework.Rules](../interfaces/Framework.Rules.md) interface

Check out [the source of Build](Build.md) for examples. A lot of `@roots/bud` extensions do this
as well, if you need an example of how to do it from a package (without overriding this class).

**`sealed`**

## Hierarchy

- `Base`

  ↳ **`Build`**

## Implements

- `Contract`

## Properties

### items

• **items**: [`Items`](../interfaces/Framework.Items.md)

Registered items

#### Implementation of

Contract.items

#### Overrides

Base.items

#### Defined in

[packages/@roots/bud/src/services/Build/index.ts:51](https://github.com/roots/bud/blob/e51c85c2/packages/@roots/bud/src/services/Build/index.ts#L51)

___

### loaders

• **loaders**: [`Loaders`](../interfaces/Framework.Loaders.md)

Registered loaders

#### Implementation of

Contract.loaders

#### Overrides

Base.loaders

#### Defined in

[packages/@roots/bud/src/services/Build/index.ts:41](https://github.com/roots/bud/blob/e51c85c2/packages/@roots/bud/src/services/Build/index.ts#L41)

___

### name

• **name**: `string` = `'build'`

Service identifier

#### Implementation of

Contract.name

#### Overrides

Base.name

#### Defined in

[packages/@roots/bud/src/services/Build/index.ts:36](https://github.com/roots/bud/blob/e51c85c2/packages/@roots/bud/src/services/Build/index.ts#L36)

___

### rules

• **rules**: [`Rules`](../interfaces/Framework.Rules.md)

Registered rules

#### Implementation of

Contract.rules

#### Overrides

Base.rules

#### Defined in

[packages/@roots/bud/src/services/Build/index.ts:46](https://github.com/roots/bud/blob/e51c85c2/packages/@roots/bud/src/services/Build/index.ts#L46)

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

Access [Framework](Framework.md) instance

**`readonly`**

#### Returns

[`Framework`](Framework.md)

#### Defined in

packages/@roots/bud-framework/types/Bootstrapper.d.ts:25

___

### config

• `get` **config**(): `Configuration`

The Webpack config object

**`readonly`**

#### Returns

`Configuration`

#### Defined in

packages/@roots/bud-build/types/Build/index.d.ts:31
