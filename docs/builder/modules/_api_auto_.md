[@roots/budpack](../README.md) › [Globals](../globals.md) › ["api/auto"](_api_auto_.md)

# Module: "api/auto"

## Index

### Type aliases

* [Auto](_api_auto_.md#auto)

### Functions

* [auto](_api_auto_.md#const-auto)

## Type aliases

###  Auto

Ƭ **Auto**: *function*

Defined in api/auto.ts:27

#### Type declaration:

▸ (`options`: object): *bud*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

## Functions

### `Const` auto

▸ **auto**(`options`: object): *bud*

Defined in api/auto.ts:10

## bud.auto

Automatically load modules instead of needing to import them.

```js
bud.auto({jquery: ['$', 'window.jQuery']})
```

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

**Returns:** *bud*
