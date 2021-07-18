---
id: "index"
title: "@roots/bud"
slug: "/bud"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Namespaces

- [Cache](modules/cache.md)
- [CleanWebpackPlugin](modules/cleanwebpackplugin.md)
- [Compiler](modules/compiler.md)
- [CopyWebpackPlugin](modules/copywebpackplugin.md)
- [CssMinimizerWebpackPlugin](modules/cssminimizerwebpackplugin.md)
- [Dashboard](modules/dashboard.md)
- [DefineWebpackPlugin](modules/definewebpackplugin.md)
- [Dependencies](modules/dependencies.md)
- [Discovery](modules/discovery.md)
- [Env](modules/env.md)
- [Extensions](modules/extensions.md)
- [Factory](modules/factory.md)
- [Framework](modules/framework.md)
- [HotModuleReplacementPlugin](modules/hotmodulereplacementplugin.md)
- [IgnoreEmitWebpackPlugin](modules/ignoreemitwebpackplugin.md)
- [MiniCssExtractPlugin](modules/minicssextractplugin.md)
- [WebpackConfigDumpPlugin](modules/webpackconfigdumpplugin.md)
- [WebpackManifestPlugin](modules/webpackmanifestplugin.md)
- [WebpackProvidePlugin](modules/webpackprovideplugin.md)
- [items](modules/items.md)
- [loaders](modules/loaders.md)
- [methods](modules/methods.md)
- [rules](modules/rules.md)

## Classes

- [Api](classes/api.md)
- [Bud](classes/bud.md)
- [Build](classes/build.md)
- [Framework](classes/framework.md)
- [Item](classes/item.md)
- [Loader](classes/loader.md)
- [Rule](classes/rule.md)

## Interfaces

- [Configuration](interfaces/configuration.md)

## Type aliases

### Factory

Ƭ **Factory**: (`overrides?`: [`Options`](interfaces/factory.options.md)) => [`Framework`](classes/framework.md)

#### Type declaration

▸ (`overrides?`): [`Framework`](classes/framework.md)

Factory

##### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | [`Options`](interfaces/factory.options.md) |

##### Returns

[`Framework`](classes/framework.md)

#### Defined in

packages/@roots/bud/types/factory.d.ts:2

## Variables

### config

• `Const` **config**: [`Configuration`](interfaces/configuration.md)

Config

#### Defined in

packages/@roots/bud/types/config.d.ts:2

___

### extensions

• `Const` **extensions**: `Object`

Extensions

#### Index signature

▪ [x: `string`]: typeof [`WebpackConfigDumpPlugin`](modules/webpackconfigdumpplugin.md) \| typeof [`DefineWebpackPlugin`](modules/definewebpackplugin.md) \| typeof [`HotModuleReplacementPlugin`](modules/hotmodulereplacementplugin.md) \| typeof [`WebpackManifestPlugin`](modules/webpackmanifestplugin.md) \| typeof [`CleanWebpackPlugin`](modules/cleanwebpackplugin.md) \| typeof [`CopyWebpackPlugin`](modules/copywebpackplugin.md) \| typeof [`CssMinimizerWebpackPlugin`](modules/cssminimizerwebpackplugin.md) \| typeof [`IgnoreEmitWebpackPlugin`](modules/ignoreemitwebpackplugin.md) \| typeof [`MiniCssExtractPlugin`](modules/minicssextractplugin.md) \| typeof [`WebpackProvidePlugin`](modules/webpackprovideplugin.md)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `webpack-config-dump-plugin` | typeof [`WebpackConfigDumpPlugin`](modules/webpackconfigdumpplugin.md) |
| `webpack-hot-module-replacement-plugin` | typeof [`HotModuleReplacementPlugin`](modules/hotmodulereplacementplugin.md) |

#### Defined in

packages/@roots/bud/types/extensions/index.d.ts:11

___

### services

• `Const` **services**: [`Services`](interfaces/framework.services.md)

Services

#### Defined in

packages/@roots/bud/types/services/index.d.ts:2

## Functions

### factory

▸ `Const` **factory**(`overrides?`): [`Framework`](classes/framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | [`Options`](interfaces/factory.options.md) |

#### Returns

[`Framework`](classes/framework.md)

#### Defined in

packages/@roots/bud/types/factory.d.ts:12
