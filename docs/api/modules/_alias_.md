[@roots/budpack](../README.md) › [Globals](../globals.md) › ["alias"](_alias_.md)

# Module: "alias"

## Index

### Functions

* [alias](_alias_.md#const-alias)

## Functions

### `Const` alias

▸ **alias**(`options`: any): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [alias.js:20](https://github.com/roots/bud-support/blob/a7a0906/src/budpack/builder/api/alias.js#L20)*

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

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud
