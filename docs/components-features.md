---
description: Container for booleans representing if a feature should be used.
---

# Features

`bud.features` is a container of boolean values representing whether particular features should be used in a build.

## bud.features.enable

Enable a feature.

```js
bud.features.enable('gzip')
```

## bud.features.enabled

Returns a boolean value:

- `true` if a feature is enabled.
- `false` otherwise.

```js
const isEnabled = bud.features.enabled('gzip)
// => true
```

## bud.features.disable

Disable a feature

```js
bud.features.disable('gzip')
```

## bud.features.disabled

Returns a boolean value:

- `true` if a feature is disabled.
- `false` otherwise.

```js
const isEnabled = bud.features.disabled('gzip)
// => true
```
