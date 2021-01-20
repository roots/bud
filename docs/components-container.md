---
description: The Bud container component is a swiss-army knife for collecting and manipulating data.
---

# Container

::: warning Work-in-progress
Documentation is incomplete. :::

Many of the objects you will most frequently be using when working with Bud are an instance or extension of `@roots/container`.

Values are stored in `container.repository`. The rest of the `container` class provides an interface to work with these values.

[[toc]]

## Instantiate

```ts
bud.makeContainer({
  introduction: 'Many of the objects...',
})
```

## container.all

Alias for `container.getStore`

```ts
container.all()
```

## container.setStore

Replace the store with an all new set of values

```ts
container.setStore({
  new: ['store', 'contents'],
})
```

## container.mergeStore

Merge values onto the container store.

```ts
container.mergeStore({test: 'foo'})
```

## container.transformStore

Retrieve the container store, running it through the supplied fn before
returning the value. Does not mutate the store.

```ts
const storeSansKey = container.transformStore(store => {
  delete store.key
  return store
})
```

## container.mutateStore

Retrieve the container store, running it through the supplied fn before
returning the value. Mutates the store.

```ts
container.mutateStore(store => {
  delete store[key]
  return store
})

container.has(key)
// => false
```

## container.mutateStoreEntries

Retrieve the container store as `Object.entries` tuples, running each tuple through the supplied fn before returning the value. Mutates the store.

```ts
container.mutateStoreEntries((key, value) => value + 1)
// All store values incremented by 1 (... or concatenaed)
```

## container.get

Get a value from the container. Nested objects can be retrieved using dot notation.

```ts
container.get('container.container-item')
```

## container.getEntries

Get container value as an array of [K, V] tuples.

```ts
container.getEntries('some-key')
```

If no key is passed, the store itself will be returned in the same format:

```ts
container.getEntries()
```

## container.fromEntries

Set container values from [K, V] tuples.

```ts
container.fromEntries([
  ['key', value],
  ['another-key', anotherValue],
])
```

## container.withEntries

Get the store values as [K, V] tuples. Pass each one to a supplied callback.

```ts
container.withEntries('key', (key, value) =>
  doSomething.with(key).and(value),
)
```

## container.mutateEntries

Mutate each value via a supplied mutagen.

```ts
container.mutateEntries('key', (key, value) => value + 1)
```

## container.getValues

Get an item's values

```ts
container.getValues('some.key')
```

If no key is supplied the values from the entire store will be returned as an array.

```ts
container.getValues()
```

## container.getKeys

Get an item's keys

```ts
container.getKeys('some.key')
```

If no key is supplied the keys from the entire store will be returned as an array.

```ts
container.getKeys()
```

## container.getMap

Get an item a a Map datatype.

```ts
container.getMap('item')
```

If no key is supplied a map will be made of the entire store.

```ts
container.getMap()
```

## container.set

Set a value on a container item.

```ts
container.set('key', value)
```

## container.transform

Retrieve a container item, running its value through the supplied function.

```ts
container.transform('key', value => value + 1)
```

## container.mutate

Retrieve a container item, running its value through the supplied mutagen.

This is a more succint, functional replacement for relatively common tasks that would otherwise require:

1. calling `container.get` to get a value.
2. performing an operation on that value.
3. calling `container.set` to replace it.

```ts
container.mutate('key', current => updated)
```

## container.merge

Merge a container item.

```ts
container.merge('key', {value: 'to merge'})
```

## container.has

Return a boolean indicating if a given key exists in the repository.

```ts
container.has('key')
// => true if repository['key'] exists
```

## container.remove

Delete an item from the repository

```ts
container.remove('key')
// same as: delete container.repository['key']
```

## container.is

Return a boolean indicating if the given key matches the given value.

```ts
container.is('my-key', {whatever: 'value'})
// True if container.repository['my-key'] === {whatever: 'value'}
```

## container.isTrue

Return a boolean indicating if the given key's value is `true`.

```ts
container.isTrue('my-key')
// True if container.repository['my-key'] === true
```

## container.enabled

Alias for [container.isTrue](#container.isTrue)

## container.isFalse

Return a boolean indicating if the given key's value is `false`.

```ts
container.isFalse'my-key')
// True if container.repository['my-key'] === false
```

## container.disabled

Alias for [container.isFalse](#container.isFalse)

## container.enable

Set the value of the given key to `true`.

```ts
container.enable('my-key')
```

## container.disable

Set the value of the given key to `false`.

```ts
container.disable('my-key')
```

## container.isIndexed

Return true if object is likely a vanilla object with string keys

```ts
container.isIndexed('my-key')
// => True if container.repository['my-key'] appears to be an object.
```

## container.isArray

Return true if value is an array.

```ts
container.isArray('my-key')
// => true if container.repository['my-key'] is an array.
```

## container.isNotArray

Return true if value is not an array.

```ts
container.isNotArray('my-key')
// => true if container.repository['my-key'] is not an array.
```

## container.isString

Return true if value is an string.

```ts
container.isString('my-key')
// => true if container.repository['my-key'] is a string.
```

## container.isNotString

Return true if value is not an string.

```ts
container.isNotString('my-key')
// => true if container.repository['my-key'] is not a string.
```

## container.isNumber

Return true if value is an number.

```ts
container.isNumber('my-key')
// => true if container.repository['my-key'] is a number.
```

## container.isNotNumber

Return true if value is not an number.

```ts
container.isNotNumber('my-key')
// => true if container.repository['my-key'] is not a number.
```

## container.isNull

Return true if value is null.

```ts
container.isNull('my-key')
// => true if container.repository['my-key'] is a null.
```

## container.isNotNull

Return true if value is not null.

```ts
container.isNotNull('my-key')
// => true if container.repository['my-key'] is not a null.
```

## container.isDefined

Return true if value is defined.

```ts
container.isDefined('my-key')
// => true if container.repository['my-key'] is a defined.
```

## container.isNotDefined

Return true if value is not defined.

```ts
container.isNotDefined('my-key')
// => true if container.repository['my-key'] is not a defined.
```
