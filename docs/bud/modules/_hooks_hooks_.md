# Module: "hooks/hooks"

## Object literals

###  hooks

### ▪ **hooks**: *object*

Defined in hooks/hooks.js:21

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

Defined in hooks/hooks.js:25

Registered hooks.

#### Type declaration:

###  call

▸ **call**(`name`: any): *void*

Defined in hooks/hooks.js:52

Call a bud hook.

**Parameters:**

Name | Type |
------ | ------ |
`name` | any |

**Returns:** *void*

###  getAll

▸ **getAll**(): *[string, any][]*

Defined in hooks/hooks.js:36

Get all bud hook entries.

**Returns:** *[string, any][]*

###  make

▸ **make**(`fn`: any): *object*

Defined in hooks/hooks.js:29

Make a bud hook

**Parameters:**

Name | Type |
------ | ------ |
`fn` | any |

**Returns:** *object*

* **fired**: *boolean* = false

* **fn**: *any* = fn

###  on

▸ **on**(`name`: any, `callback`: any): *[hooks](_hooks_hooks_.md#hooks)*

Defined in hooks/hooks.js:42

Register a function as a bud hook.

**Parameters:**

Name | Type |
------ | ------ |
`name` | any |
`callback` | any |

**Returns:** *[hooks](_hooks_hooks_.md#hooks)*
