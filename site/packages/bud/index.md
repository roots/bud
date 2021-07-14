---
id: "index"
title: "@roots/bud"
slug: "/packages/bud"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Namespaces

- [CleanWebpackPlugin](modules/cleanwebpackplugin.md)
- [CopyWebpackPlugin](modules/copywebpackplugin.md)
- [CssMinimizerWebpackPlugin](modules/cssminimizerwebpackplugin.md)
- [DefineWebpackPlugin](modules/definewebpackplugin.md)
- [Framework](modules/framework.md)
- [HotModuleReplacementPlugin](modules/hotmodulereplacementplugin.md)
- [IgnoreEmitWebpackPlugin](modules/ignoreemitwebpackplugin.md)
- [MiniCssExtractPlugin](modules/minicssextractplugin.md)
- [WebpackConfigDumpPlugin](modules/webpackconfigdumpplugin.md)
- [WebpackManifestPlugin](modules/webpackmanifestplugin.md)
- [WebpackProvidePlugin](modules/webpackprovideplugin.md)

## Classes

- [Api](classes/api.md)
- [Bud](classes/bud.md)
- [Build](classes/build.md)
- [Cache](classes/cache.md)
- [Compiler](classes/compiler.md)
- [Dashboard](classes/dashboard.md)
- [Dependencies](classes/dependencies.md)
- [Discovery](classes/discovery.md)
- [Env](classes/env.md)
- [Extensions](classes/extensions.md)
- [Framework](classes/framework.md)
- [Hooks](classes/hooks.md)
- [Logger](classes/logger.md)
- [Server](classes/server.md)

## Variables

### config

• `Const` **config**: `Configuration`

Base config

#### Defined in

[packages/@roots/bud/src/config.ts:3](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud/src/config.ts#L3)

___

### extensions

• `Const` **extensions**: `Object`

Base extensions & webpack plugins.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `webpack-config-dump-plugin` | [`WebpackConfigDumpPlugin`](modules/webpackconfigdumpplugin.md) |
| `webpack-hot-module-replacement-plugin` | [`HotModuleReplacementPlugin`](modules/hotmodulereplacementplugin.md) |

#### Defined in

[packages/@roots/bud/src/extensions/index.ts:12](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud/src/extensions/index.ts#L12)

___

### services

• `Const` **services**: `Services`

Base framework services

#### Defined in

[packages/@roots/bud/src/services/index.ts:23](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud/src/services/index.ts#L23)
