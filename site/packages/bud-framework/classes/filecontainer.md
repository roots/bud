---
id: "filecontainer"
title: "Class: FileContainer"
sidebar_label: "FileContainer"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Container`](container.md)

  ↳ **`FileContainer`**

## Constructors

### constructor

• **new FileContainer**(`baseDir?`)

Class constructor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseDir?` | `string` |

#### Overrides

[Container](container.md).[constructor](container.md#constructor)

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:22

## Properties

### \_baseDir

• **\_baseDir**: `string`

Base directory

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:22

___

### from

• **from**: `Object`

resolveFrom (better resolve)

#### Call signature

▸ (`fromDirectory`, `moduleId`): `string`

Resolve the path of a module like [`require.resolve()`](https://nodejs.org/api/globals.html#globals_require_resolve) but from a given path.

**`example`**
```
import resolveFrom = require('resolve-from');

// There is a file at `./foo/bar.js`

resolveFrom('foo', './bar');
//=> '/Users/sindresorhus/dev/test/foo/bar.js'
```

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fromDirectory` | `string` | Directory to resolve from. |
| `moduleId` | `string` | What you would use in `require()`. |

##### Returns

`string`

Resolved module path. Throws when the module can't be found.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `silent` | (`fromDirectory`: `string`, `moduleId`: `string`) => `string` |

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:18

___

### fs

• **fs**: `__module`

FS-Extra library

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:10

___

### ident

• **ident**: ``"@roots/container"``

Identify

#### Inherited from

[Container](container.md).[ident](container.md#ident)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:15

___

### path

• **path**: `PlatformPath`

PlatformPath

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:14

___

### repository

• **repository**: `any`

The container store

#### Inherited from

[Container](container.md).[repository](container.md#repository)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:19

## Accessors

### baseDir

• `get` **baseDir**(): `string`

## getBase

Returns the FS base directory.

### Usage

```
fsInstance.getBase()
```

#### Returns

`string`

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:50

• `set` **baseDir**(`dir`): `void`

## setBase

Set the FS base directory.

### Usage

```
fsInstance.setBase(__dirname)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `dir` | `string` |

#### Returns

`void`

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:38

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

[Container](container.md).[all](container.md#all)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:35

___

### each

▸ **each**(`key`, `callFn`): [`FileContainer`](filecontainer.md)

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

[`FileContainer`](filecontainer.md)

#### Inherited from

[Container](container.md).[each](container.md#each)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:153

___

### ensure

▸ **ensure**(`key`): `void`

## ensure

Create a file if it does not already exist. Will also create an
associated repository entry if it doesn't exist.

### Usage

```js
fsInstance.ensure('some/file.js')
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`void`

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:121

___

### ensureDir

▸ **ensureDir**(`key`): `void`

## ensureDir

Create a directory if it does not already exist. Will also create an
associated repository entry if it doesn't exist.

### Usage

```js
fsInstance.ensureDir('some/file.js')
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`void`

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:134

___

### every

▸ **every**(`fn`): [`FileContainer`](filecontainer.md)

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

[`FileContainer`](filecontainer.md)

#### Inherited from

[Container](container.md).[every](container.md#every)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:165

___

### exists

▸ **exists**(`key`): `boolean`

## exists

Return a boolean `true` if repository has a key and it's value
resolves to an actual disk location.

### Usage

```js
fsInstance.exists('some/file.js')
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:108

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

[Container](container.md).[findKey](container.md#findkey)

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

[Container](container.md).[findKeyIn](container.md#findkeyin)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:173

___

### fromEntries

▸ **fromEntries**(`entries`): [`FileContainer`](filecontainer.md)

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

[`FileContainer`](filecontainer.md)

#### Inherited from

[Container](container.md).[fromEntries](container.md#fromentries)

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

[Container](container.md).[get](container.md#get)

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

[Container](container.md).[getEntries](container.md#getentries)

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

[Container](container.md).[getKeys](container.md#getkeys)

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

[Container](container.md).[getMap](container.md#getmap)

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

[Container](container.md).[getValues](container.md#getvalues)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:192

___

### has

▸ **has**(`key`): `boolean`

## has

Return boolean `true` if key is a match.

### Usage

```js
fsInstance.has('some/file.js')
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`boolean`

#### Overrides

[Container](container.md).[has](container.md#has)

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:83

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

[Container](container.md).[is](container.md#is)

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

[Container](container.md).[isArray](container.md#isarray)

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

[Container](container.md).[isDefined](container.md#isdefined)

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

[Container](container.md).[isFalse](container.md#isfalse)

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

[Container](container.md).[isFunction](container.md#isfunction)

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

[Container](container.md).[isIndexed](container.md#isindexed)

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

[Container](container.md).[isNotArray](container.md#isnotarray)

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

[Container](container.md).[isNotNull](container.md#isnotnull)

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

[Container](container.md).[isNotNumber](container.md#isnotnumber)

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

[Container](container.md).[isNotString](container.md#isnotstring)

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

[Container](container.md).[isNull](container.md#isnull)

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

[Container](container.md).[isNumber](container.md#isnumber)

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

[Container](container.md).[isString](container.md#isstring)

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

[Container](container.md).[isTrue](container.md#istrue)

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

[Container](container.md).[isUndefined](container.md#isundefined)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:489

___

### ls

▸ **ls**(`key?`): `any`

## fs.ls

List repository contents.

### Usage

#### Parameters

| Name | Type |
| :------ | :------ |
| `key?` | `string` |

#### Returns

`any`

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:71

___

### merge

▸ **merge**(`key`, `value`): [`FileContainer`](filecontainer.md)

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

[`FileContainer`](filecontainer.md)

#### Inherited from

[Container](container.md).[merge](container.md#merge)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:280

___

### mergeStore

▸ **mergeStore**(`values`): [`FileContainer`](filecontainer.md)

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

[`FileContainer`](filecontainer.md)

#### Inherited from

[Container](container.md).[mergeStore](container.md#mergestore)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:61

___

### mutate

▸ **mutate**(`key`, `mutationFn`): [`FileContainer`](filecontainer.md)

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

[`FileContainer`](filecontainer.md)

#### Inherited from

[Container](container.md).[mutate](container.md#mutate)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:268

___

### mutateStore

▸ **mutateStore**(`mutationFn`): [`FileContainer`](filecontainer.md)

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

[`FileContainer`](filecontainer.md)

#### Inherited from

[Container](container.md).[mutateStore](container.md#mutatestore)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:87

___

### read

▸ **read**(`key`): `string`

## read

Read file contents as a utf8 encoded string.

### Usage

```js
fsInstance.read('some/file.md')
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:146

___

### readJson

▸ **readJson**(`key`): `Object`

## readJson

Retrieve file contents as a javascript object.

### Usage

```js
fsInstance.readJson('some/file.json')
// => {json: 'contents', as: 'an object'}
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Object`

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:159

___

### remove

▸ **remove**(`key`): [`FileContainer`](filecontainer.md)

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

[`FileContainer`](filecontainer.md)

#### Inherited from

[Container](container.md).[remove](container.md#remove)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:306

___

### require

▸ **require**(`key`): `NodeModule`

## require

NodeRequire a matching file as a module

### Usage

```js
fsInstance.require('path/to/module.js')
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`NodeModule`

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:200

___

### set

▸ **set**(`key`, `value`): [`FileContainer`](filecontainer.md)

## set

Set a value.

### Usage

```js
fsInstance.set('some/file.js', '/absolute/path/to/some/file.js')
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Returns

[`FileContainer`](filecontainer.md)

#### Overrides

[Container](container.md).[set](container.md#set)

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:95

___

### setDisk

▸ **setDisk**(`glob`): [`FileContainer`](filecontainer.md)

## setDisk

Establish the disk repository from an array of globs.

### Usage

```js
fsInstance.setDisk(['*.js', '!*.css.js'])
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `glob` | `string`[] |

#### Returns

[`FileContainer`](filecontainer.md)

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:62

___

### setStore

▸ **setStore**(`repository`): [`FileContainer`](filecontainer.md)

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

[`FileContainer`](filecontainer.md)

#### Inherited from

[Container](container.md).[setStore](container.md#setstore)

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

[Container](container.md).[transform](container.md#transform)

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

[Container](container.md).[transformStore](container.md#transformstore)

#### Defined in

packages/@roots/container/types/Container/index.d.ts:75

___

### write

▸ **write**(`key`, `content`): `void`

## write

Write file contents as a string

### Usage

```js
fsInstance.write('some/file.md', 'string contens')
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `content` | `string` |

#### Returns

`void`

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:173

___

### writeJson

▸ **writeJson**(`key`, `content`): `void`

## writeJson

Write file contents as a JSON object.

### Usage

```js
fsInstance.writeJson(
  'some/file.json',
  {json: 'file contents'},
)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `content` | `string` |

#### Returns

`void`

#### Defined in

packages/@roots/filesystem/types/FileContainer/index.d.ts:188
