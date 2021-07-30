---
id: "index"
title: "@roots/bud"
slug: "/api"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Namespaces

- [CleanWebpackPlugin](namespaces/CleanWebpackPlugin.md)
- [Configuration](namespaces/Configuration.md)
- [CopyWebpackPlugin](namespaces/CopyWebpackPlugin.md)
- [CssMinimizerWebpackPlugin](namespaces/CssMinimizerWebpackPlugin.md)
- [Factory](namespaces/Factory.md)
- [Framework](namespaces/Framework.md)
- [HotModuleReplacementPlugin](namespaces/HotModuleReplacementPlugin.md)
- [IgnoreEmitWebpackPlugin](namespaces/IgnoreEmitWebpackPlugin.md)
- [MiniCssExtractPlugin](namespaces/MiniCssExtractPlugin.md)
- [Module](namespaces/Module.md)
- [Store](namespaces/Store.md)
- [WebpackConfigDumpPlugin](namespaces/WebpackConfigDumpPlugin.md)
- [WebpackDefinePlugin](namespaces/WebpackDefinePlugin.md)
- [WebpackManifestPlugin](namespaces/WebpackManifestPlugin.md)
- [WebpackProvidePlugin](namespaces/WebpackProvidePlugin.md)
- [items](namespaces/items.md)
- [loaders](namespaces/loaders.md)
- [repository](namespaces/repository.md)
- [rules](namespaces/rules.md)

## Classes

- [Api](classes/Api.md)
- [Bootstrapper](classes/Bootstrapper.md)
- [Bud](classes/Bud.md)
- [Build](classes/Build.md)
- [Cache](classes/Cache.md)
- [Compiler](classes/Compiler.md)
- [Dashboard](classes/Dashboard.md)
- [Dependencies](classes/Dependencies.md)
- [Discovery](classes/Discovery.md)
- [Env](classes/Env.md)
- [Extension](classes/Extension.md)
- [Extensions](classes/Extensions.md)
- [Framework](classes/Framework.md)
- [Hooks](classes/Hooks.md)
- [Item](classes/Item.md)
- [Loader](classes/Loader.md)
- [Logger](classes/Logger.md)
- [Rule](classes/Rule.md)
- [Server](classes/Server.md)
- [Service](classes/Service.md)
- [Store](classes/Store.md)

## Interfaces

- [Configuration](interfaces/Configuration.md)
- [Module](interfaces/Module.md)
- [Plugin](interfaces/Plugin.md)

## Type aliases

### Factory

Ƭ **Factory**: (`overrides?`: [`Options`](interfaces/Factory.Options.md)) => [`Framework`](classes/Framework.md)

#### Type declaration

▸ (`overrides?`): [`Framework`](classes/Framework.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | [`Options`](interfaces/Factory.Options.md) |

##### Returns

[`Framework`](classes/Framework.md)

#### Defined in

packages/@roots/bud/types/factory.d.ts:5

## Variables

### Error

• `Const` **Error**: `CallableFunction`

#### Defined in

packages/@roots/bud-dashboard/types/components/Error/index.d.ts:1

___

### config

• `Const` **config**: [`Configuration`](interfaces/Configuration.md)

**`exports`** config

**`exports`** Configuration

#### Defined in

packages/@roots/bud/types/config.d.ts:11

___

### extensions

• `Const` **extensions**: `Object`

Extensions

#### Index signature

▪ [x: `string`]: typeof [`WebpackProvidePlugin`](namespaces/WebpackProvidePlugin.md) \| typeof [`CleanWebpackPlugin`](namespaces/CleanWebpackPlugin.md) \| typeof [`WebpackConfigDumpPlugin`](namespaces/WebpackConfigDumpPlugin.md) \| typeof [`CopyWebpackPlugin`](namespaces/CopyWebpackPlugin.md) \| typeof [`CssMinimizerWebpackPlugin`](namespaces/CssMinimizerWebpackPlugin.md) \| typeof [`WebpackDefinePlugin`](namespaces/WebpackDefinePlugin.md) \| typeof [`HotModuleReplacementPlugin`](namespaces/HotModuleReplacementPlugin.md) \| typeof [`IgnoreEmitWebpackPlugin`](namespaces/IgnoreEmitWebpackPlugin.md) \| typeof [`WebpackManifestPlugin`](namespaces/WebpackManifestPlugin.md) \| typeof [`MiniCssExtractPlugin`](namespaces/MiniCssExtractPlugin.md)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `webpack-hot-module-replacement-plugin` | typeof [`HotModuleReplacementPlugin`](namespaces/HotModuleReplacementPlugin.md) |

#### Defined in

packages/@roots/bud/types/extensions/index.d.ts:11

___

### services

• `Const` **services**: [`Services`](interfaces/Framework.Services.md)

**`exports`** services

#### Defined in

packages/@roots/bud/types/services/index.d.ts:2

## Functions

### Progress

▸ `Const` **Progress**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.mode` | `string` |
| `__namedParameters.progress` | `any` |
| `__namedParameters.theme` | `Styles` |

#### Returns

`Element`

#### Defined in

packages/@roots/bud-dashboard/types/components/Progress/index.d.ts:3

___

### Screen

▸ `Const` **Screen**(`__namedParameters`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.app` | [`Framework`](classes/Framework.md) |
| `__namedParameters.children` | `any` |
| `__namedParameters.color?` | `any` |
| `__namedParameters.title?` | `string` |

#### Returns

`Element`

#### Defined in

packages/@roots/bud-dashboard/types/components/Screen.d.ts:3

___

### factory

▸ `Const` **factory**(`overrides?`): [`Framework`](classes/Framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | [`Options`](interfaces/Factory.Options.md) |

#### Returns

[`Framework`](classes/Framework.md)

#### Defined in

packages/@roots/bud/types/factory.d.ts:15
