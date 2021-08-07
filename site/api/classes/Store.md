---
id: "Store"
title: "Class: Store<T>"
sidebar_label: "Store"
sidebar_position: 0
custom_edit_url: null
---

Options container store

**`sealed`**

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`Configuration`](../interfaces/Configuration.md) |

## Hierarchy

- [`Service`](Service.md)<`T`\>

  ↳ **`Store`**

## Constructors

### constructor

• **new Store**<`T`\>(`app`)

Class constructor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`Configuration`](../interfaces/Configuration.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Inherited from

[Service](Service.md).[constructor](Service.md#constructor)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:87

## Properties

### ident

• **ident**: ``"container"``

Identifier

#### Inherited from

[Service](Service.md).[ident](Service.md#ident)

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:10

___

### name

• **name**: `string`

Service identifier

#### Overrides

[Service](Service.md).[name](Service.md#name)

#### Defined in

packages/@roots/bud-framework/types/Store.d.ts:9

___

### repository

• **repository**: `T`

Container repository

#### Inherited from

[Service](Service.md).[repository](Service.md#repository)

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

[Service](Service.md).[all](Service.md#all)

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

#### Inherited from

[Service](Service.md).[bindClass](Service.md#bindclass)

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

#### Inherited from

[Service](Service.md).[bindMacro](Service.md#bindmacro)

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

#### Inherited from

[Service](Service.md).[boot](Service.md#boot)

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

#### Inherited from

[Service](Service.md).[booted](Service.md#booted)

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

#### Inherited from

[Service](Service.md).[bootstrap](Service.md#bootstrap)

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

#### Inherited from

[Service](Service.md).[bootstrapped](Service.md#bootstrapped)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:47

___

### each

▸ **each**(`key`, `callFn`): [`Store`](Store.md)<`T`\>

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

[`Store`](Store.md)<`T`\>

#### Inherited from

[Service](Service.md).[each](Service.md#each)

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:125

___

### every

▸ **every**(`fn`): [`Store`](Store.md)<`T`\>

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

[`Store`](Store.md)<`T`\>

#### Inherited from

[Service](Service.md).[every](Service.md#every)

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

[Service](Service.md).[findKey](Service.md#findkey)

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

[Service](Service.md).[findKeyIn](Service.md#findkeyin)

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:149

___

### fromEntries

▸ **fromEntries**(`entries`): [`Store`](Store.md)<`T`\>

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

[`Store`](Store.md)<`T`\>

#### Inherited from

[Service](Service.md).[fromEntries](Service.md#fromentries)

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:116

___

### get

▸ **get**<`T`\>(`path`): `T`

Get a store value

**`override`**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | [`Keys`](../namespaces/Store.md#keys) |

#### Returns

`T`

#### Overrides

[Service](Service.md).[get](Service.md#get)

#### Defined in

packages/@roots/bud-framework/types/Store.d.ts:15

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

[Service](Service.md).[getEntries](Service.md#getentries)

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

[Service](Service.md).[getKeys](Service.md#getkeys)

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

[Service](Service.md).[getMap](Service.md#getmap)

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

[Service](Service.md).[getValues](Service.md#getvalues)

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

[Service](Service.md).[has](Service.md#has)

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

[Service](Service.md).[is](Service.md#is)

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

[Service](Service.md).[isArray](Service.md#isarray)

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

[Service](Service.md).[isDefined](Service.md#isdefined)

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

[Service](Service.md).[isFalse](Service.md#isfalse)

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

[Service](Service.md).[isFunction](Service.md#isfunction)

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

[Service](Service.md).[isIndexed](Service.md#isindexed)

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

[Service](Service.md).[isNotArray](Service.md#isnotarray)

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

[Service](Service.md).[isNotNull](Service.md#isnotnull)

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

[Service](Service.md).[isNotNumber](Service.md#isnotnumber)

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

[Service](Service.md).[isNotString](Service.md#isnotstring)

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

[Service](Service.md).[isNull](Service.md#isnull)

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

[Service](Service.md).[isNumber](Service.md#isnumber)

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

[Service](Service.md).[isString](Service.md#isstring)

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

[Service](Service.md).[isTrue](Service.md#istrue)

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

[Service](Service.md).[isUndefined](Service.md#isundefined)

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:401

___

### merge

▸ **merge**(`key`, `value`): [`Store`](Store.md)<`T`\>

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

[`Store`](Store.md)<`T`\>

#### Inherited from

[Service](Service.md).[merge](Service.md#merge)

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:239

___

### mergeStore

▸ **mergeStore**(`values`): [`Store`](Store.md)<`T`\>

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

[`Store`](Store.md)<`T`\>

#### Inherited from

[Service](Service.md).[mergeStore](Service.md#mergestore)

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:47

___

### mutate

▸ **mutate**(`key`, `mutationFn`): [`Store`](Store.md)<`T`\>

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

[`Store`](Store.md)<`T`\>

#### Inherited from

[Service](Service.md).[mutate](Service.md#mutate)

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:230

___

### mutateStore

▸ **mutateStore**(`mutationFn`): [`Store`](Store.md)<`T`\>

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

[`Store`](Store.md)<`T`\>

#### Inherited from

[Service](Service.md).[mutateStore](Service.md#mutatestore)

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

#### Inherited from

[Service](Service.md).[register](Service.md#register)

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

#### Inherited from

[Service](Service.md).[registered](Service.md#registered)

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:65

___

### remove

▸ **remove**(`key`): [`Store`](Store.md)<`T`\>

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

[`Store`](Store.md)<`T`\>

#### Inherited from

[Service](Service.md).[remove](Service.md#remove)

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:261

___

### set

▸ **set**(`key`, `value`): [`Store`](Store.md)<`T`\>

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

[`Store`](Store.md)<`T`\>

#### Inherited from

[Service](Service.md).[set](Service.md#set)

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:209

___

### setStore

▸ **setStore**(`repository`): [`Store`](Store.md)<`T`\>

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

[`Store`](Store.md)<`T`\>

#### Inherited from

[Service](Service.md).[setStore](Service.md#setstore)

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

[Service](Service.md).[transform](Service.md#transform)

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

[Service](Service.md).[transformStore](Service.md#transformstore)

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:57
