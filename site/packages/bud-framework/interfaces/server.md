---
id: "server"
title: "Interface: Server"
sidebar_label: "Server"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Service`](../classes/service.md)

  ↳ **`Server`**

## Properties

### assets

• **assets**: `string`[]

Assets

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:18](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Server/index.ts#L18)

___

### config

• **config**: [`Config`](../modules/server.md#config)

Server configuration

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:28](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Server/index.ts#L28)

___

### ident

• **ident**: ``"@roots/container"``

Identify

#### Inherited from

[Service](../classes/service.md).[ident](../classes/service.md#ident)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:15

___

### instance

• **instance**: `Application`

Server instance

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:23](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Server/index.ts#L23)

___

### isWatchable

• **isWatchable**: `boolean`

Has files to watch and watch is enabled

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:33](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Server/index.ts#L33)

___

### middleware

• **middleware**: [`Inventory`](server.middleware.inventory.md)

Registered server middlewares

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:13](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Server/index.ts#L13)

___

### name

• **name**: `string`

#### Inherited from

[Service](../classes/service.md).[name](../classes/service.md#name)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:38](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L38)

___

### repository

• **repository**: `any`

The container store

#### Inherited from

[Service](../classes/service.md).[repository](../classes/service.md#repository)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:19

___

### watcher

• **watcher**: `Object`

Watcher instance

#### Index signature

▪ [key: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `close` | `CallableFunction` |
| `on` | `CallableFunction` |

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:38](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Server/index.ts#L38)

## Accessors

### access

• `get` **access**(): <I\>(`value`: `I` \| (`app`: [`Framework`](../classes/framework.md)) => `I`) => `I`<I\>(`value`: `I` \| (`app`: [`Framework`](../classes/framework.md)) => `I`) => `I`

#### Returns

`fn`

▸ <`I`\>(`value`): `I`

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

##### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `I` \| (`app`: [`Framework`](../classes/framework.md)) => `I` |

##### Returns

`I`

▸ <`I`\>(`value`): `I`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `I` \| (`app`: [`Framework`](../classes/framework.md)) => `I` |

##### Returns

`I`

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:51](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L51)

___

### app

• `get` **app**(): [`Framework`](../classes/framework.md)

#### Returns

[`Framework`](../classes/framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:42](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L42)

## Methods

### all

▸ **all**(): `any`

## container.all

Does the same thing as container.all

### Usage

```js
container.all()
```

#### Returns

`any`

#### Inherited from

[Service](../classes/service.md).[all](../classes/service.md#all)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:35

___

### boot

▸ `Optional` **boot**(`app`): `any`

Boot

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/service.md).[boot](../classes/service.md#boot)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:29](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L29)

___

### booted

▸ `Optional` **booted**(`app`): `any`

Post boot callback

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/service.md).[booted](../classes/service.md#booted)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:34](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L34)

___

### bootstrap

▸ `Optional` **bootstrap**(`app`): `any`

Bootstrap

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/service.md).[bootstrap](../classes/service.md#bootstrap)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:9](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L9)

___

### bootstrapped

▸ `Optional` **bootstrapped**(`app`): `any`

Bootstrapped

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/service.md).[bootstrapped](../classes/service.md#bootstrapped)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:14](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L14)

___

### each

▸ **each**(`key`, `callFn`): [`Server`](server.md)

## container.withEntries

Use each value as parameters in a supplied callback

### Usage

```js
container.withEntries('key', (key, value) => doSomething)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |
| `callFn` | (`key`: `any`, `value`: `any`) => `void` |

#### Returns

[`Server`](server.md)

#### Inherited from

