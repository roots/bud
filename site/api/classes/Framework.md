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

[packages/@roots/bud-framework/src/Framework/index.ts:348](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L348)

## Properties

### access

• **access**: [`Access`](../index.md#access)<`any`\>

If a value is a function **access** will call that
function and return the result.

If the value is not a function **access** will return its value.

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:141](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L141)

___

### api

• **api**: [`Api`](../interfaces/Api.md)

Service providing config facades

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:65](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L65)

___

### build

• **build**: [`Build`](../interfaces/Build.md)

Service handling config compilation

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:70](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L70)

___

### cache

• **cache**: [`Cache`](../interfaces/Cache.md)

Service handling compiler cache

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:75](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L75)

___

### children

• **children**: `Container`<[`Instances`](../interfaces/Framework.Instances.md)\>

Child compiler instance container

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:60](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L60)

___

### compiler

• **compiler**: [`Compiler`](../interfaces/Compiler.md)

Service handling build compilation

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:80](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L80)

___

### dashboard

• **dashboard**: [`Dashboard`](../interfaces/Dashboard.md)

Service handling build reporter rendering

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:85](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L85)

___

### dependencies

• **dependencies**: [`Dependencies`](../interfaces/Dependencies.md)

Service handling peer package management

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:90](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L90)

___

### discovery

• **discovery**: [`Discovery`](Discovery.md)

Service providing information on project and peers

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:95](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L95)

___

### env

• **env**: [`Env`](../interfaces/Env.md)

Service providing env data

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:100](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L100)

___

### extensions

• **extensions**: [`Extensions`](../interfaces/Extensions.md)

Service handling registration of [Module](../interfaces/Module.md) and {@link Plugin}
into [Extension](Extension.md) objects.

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:106](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L106)

___

### hooks

• **hooks**: [`Hooks`](../interfaces/Hooks.md)

Service handling eventing

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:111](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L111)

___

### implementation

• `Abstract` **implementation**: [`Constructor`](../modules/Framework.md#constructor)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:296](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L296)

___

### logger

• **logger**: [`Logger`](../interfaces/Logger.md)

[Bootstrapper](Bootstrapper.md) provides logger methods

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:116](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L116)

___

### make

• **make**: [`Make`](../index.md#make)

Make a child compiler.

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:146](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L146)

___

### mode

• **mode**: [`Mode`](../modules/Framework.md#mode)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:304](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L304)

___

### name

• **name**: `string`

Application name

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:49](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L49)

___

### options

• **options**: [`Options`](../interfaces/Framework.Options.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:332](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L332)

___

### parent

• **parent**: [`Framework`](Framework.md)

If a child instance, returns the parent ([Framework](Framework.md)).
If the parent instance, returns null.

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:55](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L55)

___

### server

• **server**: [`Server`](../interfaces/Server.md)

Server

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:121](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L121)

___

### store

• **store**: [`Store`](Store.md)

[Bootstrapper](Bootstrapper.md) provides general utility container.

Contains [Configuration](../interfaces/Configuration.md) but is available for use as scratch space.

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:128](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L128)

___

### when

• **when**: [`When`](../index.md#when)

Executes a function if a given test is `true`.

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:151](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L151)

## Accessors

### isDevelopment

• `get` **isDevelopment**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:344](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L344)

___

### isProduction

• `get` **isProduction**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:340](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L340)

## Methods

### bootstrap

▸ **bootstrap**(): [`Framework`](Framework.md)

Instantiates and executes lifecycle events on registered [Service](Service.md) classes.

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:133](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L133)

▸ **bootstrap**(): [`Framework`](Framework.md)

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:373](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L373)

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

[packages/@roots/bud-framework/src/Framework/index.ts:156](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L156)

▸ **container**(`repository?`): `Container`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository?` | `any` |

#### Returns

`Container`<`any`\>

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:454](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L454)

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

[packages/@roots/bud-framework/src/Framework/index.ts:212](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L212)

▸ **debug**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:532](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L532)

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

[packages/@roots/bud-framework/src/Framework/index.ts:217](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L217)

▸ **error**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:539](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L539)

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

[packages/@roots/bud-framework/src/Framework/index.ts:441](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L441)

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

[packages/@roots/bud-framework/src/Framework/index.ts:207](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L207)

▸ **info**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:511](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L511)

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

[packages/@roots/bud-framework/src/Framework/index.ts:192](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L192)

▸ **log**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:504](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L504)

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

[packages/@roots/bud-framework/src/Framework/index.ts:161](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L161)

▸ **path**(`key`, ...`path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | ``"project"`` \| ``"src"`` \| ``"dist"`` \| ``"publicPath"`` \| ``"storage"`` \| ``"modules"`` |
| `...path` | `string`[] |

#### Returns

`string`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:461](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L461)

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

[packages/@roots/bud-framework/src/Framework/index.ts:169](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L169)

▸ **pipe**(`fns`, `value`): [`Framework`](Framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`input`: [`Framework`](Framework.md)) => [`Framework`](Framework.md)[] |
| `value` | [`Framework`](Framework.md) |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:477](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L477)

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

[packages/@roots/bud-framework/src/Framework/index.ts:177](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L177)

▸ **sequence**(`fns`): [`Framework`](Framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`app`: [`Framework`](Framework.md)) => `any`[] |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:490](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L490)

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

[packages/@roots/bud-framework/src/Framework/index.ts:197](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L197)

▸ **success**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:518](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L518)

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

[packages/@roots/bud-framework/src/Framework/index.ts:182](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L182)

▸ **tap**(`fn`, `bound?`): [`Framework`](Framework.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fn` | [`Tapable`](../modules/Framework.md#tapable)<`any`\> | `undefined` |
| `bound` | `boolean` | `true` |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:497](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L497)

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

[packages/@roots/bud-framework/src/Framework/index.ts:202](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L202)

▸ **warn**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:525](https://github.com/roots/bud/blob/f85a5e1be/packages/@roots/bud-framework/src/Framework/index.ts#L525)
