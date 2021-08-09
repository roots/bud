---
id: "index"
title: "@roots/bud"
slug: "/api"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

`@roots/bud` is a frontend build framework combining the best parts of Symfony Encore and Laravel Mix

**`remarks`**
The `@roots/bud` package provides [Bud](classes/Bud.md), a concrete implementation of the [Framework abstract class](classes/Framework.md).

[factory](index.md#factory) is exported to simplify instantiation for direct use with Node.

This package also provides a CLI which can is invoked with `bud`.

Exported data & instances:
- [config](classes/Bud.md#config) — The default [Configuration](interfaces/Configuration.md) used as the [Bud.store](classes/Bud.md#store) {@link Store.repository repository}
- [extensions](classes/Bud.md#extensions) — The default [Framework.Extensions](interfaces/Framework.Extensions.md) used as the [Bud.extensions](classes/Bud.md#extensions) {@link Extensions.respository repository}
- [items](classes/Build.md#items) — The default [Framework.Items](interfaces/Framework.Items.md) registered to [Bud.build](classes/Bud.md#build)
- [Rules](interfaces/Framework.Rules.md) — The default [Framework.Rules](interfaces/Framework.Rules.md) registered to [Bud.build](classes/Bud.md#build)
- [loaders](classes/Build.md#loaders) — The default [Framework.Loaders](interfaces/Framework.Loaders.md) registered to [Bud.build](classes/Bud.md#build)
- [services](classes/Bud.md#services) — The default [Framework.Services](interfaces/Framework.Services.md) registered to [Bud.services](classes/Bud.md#services)

Exported classes:
- [Container](classes/Container.md) — Container class
- [Item](classes/Item.md) — Webpack RuleSetItem wrapper
- [Loader](classes/Loader.md)) — Webpack Loader wrapper
- [Rule](classes/Rule.md) — Webpack RuleSetRule wrapper

Exported services:
- [Api](classes/Api.md) — Api service (instantiated at [Bud.api](classes/Bud.md#api))
- [Build](classes/Build.md) — Build service (instantiated at [Bud.build](classes/Bud.md#build))
- [Cache](classes/Cache.md) — Cache service (instantiated at [Bud.cache](classes/Bud.md#cache))
- [Compiler](classes/Compiler.md) — Compiler service (instantiated at [Bud.compiler](classes/Bud.md#compiler))
- [Dashboard](classes/Dashboard.md) — Dashboard service (instantiated at [Bud.dashboard](classes/Bud.md#dashboard))
- [Dependencies](classes/Dependencies.md) — Dependencies service (instantiated at [Bud.dependencies](classes/Bud.md#dependencies))
- [Discovery](classes/Discovery.md) — Discovery service (instantiated at [Bud.discovery](classes/Bud.md#discovery))
- [Env](classes/Env.md) — Env service (instantiated at [Bud.env](classes/Bud.md#env))
- [Extensions](interfaces/Framework.Extensions.md) — Extensions service (instantiated at [Bud.extensions](classes/Bud.md#extensions))
- [Hooks](classes/Hooks.md) — Hooks service (instantiated at [Bud.hooks](classes/Bud.md#hooks))
- [Logger](classes/Logger.md) — Logger service (instantiated at [Bud.logger](classes/Bud.md#logger))
- [Server](classes/Server.md) — Server service (instantiated at [Bud.server](classes/Bud.md#server))
- [Store](classes/Store.md) — Store service (instantiated at [Bud.store](classes/Bud.md#store))

Exported interfaces and virtual classes:
- [Configuration](interfaces/Configuration.md) — Configuration interface
- [Framework](classes/Framework.md) — Framework interface
- [Module](interfaces/Module.md) — Module interface
- [Service](classes/Service.md) — Service interface

**`example`**
Example configuration file (`bud.config.js`). This file is run by invoking `bud build` in the terminal.

```js
module.exports = app =>
  app
  .template({
    favicon: app.path('src', 'favicon.ico'),
    minify: false,
  })
  .entry('app', 'index.js')
```

**`example`**
Instantiate `bud` from node using the `factory` function:

```js
import {factory} from '@roots/bud'

const bud = factory()

bud.run() // run build
```

**`example`**
Instantiate `Bud` from node directly. You must provide the `services` and `config` properties yourself.

```js
const instance = new Bud({
  name: 'bud',
  mode: 'production',
  services: {
    ...services,
  },
  config: {
    ...config,
  },
})

instance.bootstrap() // bootstrap Framework

instance.run() // run build
```

## Namespaces

- [Configuration](namespaces/Configuration.md)
- [Factory](namespaces/Factory.md)
- [Framework](namespaces/Framework.md)
- [Module](namespaces/Module.md)
- [Store](namespaces/Store.md)
- [items](namespaces/items.md)
- [loaders](namespaces/loaders.md)
- [rules](namespaces/rules.md)

## Classes

- [Api](classes/Api.md)
- [Bud](classes/Bud.md)
- [Build](classes/Build.md)
- [Cache](classes/Cache.md)
- [Compiler](classes/Compiler.md)
- [Container](classes/Container.md)
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
- [Factory](interfaces/Factory.md)
- [Module](interfaces/Module.md)
- [Plugin](interfaces/Plugin.md)

## Variables

### config

• `Const` **config**: [`Configuration`](interfaces/Configuration.md)

#### Defined in

[packages/@roots/bud/src/config.ts:9](https://github.com/roots/bud/blob/96454777/packages/@roots/bud/src/config.ts#L9)

___

### extensions

• `Const` **extensions**: [`Extensions`](interfaces/Framework.Extensions.md)

#### Defined in

[packages/@roots/bud/src/extensions/index.ts:18](https://github.com/roots/bud/blob/96454777/packages/@roots/bud/src/extensions/index.ts#L18)

___

### services

• `Const` **services**: [`Services`](interfaces/Framework.Services.md)

Registered services

#### Defined in

[packages/@roots/bud/src/services/index.ts:19](https://github.com/roots/bud/blob/96454777/packages/@roots/bud/src/services/index.ts#L19)

## Functions

### factory

▸ `Const` **factory**(`overrides?`): [`Framework`](classes/Framework.md)

Instantiate a new Bud instance

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides?` | [`Options`](interfaces/Factory.Options.md) |

#### Returns

[`Framework`](classes/Framework.md)

#### Defined in

[packages/@roots/bud/src/Factory/factory.ts:9](https://github.com/roots/bud/blob/96454777/packages/@roots/bud/src/Factory/factory.ts#L9)

___

### run

▸ **run**(`argv?`, `options?`): `PromiseLike`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `argv?` | `string`[] |
| `options?` | `Config.LoadOptions` |

#### Returns

`PromiseLike`<`any`\>

#### Defined in

node_modules/@oclif/command/lib/main.d.ts:10
