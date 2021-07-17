---
id: "build.rule"
title: "Class: Rule"
sidebar_label: "Build.Rule"
custom_edit_url: null
---

[Build](../modules/build.md).Rule

## Implements

- `Rule`

## Constructors

### constructor

• **new Rule**(`__namedParameters`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Options` |

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:8

## Properties

### exclude

• **exclude**: `ExcludeFn`

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:5

___

### generator

• **generator**: `any`

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:8

___

### parser

• **parser**: `ParserFn`

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:7

___

### test

• **test**: `TestFn`

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:3

___

### type

• **type**: `TypeFn`

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:6

___

### use

• **use**: `UseFn`

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:4

## Methods

### getExclude

▸ **getExclude**(`app`): `RegExp`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`RegExp`

#### Implementation of

Build.Rule.getExclude

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:16

___

### getGenerator

▸ **getGenerator**(`app`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`any`

#### Implementation of

Build.Rule.getGenerator

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:20

___

### getParser

▸ **getParser**(`app`): `Parser`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`Parser`

#### Implementation of

Build.Rule.getParser

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:12

___

### getTest

▸ **getTest**(`app`): `RegExp`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`RegExp`

#### Implementation of

Build.Rule.getTest

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:10

___

### getType

▸ **getType**(`app`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`string`

#### Implementation of

Build.Rule.getType

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:18

___

### getUse

▸ **getUse**(`app`): `Item`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`Item`[]

#### Implementation of

Build.Rule.getUse

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:14

___

### make

▸ **make**(`app`): `Output`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`Output`

#### Implementation of

Build.Rule.make

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:22

___

### setExclude

▸ **setExclude**(`exclude`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `exclude` | `RegExp` \| (`app`: [`Framework`](framework.md)) => `RegExp` |

#### Returns

`void`

#### Implementation of

Build.Rule.setExclude

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:17

___

### setGenerator

▸ **setGenerator**(`generator`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `generator` | `any` |

#### Returns

`void`

#### Implementation of

Build.Rule.setGenerator

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:21

___

### setParser

▸ **setParser**(`parser`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parser` | `ParserFn` |

#### Returns

`void`

#### Implementation of

Build.Rule.setParser

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:13

___

### setTest

▸ **setTest**(`test`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `test` | `RegExp` \| (`app`: [`Framework`](framework.md)) => `RegExp` |

#### Returns

`void`

#### Implementation of

Build.Rule.setTest

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:11

___

### setType

▸ **setType**(`type`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `any` |

#### Returns

`void`

#### Implementation of

Build.Rule.setType

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:19

___

### setUse

▸ **setUse**(`use`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `use` | `UseFn` \| `Item`[] |

#### Returns

`void`

#### Implementation of

Build.Rule.setUse

#### Defined in

packages/@roots/bud-build/types/Rule/index.d.ts:15
