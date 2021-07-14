---
id: "framework"
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
| `options` | `Object` |
| `options.config?` | [`Configuration`](../interfaces/configuration.md) |
| `options.mode?` | ``"production"`` \| ``"development"`` |
| `options.name?` | `string` |
| `options.parent?` | [`Framework`](framework.md) |

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:370](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L370)

## Properties

### \_mode

• **\_mode**: [`Mode`](../index.md#mode)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:310](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L310)

___

### \_services

• **\_services**: [`Container`](container.md)<[`Service`](service.md)\>

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:294](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L294)

___

### api

• **api**: [`Api`](../interfaces/api.md)

## api

Service providing config api methods

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:63](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L63)

___

### build

• **build**: [`Build`](../interfaces/build.md)

## build

Service handling config compilation

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:70](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L70)

___

### cache

• **cache**: [`Cache`](../interfaces/cache.md)

## cache

Service handling compiler cache

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:77](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L77)

___

### children

• **children**: [`Container`](container.md)<[`Framework`](framework.md)\>

## children

Compiler instance container.

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:49](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L49)

___

### compiler

• **compiler**: [`Compiler`](../interfaces/compiler.md)

## compiler

Service handling build compilation

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:84](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L84)

___

### dashboard

• **dashboard**: [`Dashboard`](../interfaces/dashboard.md)

## dashboard

Service providing CLI interface

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:91](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L91)

___

### dependencies

• **dependencies**: [`Dependencies`](../interfaces/dependencies.md)

Dependencies service

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:96](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L96)

___

### discovery

• **discovery**: [`Discovery`](discovery.md)

Discovery service

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:101](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L101)

___

### env

• **env**: [`Env`](../index.md#env)

Envvar service

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:106](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L106)

___

### extensions

• **extensions**: [`Extensions`](../interfaces/extensions.md)

Extensions service

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:111](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L111)

___

### hooks

• **hooks**: [`Hooks`](../interfaces/hooks.md)

Hooks service

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:116](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L116)

___

### implementation

• `Abstract` **implementation**: (`options`: { `config`: [`Configuration`](../interfaces/configuration.md) ; `mode?`: ``"production"`` \| ``"development"`` ; `name?`: `string` ; `parent?`: [`Framework`](framework.md)  }) => [`Framework`](framework.md)

#### Type declaration

• **new Framework**(`options`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.config` | [`Configuration`](../interfaces/configuration.md) |
| `options.mode?` | ``"production"`` \| ``"development"`` |
| `options.name?` | `string` |
| `options.parent?` | [`Framework`](framework.md) |

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:285](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L285)

___

### isChild

• **isChild**: `boolean`

## isChild

Returns true if current compiler is a child compiler

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:56](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L56)

___

### logger

• **logger**: [`Logger`](../interfaces/logger.md)

Logger service

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:121](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L121)

___

### name

• **name**: `string`

## name

Application name

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:33](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L33)

___

### parent

• **parent**: [`Framework`](framework.md)

## parent

If a child instance, returns the parent.

If the parent instance, returns {Framework}

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:42](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L42)

___

### proto

• **proto**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config` | [`Configuration`](../interfaces/configuration.md) |
| `services` | `any` |

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:302](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L302)

___

### server

• **server**: [`Server`](../interfaces/server.md)

Dev server service

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:126](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L126)

___

### store

• **store**: [`Store`](store.md)

Key Value store service

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:131](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L131)

## Accessors

### isDevelopment

• `get` **isDevelopment**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:368](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L368)

___

### isProduction

• `get` **isProduction**(): `boolean`

#### Returns

`boolean`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:364](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L364)

___

### mode

