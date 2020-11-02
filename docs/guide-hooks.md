---
description: Manipulate and expose internal values from the Framework and extensions.
---

# Hooks

Bud provides a system of 'hooks' to expose values for easier modification.

## bud.hooks.on: modify compile-time values

Hooks are defined as functions. Hook functions are registered with `bud.hooks.on`

`bud.hooks.on` takes two parameters:

- The `name` of the `filter` being hooked.
- The `function` to filter with.

### Signature

```ts
function (name: string, function: (any) => any)
```

### Usage examples

Add a new entry to the `webpack.externals` configuration:

```js
bud.hooks.on('webpack.externals', externals => ({
  ...externals,
  $: 'jquery',
})
```

Change the `webpack.output.filename` format:

```js
bud.hooks.on('webpack.output.filename', () => '[name].[hash:4]')
```

Replace the regular expression used for CSS modules:

```js
bud.hooks.on(
  'webpack.module.rules.oneOf.css.test',
  () => /\.css$/,
)
```

## bud.hooks.filter: register a new hookable value

Filter functions are the other side of the coin. They are registered with `bud.hooks.filter`

`bud.hooks.filter` takes two parameters:

- The `name` of the `filter` to hook onto.
- The `value` which is being filtered

### Usage

A `value` is passed through the `my.filter.key` filter.

```js
const filteredValue = bud.hooks.filter('my.filter.key', value)
```

Now, the user and other extensions have access to this value and can modify it.

```js
bud.hooks.on('my.filter.key', value => value.shift())
```
