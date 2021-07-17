---
id: "hooks"
title: "Class: Hooks"
sidebar_label: "Hooks"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Service`

  ↳ **`Hooks`**

## Implements

- `Hooks`

## Constructors

### constructor

• **new Hooks**(`app`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |

#### Inherited from

Service.constructor

#### Defined in

bud-framework/types/Service/index.d.ts:32

## Properties

### ident

• **ident**: ``"@roots/container"``

Identify

#### Implementation of

Hooks.ident

#### Inherited from

Service.ident

#### Defined in

container/types/Container/index.d.ts:15

___

### name

• **name**: `string`

#### Implementation of

Hooks.name

#### Overrides

Service.name

#### Defined in

bud-hooks/types/Hooks/index.d.ts:3

___

### repository

• **repository**: `any`

The container store

#### Implementation of

Hooks.repository

#### Inherited from

Service.repository

#### Defined in

container/types/Container/index.d.ts:19

## Accessors

### access

• `get` **access**(): <I\>(`value`: `I` \| (`app`: `Framework`) => `I`) => `I`

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
| `value` | `I` \| (`app`: `Framework`) => `I` |

##### Returns

`I`

#### Defined in

bud-framework/types/Service/index.d.ts:34

___

### app

• `get` **app**(): `Framework`

#### Returns

`Framework`

#### Defined in

bud-framework/types/Service/index.d.ts:32

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

#### Implementation of

Hooks.all

#### Inherited from

Service.all

#### Defined in

container/types/Container/index.d.ts:35

___

### boot

▸ `Optional` **boot**(`app`): `any`

Boot

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |

#### Returns

`any`

#### Implementation of

Hooks.boot

#### Inherited from

Service.boot

#### Defined in

bud-framework/types/Service/index.d.ts:23

___

### booted

▸ `Optional` **booted**(`app`): `any`

Post boot callback

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |

#### Returns

`any`

#### Implementation of

Hooks.booted

#### Inherited from

Service.booted

#### Defined in

bud-framework/types/Service/index.d.ts:27

___

### bootstrap

▸ `Optional` **bootstrap**(`app`): `any`

Bootstrap

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |

#### Returns

`any`

#### Implementation of

Hooks.bootstrap

#### Inherited from

Service.bootstrap

#### Defined in

bud-framework/types/Service/index.d.ts:7

___

### bootstrapped

▸ `Optional` **bootstrapped**(`app`): `any`

Bootstrapped

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |

#### Returns

`any`

#### Implementation of

Hooks.bootstrapped

#### Inherited from

Service.bootstrapped

#### Defined in

bud-framework/types/Service/index.d.ts:11

___

### each

▸ **each**(`key`, `callFn`): [`Hooks`](hooks.md)

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

[`Hooks`](hooks.md)

#### Implementation of

Hooks.each

#### Inherited from

Service.each

#### Defined in

container/types/Container/index.d.ts:153

___

### every

▸ **every**(`fn`): [`Hooks`](hooks.md)

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

[`Hooks`](hooks.md)

#### Implementation of

Hooks.every

#### Inherited from

Service.every

#### Defined in

container/types/Container/index.d.ts:165

___

### filter

▸ **filter**<`T`\>(`id`, `value?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `value?` | `any` |

#### Returns

`T`

#### Implementation of

Hooks.filter

#### Defined in

bud-hooks/types/Hooks/index.d.ts:7

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

#### Implementation of

Hooks.filterUnique

#### Inherited from

Service.filterUnique

#### Defined in

bud-framework/types/Service/index.d.ts:35

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

#### Implementation of

Hooks.findKey

#### Inherited from

Service.findKey

#### Defined in

container/types/Container/index.d.ts:169

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

#### Implementation of

Hooks.findKeyIn

#### Inherited from

Service.findKeyIn

#### Defined in

container/types/Container/index.d.ts:173

___

### fromEntries

▸ **fromEntries**(`entries`): [`Hooks`](hooks.md)

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

[`Hooks`](hooks.md)

#### Implementation of

Hooks.fromEntries

#### Inherited from

Service.fromEntries

#### Defined in

container/types/Container/index.d.ts:141

___

### get

▸ **get**<`T`\>(`path`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`T`

#### Implementation of

Hooks.get

#### Overrides

Service.get

#### Defined in

bud-hooks/types/Hooks/index.d.ts:4

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

#### Implementation of

Hooks.getEntries

#### Inherited from

Service.getEntries

#### Defined in

container/types/Container/index.d.ts:123

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

#### Implementation of

Hooks.getKeys

#### Inherited from

Service.getKeys

#### Defined in

container/types/Container/index.d.ts:212

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

#### Implementation of

Hooks.getMap

#### Inherited from

Service.getMap

#### Defined in

container/types/Container/index.d.ts:230

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

#### Implementation of

Hooks.getValues

#### Inherited from

Service.getValues

#### Defined in

container/types/Container/index.d.ts:192

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

#### Implementation of

Hooks.has

#### Inherited from

Service.has

#### Defined in

container/types/Container/index.d.ts:293

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

#### Implementation of

Hooks.is

#### Inherited from

Service.is

#### Defined in

container/types/Container/index.d.ts:319

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

#### Implementation of

Hooks.isArray

#### Inherited from

Service.isArray

#### Defined in

container/types/Container/index.d.ts:372

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

#### Implementation of

Hooks.isDefined

#### Inherited from

Service.isDefined

#### Defined in

container/types/Container/index.d.ts:476

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

#### Implementation of

Hooks.isFalse

#### Inherited from

Service.isFalse

#### Defined in

container/types/Container/index.d.ts:345

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

#### Implementation of

Hooks.isFunction

#### Inherited from

Service.isFunction

#### Defined in

container/types/Container/index.d.ts:502

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

#### Implementation of

Hooks.isIndexed

#### Inherited from

Service.isIndexed

#### Defined in

container/types/Container/index.d.ts:359

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

#### Implementation of

Hooks.isNotArray

#### Inherited from

Service.isNotArray

#### Defined in

container/types/Container/index.d.ts:385

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

#### Implementation of

Hooks.isNotNull

#### Inherited from

Service.isNotNull

#### Defined in

container/types/Container/index.d.ts:463

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

#### Implementation of

Hooks.isNotNumber

#### Inherited from

Service.isNotNumber

#### Defined in

container/types/Container/index.d.ts:437

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

#### Implementation of

Hooks.isNotString

#### Inherited from

Service.isNotString

#### Defined in

container/types/Container/index.d.ts:411

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

#### Implementation of

Hooks.isNull

#### Inherited from

Service.isNull

#### Defined in

container/types/Container/index.d.ts:450

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

#### Implementation of

Hooks.isNumber

#### Inherited from

Service.isNumber

#### Defined in

container/types/Container/index.d.ts:424

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

#### Implementation of

Hooks.isString

#### Inherited from

Service.isString

#### Defined in

container/types/Container/index.d.ts:398

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

#### Implementation of

Hooks.isTrue

#### Inherited from

Service.isTrue

#### Defined in

container/types/Container/index.d.ts:332

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

#### Implementation of

Hooks.isUndefined

#### Inherited from

Service.isUndefined

#### Defined in

container/types/Container/index.d.ts:489

___

### link

▸ **link**(`target`, `links`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Name` |
| `links` | `string`[] |

#### Returns

`Framework`

#### Implementation of

Hooks.link

#### Defined in

bud-hooks/types/Hooks/index.d.ts:8

___

### merge

▸ **merge**(`key`, `value`): [`Hooks`](hooks.md)

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

[`Hooks`](hooks.md)

#### Implementation of

Hooks.merge

#### Inherited from

Service.merge

#### Defined in

container/types/Container/index.d.ts:280

___

### mergeStore

▸ **mergeStore**(`values`): [`Hooks`](hooks.md)

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

[`Hooks`](hooks.md)

#### Implementation of

Hooks.mergeStore

#### Inherited from

Service.mergeStore

#### Defined in

container/types/Container/index.d.ts:61

___

### mutate

▸ **mutate**(`key`, `mutationFn`): [`Hooks`](hooks.md)

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

[`Hooks`](hooks.md)

#### Implementation of

Hooks.mutate

#### Inherited from

Service.mutate

#### Defined in

container/types/Container/index.d.ts:268

___

### mutateStore

▸ **mutateStore**(`mutationFn`): [`Hooks`](hooks.md)

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

[`Hooks`](hooks.md)

#### Implementation of

Hooks.mutateStore

#### Inherited from

Service.mutateStore

#### Defined in

container/types/Container/index.d.ts:87

___

### on

▸ **on**(`id`, `callback`): `Framework`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `Name` |
| `callback` | `any` |

#### Returns

`Framework`

#### Implementation of

Hooks.on

#### Defined in

bud-hooks/types/Hooks/index.d.ts:6

___

### register

▸ `Optional` **register**(`app`): `any`

Register

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |

#### Returns

`any`

#### Implementation of

Hooks.register

#### Inherited from

Service.register

#### Defined in

bud-framework/types/Service/index.d.ts:15

___

### registered

▸ `Optional` **registered**(`app`): `any`

Post registered callback

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Framework` |

#### Returns

`any`

#### Implementation of

Hooks.registered

#### Inherited from

Service.registered

#### Defined in

bud-framework/types/Service/index.d.ts:19

___

### remove

▸ **remove**(`key`): [`Hooks`](hooks.md)

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

[`Hooks`](hooks.md)

#### Implementation of

Hooks.remove

#### Inherited from

Service.remove

#### Defined in

container/types/Container/index.d.ts:306

___

### set

▸ **set**(`key`, `value`): [`Hooks`](hooks.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Returns

[`Hooks`](hooks.md)

#### Implementation of

Hooks.set

#### Overrides

Service.set

#### Defined in

bud-hooks/types/Hooks/index.d.ts:5

___

### setStore

▸ **setStore**(`repository`): [`Hooks`](hooks.md)

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

[`Hooks`](hooks.md)

#### Implementation of

Hooks.setStore

#### Inherited from

Service.setStore

#### Defined in

container/types/Container/index.d.ts:49

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

#### Implementation of

Hooks.transform

#### Inherited from

Service.transform

#### Defined in

container/types/Container/index.d.ts:256

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

#### Implementation of

Hooks.transformStore

#### Inherited from

Service.transformStore

#### Defined in

container/types/Container/index.d.ts:75
