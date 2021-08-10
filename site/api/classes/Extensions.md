---
id: "Extensions"
title: "Class: Extensions"
sidebar_label: "Extensions"
sidebar_position: 0
custom_edit_url: null
---

**`sealed`**

## Hierarchy

- `Contract`

  ↳ **`Extensions`**

## Implements

- [`Service`](Service.md)<[`Extensions`](../interfaces/Framework.Extensions.md)\>

## Constructors

### constructor

• **new Extensions**(`app`)

Class constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Inherited from

Contract.constructor

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:87

## Properties

### ident

• **ident**: `string`

Identifier

#### Implementation of

Service.ident

#### Inherited from

Contract.ident

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:10

___

### name

• **name**: `string` = `'extensions'`

#### Implementation of

Service.name

#### Overrides

Contract.name

#### Defined in

[packages/@roots/bud/src/services/Extensions/index.ts:13](https://github.com/roots/bud/blob/ba45c7e9/packages/@roots/bud/src/services/Extensions/index.ts#L13)

___

### repository

• **repository**: [`Extensions`](../interfaces/Framework.Extensions.md)

#### Implementation of

Service.repository

#### Overrides

Contract.repository

#### Defined in

[packages/@roots/bud/src/services/Extensions/index.ts:15](https://github.com/roots/bud/blob/ba45c7e9/packages/@roots/bud/src/services/Extensions/index.ts#L15)

## Accessors

### app

• `get` **app**(): [`Framework`](Framework.md)

Access [Framework](Framework.md) instance

**`readonly`**

#### Returns

[`Framework`](Framework.md)

#### Defined in

packages/@roots/bud-framework/types/Bootstrapper.d.ts:25

## Methods

### add

▸ **add**(`extension`): `void`

{@inheritDoc Contract.add}

#### Parameters

| Name | Type |
| :------ | :------ |
| `extension` | [`Module`](../interfaces/Module.md)<`any`, `any`\> |

#### Returns

`void`

#### Inherited from

Contract.add

#### Defined in

packages/@roots/bud-extensions/types/Extensions/index.d.ts:19

___

### all

▸ **all**(): `any`

Returns the repository in its entirety as a plain JS object

**`example`**
```js
container.all()
```

#### Returns

`any`

#### Implementation of

Service.all

#### Inherited from

Contract.all

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:27

___

### bindClass

▸ **bindClass**<`T`\>(`properties`): `void`

Bind a {@link Class} to the [Framework](Framework.md).

**`remarks`**
Constructor parameters can be specified using an array.

**`example`**
Bind to `app.bindingName`:

```js
app.service.bindClass({bindingName: BindingClass})
```

**`example`**
Specify constructor parameters to pass to `BindingClass` during instantiation.

```js
app.service.bindClass({bindingName: [BindingClass, foo, bar]})
```

**`decorator`** `@bind`

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | { [key: string]: `Class` \| [`Class`, `any`[]];  } | Object typing |

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `T` |

#### Returns

`void`

#### Implementation of

Service.bindClass

#### Inherited from

Contract.bindClass

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:127

___

### bindMacro

▸ **bindMacro**<`T`\>(`properties`): `void`

Bind a {@link CallableFunction} to the [Framework](Framework.md)

**`example`**
Bind to `app.boundFnName`

```js
app.service.bindClass({boundFnName: BindingClass})
```

**`decorator`** `@bind`

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | { [key: string]: `CallableFunction`;  } | Object typing |

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `T` |

#### Returns

`void`

#### Implementation of

Service.bindMacro

#### Inherited from

Contract.bindMacro

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:101

___

### boot

▸ **boot**(): `void`

{@inheritDoc Contract.boot}

#### Returns

`void`

#### Implementation of

Service.boot

#### Inherited from

Contract.boot

#### Defined in

packages/@roots/bud-extensions/types/Extensions/index.d.ts:17

___

### bootExtension

▸ **bootExtension**(`extension`): `void`

Boot a registered extension

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `extension` | [`Module`](../interfaces/Module.md)<`any`, `any`\> |

#### Returns

`void`

#### Inherited from

Contract.bootExtension

#### Defined in

packages/@roots/bud-extensions/types/Extensions/index.d.ts:35

___

### booted

▸ `Optional` **booted**(`app`): `any`

Lifecycle method: booted

**`remarks`**
`booted` is called after all [Service.boot](Service.md#boot) callbacks are complete.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Implementation of

Service.booted

#### Inherited from

Contract.booted

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:83

___

### bootstrap

▸ `Optional` **bootstrap**(`app`): `any`

Lifecycle method: bootstrap

**`remarks`**
`bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Implementation of

Service.bootstrap

#### Inherited from

Contract.bootstrap

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:38

___

### bootstrapped

▸ `Optional` **bootstrapped**(`app`): `any`

Lifecycle method: bootstrapped

**`remarks`**
`bootstrapped` is called once all Services have been instantiated.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Implementation of

Service.bootstrapped

#### Inherited from

Contract.bootstrapped

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:47

___

### each

▸ **each**(`key`, `callFn`): [`Extensions`](Extensions.md)

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

[`Extensions`](Extensions.md)

#### Implementation of

Service.each

#### Inherited from

Contract.each

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:125

___

### every

▸ **every**(`fn`): [`Extensions`](Extensions.md)

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

[`Extensions`](Extensions.md)

#### Implementation of

Service.every

#### Inherited from

Contract.every

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

#### Implementation of

Service.findKey

#### Inherited from

Contract.findKey

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

#### Implementation of

Service.findKeyIn

#### Inherited from

Contract.findKeyIn

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:149

___

### fromEntries

▸ **fromEntries**(`entries`): [`Extensions`](Extensions.md)

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

[`Extensions`](Extensions.md)

#### Implementation of

Service.fromEntries

#### Inherited from

Contract.fromEntries

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

#### Implementation of

Service.get

#### Inherited from

Contract.get

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:85

___

### getEligibleWebpackModules

▸ **getEligibleWebpackModules**(): `Extension`[]

{@inheritDoc Contract.getEligibleWebpackModules}

#### Returns

`Extension`[]

#### Inherited from

Contract.getEligibleWebpackModules

#### Defined in

packages/@roots/bud-extensions/types/Extensions/index.d.ts:23

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

#### Implementation of

Service.getEntries

#### Inherited from

Contract.getEntries

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

#### Implementation of

Service.getKeys

#### Inherited from

Contract.getKeys

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

#### Implementation of

Service.getMap

#### Inherited from

Contract.getMap

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

#### Implementation of

Service.getValues

#### Inherited from

Contract.getValues

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

#### Implementation of

Service.has

#### Inherited from

Contract.has

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

#### Implementation of

Service.is

#### Inherited from

Contract.is

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

#### Implementation of

Service.isArray

#### Inherited from

Contract.isArray

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

#### Implementation of

Service.isDefined

#### Inherited from

Contract.isDefined

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

#### Implementation of

Service.isFalse

#### Inherited from

Contract.isFalse

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

#### Implementation of

Service.isFunction

#### Inherited from

Contract.isFunction

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

#### Implementation of

Service.isIndexed

#### Inherited from

Contract.isIndexed

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

#### Implementation of

Service.isNotArray

#### Inherited from

Contract.isNotArray

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

#### Implementation of

Service.isNotNull

#### Inherited from

Contract.isNotNull

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

#### Implementation of

Service.isNotNumber

#### Inherited from

Contract.isNotNumber

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

#### Implementation of

Service.isNotString

#### Inherited from

Contract.isNotString

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

#### Implementation of

Service.isNull

#### Inherited from

Contract.isNull

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

#### Implementation of

Service.isNumber

#### Inherited from

Contract.isNumber

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

#### Implementation of

Service.isString

#### Inherited from

Contract.isString

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

#### Implementation of

Service.isTrue

#### Inherited from

Contract.isTrue

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

#### Implementation of

Service.isUndefined

#### Inherited from

Contract.isUndefined

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:401

___

### make

▸ **make**(): `PluginOutput`[]

{@inheritDoc Contract.make}

#### Returns

`PluginOutput`[]

#### Inherited from

Contract.make

#### Defined in

packages/@roots/bud-extensions/types/Extensions/index.d.ts:21

___

### merge

▸ **merge**(`key`, `value`): [`Extensions`](Extensions.md)

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

[`Extensions`](Extensions.md)

#### Implementation of

Service.merge

#### Inherited from

Contract.merge

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:239

___

### mergeStore

▸ **mergeStore**(`values`): [`Extensions`](Extensions.md)

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

[`Extensions`](Extensions.md)

#### Implementation of

Service.mergeStore

#### Inherited from

Contract.mergeStore

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:47

___

### mutate

▸ **mutate**(`key`, `mutationFn`): [`Extensions`](Extensions.md)

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

[`Extensions`](Extensions.md)

#### Implementation of

Service.mutate

#### Inherited from

Contract.mutate

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:230

___

### mutateStore

▸ **mutateStore**(`mutationFn`): [`Extensions`](Extensions.md)

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
| `mutationFn` | (`value?`: [`Extensions`](../interfaces/Framework.Extensions.md)) => [`Extensions`](../interfaces/Framework.Extensions.md) |

#### Returns

[`Extensions`](Extensions.md)

#### Implementation of

Service.mutateStore

#### Inherited from

Contract.mutateStore

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:68

___

### register

▸ **register**(): `void`

{@inheritDoc Contract.register}

#### Returns

`void`

#### Implementation of

Service.register

#### Inherited from

Contract.register

#### Defined in

packages/@roots/bud-extensions/types/Extensions/index.d.ts:15

___

### registerExtension

▸ **registerExtension**(`extension`): `void`

Register an extension and set in the container

**`internal`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `extension` | [`Module`](../interfaces/Module.md)<`any`, `any`\> |

#### Returns

`void`

#### Inherited from

Contract.registerExtension

#### Defined in

packages/@roots/bud-extensions/types/Extensions/index.d.ts:29

___

### registered

▸ `Optional` **registered**(`app`): `any`

Lifecycle method: registered

**`remarks`**
`registered` is called after all [Service.register](Service.md#register) callbacks are complete.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Implementation of

Service.registered

#### Inherited from

Contract.registered

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:65

___

### remove

▸ **remove**(`key`): [`Extensions`](Extensions.md)

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

[`Extensions`](Extensions.md)

#### Implementation of

Service.remove

#### Inherited from

Contract.remove

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:261

___

### set

▸ **set**(`key`, `value`): [`Extensions`](Extensions.md)

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

[`Extensions`](Extensions.md)

#### Implementation of

Service.set

#### Inherited from

Contract.set

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:209

___

### setStore

▸ **setStore**(`repository`): [`Extensions`](Extensions.md)

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

[`Extensions`](Extensions.md)

#### Implementation of

Service.setStore

#### Inherited from

Contract.setStore

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

#### Implementation of

Service.transform

#### Inherited from

Contract.transform

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

#### Implementation of

Service.transformStore

#### Inherited from

Contract.transformStore

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:57