[Service](../classes/service.md).[each](../classes/service.md#each)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:153

___

### every

▸ **every**(`fn`): [`Server`](server.md)

## container.every

Use each value as parameters in a supplied callback

### Usage

```js
container.withEntries('key', (key, value) => doSomething)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`key`: `string` \| `number`, `value`: `any`) => `any` |

#### Returns

[`Server`](server.md)

#### Inherited from

[Service](../classes/service.md).[every](../classes/service.md#every)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:165

___

### filterUnique

▸ **filterUnique**(`value`, `index`, `self`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `index` | `any` |
| `self` | `any` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[filterUnique](../classes/service.md#filterunique)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:56](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L56)

___

### findKey

▸ **findKey**(...`searchItem`): `any`

Find

#### Parameters

| Name | Type |
| :------ | :------ |
| `...searchItem` | `any` |

#### Returns

`any`

#### Inherited from

[Service](../classes/service.md).[findKey](../classes/service.md#findkey)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:169

___

### findKeyIn

▸ **findKeyIn**(`key`, ...`searchItem`): `any`

Find in container item

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |
| `...searchItem` | `any`[] |

#### Returns

`any`

#### Inherited from

[Service](../classes/service.md).[findKeyIn](../classes/service.md#findkeyin)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:173

___

### fromEntries

▸ **fromEntries**(`entries`): [`Server`](server.md)

## container.fromEntries

Set container value from [K, V] tuples.

If no key is passed the container store will be used.

### Usage

```js
container.getEntries()
```

```js
container.getEntries('key')
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `entries` | [`string`, `any`][] |

#### Returns

[`Server`](server.md)

#### Inherited from

[Service](../classes/service.md).[fromEntries](../classes/service.md#fromentries)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:141

___

### get

▸ **get**<`T`\>(`key`): `T`

## container.get

Get a value from the container.

If no key is passed the container store will be returned.

### Usage

```js
container.get('container.container-item')
```

```js
container.get(['container', 'container-item'])
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`T`

#### Inherited from

[Service](../classes/service.md).[get](../classes/service.md#get)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:105

___

### getEntries

▸ **getEntries**<`T`\>(`key?`): [`string`, `ValueOf`<`T`, keyof `T`\>][]

## container.getEntries

Get container value as [K, V] tuples.

If no key is passed the container store will be used.

### Usage

```js
container.getEntries()
```

```js
container.getEntries('key')
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` \| `number` |

#### Returns

[`string`, `ValueOf`<`T`, keyof `T`\>][]

#### Inherited from

[Service](../classes/service.md).[getEntries](../classes/service.md#getentries)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:123

___

### getKeys

▸ **getKeys**(`key?`): `string`[]

## container.getKeys

Get an item's keys.

If no key is passed the container store will be used.

### Usage

```js
container.getKeys('item')
// => returns keys of container.repository[item]
```

```js
container.getKeys()
// => returns keys of container.repository
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` |

#### Returns

`string`[]

#### Inherited from

[Service](../classes/service.md).[getKeys](../classes/service.md#getkeys)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:212

___

### getMap

▸ **getMap**(`key?`): `Map`<`string`, `any`\>

## container.getMap

Get an item as a Map datatype.

If no key is passed the container store will be used.

### Usage

```js
container.getMap('item')
```

```js
container.getMap()
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` |

#### Returns

`Map`<`string`, `any`\>

#### Inherited from

[Service](../classes/service.md).[getMap](../classes/service.md#getmap)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:230

___

### getValues

▸ **getValues**(`key?`): `any`[]

## container.getValues

Get an item value.

If no key is passed the container store will be used.

### Usage

```js
container.getValues('container.container-item')
```

```js
container.getValues()
// => returns values from entire store
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` |

#### Returns

`any`[]

#### Inherited from

[Service](../classes/service.md).[getValues](../classes/service.md#getvalues)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:192

___

### getWatchedFilesArray

▸ **getWatchedFilesArray**(): `string`[]

Retrieve an array of watched files.

#### Returns

`string`[]

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:47](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Server/index.ts#L47)

___

### has

▸ **has**(`key`): `boolean`

## container.has

Return a boolean indicating if a given key exists.

### Usage

```js
container.has('my-key')
// true if container.repository['my-key'] exists
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[has](../classes/service.md#has)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:293

___

### inject

▸ **inject**(): `void`

Inject client scripts innto compilation (HMR, dev experience)

#### Returns

`void`

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:57](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Server/index.ts#L57)

___

### is

▸ **is**(`key`, `value`): `boolean`

## container.is

Return a boolean indicating if the given key matches the given value.

### Usage

```js
container.is('my-key', {whatever: 'value'})
// True if container.repository['my-key'] === {whatever: 'value'}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |
| `value` | `any` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[is](../classes/service.md#is)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:319

___

### isArray

▸ **isArray**(`key`): `boolean`

## container.isArray

Return true if object is an array.

### Usage

```js
container.isArray('my-key')
// True if container.repository['my-key'] is an array
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isArray](../classes/service.md#isarray)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:372

___

### isDefined

▸ **isDefined**(`key`): `boolean`

## container.isDefined

Return true if object is defined.

### Usage

```js
container.isDefined('my-key')
// True if container has a 'my-key' entry with a definite value.
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isDefined](../classes/service.md#isdefined)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:476

___

### isFalse

▸ **isFalse**(`key`): `boolean`

## container.isFalse

Return a boolean indicating if the given key's value is false

### Usage

```js
container.isFalse('my-key')
// True if container.repository['my-key'] === false
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isFalse](../classes/service.md#isfalse)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:345

___

### isFunction

▸ **isFunction**(`key`): `boolean`

## container.isFunction

Return true if object is a function

### Usage

```js
container.isFunction('my-key')
// True if object associated with 'my-key' is a fn.
````

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isFunction](../classes/service.md#isfunction)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:502

___

### isIndexed

▸ **isIndexed**(`key?`): `boolean`

## container.isIndexed

Return true if object is likely a vanilla object with
string keys.

### Usage

```js
container.isIndexed('my-key')
// True if container.repository['my-key'] appears to be an object.
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isIndexed](../classes/service.md#isindexed)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:359

___

### isNotArray

▸ **isNotArray**(`key`): `boolean`

## container.isNotArray

Return true if object is not an array.

### Usage

```js
container.isNotArray('my-key')
// True if container.repository['my-key'] is not an array
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isNotArray](../classes/service.md#isnotarray)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:385

___

### isNotNull

▸ **isNotNull**(`key`): `boolean`

## container.isNotNull

Return true if object is not null.

### Usage

```js
container.isNotNull('my-key')
// True if container.repository['my-key'] is not null
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isNotNull](../classes/service.md#isnotnull)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:463

___

### isNotNumber

▸ **isNotNumber**(`key`): `boolean`

## container.isNotNumber

Return true if object is not a number.

### Usage

```js
container.isNumber('my-key')
// True if container.repository['my-key'] is not a number
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isNotNumber](../classes/service.md#isnotnumber)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:437

___

### isNotString

▸ **isNotString**(`key`): `boolean`

## container.isNotString

Return true if object is a string.

### Usage

```js
container.isString('my-key')
// True if container.repository['my-key'] is not a string
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isNotString](../classes/service.md#isnotstring)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:411

___

### isNull

▸ **isNull**(`key`): `boolean`

## container.isNull

Return true if object is null.

### Usage

```js
container.isNull('my-key')
// True if container.repository['my-key'] is null
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isNull](../classes/service.md#isnull)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:450

___

### isNumber

▸ **isNumber**(`key`): `boolean`

## container.isNumber

Return true if object is a number.

### Usage

```js
container.isNumber('my-key')
// True if container.repository['my-key'] is a number
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isNumber](../classes/service.md#isnumber)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:424

___

### isString

▸ **isString**(`key`): `boolean`

## container.isString

Return true if object is a string.

### Usage

```js
container.isString('my-key')
// True if container.repository['my-key'] is a string
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isString](../classes/service.md#isstring)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:398

___

### isTrue

▸ **isTrue**(`key`): `boolean`

## container.isTrue

Return a boolean indicating if the given key's value is true

### Usage

```js
container.isTrue('my-key')
// True if container.repository['my-key'] === true
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isTrue](../classes/service.md#istrue)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:332

___

### isUndefined

▸ **isUndefined**(`key`): `boolean`

## container.isUndefined

Return true if object is defined.

### Usage

```js
container.isDefined('my-key')
// True if container has a 'my-key' entry with a definite value.
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

`boolean`

#### Inherited from

[Service](../classes/service.md).[isUndefined](../classes/service.md#isundefined)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:489

___

### merge

▸ **merge**(`key`, `value`): [`Server`](server.md)

## container.merge

Merge a container item.

If no key is supplied the value will be merged onto the store itself.

```js
container.merge('key', {merge: values})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |
| `value` | `any` |

#### Returns

[`Server`](server.md)

#### Inherited from

[Service](../classes/service.md).[merge](../classes/service.md#merge)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:280

___

### mergeStore

▸ **mergeStore**(`values`): [`Server`](server.md)

## container.mergeStore

Merge values onto the container store.

### Usage

```js
container.mergeStore({test: 'foo'})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Repository` |

#### Returns

[`Server`](server.md)

#### Inherited from

[Service](../classes/service.md).[mergeStore](../classes/service.md#mergestore)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:61

___

### mutate

▸ **mutate**(`key`, `mutationFn`): [`Server`](server.md)

## container.mutate

Mutate a container item.

### Usage

```js
container.mutate('key', currentValue => modifiedValue)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |
| `mutationFn` | (`value?`: `any`) => `any` |

#### Returns

[`Server`](server.md)

#### Inherited from

[Service](../classes/service.md).[mutate](../classes/service.md#mutate)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:268

___

### mutateStore

▸ **mutateStore**(`mutationFn`): [`Server`](server.md)

## container.mutateStore

Mutate the container store.

### Usage

```js
container.mutate('key', currentValue => modifiedValue)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `mutationFn` | (`value?`: `any`) => `any` |

#### Returns

[`Server`](server.md)

#### Inherited from

[Service](../classes/service.md).[mutateStore](../classes/service.md#mutatestore)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:87

___

### register

▸ `Optional` **register**(`app`): `any`

Register

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/service.md).[register](../classes/service.md#register)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:19](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L19)

___

### registered

▸ `Optional` **registered**(`app`): `any`

Post registered callback

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](../classes/framework.md) |

#### Returns

`any`

#### Inherited from

[Service](../classes/service.md).[registered](../classes/service.md#registered)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:24](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L24)

___

### remove

▸ **remove**(`key`): [`Server`](server.md)

## container.delete

Delete an entry from the repository

### Usage

```js
container.remove('my-key')
// Remove container.repository['my-key']
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

[`Server`](server.md)

#### Inherited from

[Service](../classes/service.md).[remove](../classes/service.md#remove)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:306

___

### run

▸ **run**(): [`Server`](server.md)

Run the server instance

#### Returns

[`Server`](server.md)

#### Defined in

[packages/@roots/bud-framework/src/Server/index.ts:52](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Server/index.ts#L52)

___

### set

▸ **set**(`key`, `value`): [`Server`](server.md)

## container.set

Set a value on a container item.

### Usage

```js
container.set('key', value)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |
| `value` | `any` |

#### Returns

[`Server`](server.md)

#### Inherited from

[Service](../classes/service.md).[set](../classes/service.md#set)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:242

___

### setStore

▸ **setStore**(`repository`): [`Server`](server.md)

## container.setStore

Replace the store with an all new set of values

### Usage

```js
container.setStore({
 new: ['store', 'contents'],
})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository` | `Repository` |

#### Returns

[`Server`](server.md)

#### Inherited from

[Service](../classes/service.md).[setStore](../classes/service.md#setstore)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:49

___

### transform

▸ **transform**(`key`, `mutationFn`): `any`

## container.transform

Retrieve a container item, running it through the supplied fn.

Returns the transformed value.

### Usage

```js
container.transform('key', currentValue => modifiedValue)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |
| `mutationFn` | (`value?`: `any`) => `any` |

#### Returns

`any`

#### Inherited from

[Service](../classes/service.md).[transform](../classes/service.md#transform)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:256

___

### transformStore

▸ **transformStore**(`transformFn`): `any`

## container.transformStore

Retrieve the container store, running it through the supplied fn.

Returns the transformed value.

### Usage

```js
container.transform(store=> modifiedStore)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `transformFn` | (`value`: `any`) => `any` |

#### Returns

`any`

#### Inherited from

[Service](../classes/service.md).[transformStore](../classes/service.md#transformstore)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:75
