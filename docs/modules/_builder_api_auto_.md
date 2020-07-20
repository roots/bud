[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/api/auto"](_builder_api_auto_.md)

# Module: "builder/api/auto"

## Index

### Type aliases

* [Auto](_builder_api_auto_.md#auto)

### Functions

* [auto](_builder_api_auto_.md#const-auto)

## Type aliases

###  Auto

Ƭ **Auto**: *function*

Defined in src/builder/api/auto.ts:29

#### Type declaration:

▸ (`options`: object): *bud*

**Parameters:**

Name | Type |
------ | ------ |
`options` | object |

## Functions

### `Const` auto

▸ **auto**(`options`: object): *bud*

Defined in src/builder/api/auto.ts:10

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
