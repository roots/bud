# Module: "bud/api/alias"

## Functions

### `Const` alias

▸ **alias**(`this`: [Bud](_bud_util_types_.md#bud), `options`: object): *[Bud](_bud_util_types_.md#bud)*

*Defined in [src/bud/api/alias.ts:21](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/alias.ts#L21)*

## bud.alias

Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.

Having defined this alias:

```js
bud.alias({'scripts': bud.src('scripts')})
```

You can now reference scripts against that alias in your import statements:

```js
import 'scripts/myScript' // replacing '../../myScript'
```

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](_bud_util_types_.md#bud) |
`options` | object |

**Returns:** *[Bud](_bud_util_types_.md#bud)*
