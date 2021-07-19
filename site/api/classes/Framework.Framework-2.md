---
id: "Framework.Framework-2"
title: "Class: Framework"
sidebar_label: "Framework"
custom_edit_url: null
---

[Framework](../modules/Framework.md).Framework

## Constructors

### constructor

• **new Framework**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../interfaces/Framework.Framework-1.Options.md) |

#### Defined in

[bud-framework/src/Framework/index.ts:326](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L326)

## Properties

### api

• **api**: `Api`

## api

Service providing config api methods

#### Defined in

[bud-framework/src/Framework/index.ts:56](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L56)

___

### build

• **build**: [`Build`](../interfaces/Build.Build-2.md)

## build

Service handling config compilation

#### Defined in

[bud-framework/src/Framework/index.ts:63](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L63)

___

### cache

• **cache**: `Cache`

## cache

Service handling compiler cache

#### Defined in

[bud-framework/src/Framework/index.ts:70](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L70)

___

### children

• **children**: `Container`<`Object`\>

## children

Compiler instance container.

#### Defined in

[bud-framework/src/Framework/index.ts:49](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L49)

___

### compiler

• **compiler**: [`Compiler`](../interfaces/Compiler.Compiler-2.md)

## compiler

Service handling build compilation

#### Defined in

[bud-framework/src/Framework/index.ts:77](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L77)

___

### dashboard

• **dashboard**: [`Dashboard`](../interfaces/Dashboard.Dashboard-1.md)

## dashboard

Service providing CLI interface

#### Defined in

[bud-framework/src/Framework/index.ts:84](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L84)

___

### dependencies

• **dependencies**: `Dependencies`

Dependencies service

#### Defined in

[bud-framework/src/Framework/index.ts:89](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L89)

___

### discovery

• **discovery**: `Discovery`

Discovery service

#### Defined in

[bud-framework/src/Framework/index.ts:94](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L94)

___

### env

• **env**: [`Env`](../modules/Env.md#env)

Envvar service

#### Defined in

[bud-framework/src/Framework/index.ts:99](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L99)

___

### extensions

• **extensions**: [`Extensions`](../interfaces/Extensions.Extensions-2.md)

Extensions service

#### Defined in

[bud-framework/src/Framework/index.ts:104](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L104)

___

### hooks

• **hooks**: `Hooks`

Hooks service

#### Defined in

[bud-framework/src/Framework/index.ts:109](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L109)

___

### implementation

• `Abstract` **implementation**: (`options`: [`Options`](../interfaces/Framework.Framework-1.Options.md)) => [`Framework`](Framework.Framework-2.md)

#### Type declaration

• **new Framework**(`options`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../interfaces/Framework.Framework-1.Options.md) |

#### Defined in

[bud-framework/src/Framework/index.ts:272](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L272)

___

### logger

• **logger**: `Logger`

Logger service

#### Defined in

[bud-framework/src/Framework/index.ts:114](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L114)

___

### mode

• **mode**: `Mode`

#### Defined in

[bud-framework/src/Framework/index.ts:282](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L282)

___

### name

• **name**: `string`

## name

Application name

#### Defined in

[bud-framework/src/Framework/index.ts:33](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L33)

___

### options

• **options**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config` | [`Configuration`](../interfaces/Configuration.Configuration-1.md) |
| `mode` | `Mode` |
| `name` | `string` |
| `parent?` | [`Framework`](Framework.Framework-2.md) |
| `services` | [`Services`](../interfaces/Framework.Framework-1.Services.md) |

#### Defined in

[bud-framework/src/Framework/index.ts:310](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L310)

___

### parent

• **parent**: [`Framework`](Framework.Framework-2.md)

## parent

If a child instance, returns the parent.

If the parent instance, returns null.

#### Defined in

[bud-framework/src/Framework/index.ts:42](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L42)

___

### server

• **server**: `Server`

Dev server service

#### Defined in

[bud-framework/src/Framework/index.ts:119](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L119)

___

### store

• **store**: `Store`

Key Value store service

#### Defined in

[bud-framework/src/Framework/index.ts:124](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L124)

## Accessors

### isDevelopment

• `get` **isDevelopment**(): `boolean`

#### Returns

`boolean`

#### Defined in

[bud-framework/src/Framework/index.ts:322](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L322)

___

### isProduction

• `get` **isProduction**(): `boolean`

#### Returns

`boolean`

#### Defined in

[bud-framework/src/Framework/index.ts:318](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L318)

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
| `value` | `I` \| (`app`: [`Framework`](Framework.Framework-2.md)) => `I` |

#### Returns

`I`

#### Defined in

[bud-framework/src/Framework/index.ts:150](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L150)

▸ **access**<`I`\>(`value`): `I`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `I` \| (`app`: [`Framework`](Framework.Framework-2.md)) => `I` |

#### Returns

`I`

#### Defined in

[bud-framework/src/Framework/index.ts:461](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L461)

___

### bootstrap

▸ **bootstrap**(): [`Framework`](Framework.Framework-2.md)

bootstrap

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Framework/index.ts:129](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L129)

▸ **bootstrap**(): [`Framework`](Framework.Framework-2.md)

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Framework/index.ts:347](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L347)

___

### container

▸ **container**(`repository?`): `Container`<`any`\>

app.container

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository?` | `any` |

#### Returns

`Container`<`any`\>

#### Defined in

[bud-framework/src/Framework/index.ts:155](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L155)

▸ **container**(`repository?`): `Container`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository?` | `any` |

#### Returns

`Container`<`any`\>

#### Defined in

[bud-framework/src/Framework/index.ts:468](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L468)

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

[bud-framework/src/Framework/index.ts:229](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L229)

▸ **debug**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[bud-framework/src/Framework/index.ts:559](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L559)

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

[bud-framework/src/Framework/index.ts:234](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L234)

▸ **error**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[bud-framework/src/Framework/index.ts:566](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L566)

___

### get

▸ **get**(`name`, `tap?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `tap?` | (`app`: [`Framework`](Framework.Framework-2.md)) => [`Framework`](Framework.Framework-2.md) |

#### Returns

`any`

#### Defined in

[bud-framework/src/Framework/index.ts:448](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L448)

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

[bud-framework/src/Framework/index.ts:224](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L224)

▸ **info**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[bud-framework/src/Framework/index.ts:538](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L538)

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

[bud-framework/src/Framework/index.ts:209](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L209)

▸ **log**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[bud-framework/src/Framework/index.ts:531](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L531)

___

### make

▸ **make**(`name`, `tap?`): [`Framework`](Framework.Framework-2.md)

app.make

**`note`** multi-compiler api is experimental

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `tap?` | (`app`: [`Framework`](Framework.Framework-2.md)) => [`Framework`](Framework.Framework-2.md) |

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Framework/index.ts:161](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L161)

