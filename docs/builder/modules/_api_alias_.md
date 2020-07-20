[@roots/budpack](../README.md) › [Globals](../globals.md) › ["api/alias"](_api_alias_.md)

# Module: "api/alias"

## Index

### Functions

* [alias](_api_alias_.md#const-alias)

## Functions

### `Const` alias

▸ **alias**(`options`: any): *["index"](_index_.md)*

*Defined in [api/alias.js:20](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/api/alias.js#L20)*

## bud.alias

Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.

Having defined this alias:

```js
bud.alias({'scripts': bud.src('scripts')})
```

You can now reference scripts against that alias in your import statements:

```js
import 'scripts/myScript' // replacing '../../myScript'
```

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *["index"](_index_.md)*

bud
