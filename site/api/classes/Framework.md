---
id: "Framework"
title: "Class: Framework"
sidebar_label: "Framework"
sidebar_position: 0
custom_edit_url: null
---

**`abstract`** Framework

## Constructors

### constructor

• **new Framework**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../interfaces/Framework.Options.md) |

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:345](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L345)

## Properties

### access

• **access**: [`Access`](../index.md#access)<`any`\>

If a value is a function **access** will call that
function and return the result.

If the value is not a function **access** will return its value.

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:138](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L138)

___

### api

• **api**: [`Api`](../interfaces/Api.md)

Service providing config facades

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:62](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L62)

___

### build

• **build**: [`Build`](../interfaces/Build.md)

Service handling config compilation

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:67](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L67)

___

### cache

• **cache**: [`Cache`](../interfaces/Cache.md)

Service handling compiler cache

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:72](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L72)

___

### children

• **children**: `Container`<[`Instances`](../interfaces/Framework.Instances.md)\>

Child compiler instance container

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:57](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L57)

___

### compiler

• **compiler**: [`Compiler`](../interfaces/Compiler.md)

Service handling build compilation

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:77](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L77)

___

### dashboard

• **dashboard**: [`Dashboard`](../interfaces/Dashboard.md)

Service handling build reporter rendering

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:82](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L82)

___

### dependencies

• **dependencies**: [`Dependencies`](../interfaces/Dependencies.md)

Service handling peer package management

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:87](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L87)

___

### discovery

• **discovery**: [`Discovery`](Discovery.md)

Service providing information on project and peers

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:92](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L92)

___

### env

• **env**: [`Env`](../interfaces/Env.md)

Service providing env data

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:97](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L97)

___

### extensions

• **extensions**: [`Extensions`](../interfaces/Extensions.md)

Service handling registration of [Module](../interfaces/Module.md) and {@link Plugin}
into [Extension](Extension.md) objects.

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:103](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L103)

___

### hooks

• **hooks**: [`Hooks`](../interfaces/Hooks.md)

Service handling eventing

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:108](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L108)

___

### implementation

• `Abstract` **implementation**: [`Constructor`](../namespaces/Framework.md#constructor)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:293](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L293)

___

### logger

• **logger**: [`Logger`](../interfaces/Logger.md)

[Bootstrapper](Bootstrapper.md) provides logger methods

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:113](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L113)

___

### make

• **make**: [`Make`](../index.md#make)

Make a child compiler.

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:143](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L143)

___

### mode

• **mode**: [`Mode`](../namespaces/Framework.md#mode)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:301](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L301)

___

### name

• **name**: `string`

Application name

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:46](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L46)

___

### options

• **options**: [`Options`](../interfaces/Framework.Options.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:329](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L329)

___

### parent

• **parent**: [`Framework`](Framework.md)

If a child instance, returns the parent ([Framework](Framework.md)).
If the parent instance, returns null.

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:52](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L52)

___

### server

• **server**: [`Server`](../interfaces/Server.md)

Server

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:118](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L118)

___

### store

• **store**: [`Store`](Store.md)

[Bootstrapper](Bootstrapper.md) provides general utility container.

Contains [Configuration](../interfaces/Configuration.md) but is available for use as scratch space.

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:125](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L125)

___

### when

• **when**: [`When`](../index.md#when)

Executes a function if a given test is `true`.

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:148](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L148)

## Accessors

### isDevelopment

• `get` **isDevelopment**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:341](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L341)

___

### isProduction

• `get` **isProduction**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:337](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L337)

## Methods

### bootstrap

▸ **bootstrap**(): [`Framework`](Framework.md)

Instantiates and executes lifecycle events on registered [Service](Service.md) classes.

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:130](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L130)

▸ **bootstrap**(): [`Framework`](Framework.md)

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:370](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L370)

___

### container

▸ **container**(`repository?`): `Container`<`any`\>

Creates a new container from a given repository.

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository?` | `any` |

#### Returns

`Container`<`any`\>

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:153](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L153)

▸ **container**(`repository?`): `Container`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository?` | `any` |

#### Returns

`Container`<`any`\>

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:451](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L451)

___

### debug

▸ **debug**(`message?`, ...`optionalArgs`): `void`

log (log level: debug)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:209](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L209)

▸ **debug**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:529](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L529)

___

### error

▸ **error**(`message`, ...`optionalArgs`): `void`

error handler

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:214](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L214)

▸ **error**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:536](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L536)

___

### get

▸ **get**(`name`, `tap?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `tap?` | (`app`: [`Framework`](Framework.md)) => [`Framework`](Framework.md) |

#### Returns

`any`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:438](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L438)

___

### info

▸ **info**(`message?`, ...`optionalArgs`): `void`

log (log level: info)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:204](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L204)

▸ **info**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:508](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L508)

___

### log

▸ **log**(`message?`, ...`optionalArgs`): `void`

log

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:189](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L189)

▸ **log**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:501](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L501)

___

### path

▸ **path**(`key`, ...`path`): `string`

path

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | ``"project"`` \| ``"src"`` \| ``"dist"`` \| ``"publicPath"`` \| ``"storage"`` \| ``"modules"`` |
| `...path` | `string`[] |

#### Returns

`string`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:158](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L158)

▸ **path**(`key`, ...`path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | ``"project"`` \| ``"src"`` \| ``"dist"`` \| ``"publicPath"`` \| ``"storage"`` \| ``"modules"`` |
| `...path` | `string`[] |

#### Returns

`string`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:458](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L458)

___

### pipe

▸ **pipe**(`fns`, `value?`): [`Framework`](Framework.md)

pipe

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`input`: [`Framework`](Framework.md)) => [`Framework`](Framework.md)[] |
| `value?` | [`Framework`](Framework.md) |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:166](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L166)

▸ **pipe**(`fns`, `value`): [`Framework`](Framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`input`: [`Framework`](Framework.md)) => [`Framework`](Framework.md)[] |
| `value` | [`Framework`](Framework.md) |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:474](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L474)

___

### sequence

▸ **sequence**(`fns`): [`Framework`](Framework.md)

sequence

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`app`: [`Framework`](Framework.md)) => `any`[] |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:174](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L174)

▸ **sequence**(`fns`): [`Framework`](Framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`app`: [`Framework`](Framework.md)) => `any`[] |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:487](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L487)

___

### success

▸ **success**(`message?`, ...`optionalArgs`): `void`

log (log level: success)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:194](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L194)

▸ **success**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:515](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L515)

___

### tap

▸ **tap**(`fn`, `bound?`): [`Framework`](Framework.md)

tap

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`app?`: [`Framework`](Framework.md)) => `any` \| (`app?`: [`Framework`](Framework.md)) => `any` |
| `bound?` | `boolean` |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:179](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L179)

▸ **tap**(`fn`, `bound?`): [`Framework`](Framework.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fn` | [`Tapable`](../namespaces/Framework.md#tapable)<`any`\> | `undefined` |
| `bound` | `boolean` | `true` |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:494](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L494)

___

### warn

▸ **warn**(`message?`, ...`optionalArgs`): `void`

log (log level: warn)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:199](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L199)

▸ **warn**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:522](https://github.com/roots/bud/blob/add6758eb/packages/@roots/bud-framework/src/Framework/index.ts#L522)
