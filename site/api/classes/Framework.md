---
id: "Framework"
title: "Class: Framework"
sidebar_label: "Framework"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Framework**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../interfaces/Framework.Options.md) |

#### Defined in

[bud-framework/src/Framework/index.ts:334](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L334)

## Properties

### api

• **api**: [`Api`](../interfaces/Api.md)

api

Service providing config api methods

#### Defined in

[bud-framework/src/Framework/index.ts:49](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L49)

___

### build

• **build**: [`Build`](../interfaces/Build.md)

Build

Service handling config compilation

#### Defined in

[bud-framework/src/Framework/index.ts:56](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L56)

___

### cache

• **cache**: [`Cache`](../interfaces/Cache.md)

Cache

Service handling compiler cache

#### Defined in

[bud-framework/src/Framework/index.ts:63](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L63)

___

### children

• **children**: `Container`<`Object`\>

Compiler container {@link Container}.

#### Defined in

[bud-framework/src/Framework/index.ts:42](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L42)

___

### compiler

• **compiler**: [`Compiler`](../interfaces/Compiler.md)

Compiler

Handles build compilation

#### Defined in

[bud-framework/src/Framework/index.ts:70](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L70)

___

### dashboard

• **dashboard**: [`Dashboard`](../interfaces/Dashboard.md)

Dashboard

#### Defined in

[bud-framework/src/Framework/index.ts:75](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L75)

___

### dependencies

• **dependencies**: [`Dependencies`](../interfaces/Dependencies.md)

Dependencies

#### Defined in

[bud-framework/src/Framework/index.ts:80](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L80)

___

### discovery

• **discovery**: [`Discovery`](Discovery.md)

Discovery

#### Defined in

[bud-framework/src/Framework/index.ts:85](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L85)

___

### env

