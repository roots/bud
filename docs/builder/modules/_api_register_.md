[@roots/budpack](../README.md) › [Globals](../globals.md) › ["api/register"](_api_register_.md)

# Module: "api/register"

## Index

### Type aliases

* [Register](_api_register_.md#register)

### Functions

* [register](_api_register_.md#const-register)

## Type aliases

###  Register

Ƭ **Register**: *function*

Defined in api/register.ts:25

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

Defined in api/register.ts:16

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
