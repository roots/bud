---
id: "Service"
title: "Class: Service<T>"
sidebar_label: "Service"
sidebar_position: 0
custom_edit_url: null
---

Atomic unit of [Framework](Framework.md) functionality.

**`remarks`**
Services extend {@link Bootstrapper}, which provides container functions and access to the main [Framework](Framework.md) instance.

All services must be defined during instantiation of the [Framework](Framework.md).

A Service provides functionality through a series of lifecycle callbacks, which are all optional:

- [bootstrap](Service.md#bootstrap) is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
- [bootstrapped](Service.md#bootstrapped) is called once all Services have been instantiated.

- [register](Service.md#register) is intended for Services to register functionalities, modules, and bind functions and classes.
- [registered](Service.md#registered) is called after all [Service.register](Service.md#register) callbacks are complete.

- [boot](Service.md#boot) is called once all services are registered. It should be safe for Services to reference one another.
- [booted](Service.md#booted) is called after all [Service.boot](Service.md#boot) callbacks are complete.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | { [key: string]: `any`;  } | Container repository typing, if applicable |

## Hierarchy

- `Bootstrapper`<`T`\>

  ↳ **`Service`**

  ↳↳ [`Dependencies`](Dependencies.md)

  ↳↳ [`Env`](Env.md)

  ↳↳ [`Logger`](Logger.md)

  ↳↳ [`Store`](Store.md)

## Implemented by

- [`Api`](Api.md)
- [`Dashboard`](Dashboard.md)
- [`Discovery`](Discovery.md)
- [`Extensions`](Extensions.md)
- [`Hooks`](Hooks.md)

## Constructors

### constructor

• **new Service**<`T`\>(`app`)

Class constructor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | { [key: string]: `any`;  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Overrides

Bootstrapper&lt;T\&gt;.constructor

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:87

## Properties

### ident

• **ident**: ``"container"``

Identifier

#### Inherited from

Bootstrapper.ident

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:10

___

### name

• **name**: `any`

Service identifier

**`virtual`**

#### Inherited from

Bootstrapper.name

#### Defined in

packages/@roots/bud-framework/types/Bootstrapper.d.ts:15

___

### repository

• **repository**: `T`

Container repository

#### Inherited from

Bootstrapper.repository

#### Defined in

packages/@roots/bud-framework/types/Bootstrapper.d.ts:19

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

### all

▸ **all**(): `any`

Returns the repository in its entirety as a plain JS object

**`example`**
```js
container.all()
```

#### Returns

`any`

#### Inherited from

Bootstrapper.all

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

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:127

___

### bindMacro

▸ **bindMacro**<`T`\>(`properties`): `void`

Bind a {@link CallableFunction} to the [Framework](Framework.md).

**`example`**
Bind to `app.boundFnName`:

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

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:101

___

### boot

▸ `Optional` **boot**(`app`): `any`

Lifecycle method: boot

**`remarks`**
`boot` is called once all services are registered. It should be safe for Services to reference one another.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:74

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

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:47

___

### each

▸ **each**(`key`, `callFn`): [`Service`](Service.md)<`T`\>

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

[`Service`](Service.md)<`T`\>

#### Inherited from

Bootstrapper.each

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:125

___

### every

▸ **every**(`fn`): [`Service`](Service.md)<`T`\>

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

[`Service`](Service.md)<`T`\>

#### Inherited from

Bootstrapper.every

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

#### Inherited from

Bootstrapper.findKey

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

#### Inherited from

Bootstrapper.findKeyIn

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:149

___

### fromEntries

▸ **fromEntries**(`entries`): [`Service`](Service.md)<`T`\>

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

[`Service`](Service.md)<`T`\>

#### Inherited from

Bootstrapper.fromEntries

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

#### Inherited from

Bootstrapper.get

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

#### Inherited from

Bootstrapper.getEntries

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

#### Inherited from

Bootstrapper.getKeys

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

#### Inherited from

Bootstrapper.getMap

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

#### Inherited from

Bootstrapper.getValues

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

#### Inherited from

Bootstrapper.has

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

#### Inherited from

Bootstrapper.is

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

#### Inherited from

Bootstrapper.isArray

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

#### Inherited from

Bootstrapper.isDefined

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

#### Inherited from

Bootstrapper.isFalse

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

#### Inherited from

Bootstrapper.isFunction

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

#### Inherited from

Bootstrapper.isIndexed

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

#### Inherited from

Bootstrapper.isNotArray

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

#### Inherited from

Bootstrapper.isNotNull

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

#### Inherited from

Bootstrapper.isNotNumber

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

#### Inherited from

Bootstrapper.isNotString

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

#### Inherited from

Bootstrapper.isNull

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

#### Inherited from

Bootstrapper.isNumber

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

#### Inherited from

Bootstrapper.isString

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

#### Inherited from

Bootstrapper.isTrue

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

#### Inherited from

Bootstrapper.isUndefined

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:401

___

### merge

▸ **merge**(`key`, `value`): [`Service`](Service.md)<`T`\>

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

[`Service`](Service.md)<`T`\>

#### Inherited from

Bootstrapper.merge

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:239

___

### mergeStore

▸ **mergeStore**(`values`): [`Service`](Service.md)<`T`\>

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

[`Service`](Service.md)<`T`\>

#### Inherited from

Bootstrapper.mergeStore

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:47

___

### mutate

▸ **mutate**(`key`, `mutationFn`): [`Service`](Service.md)<`T`\>

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

[`Service`](Service.md)<`T`\>

#### Inherited from

Bootstrapper.mutate

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:230

___

### mutateStore

▸ **mutateStore**(`mutationFn`): [`Service`](Service.md)<`T`\>

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
| `mutationFn` | (`value?`: `T`) => `T` |

#### Returns

[`Service`](Service.md)<`T`\>

#### Inherited from

Bootstrapper.mutateStore

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:68

___

### register

▸ `Optional` **register**(`app`): `any`

Lifecycle method: register

**`remarks`**
`register` is intended for Services to register functionalities, modules, and bind functions and classes.

**`virtual`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Returns

`any`

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:56

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

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:65

___

### remove

▸ **remove**(`key`): [`Service`](Service.md)<`T`\>

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

[`Service`](Service.md)<`T`\>

#### Inherited from

Bootstrapper.remove

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:261

___

### set

▸ **set**(`key`, `value`): [`Service`](Service.md)<`T`\>

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

[`Service`](Service.md)<`T`\>

#### Inherited from

Bootstrapper.set

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:209

___

### setStore

▸ **setStore**(`repository`): [`Service`](Service.md)<`T`\>

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

[`Service`](Service.md)<`T`\>

#### Inherited from

Bootstrapper.setStore

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

#### Inherited from

Bootstrapper.transform

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

#### Inherited from

Bootstrapper.transformStore

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:57
