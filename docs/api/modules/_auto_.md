[@roots/budpack](../README.md) › [Globals](../globals.md) › ["auto"](_auto_.md)

# Module: "auto"

## Index

### Type aliases

* [Auto](_auto_.md#auto)

### Functions

* [auto](_auto_.md#const-auto)

## Type aliases

###  Auto

Ƭ **Auto**: *function*

Defined in auto.ts:27

#### Type declaration:

▸ (`options`: object): *bud*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

## Functions

### `Const` auto

▸ **auto**(`options`: object): *bud*

Defined in auto.ts:10

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
