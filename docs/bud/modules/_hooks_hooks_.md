# Module: "hooks/hooks"

## Object literals

### hooks

### ▪ **hooks**: _object_

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

### registered

• **registered**: _object_

Defined in hooks/hooks.js:25

Registered hooks.

#### Type declaration:

### call

▸ **call**(`name`: any): _void_

Defined in hooks/hooks.js:52

Call a bud hook.

**Parameters:**

| Name   | Type |
| ------ | ---- |
| `name` | any  |

**Returns:** _void_

### getAll

▸ **getAll**(): _[string, any][]_

Defined in hooks/hooks.js:36

Get all bud hook entries.

**Returns:** _[string, any][]_

### make

▸ **make**(`fn`: any): _object_

Defined in hooks/hooks.js:29

Make a bud hook

**Parameters:**

| Name | Type |
| ---- | ---- |
| `fn` | any  |

**Returns:** _object_

- **fired**: _boolean_ = false

- **fn**: _any_ = fn

### on

▸ **on**(`name`: any, `callback`: any): _[hooks](_hooks_hooks_.md#hooks)_

Defined in hooks/hooks.js:42

Register a function as a bud hook.

**Parameters:**

| Name       | Type |
| ---------- | ---- |
| `name`     | any  |
| `callback` | any  |

**Returns:** _[hooks](_hooks_hooks_.md#hooks)_
