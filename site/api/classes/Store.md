---
id: "Store"
title: "Class: Store<T>"
sidebar_label: "Store"
sidebar_position: 0
custom_edit_url: null
---

Options container store

**`sealed`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`Configuration`](../interfaces/Configuration.md) |

## Hierarchy

- [`Service`](Service.md)<`T`\>

  ↳ **`Store`**

## Constructors

### constructor

• **new Store**<`T`\>(`app`)

Class constructor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`Configuration`](../interfaces/Configuration.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Inherited from

[Service](Service.md).[constructor](Service.md#constructor)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:87

## Properties

### name

• **name**: `string`

#### Overrides

Service.name

#### Defined in

packages/@roots/bud-framework/types/Store.d.ts:10

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

Access [Framework](Framework.md) instance

**`readonly`**

#### Returns

[`Framework`](Framework.md)

#### Defined in

packages/@roots/bud-framework/types/Bootstrapper.d.ts:25

## Methods

### bindClass

▸ **bindClass**<`T`\>(`properties`): `void`

Bind a {@link Class} to the [Framework](Framework.md).

**`remarks`**
Constructor parameters can be specified using an array.

**`example`**
Bind to `app.bindingName`:

```js
app.service.bindClass({bindingName: BindingClass})
```

**`example`**
Specify constructor parameters to pass to `BindingClass` during instantiation.

```js
app.service.bindClass({bindingName: [BindingClass, foo, bar]})
```

**`decorator`** `@bind`

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | { [key: string]: `Class` \| [`Class`, `any`[]];  } | Object typing |

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `T` |

#### Returns

`void`

#### Inherited from

[Service](Service.md).[bindClass](Service.md#bindclass)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:127

___

### bindMacro

▸ **bindMacro**<`T`\>(`properties`): `void`

Bind a {@link CallableFunction} to the [Framework](Framework.md)

**`example`**
Bind to `app.boundFnName`

```js
app.service.bindClass({boundFnName: BindingClass})
```

**`decorator`** `@bind`

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | { [key: string]: `CallableFunction`;  } | Object typing |

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `T` |

#### Returns

`void`

#### Inherited from

[Service](Service.md).[bindMacro](Service.md#bindmacro)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:101

___

### boot

▸ `Optional` **boot**(`app`): `any`

Lifecycle method: boot

**`remarks`**
`boot` is called once all services are registered. It should be safe for Services to reference one another.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[boot](Service.md#boot)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:74

___

### booted

▸ `Optional` **booted**(`app`): `any`

Lifecycle method: booted

**`remarks`**
`booted` is called after all [Service.boot](Service.md#boot) callbacks are complete.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[booted](Service.md#booted)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:83

___

### bootstrap

▸ `Optional` **bootstrap**(`app`): `any`

Lifecycle method: bootstrap

**`remarks`**
`bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[bootstrap](Service.md#bootstrap)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:38

___

### bootstrapped

▸ `Optional` **bootstrapped**(`app`): `any`

Lifecycle method: bootstrapped

**`remarks`**
`bootstrapped` is called once all Services have been instantiated.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[bootstrapped](Service.md#bootstrapped)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:47

___

### get

▸ **get**<`T`\>(`path`): `T`

Get a store value

**`override`**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | ``"build"`` & ``"extension"`` & ``"name"`` & ``"clean"`` & ``"minimize"`` & ``"location"`` & ``"debug"`` & ``"log"`` & ``"patterns"`` & ``"ci"`` & ``"discover"`` & ``"hash"`` & ``"html"`` & ``"install"`` & ``"manifest"`` & ``"fileFormat"`` & ``"hashFormat"`` & ``"server"`` & ``"theme"`` & ``"theme.spacing"`` & ``"theme.colors"`` & ``"theme.screens"`` & ``"theme.columns"`` & ``"theme.maxWidth"`` & ``"theme.maxHeight"`` & ``"theme.colors.error"`` & ``"theme.colors.success"`` & ``"theme.colors.foreground"`` & ``"theme.colors.faded"`` & ``"theme.colors.primary"`` & ``"theme.colors.primaryAlt"`` & ``"theme.colors.errorAlt"`` & ``"theme.colors.warning"`` & ``"theme.colors.accent"`` & ``"theme.colors.flavor"`` & ``"server.publicPath"`` & ``"server.watch"`` & ``"server.filename"`` & ``"server.middleware"`` & ``"server.host"`` & ``"server.port"`` & ``"server.proxy"`` & ``"server.browser"`` & ``"server.index"`` & ``"server.headers"`` & ``"server.methods"`` & ``"server.mimeTypes"`` & ``"server.disableHostCheck"`` & ``"build.dependencies"`` & ``"build.loader"`` & ``"build.resolve"`` & ``"build.name"`` & ``"build.mode"`` & ``"build.module"`` & ``"build.optimization"`` & ``"build.parallelism"`` & ``"build.amd"`` & ``"build.bail"`` & ``"build.cache"`` & ``"build.context"`` & ``"build.devtool"`` & ``"build.entry"`` & ``"build.experiments"`` & ``"build.externals"`` & ``"build.externalsPresets"`` & ``"build.externalsType"`` & ``"build.ignoreWarnings"`` & ``"build.infrastructureLogging"`` & ``"build.node"`` & ``"build.output"`` & ``"build.performance"`` & ``"build.plugins"`` & ``"build.profile"`` & ``"build.recordsInputPath"`` & ``"build.recordsOutputPath"`` & ``"build.recordsPath"`` & ``"build.resolveLoader"`` & ``"build.snapshot"`` & ``"build.stats"`` & ``"build.target"`` & ``"build.watch"`` & ``"build.watchOptions"`` & \`server.middleware.${string}\` & `string` & \`server.publicPath.${string}\` & `string` & \`server.watch.${string}\` & `string` & \`server.filename.${string}\` & `string` & \`server.host.${string}\` & `string` & \`server.port.${string}\` & `string` & \`server.proxy.${string}\` & `string` & \`server.browser.${string}\` & `string` & \`server.index.${string}\` & `string` & \`server.headers.${string}\` & `string` & \`server.methods.${string}\` & `string` & \`server.mimeTypes.${string}\` & `string` & \`server.disableHostCheck.${string}\` & `string` & \`env.${string}\` & `string` & \`location.${string}\` & `string` & \`patterns.${string}\` & `string` & \`build.module.generator.${string}\` & `string` & \`build.module.parser.${string}\` & `string` & \`build.module.rules.${string}\` & `string` & \`build.module.noParse.${string}\` & `string` & \`build.module.unsafeCache.${string}\` & `string` & \`build.module.defaultRules.${string}\` & `string` & \`build.module.exprContextCritical.${string}\` & `string` & \`build.module.exprContextRecursive.${string}\` & `string` & \`build.module.exprContextRegExp.${string}\` & `string` & \`build.module.exprContextRequest.${string}\` & `string` & \`build.module.strictExportPresence.${string}\` & `string` & \`build.module.strictThisContextOnImports.${string}\` & `string` & \`build.module.unknownContextCritical.${string}\` & `string` & \`build.module.unknownContextRecursive.${string}\` & `string` & \`build.module.unknownContextRegExp.${string}\` & `string` & \`build.module.unknownContextRequest.${string}\` & `string` & \`build.module.wrappedContextCritical.${string}\` & `string` & \`build.module.wrappedContextRecursive.${string}\` & `string` & \`build.module.wrappedContextRegExp.${string}\` & `string` & \`extension.${string}\` & `string` & \`build.dependencies.${string}\` & `string` & \`build.loader.${string}\` & `string` & \`build.resolve.${string}\` & `string` & \`build.name.${string}\` & `string` & \`build.mode.${string}\` & `string` & \`build.module.${string}\` & `string` & \`build.optimization.${string}\` & `string` & \`build.parallelism.${string}\` & `string` & \`build.amd.${string}\` & `string` & \`build.bail.${string}\` & `string` & \`build.cache.${string}\` & `string` & \`build.context.${string}\` & `string` & \`build.devtool.${string}\` & `string` & \`build.entry.${string}\` & `string` & \`build.experiments.${string}\` & `string` & \`build.externals.${string}\` & `string` & \`build.externalsPresets.${string}\` & `string` & \`build.externalsType.${string}\` & `string` & \`build.ignoreWarnings.${string}\` & `string` & \`build.infrastructureLogging.${string}\` & `string` & \`build.node.${string}\` & `string` & \`build.output.${string}\` & `string` & \`build.performance.${string}\` & `string` & \`build.plugins.${string}\` & `string` & \`build.profile.${string}\` & `string` & \`build.recordsInputPath.${string}\` & `string` & \`build.recordsOutputPath.${string}\` & `string` & \`build.recordsPath.${string}\` & `string` & \`build.resolveLoader.${string}\` & `string` & \`build.snapshot.${string}\` & `string` & \`build.stats.${string}\` & `string` & \`build.target.${string}\` & `string` & \`build.watch.${string}\` & `string` & \`build.watchOptions.${string}\` & `string` |

#### Returns

`T`

#### Overrides

Service.get

#### Defined in

packages/@roots/bud-framework/types/Store.d.ts:16

___

### register

▸ `Optional` **register**(`app`): `any`

Lifecycle method: register

**`remarks`**
`register` is intended for Services to register functionalities, modules, and bind functions and classes.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[register](Service.md#register)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:56

___

### registered

▸ `Optional` **registered**(`app`): `any`

Lifecycle method: registered

**`remarks`**
`registered` is called after all [Service.register](Service.md#register) callbacks are complete.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Inherited from

[Service](Service.md).[registered](Service.md#registered)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:65
