---
id: "index"
title: "@roots/bud"
slug: "/bud"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Namespaces

- [Api](modules/api.md)
- [Build](modules/build.md)
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
- [Framework](modules/framework.md)
- [HotModuleReplacementPlugin](modules/hotmodulereplacementplugin.md)
- [IgnoreEmitWebpackPlugin](modules/ignoreemitwebpackplugin.md)
- [MiniCssExtractPlugin](modules/minicssextractplugin.md)
- [WebpackConfigDumpPlugin](modules/webpackconfigdumpplugin.md)
- [WebpackManifestPlugin](modules/webpackmanifestplugin.md)
- [WebpackProvidePlugin](modules/webpackprovideplugin.md)

## Classes

- [Bud](classes/bud.md)
- [Framework](classes/framework.md)
- [Hooks](classes/hooks.md)
- [Logger](classes/logger.md)
- [Server](classes/server.md)

## Variables

### config

• `Const` **config**: `Configuration`

Base config

#### Defined in

packages/@roots/bud/types/config.d.ts:2

___

### extensions

• `Const` **extensions**: `Object`

Base extensions & webpack plugins.

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

• `Const` **services**: `Services`

Base framework services

#### Defined in

packages/@roots/bud/types/services/index.d.ts:5