• `get` **mode**(): [`Mode`](../index.md#mode)

#### Returns

[`Mode`](../index.md#mode)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:346](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L346)

• `set` **mode**(`mode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | [`Mode`](../index.md#mode) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:350](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L350)

___

### services

• `get` **services**(): [`Container`](container.md)<[`Service`](service.md)\>

#### Returns

[`Container`](container.md)<[`Service`](service.md)\>

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:338](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L338)

• `set` **services**(`services`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `services` | [`Container`](container.md)<[`Service`](service.md)\> |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:342](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L342)

## Methods

### access

▸ **access**<`I`\>(`value`): `I`

app.access

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
| `value` | `I` \| (`app`: [`Framework`](framework.md)) => `I` |

#### Returns

`I`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:152](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L152)

▸ **access**<`I`\>(`value`): `I`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `I` \| (`app`: [`Framework`](framework.md)) => `I` |

#### Returns

`I`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:519](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L519)

___

### bootstrap

▸ **bootstrap**(`services`): [`Framework`](framework.md)

app.bootstrap

#### Parameters

| Name | Type |
| :------ | :------ |
| `services` | `Object` |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:186](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L186)

▸ **bootstrap**(`services`): [`Framework`](framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `services` | `Object` |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:423](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L423)

___

### container

▸ **container**(`repository?`): [`Container`](container.md)<`any`\>

app.container

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository?` | `any` |

#### Returns

[`Container`](container.md)<`any`\>

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:157](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L157)

▸ **container**(`repository?`): [`Container`](container.md)<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository?` | `any` |

#### Returns

[`Container`](container.md)<`any`\>

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:526](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L526)

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

[packages/@roots/bud-framework/src/Framework/index.ts:258](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L258)

▸ **debug**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:634](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L634)

___

### error

▸ **error**(`message`, ...`optionalArgs`): `void`

log (log level: error)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:263](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L263)

▸ **error**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:644](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L644)

___

### get

▸ **get**(`name?`): [`Framework`](framework.md)

app.get

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:162](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L162)

▸ **get**(`child?`): [`Framework`](framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `child?` | `string` |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:392](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L392)

___

### getMode

▸ **getMode**(): [`Mode`](../index.md#mode)

Get the compiler mode

#### Returns

[`Mode`](../index.md#mode)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:176](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L176)

▸ **getMode**(): [`Mode`](../index.md#mode)

#### Returns

[`Mode`](../index.md#mode)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:355](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L355)

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

[packages/@roots/bud-framework/src/Framework/index.ts:253](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L253)

▸ **info**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:604](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L604)

___

### lifecycle

▸ **lifecycle**(): [`Framework`](framework.md)

app.lifecycle

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:193](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L193)

▸ **lifecycle**(): [`Framework`](framework.md)

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:484](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L484)

___

### log

▸ **log**(`message?`, ...`optionalArgs`): `void`

log a message

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:238](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L238)

▸ **log**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:594](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L594)

___

### make

▸ **make**(`name`, `tap?`): [`Framework`](framework.md)

app.make

**`note`** multi-compiler api is experimental

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `tap?` | (`app`: [`Framework`](framework.md)) => [`Framework`](framework.md) |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:168](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L168)

▸ **make**(`name`, `tap?`): [`Framework`](framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `tap?` | (`app`: [`Framework`](framework.md)) => [`Framework`](framework.md) |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:402](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L402)

___

### path

▸ **path**(`key`, ...`path`): `string`

app.path

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | ``"project"`` \| ``"src"`` \| ``"dist"`` \| ``"publicPath"`` \| ``"storage"`` \| ``"modules"`` |
| `...path` | `string`[] |

#### Returns

`string`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:198](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L198)

▸ **path**(`key`, ...`path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | ``"project"`` \| ``"src"`` \| ``"dist"`` \| ``"publicPath"`` \| ``"storage"`` \| ``"modules"`` |
| `...path` | `string`[] |

#### Returns

`string`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:533](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L533)

___

### pipe

▸ **pipe**(`fns`, `value?`): [`Framework`](framework.md)

app.pipe

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`input`: [`Framework`](framework.md)) => [`Framework`](framework.md)[] |
| `value?` | [`Framework`](framework.md) |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:206](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L206)

▸ **pipe**(`fns`, `value`): [`Framework`](framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`input`: [`Framework`](framework.md)) => [`Framework`](framework.md)[] |
| `value` | [`Framework`](framework.md) |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:549](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L549)

___

### sequence

▸ **sequence**(`fns`): [`Framework`](framework.md)

app.sequence

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`app`: [`Framework`](framework.md)) => `any`[] |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:214](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L214)

▸ **sequence**(`fns`): [`Framework`](framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`app`: [`Framework`](framework.md)) => `any`[] |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:562](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L562)

___

### set

▸ **set**(`name`, `instance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `instance` | [`Framework`](framework.md) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:397](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L397)

___

### setMode

▸ **setMode**(`mode`): `void`

Set the compiler mode

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | [`Mode`](../index.md#mode) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:181](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L181)

▸ **setMode**(`mode`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mode` | [`Mode`](../index.md#mode) |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:360](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L360)

___

### success

▸ **success**(`message?`, ...`optionalArgs`): `void`

log a message

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:243](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L243)

▸ **success**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:614](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L614)

___

### tap

▸ **tap**(`fn`, `bound?`): [`Framework`](framework.md)

app.tap

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`app?`: [`Framework`](framework.md)) => `any` \| (`app?`: [`Framework`](framework.md)) => `any` |
| `bound?` | `boolean` |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:219](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L219)

▸ **tap**(`fn`, `bound?`): [`Framework`](framework.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fn` | (`app`: [`Framework`](framework.md)) => `any` \| (`app?`: [`Framework`](framework.md)) => `any` | `undefined` |
| `bound` | `boolean` | `true` |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:569](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L569)

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

[packages/@roots/bud-framework/src/Framework/index.ts:248](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L248)

▸ **warn**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:624](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L624)

___

### when

▸ **when**(`test`, `trueCase`, `falseCase?`): [`Framework`](framework.md)

app.when

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `boolean` \| (`app`: [`Framework`](framework.md)) => `boolean` |
| `trueCase` | (`app`: [`Framework`](framework.md)) => `any` |
| `falseCase?` | (`app`: [`Framework`](framework.md)) => `any` |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:229](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L229)

▸ **when**(`test`, `trueCase`, `falseCase?`): [`Framework`](framework.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `boolean` \| (`app`: [`Framework`](framework.md)) => `boolean` |
| `trueCase` | (`app`: [`Framework`](framework.md)) => `any` |
| `falseCase?` | (`app`: [`Framework`](framework.md)) => `any` |

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Framework/index.ts:581](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Framework/index.ts#L581)
