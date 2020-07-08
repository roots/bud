[@roots/budpack](../globals.md) › ["api/alias"](_api_alias_.md)

# Module: "api/alias"

## Index

### Functions

* [alias](_api_alias_.md#const-alias)

## Functions

### `Const` alias

▸ **alias**(`options`: object): *["index"](_index_.md)*

*Defined in [api/alias.js:10](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/api/alias.js#L10)*

Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.

**`example`**
 bud.alias({'scripts': bud.src('scripts')})
 ↪️ import 'scripts/myScript'

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

**Returns:** *["index"](_index_.md)*
