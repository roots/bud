---
id: "Compiler"
title: "Class: Compiler"
sidebar_label: "Compiler"
sidebar_position: 0
custom_edit_url: null
---

Service: Compiler

**`sealed`**

## Hierarchy

- `Base`

  ↳ **`Compiler`**

## Constructors

### constructor

• **new Compiler**(`app`)

Class constructor

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | [`Framework`](Framework.md) |

#### Inherited from

Base.constructor

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:87

## Properties

### ident

• **ident**: ``"container"``

Identifier

#### Inherited from

Base.ident

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:10

___

### instance

• **instance**: `Instance`

{@link Webpack Webpack} instance

#### Inherited from

Base.instance

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:11

___

### isCompiled

• **isCompiled**: `boolean`

True if compiler is already instantiated

#### Inherited from

Base.isCompiled

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:23

___

### name

• **name**: `string` = `'compiler'`

#### Overrides

Base.name

#### Defined in

[packages/@roots/bud/src/services/Compiler/index.ts:9](https://github.com/roots/bud/blob/34e7c1a7/packages/@roots/bud/src/services/Compiler/index.ts#L9)

___

### progress

• **progress**: `any`

Compilation progress as reported by {@link ProgressPlugin}

#### Inherited from

Base.progress

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:19

___

### repository

• **repository**: `Object`

Container repository

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

Base.repository

#### Defined in

packages/@roots/bud-framework/types/Bootstrapper.d.ts:19

___

### stats

• **stats**: `StatsCompilation`

Compilation stats

#### Inherited from

Base.stats

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:15

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

Base.all

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:27

___

### before

▸ **before**(): `any`[]

Returns final webpack configuration

#### Returns

`any`[]

#### Inherited from

Base.before

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:40

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

Base.bindClass

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

Base.bindMacro

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

Base.boot

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

Base.booted

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

Base.bootstrap

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

Base.bootstrapped

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:47

___

### callback

▸ **callback**(...`args`): `void`

Webpack compilation callback

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`void`

#### Inherited from

Base.callback

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:45

___

### compile

▸ **compile**(): `Instance`

Initiate webpack compilation process

#### Returns

`Instance`

#### Inherited from

Base.compile

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:36

___

### each

▸ **each**(`key`, `callFn`): [`Compiler`](Compiler.md)

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

[`Compiler`](Compiler.md)

#### Inherited from

Base.each

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:125

___

### every

▸ **every**(`fn`): [`Compiler`](Compiler.md)

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

[`Compiler`](Compiler.md)

#### Inherited from

Base.every

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

Base.findKey

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

Base.findKeyIn

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:149

___

### fromEntries

▸ **fromEntries**(`entries`): [`Compiler`](Compiler.md)

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

[`Compiler`](Compiler.md)

#### Inherited from

Base.fromEntries

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

Base.get

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

Base.getEntries

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

Base.getKeys

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

Base.getMap

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

Base.getValues

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

Base.has

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

Base.is

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

Base.isArray

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

Base.isDefined

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

Base.isFalse

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

Base.isFunction

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

Base.isIndexed

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

Base.isNotArray

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

Base.isNotNull

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

Base.isNotNumber

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

Base.isNotString

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

Base.isNull

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

Base.isNumber

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

Base.isString

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

Base.isTrue

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

Base.isUndefined

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:401

___

### merge

▸ **merge**(`key`, `value`): [`Compiler`](Compiler.md)

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

[`Compiler`](Compiler.md)

#### Inherited from

Base.merge

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:239

___

### mergeStore

▸ **mergeStore**(`values`): [`Compiler`](Compiler.md)

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

[`Compiler`](Compiler.md)

#### Inherited from

Base.mergeStore

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:47

___

### mutate

▸ **mutate**(`key`, `mutationFn`): [`Compiler`](Compiler.md)

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

[`Compiler`](Compiler.md)

#### Inherited from

Base.mutate

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:230

___

### mutateStore

▸ **mutateStore**(`mutationFn`): [`Compiler`](Compiler.md)

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
| `mutationFn` | (`value?`: { [key: string]: `any`;  }) => { [key: string]: `any`;  } |

#### Returns

[`Compiler`](Compiler.md)

#### Inherited from

Base.mutateStore

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:68

___

### register

▸ **register**(): `void`

Lifecycle method: bootstrapped

**`remarks`**
Registers hooks filtered before and after
the instantiation of Webpack as well as one additional hook
which is filtered at the tail of the Webpack compiler callback.

#### Returns

`void`

#### Inherited from

Base.register

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:32

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

Base.registered

#### Defined in

packages/@roots/bud-framework/types/Service.d.ts:65

___

### remove

▸ **remove**(`key`): [`Compiler`](Compiler.md)

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

[`Compiler`](Compiler.md)

#### Inherited from

Base.remove

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:261

___

### set

▸ **set**(`key`, `value`): [`Compiler`](Compiler.md)

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

[`Compiler`](Compiler.md)

#### Inherited from

Base.set

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:209

___

### setStore

▸ **setStore**(`repository`): [`Compiler`](Compiler.md)

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

[`Compiler`](Compiler.md)

#### Inherited from

Base.setStore

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:38

___

### setup

▸ **setup**(`config`): `Compiler`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `any` |

#### Returns

`Compiler`

#### Inherited from

Base.setup

#### Defined in

packages/@roots/bud-compiler/types/Compiler/index.d.ts:41

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

Base.transform

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

Base.transformStore

#### Defined in

packages/@roots/container/types/Container/Container.d.ts:57