▸ **make**(`name`, `tap?`): [`Framework`](Framework.Framework-2.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `tap?` | (`app`: [`Framework`](Framework.Framework-2.md)) => [`Framework`](Framework.Framework-2.md) |

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Framework/index.ts:415](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L415)

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

[bud-framework/src/Framework/index.ts:169](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L169)

▸ **path**(`key`, ...`path`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | ``"project"`` \| ``"src"`` \| ``"dist"`` \| ``"publicPath"`` \| ``"storage"`` \| ``"modules"`` |
| `...path` | `string`[] |

#### Returns

`string`

#### Defined in

[bud-framework/src/Framework/index.ts:475](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L475)

___

### pipe

▸ **pipe**(`fns`, `value?`): [`Framework`](Framework.Framework-2.md)

app.pipe

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`input`: [`Framework`](Framework.Framework-2.md)) => [`Framework`](Framework.Framework-2.md)[] |
| `value?` | [`Framework`](Framework.Framework-2.md) |

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Framework/index.ts:177](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L177)

▸ **pipe**(`fns`, `value`): [`Framework`](Framework.Framework-2.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`input`: [`Framework`](Framework.Framework-2.md)) => [`Framework`](Framework.Framework-2.md)[] |
| `value` | [`Framework`](Framework.Framework-2.md) |

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Framework/index.ts:491](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L491)

___

### sequence

▸ **sequence**(`fns`): [`Framework`](Framework.Framework-2.md)

app.sequence

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`app`: [`Framework`](Framework.Framework-2.md)) => `any`[] |

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Framework/index.ts:185](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L185)

▸ **sequence**(`fns`): [`Framework`](Framework.Framework-2.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fns` | (`app`: [`Framework`](Framework.Framework-2.md)) => `any`[] |

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Framework/index.ts:504](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L504)

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

[bud-framework/src/Framework/index.ts:214](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L214)

▸ **success**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[bud-framework/src/Framework/index.ts:545](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L545)

___

### tap

▸ **tap**(`fn`, `bound?`): [`Framework`](Framework.Framework-2.md)

app.tap

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`app?`: [`Framework`](Framework.Framework-2.md)) => `any` \| (`app?`: [`Framework`](Framework.Framework-2.md)) => `any` |
| `bound?` | `boolean` |

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Framework/index.ts:190](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L190)

▸ **tap**(`fn`, `bound?`): [`Framework`](Framework.Framework-2.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `fn` | [`Tapable`](../modules/Framework.Framework-1.md#tapable) | `undefined` |
| `bound` | `boolean` | `true` |

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Framework/index.ts:511](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L511)

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

[bud-framework/src/Framework/index.ts:219](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L219)

▸ **warn**(`message?`, ...`optionalArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `any` |
| `...optionalArgs` | `any`[] |

#### Returns

`void`

#### Defined in

[bud-framework/src/Framework/index.ts:552](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L552)

___

### when

▸ **when**(`test`, `trueCase`, `falseCase?`): [`Framework`](Framework.Framework-2.md)

app.when

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `boolean` \| (`app`: [`Framework`](Framework.Framework-2.md)) => `boolean` |
| `trueCase` | (`app`: [`Framework`](Framework.Framework-2.md)) => `any` |
| `falseCase?` | (`app`: [`Framework`](Framework.Framework-2.md)) => `any` |

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Framework/index.ts:200](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L200)

▸ **when**(`test`, `trueCase`, `falseCase?`): [`Framework`](Framework.Framework-2.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `boolean` \| (`app`: [`Framework`](Framework.Framework-2.md)) => `boolean` |
| `trueCase` | (`app`: [`Framework`](Framework.Framework-2.md)) => `any` |
| `falseCase?` | (`app`: [`Framework`](Framework.Framework-2.md)) => `any` |

#### Returns

[`Framework`](Framework.Framework-2.md)

#### Defined in

[bud-framework/src/Framework/index.ts:518](https://github.com/roots/bud/blob/18ced3274/packages/@roots/bud-framework/src/Framework/index.ts#L518)
