---
id: "store"
title: "Class: Store"
sidebar_label: "Store"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Service`](service.md)

  ↳ **`Store`**

## Constructors

### constructor

• **new Store**(`app`)

Class constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Inherited from

[Service](service.md).[constructor](service.md#constructor)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:44](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L44)

## Properties

### ident

• **ident**: ``"@roots/container"``

Identify

#### Inherited from

[Service](service.md).[ident](service.md#ident)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:15

___

### name

• **name**: `string` = `'service/store'`

#### Overrides

[Service](service.md).[name](service.md#name)

#### Defined in

[packages/@roots/bud-framework/src/Store/index.ts:5](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Store/index.ts#L5)

___

### repository

• **repository**: `any`

The container store

#### Inherited from

[Service](service.md).[repository](service.md#repository)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:19

## Accessors

### access

• `get` **access**(): <I\>(`value`: `I` \| (`app`: [`Framework`](framework.md)) => `I`) => `I`<I\>(`value`: `I` \| (`app`: [`Framework`](framework.md)) => `I`) => `I`

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
| `value` | `I` \| (`app`: [`Framework`](framework.md)) => `I` |

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
| `value` | `I` \| (`app`: [`Framework`](framework.md)) => `I` |

##### Returns

`I`

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:51](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L51)

___

### app

• `get` **app**(): [`Framework`](framework.md)

#### Returns

[`Framework`](framework.md)

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

[Service](service.md).[all](service.md#all)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:35

___

### boot

▸ `Optional` **boot**(`app`): `any`

Boot

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`any`

#### Inherited from

[Service](service.md).[boot](service.md#boot)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:29](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L29)

___

### booted

▸ `Optional` **booted**(`app`): `any`

Post boot callback

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`any`

#### Inherited from

[Service](service.md).[booted](service.md#booted)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:34](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L34)

___

### bootstrap

▸ `Optional` **bootstrap**(`app`): `any`

Bootstrap

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`any`

#### Inherited from

[Service](service.md).[bootstrap](service.md#bootstrap)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:9](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L9)

___

### bootstrapped

▸ `Optional` **bootstrapped**(`app`): `any`

Bootstrapped

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`any`

#### Inherited from

[Service](service.md).[bootstrapped](service.md#bootstrapped)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:14](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L14)

___

### each

▸ **each**(`key`, `callFn`): [`Store`](store.md)

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

[`Store`](store.md)

#### Inherited from

[Service](service.md).[each](service.md#each)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:153

___

### every

▸ **every**(`fn`): [`Store`](store.md)

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

[`Store`](store.md)

#### Inherited from

[Service](service.md).[every](service.md#every)

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

[Service](service.md).[filterUnique](service.md#filterunique)

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

[Service](service.md).[findKey](service.md#findkey)

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

[Service](service.md).[findKeyIn](service.md#findkeyin)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:173

___

### fromEntries

▸ **fromEntries**(`entries`): [`Store`](store.md)

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

[`Store`](store.md)

#### Inherited from

[Service](service.md).[fromEntries](service.md#fromentries)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:141

___

### get

▸ **get**<`T`\>(`path`): `T`

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
| `path` | [`Keys`](../modules/store.md#keys) |

#### Returns

`T`

#### Overrides

[Service](service.md).[get](service.md#get)

#### Defined in

[packages/@roots/bud-framework/src/Store/index.ts:7](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Store/index.ts#L7)

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

[Service](service.md).[getEntries](service.md#getentries)

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

[Service](service.md).[getKeys](service.md#getkeys)

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

[Service](service.md).[getMap](service.md#getmap)

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

[Service](service.md).[getValues](service.md#getvalues)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:192

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

[Service](service.md).[has](service.md#has)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:293

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

[Service](service.md).[is](service.md#is)

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

[Service](service.md).[isArray](service.md#isarray)

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

[Service](service.md).[isDefined](service.md#isdefined)

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

[Service](service.md).[isFalse](service.md#isfalse)

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

[Service](service.md).[isFunction](service.md#isfunction)

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

[Service](service.md).[isIndexed](service.md#isindexed)

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

[Service](service.md).[isNotArray](service.md#isnotarray)

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

[Service](service.md).[isNotNull](service.md#isnotnull)

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

[Service](service.md).[isNotNumber](service.md#isnotnumber)

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

[Service](service.md).[isNotString](service.md#isnotstring)

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

[Service](service.md).[isNull](service.md#isnull)

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

[Service](service.md).[isNumber](service.md#isnumber)

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

[Service](service.md).[isString](service.md#isstring)

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

[Service](service.md).[isTrue](service.md#istrue)

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

[Service](service.md).[isUndefined](service.md#isundefined)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:489

___

### merge

▸ **merge**(`key`, `value`): [`Store`](store.md)

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

[`Store`](store.md)

#### Inherited from

[Service](service.md).[merge](service.md#merge)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:280

___

### mergeStore

▸ **mergeStore**(`values`): [`Store`](store.md)

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

[`Store`](store.md)

#### Inherited from

[Service](service.md).[mergeStore](service.md#mergestore)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:61

___

### mutate

▸ **mutate**(`key`, `mutationFn`): [`Store`](store.md)

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

[`Store`](store.md)

#### Inherited from

[Service](service.md).[mutate](service.md#mutate)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:268

___

### mutateStore

▸ **mutateStore**(`mutationFn`): [`Store`](store.md)

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

[`Store`](store.md)

#### Inherited from

[Service](service.md).[mutateStore](service.md#mutatestore)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:87

___

### register

▸ `Optional` **register**(`app`): `any`

Register

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`any`

#### Inherited from

[Service](service.md).[register](service.md#register)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:19](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L19)

___

### registered

▸ `Optional` **registered**(`app`): `any`

Post registered callback

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Returns

`any`

#### Inherited from

[Service](service.md).[registered](service.md#registered)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:24](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L24)

___

### remove

▸ **remove**(`key`): [`Store`](store.md)

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

[`Store`](store.md)

#### Inherited from

[Service](service.md).[remove](service.md#remove)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:306

___

### set

▸ **set**(`key`, `value`): [`Store`](store.md)

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

[`Store`](store.md)

#### Inherited from

[Service](service.md).[set](service.md#set)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:242

___

### setStore

▸ **setStore**(`repository`): [`Store`](store.md)

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

[`Store`](store.md)

#### Inherited from

[Service](service.md).[setStore](service.md#setstore)

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

[Service](service.md).[transform](service.md#transform)

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

[Service](service.md).[transformStore](service.md#transformstore)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:75
