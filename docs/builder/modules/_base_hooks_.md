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

*Defined in [base/hooks.ts:76](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/hooks.ts#L76)*

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

*Defined in [base/hooks.ts:25](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/hooks.ts#L25)*

## bud.hooks

Register callback.

```js
bud.hooks.on('hookName', function(value) {
  doSomething(value)
})}
```

Invoke registered callback(s)

```js
bud.hooks.call('hookName', value)
```

**`property`** {Hooks.registered} registered

**`property`** {Hooks.make} make - make a hook

**`property`** {Hooks.getAll} getAll - return all hooks

**`property`** {Hooks.on} on - Register hook

**`property`** {Hooks.call} call - Call a hook

###  registered

• **registered**: *object*

*Defined in [base/hooks.ts:30](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/hooks.ts#L30)*

Registered hooks.

**`property`** {Hooks.registered} registered

#### Type declaration:

###  call

▸ **call**(`name`: string, ...`params`: [any]): *void*

*Defined in [base/hooks.ts:64](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/hooks.ts#L64)*

Call

**`property`** {Hooks.call} call

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`...params` | [any] |

**Returns:** *void*

###  getAll

▸ **getAll**(): *[string, unknown][]*

*Defined in [base/hooks.ts:42](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/hooks.ts#L42)*

Get all

**`property`** {Hooks.getAll} getAll

**Returns:** *[string, unknown][]*

###  make

▸ **make**(`fn`: (Anonymous function)): *object*

*Defined in [base/hooks.ts:36](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/hooks.ts#L36)*

Make

**`property`** {Hooks.make} make

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fn` | (Anonymous function) | () => null |

**Returns:** *object*

* **fired**: *boolean* = false

* **fn**: *(Anonymous function)*

###  on

▸ **on**(`name`: string, `callback`: Function): *any*

*Defined in [base/hooks.ts:50](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/base/hooks.ts#L50)*

On

**`property`** {Hooks.on} on

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`callback` | Function |

**Returns:** *any*
