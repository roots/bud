---
id: "Container"
title: "Class: Container<I>"
sidebar_label: "Container"
sidebar_position: 0
custom_edit_url: null
---

Stores and provides utilities for manipulating [data](../namespaces/Store.md#repository)

## Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

## Constructors

### constructor

• **new Container**<`I`\>(`repository?`)

Class constructor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `repository?` | `I` |

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:18

## Properties

### ident

• **ident**: ``"container"``

Identifier

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:10

___

### repository

• **repository**: `any`

The container store

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:14

## Methods

### all

▸ **all**(): `any`

Returns the repository in its entirety as a plain JS object

**`example`**
```js
container.all()
```

#### Returns

`any`

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:27

___

### each

▸ **each**(`key`, `callFn`): [`Container`](Container.md)<`I`\>

Use each value as parameters in a supplied callback

**`example`**
```js
container.withEntries('key', (key, value) => doSomething)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |
| `callFn` | (`key`: `any`, `value`: `any`) => `void` |

#### Returns

[`Container`](Container.md)<`I`\>

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:125

___

### every

▸ **every**(`fn`): [`Container`](Container.md)<`I`\>

Calls a supplied function for every [Repository](../namespaces/Store.md#repository) value, passing
the item's key and value as callback parameters.

**`example`**
```js
container.withEntries('key', (key, value) => doSomething)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`key`: `string` \| `number`, `value`: `any`) => `any` |

#### Returns

[`Container`](Container.md)<`I`\>

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:135

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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:139

___

### findKeyIn

▸ **findKeyIn**(`key`, ...`searchItem`): `any`

