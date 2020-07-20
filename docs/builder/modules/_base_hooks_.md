[@roots/budpack](../README.md) › [Globals](../globals.md) › ["base/hooks"](_base_hooks_.md)

# Module: "base/hooks"

## Index

### Type aliases

* [Hooks](_base_hooks_.md#hooks)

### Object literals

* [hooks](_base_hooks_.md#const-hooks)

## Type aliases

###  Hooks

Ƭ **Hooks**: *object*

*Defined in [base/hooks.ts:1](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/hooks.ts#L1)*

#### Type declaration:

* **call**(): *function*

  * (`name`: string, `params`: any): *void*

* **getAll**: *Function*

* **make**: *Function*

* **on**(): *function*

  * (`name`: string, `callback`: Function): *void*

* **registered**: *Object*

## Object literals

### `Const` hooks

### ▪ **hooks**: *object*

*Defined in [base/hooks.ts:12](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/hooks.ts#L12)*

Hooks

###  registered

• **registered**: *object*

*Defined in [base/hooks.ts:13](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/hooks.ts#L13)*

#### Type declaration:

###  call

▸ **call**(`name`: string, ...`params`: [any]): *void*

*Defined in [base/hooks.ts:47](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/hooks.ts#L47)*

Call

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`...params` | [any] |

**Returns:** *void*

###  getAll

▸ **getAll**(): *[string, unknown][]*

*Defined in [base/hooks.ts:25](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/hooks.ts#L25)*

Get all

**`property`** {function} getAll

**Returns:** *[string, unknown][]*

###  make

▸ **make**(`fn`: (Anonymous function)): *object*

*Defined in [base/hooks.ts:19](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/hooks.ts#L19)*

Make

**`property`** {function} make

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fn` | (Anonymous function) | () => null |

**Returns:** *object*

* **fired**: *boolean* = false

* **fn**: *(Anonymous function)*

###  on

▸ **on**(`name`: string, `callback`: Function): *any*

*Defined in [base/hooks.ts:33](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/base/hooks.ts#L33)*

On

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`callback` | Function |

**Returns:** *any*
