---
description: The Bud container component is a swiss-army knife for collecting and manipulating data.
---

# bud.container

Many of the objects you will most frequently be using when working with Bud are an instance or extension of `@roots/container`.

Values are stored in `container.repository`. The rest of the `container` class provides an interface to work with these values.

## Instantiate

```ts
const tutorial = bud.makeContainer({
  introduction: 'Many of the objects...',
})
```

## Getters

### container.get

Returns the value associated with a given key.

```ts
tutorial.get('introduction')
// 'Many of the objects...'
```

You can request a nested value using dot notation syntax.

So, this lengthy destructuring:

```ts
const {
  deeply: {
    nested: {value},
  },
} = tutorial.get('some')
```

Can instead be expressed as:

```ts
tutorial.get('some.deeply.nested.value')
```

### container.all

Returns the repository contents as they are.

```ts
const items = tutorial.all()
// => {introduction: 'Many of the objects..'}
```

### container.entries

Returns the repository in `[key, value]` format.

```ts
const items = tutorial.entries()
// => [['introduction', 'Many of the objects...']]
```

### container.keys

Returns an array of the `repository` keys.

```ts
const items = tutorial.keys()
// => ['introduction']
```

### container.values

Returns an array of the `repository` values.

```ts
const items = tutorial.values()
// => ['Many of of the objects...']
```

## Setters

### container.set

Sets the value associated with a given key.

```ts
webpack.set('entry', {app: ['app.js']})
```

You can set a nested value using dot notation syntax. This is particularly useful when modifying a nested value while trying to preserve the rest of the object.

For instance:

```ts
const some = tutorial.get('some')

some.deeply.nested.value = 'phew'

tutorial.set('some', some)
```

Can be simplifed to:

```ts
tutorial.set('some.deeply.nested.value', 'phew')
```

### container.merge

Objects can be merged by key

```ts
tutorial.merge('entry', {admin: ['admin.js']})
```

After the merge, `tutorial.get('entry')` yields:

```ts
{
  app: ['app.js'],
  admin: ['admin.js'],
}
```

## Mutations

### container.mutate

Mutate a value using a callback.

```ts
webpack.mutate('entry', entry => ({
  ...entry,
  mapbox: ['mapbox.js'],
}))
```

The callback is passed the value associated with the requested key and returns the replacement value.

This is a more succint, functional replacement for relatively common tasks that would otherwise require:

1. calling `container.get` to get a value.
2. performing an operation on that value.
3. calling `container.set` to replace it.

## Conditionals

### container.true

Returns `true` if the associated value is literally `true`. Returns `false` otherwise.

```ts
container.set('enabled', true)
container.true('enabled')
// => true
```

```ts
container.set('enabled', 1)
container.true('enabled')
// => false
```

### container.truthy

Returns `true` if the associated value resembles `true` [according to various woefully complicated and somewhat artbitary criterion](https://developer.mozilla.org/en-US/docs/Glossary/Truthy). Returns `false` if it isn't even in the ballpark.

The fast-and-loose version of `container.true`. Allows for type coercion.

```ts
container.set('enabled', true)
container.true('enabled')
// => true
```

```ts
container.set('enabled', 1)
container.true('enabled')
// => true
```