Gets a nested value from the [Repository](../namespaces/Store.md#repository)

**`example`**
```js
container.findKeyIn('top-level-key', 'inner', 'nested', 'item')
// returns repository['top-level-key'].inner.nested.item
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |
| `...searchItem` | `any`[] |

#### Returns

`any`

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:149

___

### fromEntries

▸ **fromEntries**(`entries`): [`Container`](Container.md)<`I`\>

Merges object created from an array of tuples with the [Repository](../namespaces/Store.md#repository).

**`example`**
```js
container.getEntries()
```

**`example`**
```js
container.getEntries('key')
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `entries` | [`string`, `any`][] |

#### Returns

[`Container`](Container.md)<`I`\>

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:116

___

### get

▸ **get**<`T`\>(`key`): `T`

Returns a value from the the repository.

**`remarks`**
If no key is passed the container store will be returned.

**`example`**
```js
container.get('container.container-item')
```

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:85

___

### getEntries

▸ **getEntries**<`T`\>(`key?`): [`string`, `ValueOf`<`T`, keyof `T`\>][]

Returns a [Repository](../namespaces/Store.md#repository) key and value as a tuple

**`remarks`**
If no key is passed the container store will be used.

**`example`**
```js
container.getEntries()
```

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:102

___

### getKeys

▸ **getKeys**(`key?`): `string`[]

Returns an array of values of the enumerable keys of a [Repository](../namespaces/Store.md#repository) object

**`example`**
```js
container.getKeys('item')
// => returns keys of container.repository[item]
```

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:180

___

### getMap

▸ **getMap**(`key?`): `Map`<`string`, `any`\>

Get a [Repository](../namespaces/Store.md#repository) item as a {@link Map}.

**`remarks`**
If no key is passed the container store is mapped.

**`example`**
Returns `repository.item` as a Map:
```js
container.getMap('item')
```

**`example`**
Returns the entire repository as a Map:

```js
container.getMap()
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` |

#### Returns

`Map`<`string`, `any`\>

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:200

___

### getValues

▸ **getValues**(`key?`): `any`[]

Returns an array of values of the enumerable properties of a [Repository](../namespaces/Store.md#repository) object

**`example`**
```js
container.getValues('container.container-item')
```

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:164

___

### has

▸ **has**(`key`): `boolean`

Return a boolean indicating if a given key exists.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:249

___

### is

▸ **is**(`key`, `value`): `boolean`

Return a boolean indicating if the given key matches the given value.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:271

___

### isArray

▸ **isArray**(`key`): `boolean`

Return true if object is an array.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:311

___

### isDefined

▸ **isDefined**(`key`): `boolean`

Return true if object is defined.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:391

___

### isFalse

▸ **isFalse**(`key`): `boolean`

Return a boolean indicating if the given key's value is false

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:291

___

### isFunction

▸ **isFunction**(`key`): `boolean`

Return true if object is a function

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:411

___

### isIndexed

▸ **isIndexed**(`key?`): `boolean`

Return true if object is likely a vanilla object with string keys.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:301

___

### isNotArray

▸ **isNotArray**(`key`): `boolean`

Return true if object is not an array.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:321

___

### isNotNull

▸ **isNotNull**(`key`): `boolean`

Return true if object is not null.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:381

___

### isNotNumber

▸ **isNotNumber**(`key`): `boolean`

Return true if object is not a number.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:361

___

### isNotString

▸ **isNotString**(`key`): `boolean`

Return true if object is a string.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:341

___

### isNull

▸ **isNull**(`key`): `boolean`

Return true if object is null.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:371

___

### isNumber

▸ **isNumber**(`key`): `boolean`

Return true if object is a number.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:351

___

### isString

▸ **isString**(`key`): `boolean`

Return true if object is a string.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:331

___

### isTrue

▸ **isTrue**(`key`): `boolean`

Return a boolean indicating if the given key's value is true

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:281

___

### isUndefined

▸ **isUndefined**(`key`): `boolean`

Return true if object is defined.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:401

___

### merge

▸ **merge**(`key`, `value`): [`Container`](Container.md)<`I`\>

Merge a supplied value with an existing [Repository](../namespaces/Store.md#repository) value

**`example`**
```js
container.merge('key', {merge: values})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |
| `value` | `any` |

#### Returns

[`Container`](Container.md)<`I`\>

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:239

___

### mergeStore

▸ **mergeStore**(`values`): [`Container`](Container.md)<`I`\>

Merge values onto the container store.

**`example`**
```js
container.mergeStore({test: 'foo'})
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `Repository` |

#### Returns

[`Container`](Container.md)<`I`\>

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:47

___

### mutate

▸ **mutate**(`key`, `mutationFn`): [`Container`](Container.md)<`I`\>

Mutate a [Repository](../namespaces/Store.md#repository) item

**`example`**
```js
container.mutate('key', currentValue => modifiedValue)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |
| `mutationFn` | (`value?`: `any`) => `any` |

#### Returns

[`Container`](Container.md)<`I`\>

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:230

___

### mutateStore

▸ **mutateStore**(`mutationFn`): [`Container`](Container.md)<`I`\>

Runs the entire [Repository](../namespaces/Store.md#repository) through the supplied fn and returns
the transformed value. The transformed [Repository](../namespaces/Store.md#repository) replaces the
original.

**`example`**
```js
container.mutate('key', currentValue => modifiedValue)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `mutationFn` | (`value?`: `I`) => `I` |

#### Returns

[`Container`](Container.md)<`I`\>

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:68

___

### remove

▸ **remove**(`key`): [`Container`](Container.md)<`I`\>

delete

Delete an entry from the repository

**`example`**
```js
container.remove('my-key')
// Remove container.repository['my-key']
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |

#### Returns

[`Container`](Container.md)<`I`\>

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:261

___

### set

▸ **set**(`key`, `value`): [`Container`](Container.md)<`I`\>

Set a [Repository](../namespaces/Store.md#repository) value

**`example`**
```js
container.set('key', value)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` |
| `value` | `any` |

#### Returns

[`Container`](Container.md)<`I`\>

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:209

___

### setStore

▸ **setStore**(`repository`): [`Container`](Container.md)<`I`\>

Replace the store with an all new set of values

**`example`**
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

[`Container`](Container.md)<`I`\>

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:38

___

### transform

▸ **transform**(`key`, `mutationFn`): `any`

Retrieve a container item, running it through the supplied fn.

**`remarks`**
Returns the transformed value.

**`example`**
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

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:221

___

### transformStore

▸ **transformStore**(`transformFn`): `any`

Runs the entire repository through the supplied fn and returns
the transformed value.

**`example`**
```js
container.transform(store=> modifiedStore)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `transformFn` | (`value`: `any`) => `any` |

#### Returns

`any`

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:57
