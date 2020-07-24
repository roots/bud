# Module: "bud/api/auto"

## Functions

### `Const` auto

▸ **auto**(`this`: [Bud](_bud_util_types_.md#bud), `options`: object): *[Bud](_bud_util_types_.md#bud)*

*Defined in [src/bud/api/auto.ts:12](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/auto.ts#L12)*

## bud.auto

Automatically load modules instead of needing to import them.

```js
bud.auto({jquery: ['$', 'window.jQuery']})
```

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](_bud_util_types_.md#bud) |
`options` | object |

**Returns:** *[Bud](_bud_util_types_.md#bud)*
