## Installation

```sh
yarn add @roots/bud-hooks
```

## bud.hooks.on

Hooks are registered with `bud.hooks.on`

`bud.hooks.on` takes two parameters:

- The `name` of the hook.
- Either a value or a function to filter a value through.

### hook usage

A hook can be a reference to a literal value:

```js
bud.hooks.on('build/entry', {
  app: ['app.js'],
})
```

Or, using a function, we can modify a value that is already hooked.

This example adds new entry to the `webpack.externals` configuration

```js
bud.hooks.on('build/externals', externals => ({
  ...externals,
  $: 'jquery',
})
```

A hook value doesn't have to already be set in order to register a function, but you will need to guard against type errors yourself:

```ts
bud.hooks.on('some-mystery-hook', value => ({
  ...(value ?? {}), // use a more robust guard if needed
  key: 'value',
}))
```

## bud.hooks.filter

Filters are registered with `bud.hooks.filter`.

It is a function that takes one parameter: the `name` of the `filter` to hook onto.

### filter usage

First, a value is registered with [bud.hooks.on](#hook-usage)

```js
// Register a value
const value = ['foo', 'bar']
bud.hooks.on('some-key', value)

// ...

// Later on, retrieve it
const filteredValue = bud.hooks.filter('some-key')
```

After registration but before it is filtered, the user and/or other extensions
now have access to this value and can modify it.

```js
bud.hooks.on('some-key', value => value.shift())
```

## Hooks reference

There is a compiled list of hooks used by @roots/bud core [available here](url:packages/@roots/bud-hooks/docs/hooks.md).
