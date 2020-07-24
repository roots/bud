# Module: "bud/hooks/hooks"

## Object literals

### `Const` hooks

### ▪ **hooks**: *object*

*Defined in [src/bud/hooks/hooks.ts:18](https://github.com/roots/bud-support/blob/bd00b72/src/bud/hooks/hooks.ts#L18)*

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

###  registered

• **registered**: *object*

*Defined in [src/bud/hooks/hooks.ts:22](https://github.com/roots/bud-support/blob/bd00b72/src/bud/hooks/hooks.ts#L22)*

Registered hooks.

#### Type declaration:

###  call

▸ **call**(`name`: string, ...`params`: [any]): *void*

*Defined in [src/bud/hooks/hooks.ts:52](https://github.com/roots/bud-support/blob/bd00b72/src/bud/hooks/hooks.ts#L52)*

Call a bud hook.

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`...params` | [any] |

**Returns:** *void*

###  getAll

▸ **getAll**(): *[string, unknown][]*

*Defined in [src/bud/hooks/hooks.ts:32](https://github.com/roots/bud-support/blob/bd00b72/src/bud/hooks/hooks.ts#L32)*

Get all bud hook entries.

**Returns:** *[string, unknown][]*

###  make

▸ **make**(`fn`: (Anonymous function)): *object*

*Defined in [src/bud/hooks/hooks.ts:27](https://github.com/roots/bud-support/blob/bd00b72/src/bud/hooks/hooks.ts#L27)*

Make a bud hook

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fn` | (Anonymous function) | () => null |

**Returns:** *object*

* **fired**: *boolean* = false

* **fn**: *(Anonymous function)*

###  on

▸ **on**(`name`: string, `callback`: Function): *any*

*Defined in [src/bud/hooks/hooks.ts:39](https://github.com/roots/bud-support/blob/bd00b72/src/bud/hooks/hooks.ts#L39)*

Register a function as a bud hook.

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`callback` | Function |

**Returns:** *any*
