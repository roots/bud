[@roots/budpack](../globals.md) › ["alias"](_alias_.md)

# Module: "alias"

## Index

### Functions

* [alias](_alias_.md#const-alias)

## Functions

### `Const` alias

▸ **alias**(`options`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [alias.js:9](https://github.com/roots/bud-support/blob/5442f65/src/budpack/builder/api/alias.js#L9)*

Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.

**`example`** 
 bud.alias({'scripts': bud.src('scripts')})
 ↪️ import 'scripts/myScript'

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud
