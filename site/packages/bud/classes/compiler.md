---
id: "compiler"
title: "Class: Compiler"
sidebar_label: "Compiler"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `Service`

  ↳ **`Compiler`**

## Implements

- `Compiler`

## Constructors

### constructor

• **new Compiler**(`app`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Inherited from

Service.constructor

#### Defined in

packages/@roots/bud-framework/types/Service/index.d.ts:32

## Properties

### \_instance

• **\_instance**: `Instance`

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:6

___

### \_progress

• **\_progress**: `any`

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:8

___

### \_stats

• **\_stats**: `StatsCompilation`

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:7

___

### ident

• **ident**: ``"@roots/container"``

Identify

#### Implementation of

Compiler.ident

#### Inherited from

Service.ident

#### Defined in

packages/@roots/container/types/Container/index.d.ts:15

___

### isCompiled

• **isCompiled**: `boolean`

#### Implementation of

Compiler.isCompiled

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:9

___

### name

• **name**: `string`

#### Implementation of

Compiler.name

#### Overrides

Service.name

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:5

___

### repository

• **repository**: `any`

The container store

#### Implementation of

Compiler.repository

#### Inherited from

Service.repository

#### Defined in

packages/@roots/container/types/Container/index.d.ts:19

## Accessors

### access

• `get` **access**(): <I\>(`value`: `I` \| (`app`: [`Framework`](framework.md)) => `I`) => `I`

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

#### Defined in

packages/@roots/bud-framework/types/Service/index.d.ts:34

___

### app

• `get` **app**(): [`Framework`](framework.md)

#### Returns

[`Framework`](framework.md)

#### Defined in

packages/@roots/bud-framework/types/Service/index.d.ts:32

___

### instance

• `get` **instance**(): `Instance`

#### Returns

`Instance`

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:14

• `set` **instance**(`instance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `Instance` |

#### Returns

`void`

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:15

___

### progress

• `get` **progress**(): `any`

#### Returns

`any`

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:12

• `set` **progress**(`progress`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `progress` | `any` |

#### Returns

`void`

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:13

___

### stats

• `get` **stats**(): `StatsCompilation`

#### Returns

`StatsCompilation`

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:10

• `set` **stats**(`stats`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `stats` | `StatsCompilation` |

#### Returns

`void`

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:11

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

Compiler.all

#### Inherited from

Service.all

#### Defined in

packages/@roots/container/types/Container/index.d.ts:35

___

### before

▸ **before**(): `any`[]

#### Returns

`any`[]

#### Implementation of

Compiler.before

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:18

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

#### Implementation of

Compiler.boot

#### Inherited from

Service.boot

#### Defined in

packages/@roots/bud-framework/types/Service/index.d.ts:23

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

#### Implementation of

Compiler.booted

#### Inherited from

Service.booted

#### Defined in

packages/@roots/bud-framework/types/Service/index.d.ts:27

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

#### Implementation of

Compiler.bootstrap

#### Inherited from

Service.bootstrap

#### Defined in

packages/@roots/bud-framework/types/Service/index.d.ts:7

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

#### Implementation of

Compiler.bootstrapped

#### Inherited from

Service.bootstrapped

#### Defined in

packages/@roots/bud-framework/types/Service/index.d.ts:11

___

### callback

▸ **callback**(...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Implementation of

Compiler.callback

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:20

___

### compile

▸ **compile**(): `Instance`

#### Returns

`Instance`

#### Implementation of

Compiler.compile

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:17

___

### each

▸ **each**(`key`, `callFn`): [`Compiler`](compiler.md)

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

[`Compiler`](compiler.md)

#### Implementation of

Compiler.each

#### Inherited from

Service.each

#### Defined in

packages/@roots/container/types/Container/index.d.ts:153

___

### every

▸ **every**(`fn`): [`Compiler`](compiler.md)

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

[`Compiler`](compiler.md)

#### Implementation of

Compiler.every

#### Inherited from

Service.every

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

#### Implementation of

Compiler.filterUnique

#### Inherited from

Service.filterUnique

#### Defined in

packages/@roots/bud-framework/types/Service/index.d.ts:35

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

Compiler.findKey

#### Inherited from

Service.findKey

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

#### Implementation of

Compiler.findKeyIn

#### Inherited from

Service.findKeyIn

#### Defined in

packages/@roots/container/types/Container/index.d.ts:173

___

### fromEntries

▸ **fromEntries**(`entries`): [`Compiler`](compiler.md)

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

[`Compiler`](compiler.md)

#### Implementation of

Compiler.fromEntries

#### Inherited from

Service.fromEntries

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

#### Implementation of

Compiler.get

#### Inherited from

Service.get

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

#### Implementation of

Compiler.getEntries

#### Inherited from

Service.getEntries

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

#### Implementation of

Compiler.getKeys

#### Inherited from

Service.getKeys

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

#### Implementation of

Compiler.getMap

#### Inherited from

Service.getMap

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

#### Implementation of

Compiler.getValues

#### Inherited from

Service.getValues

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

#### Implementation of

Compiler.has

#### Inherited from

Service.has

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

#### Implementation of

Compiler.is

#### Inherited from

Service.is

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

#### Implementation of

Compiler.isArray

#### Inherited from

Service.isArray

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

#### Implementation of

Compiler.isDefined

#### Inherited from

Service.isDefined

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

#### Implementation of

Compiler.isFalse

#### Inherited from

Service.isFalse

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

#### Implementation of

Compiler.isFunction

#### Inherited from

Service.isFunction

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

#### Implementation of

Compiler.isIndexed

#### Inherited from

Service.isIndexed

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

#### Implementation of

Compiler.isNotArray

#### Inherited from

Service.isNotArray

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

#### Implementation of

Compiler.isNotNull

#### Inherited from

Service.isNotNull

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

#### Implementation of

Compiler.isNotNumber

#### Inherited from

Service.isNotNumber

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

#### Implementation of

Compiler.isNotString

#### Inherited from

Service.isNotString

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

#### Implementation of

Compiler.isNull

#### Inherited from

Service.isNull

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

#### Implementation of

Compiler.isNumber

#### Inherited from

Service.isNumber

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

#### Implementation of

Compiler.isString

#### Inherited from

Service.isString

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

#### Implementation of

Compiler.isTrue

#### Inherited from

Service.isTrue

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

#### Implementation of

Compiler.isUndefined

#### Inherited from

Service.isUndefined

#### Defined in

packages/@roots/container/types/Container/index.d.ts:489

___

### merge

▸ **merge**(`key`, `value`): [`Compiler`](compiler.md)

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

[`Compiler`](compiler.md)

#### Implementation of

Compiler.merge

#### Inherited from

Service.merge

#### Defined in

packages/@roots/container/types/Container/index.d.ts:280

___

### mergeStore

▸ **mergeStore**(`values`): [`Compiler`](compiler.md)

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

[`Compiler`](compiler.md)

#### Implementation of

Compiler.mergeStore

#### Inherited from

Service.mergeStore

#### Defined in

packages/@roots/container/types/Container/index.d.ts:61

___

### mutate

▸ **mutate**(`key`, `mutationFn`): [`Compiler`](compiler.md)

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

[`Compiler`](compiler.md)

#### Implementation of

Compiler.mutate

#### Inherited from

Service.mutate

#### Defined in

packages/@roots/container/types/Container/index.d.ts:268

___

### mutateStore

▸ **mutateStore**(`mutationFn`): [`Compiler`](compiler.md)

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

[`Compiler`](compiler.md)

#### Implementation of

Compiler.mutateStore

#### Inherited from

Service.mutateStore

#### Defined in

packages/@roots/container/types/Container/index.d.ts:87

___

### register

▸ **register**(): `void`

#### Returns

`void`

#### Implementation of

Compiler.register

#### Overrides

Service.register

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:16

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

#### Implementation of

Compiler.registered

#### Inherited from

Service.registered

#### Defined in

packages/@roots/bud-framework/types/Service/index.d.ts:19

___

### remove

▸ **remove**(`key`): [`Compiler`](compiler.md)

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

[`Compiler`](compiler.md)

#### Implementation of

Compiler.remove

#### Inherited from

Service.remove

#### Defined in

packages/@roots/container/types/Container/index.d.ts:306

___

### set

▸ **set**(`key`, `value`): [`Compiler`](compiler.md)

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

[`Compiler`](compiler.md)

#### Implementation of

Compiler.set

#### Inherited from

Service.set

#### Defined in

packages/@roots/container/types/Container/index.d.ts:242

___

### setStore

▸ **setStore**(`repository`): [`Compiler`](compiler.md)

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

[`Compiler`](compiler.md)

#### Implementation of

Compiler.setStore

#### Inherited from

Service.setStore

#### Defined in

packages/@roots/container/types/Container/index.d.ts:49

___

### setup

▸ **setup**(`config`): `Compiler`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `any` |

#### Returns

`Compiler`

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:19

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

Compiler.transform

#### Inherited from

Service.transform

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

#### Implementation of

Compiler.transformStore

#### Inherited from

Service.transformStore

#### Defined in

packages/@roots/container/types/Container/index.d.ts:75
