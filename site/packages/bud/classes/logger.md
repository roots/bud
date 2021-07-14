---
id: "logger"
title: "Class: Logger"
sidebar_label: "Logger"
sidebar_position: 0
custom_edit_url: null
---

Logger service

## Hierarchy

- `Container`

  ↳ **`Logger`**

## Implements

- `Contract`
- `Bootstrapper`

## Constructors

### constructor

• **new Logger**(`app`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](framework.md) |

#### Overrides

Container.constructor

#### Defined in

[packages/@roots/bud/src/services/Logger/index.ts:32](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud/src/services/Logger/index.ts#L32)

## Properties

### \_app

• **\_app**: () => [`Framework`](framework.md)

#### Type declaration

▸ (): [`Framework`](framework.md)

##### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud/src/services/Logger/index.ts:18](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud/src/services/Logger/index.ts#L18)

___

### \_instance

• **\_instance**: `Signale`<`DefaultMethods`\>

#### Defined in

[packages/@roots/bud/src/services/Logger/index.ts:20](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud/src/services/Logger/index.ts#L20)

___

### ident

• **ident**: ``"@roots/container"``

Identify

#### Implementation of

Bootstrapper.ident

#### Inherited from

Container.ident

#### Defined in

packages/@roots/container/types/Container/index.d.ts:15

___

### name

• **name**: `string` = `'service/logger'`

#### Implementation of

Contract.name

#### Defined in

[packages/@roots/bud/src/services/Logger/index.ts:16](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud/src/services/Logger/index.ts#L16)

___

### repository

• **repository**: `any`

The container store

#### Implementation of

Bootstrapper.repository

#### Inherited from

Container.repository

#### Defined in

packages/@roots/container/types/Container/index.d.ts:19

## Accessors

### app

• `get` **app**(): [`Framework`](framework.md)

#### Returns

[`Framework`](framework.md)

#### Defined in

[packages/@roots/bud/src/services/Logger/index.ts:30](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud/src/services/Logger/index.ts#L30)

___

### instance

• `get` **instance**(): `Signale`<`DefaultMethods`\>

#### Returns

`Signale`<`DefaultMethods`\>

#### Defined in

[packages/@roots/bud/src/services/Logger/index.ts:22](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud/src/services/Logger/index.ts#L22)

• `set` **instance**(`instance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `Signale`<`DefaultMethods`\> |

#### Returns

`void`

#### Defined in

[packages/@roots/bud/src/services/Logger/index.ts:26](https://github.com/roots/bud/blob/e487e2b6d/packages/@roots/bud/src/services/Logger/index.ts#L26)

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

Bootstrapper.all

#### Inherited from

Container.all

#### Defined in

packages/@roots/container/types/Container/index.d.ts:35

___

### each

▸ **each**(`key`, `callFn`): [`Logger`](logger.md)

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

[`Logger`](logger.md)

#### Implementation of

Bootstrapper.each

#### Inherited from

Container.each

#### Defined in

packages/@roots/container/types/Container/index.d.ts:153

___

### every

▸ **every**(`fn`): [`Logger`](logger.md)

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

[`Logger`](logger.md)

#### Implementation of

Bootstrapper.every

#### Inherited from

Container.every

#### Defined in

packages/@roots/container/types/Container/index.d.ts:165

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

Bootstrapper.findKey

#### Inherited from

Container.findKey

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

Bootstrapper.findKeyIn

#### Inherited from

Container.findKeyIn

#### Defined in

packages/@roots/container/types/Container/index.d.ts:173

___

### fromEntries

▸ **fromEntries**(`entries`): [`Logger`](logger.md)

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

[`Logger`](logger.md)

#### Implementation of

Bootstrapper.fromEntries

#### Inherited from

Container.fromEntries

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

Bootstrapper.get

#### Inherited from

Container.get

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

Bootstrapper.getEntries

#### Inherited from

Container.getEntries

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

Bootstrapper.getKeys

#### Inherited from

Container.getKeys

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

Bootstrapper.getMap

#### Inherited from

Container.getMap

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

Bootstrapper.getValues

#### Inherited from

Container.getValues

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

Bootstrapper.has

#### Inherited from

Container.has

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

Bootstrapper.is

#### Inherited from

Container.is

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

Bootstrapper.isArray

#### Inherited from

Container.isArray

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

Bootstrapper.isDefined

#### Inherited from

Container.isDefined

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

Bootstrapper.isFalse

#### Inherited from

Container.isFalse

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

Bootstrapper.isFunction

#### Inherited from

Container.isFunction

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

Bootstrapper.isIndexed

#### Inherited from

Container.isIndexed

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

Bootstrapper.isNotArray

#### Inherited from

Container.isNotArray

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

Bootstrapper.isNotNull

#### Inherited from

Container.isNotNull

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

Bootstrapper.isNotNumber

#### Inherited from

Container.isNotNumber

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

Bootstrapper.isNotString

#### Inherited from

Container.isNotString

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

Bootstrapper.isNull

#### Inherited from

Container.isNull

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

Bootstrapper.isNumber

#### Inherited from

Container.isNumber

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

Bootstrapper.isString

#### Inherited from

Container.isString

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

Bootstrapper.isTrue

#### Inherited from

Container.isTrue

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

Bootstrapper.isUndefined

#### Inherited from

Container.isUndefined

#### Defined in

packages/@roots/container/types/Container/index.d.ts:489

___

### merge

▸ **merge**(`key`, `value`): [`Logger`](logger.md)

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

[`Logger`](logger.md)

#### Implementation of

Bootstrapper.merge

#### Inherited from

Container.merge

#### Defined in

packages/@roots/container/types/Container/index.d.ts:280

___

### mergeStore

▸ **mergeStore**(`values`): [`Logger`](logger.md)

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

[`Logger`](logger.md)

#### Implementation of

Bootstrapper.mergeStore

#### Inherited from

Container.mergeStore

#### Defined in

packages/@roots/container/types/Container/index.d.ts:61

___

### mutate

▸ **mutate**(`key`, `mutationFn`): [`Logger`](logger.md)

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

[`Logger`](logger.md)

#### Implementation of

Bootstrapper.mutate

#### Inherited from

Container.mutate

#### Defined in

packages/@roots/container/types/Container/index.d.ts:268

___

### mutateStore

▸ **mutateStore**(`mutationFn`): [`Logger`](logger.md)

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

[`Logger`](logger.md)

#### Implementation of

Bootstrapper.mutateStore

#### Inherited from

Container.mutateStore

#### Defined in

packages/@roots/container/types/Container/index.d.ts:87

___

### remove

▸ **remove**(`key`): [`Logger`](logger.md)

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

[`Logger`](logger.md)

#### Implementation of

Bootstrapper.remove

#### Inherited from

Container.remove

#### Defined in

packages/@roots/container/types/Container/index.d.ts:306

___

### set

▸ **set**(`key`, `value`): [`Logger`](logger.md)

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

[`Logger`](logger.md)

#### Implementation of

Bootstrapper.set

#### Inherited from

Container.set

#### Defined in

packages/@roots/container/types/Container/index.d.ts:242

___

### setStore

▸ **setStore**(`repository`): [`Logger`](logger.md)

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

[`Logger`](logger.md)

#### Implementation of

Bootstrapper.setStore

#### Inherited from

Container.setStore

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

#### Implementation of

Bootstrapper.transform

#### Inherited from

Container.transform

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

Bootstrapper.transformStore

#### Inherited from

Container.transformStore

#### Defined in

packages/@roots/container/types/Container/index.d.ts:75
