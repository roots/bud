[@roots/budpack](../README.md) › [Globals](../globals.md) › ["api/alias"](_api_alias_.md)

# Module: "api/alias"

## Index

### Type aliases

* [Alias](_api_alias_.md#alias)

### Functions

* [alias](_api_alias_.md#const-alias)

## Type aliases

###  Alias

Ƭ **Alias**: *function*

Defined in api/alias.ts:28

#### Type declaration:

▸ (`options`: object): *bud*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

## Functions

### `Const` alias

▸ **alias**(`options`: object): *bud*

Defined in api/alias.ts:18

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
`options` | object |

**Returns:** *bud*
