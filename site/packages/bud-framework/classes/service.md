---
id: "service"
title: "Class: Service"
sidebar_label: "Service"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Bootstrapper`](bootstrapper.md)

  ↳ **`Service`**

  ↳↳ [`Api`](../interfaces/api.md)

  ↳↳ [`Build`](../interfaces/build.md)

  ↳↳ [`Cache`](../interfaces/cache.md)

  ↳↳ [`Compiler`](../interfaces/compiler.md)

  ↳↳ [`Extensions`](../interfaces/extensions.md)

  ↳↳ [`Dashboard`](../interfaces/dashboard.md)

  ↳↳ [`Dependencies`](../interfaces/dependencies.md)

  ↳↳ [`Discovery`](discovery.md)

  ↳↳ [`Hooks`](../interfaces/hooks.md)

  ↳↳ [`Server`](../interfaces/server.md)

  ↳↳ [`Store`](store.md)

## Constructors

### constructor

• **new Service**(`app`)

Class constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Overrides

[Bootstrapper](bootstrapper.md).[constructor](bootstrapper.md#constructor)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:44](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L44)

## Properties

### \_app

• `Private` **\_app**: () => [`Framework`](framework.md)

#### Type declaration

▸ (): [`Framework`](framework.md)

##### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:40](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L40)

___

### ident

• **ident**: ``"@roots/container"``

Identify

#### Inherited from

[Bootstrapper](bootstrapper.md).[ident](bootstrapper.md#ident)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:15

___

### name

• **name**: `string`

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:38](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L38)

___

### repository

• **repository**: `any`

The container store

#### Inherited from

[Bootstrapper](bootstrapper.md).[repository](bootstrapper.md#repository)

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

[Bootstrapper](bootstrapper.md).[all](bootstrapper.md#all)

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

[Bootstrapper](bootstrapper.md).[boot](bootstrapper.md#boot)

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

[Bootstrapper](bootstrapper.md).[booted](bootstrapper.md#booted)

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

[Bootstrapper](bootstrapper.md).[bootstrap](bootstrapper.md#bootstrap)

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

[Bootstrapper](bootstrapper.md).[bootstrapped](bootstrapper.md#bootstrapped)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:14](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L14)

___

### each

▸ **each**(`key`, `callFn`): [`Service`](service.md)

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

[`Service`](service.md)

#### Inherited from

[Bootstrapper](bootstrapper.md).[each](bootstrapper.md#each)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:153

___

### every

▸ **every**(`fn`): [`Service`](service.md)

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

[`Service`](service.md)

#### Inherited from

[Bootstrapper](bootstrapper.md).[every](bootstrapper.md#every)

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

[Bootstrapper](bootstrapper.md).[findKey](bootstrapper.md#findkey)

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

[Bootstrapper](bootstrapper.md).[findKeyIn](bootstrapper.md#findkeyin)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:173

___

### fromEntries

▸ **fromEntries**(`entries`): [`Service`](service.md)

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

[`Service`](service.md)

#### Inherited from

[Bootstrapper](bootstrapper.md).[fromEntries](bootstrapper.md#fromentries)

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

[Bootstrapper](bootstrapper.md).[get](bootstrapper.md#get)

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

[Bootstrapper](bootstrapper.md).[getEntries](bootstrapper.md#getentries)

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

[Bootstrapper](bootstrapper.md).[getKeys](bootstrapper.md#getkeys)

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

[Bootstrapper](bootstrapper.md).[getMap](bootstrapper.md#getmap)

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

[Bootstrapper](bootstrapper.md).[getValues](bootstrapper.md#getvalues)

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

[Bootstrapper](bootstrapper.md).[has](bootstrapper.md#has)

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

[Bootstrapper](bootstrapper.md).[is](bootstrapper.md#is)

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

[Bootstrapper](bootstrapper.md).[isArray](bootstrapper.md#isarray)

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

[Bootstrapper](bootstrapper.md).[isDefined](bootstrapper.md#isdefined)

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

[Bootstrapper](bootstrapper.md).[isFalse](bootstrapper.md#isfalse)

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

[Bootstrapper](bootstrapper.md).[isFunction](bootstrapper.md#isfunction)

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

[Bootstrapper](bootstrapper.md).[isIndexed](bootstrapper.md#isindexed)

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

[Bootstrapper](bootstrapper.md).[isNotArray](bootstrapper.md#isnotarray)

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

[Bootstrapper](bootstrapper.md).[isNotNull](bootstrapper.md#isnotnull)

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

[Bootstrapper](bootstrapper.md).[isNotNumber](bootstrapper.md#isnotnumber)

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

[Bootstrapper](bootstrapper.md).[isNotString](bootstrapper.md#isnotstring)

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

[Bootstrapper](bootstrapper.md).[isNull](bootstrapper.md#isnull)

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

[Bootstrapper](bootstrapper.md).[isNumber](bootstrapper.md#isnumber)

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

[Bootstrapper](bootstrapper.md).[isString](bootstrapper.md#isstring)

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

[Bootstrapper](bootstrapper.md).[isTrue](bootstrapper.md#istrue)

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

[Bootstrapper](bootstrapper.md).[isUndefined](bootstrapper.md#isundefined)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:489

___

### merge

▸ **merge**(`key`, `value`): [`Service`](service.md)

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

[`Service`](service.md)

#### Inherited from

[Bootstrapper](bootstrapper.md).[merge](bootstrapper.md#merge)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:280

___

### mergeStore

▸ **mergeStore**(`values`): [`Service`](service.md)

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

[`Service`](service.md)

#### Inherited from

[Bootstrapper](bootstrapper.md).[mergeStore](bootstrapper.md#mergestore)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:61

___

### mutate

▸ **mutate**(`key`, `mutationFn`): [`Service`](service.md)

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

[`Service`](service.md)

#### Inherited from

[Bootstrapper](bootstrapper.md).[mutate](bootstrapper.md#mutate)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:268

___

### mutateStore

▸ **mutateStore**(`mutationFn`): [`Service`](service.md)

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

[`Service`](service.md)

#### Inherited from

[Bootstrapper](bootstrapper.md).[mutateStore](bootstrapper.md#mutatestore)

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

[Bootstrapper](bootstrapper.md).[register](bootstrapper.md#register)

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

[Bootstrapper](bootstrapper.md).[registered](bootstrapper.md#registered)

#### Defined in

[packages/@roots/bud-framework/src/Service/index.ts:24](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud-framework/src/Service/index.ts#L24)

___

### remove

▸ **remove**(`key`): [`Service`](service.md)

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

[`Service`](service.md)

#### Inherited from

[Bootstrapper](bootstrapper.md).[remove](bootstrapper.md#remove)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:306

___

### set

▸ **set**(`key`, `value`): [`Service`](service.md)

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

[`Service`](service.md)

#### Inherited from

[Bootstrapper](bootstrapper.md).[set](bootstrapper.md#set)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:242

___

### setStore

▸ **setStore**(`repository`): [`Service`](service.md)

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

[`Service`](service.md)

#### Inherited from

[Bootstrapper](bootstrapper.md).[setStore](bootstrapper.md#setstore)

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

[Bootstrapper](bootstrapper.md).[transform](bootstrapper.md#transform)

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

[Bootstrapper](bootstrapper.md).[transformStore](bootstrapper.md#transformstore)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:75