• **env**: [`Env`](../index.md#env)

Env

#### Defined in

[bud-framework/src/Framework/index.ts:90](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L90)

___

### extensions

• **extensions**: [`Extensions`](../interfaces/Extensions.md)

Extensions

#### Defined in

[bud-framework/src/Framework/index.ts:95](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L95)

___

### hooks

• **hooks**: [`Hooks`](../interfaces/Hooks.md)

Hooks

#### Defined in

[bud-framework/src/Framework/index.ts:100](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L100)

___

### implementation

• `Abstract` **implementation**: (`options`: [`Options`](../interfaces/Framework.Options.md)) => [`Framework`](Framework.md)

#### Type declaration

• **new Framework**(`options`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../interfaces/Framework.Options.md) |

#### Defined in

[bud-framework/src/Framework/index.ts:260](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L260)

___

### logger

• **logger**: [`Logger`](../interfaces/Logger.md)

Logger

#### Defined in

[bud-framework/src/Framework/index.ts:105](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L105)

___

### mode

• **mode**: [`Mode`](../index.md#mode)

#### Defined in

[bud-framework/src/Framework/index.ts:270](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L270)

___

### name

• **name**: `string`

Application name

#### Defined in

[bud-framework/src/Framework/index.ts:31](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L31)

___

### options

• **options**: `Object`

Cloned from [Framework.Options](../interfaces/Framework.Options.md) on instantiation.

Stored so [Framework.make](Framework.md#make) can utilize as base for child compilers.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`Configuration`](../interfaces/Configuration.md) | [Configuration](../interfaces/Server.Configuration.md) |
| `mode` | [`Mode`](../index.md#mode) | [Framework.mode](Framework.md#mode) |
| `name` | `string` | [Framework.name](Framework.md#name) |
| `parent?` | [`Framework`](Framework.md) | [Framework](Framework.md) |
| `services` | [`Services`](../interfaces/Framework.Services.md) | [Framework.Services](../interfaces/Framework.Services.md) |

#### Defined in

[bud-framework/src/Framework/index.ts:303](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L303)

___

### parent

• **parent**: [`Framework`](Framework.md)

If a child instance, returns the parent ([Framework](Framework.md)).
If the parent instance, returns null.

#### Defined in

[bud-framework/src/Framework/index.ts:37](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L37)

___

### server

• **server**: [`Server`](../interfaces/Server.md)

Server

#### Defined in

[bud-framework/src/Framework/index.ts:110](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L110)

___

### store

• **store**: [`Store`](Store.md)

Store

#### Defined in

[bud-framework/src/Framework/index.ts:115](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L115)

## Accessors

### isDevelopment

• `get` **isDevelopment**(): `boolean`

#### Returns

`boolean`

#### Defined in

[bud-framework/src/Framework/index.ts:330](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L330)

___

### isProduction

• `get` **isProduction**(): `boolean`

#### Returns

`boolean`

#### Defined in

[bud-framework/src/Framework/index.ts:326](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L326)

## Methods

### access

▸ **access**<`I`\>(`value`): `I`

If a value is a function it will call that
function and return the result.

If the value is not a function it will return its value.

```js
const isAFunction = (option) => `option value: ${option}`
const isAValue = 'option value: true'

access(isAFunction, true)
// => `option value: true`

access(isAValue)
// => `option value: true`
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `I` \| (`app`: [`Framework`](Framework.md)) => `I` |

#### Returns

`I`

#### Defined in

[bud-framework/src/Framework/index.ts:139](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L139)

▸ **access**<`I`\>(`value`): `I`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `I` \| (`app`: [`Framework`](Framework.md)) => `I` |

#### Returns

`I`

#### Defined in

[bud-framework/src/Framework/index.ts:469](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L469)

___

### bootstrap

▸ **bootstrap**(): [`Framework`](Framework.md)

bootstrap

#### Returns

[`Framework`](Framework.md)

#### Defined in

[bud-framework/src/Framework/index.ts:120](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L120)

▸ **bootstrap**(): [`Framework`](Framework.md)

#### Returns

[`Framework`](Framework.md)

#### Defined in

[bud-framework/src/Framework/index.ts:355](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L355)

___

### container

▸ **container**(`repository?`): `Container`<`any`\>

container

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository?` | `any` |

#### Returns

`Container`<`any`\>

#### Defined in

[bud-framework/src/Framework/index.ts:144](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L144)

▸ **container**(`repository?`): `Container`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository?` | `any` |

#### Returns

`Container`<`any`\>

#### Defined in

[bud-framework/src/Framework/index.ts:476](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L476)

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

[bud-framework/src/Framework/index.ts:217](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L217)

▸ **debug**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[bud-framework/src/Framework/index.ts:567](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L567)

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

[bud-framework/src/Framework/index.ts:222](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L222)

▸ **error**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[bud-framework/src/Framework/index.ts:574](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L574)

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

[bud-framework/src/Framework/index.ts:456](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L456)

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

[bud-framework/src/Framework/index.ts:212](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L212)

▸ **info**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[bud-framework/src/Framework/index.ts:546](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L546)

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

[bud-framework/src/Framework/index.ts:197](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L197)

▸ **log**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[bud-framework/src/Framework/index.ts:539](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L539)

___

### make

▸ **make**(`name`, `tap?`): [`Framework`](Framework.md)

make

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `tap?` | (`app`: [`Framework`](Framework.md)) => [`Framework`](Framework.md) |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[bud-framework/src/Framework/index.ts:149](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L149)

▸ **make**(`name`, `tap?`): [`Framework`](Framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `tap?` | (`app`: [`Framework`](Framework.md)) => [`Framework`](Framework.md) |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[bud-framework/src/Framework/index.ts:423](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L423)

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

[bud-framework/src/Framework/index.ts:157](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L157)

▸ **path**(`key`, ...`path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | ``"project"`` \| ``"src"`` \| ``"dist"`` \| ``"publicPath"`` \| ``"storage"`` \| ``"modules"`` |
| `...path` | `string`[] |

#### Returns

`string`

#### Defined in

[bud-framework/src/Framework/index.ts:483](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L483)

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

[bud-framework/src/Framework/index.ts:165](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L165)

▸ **pipe**(`fns`, `value`): [`Framework`](Framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`input`: [`Framework`](Framework.md)) => [`Framework`](Framework.md)[] |
| `value` | [`Framework`](Framework.md) |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[bud-framework/src/Framework/index.ts:499](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L499)

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

[bud-framework/src/Framework/index.ts:173](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L173)

▸ **sequence**(`fns`): [`Framework`](Framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`app`: [`Framework`](Framework.md)) => `any`[] |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[bud-framework/src/Framework/index.ts:512](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L512)

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

[bud-framework/src/Framework/index.ts:202](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L202)

▸ **success**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[bud-framework/src/Framework/index.ts:553](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L553)

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

[bud-framework/src/Framework/index.ts:178](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L178)

▸ **tap**(`fn`, `bound?`): [`Framework`](Framework.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fn` | [`Tapable`](../modules/Framework.md#tapable) | `undefined` |
| `bound` | `boolean` | `true` |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[bud-framework/src/Framework/index.ts:519](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L519)

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

[bud-framework/src/Framework/index.ts:207](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L207)

▸ **warn**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[bud-framework/src/Framework/index.ts:560](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L560)

___

### when

▸ **when**(`test`, `trueCase`, `falseCase?`): [`Framework`](Framework.md)

when

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `boolean` \| (`app`: [`Framework`](Framework.md)) => `boolean` |
| `trueCase` | (`app`: [`Framework`](Framework.md)) => `any` |
| `falseCase?` | (`app`: [`Framework`](Framework.md)) => `any` |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[bud-framework/src/Framework/index.ts:188](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L188)

▸ **when**(`test`, `trueCase`, `falseCase?`): [`Framework`](Framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `boolean` \| (`app`: [`Framework`](Framework.md)) => `boolean` |
| `trueCase` | (`app`: [`Framework`](Framework.md)) => `any` |
| `falseCase?` | (`app`: [`Framework`](Framework.md)) => `any` |

#### Returns

[`Framework`](Framework.md)

#### Defined in

[bud-framework/src/Framework/index.ts:526](https://github.com/roots/bud/blob/5e343994e/packages/@roots/bud-framework/src/Framework/index.ts#L526)
