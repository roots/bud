[@roots/budpack](../README.md) › [Globals](../globals.md) › ["register"](_register_.md)

# Module: "register"

## Index

### Type aliases

* [Register](_register_.md#register)

### Functions

* [register](_register_.md#const-register)

## Type aliases

###  Register

Ƭ **Register**: *function*

Defined in register.ts:25

#### Type declaration:

▸ (`name`: string, `plugin`: any): *bud*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`plugin` | any |

## Functions

### `Const` register

▸ **register**(`name`: string, `plugin`: any): *any*

Defined in register.ts:16

## bud.register

Register a Bud plugin

```js
bud.register('myPlugin', myPlugin)
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The plugin name |
`plugin` | any | The plugin object  |

**Returns:** *any*
