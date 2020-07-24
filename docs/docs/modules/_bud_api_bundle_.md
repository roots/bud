# Module: "bud/api/bundle"

## Functions

### `Const` bundle

▸ **bundle**(`this`: [Bud](_bud_util_types_.md#bud), `name`: string, `entries`: object): *[Bud](_bud_util_types_.md#bud)*

*Defined in [src/bud/api/bundle.ts:15](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/bundle.ts#L15)*

## bud.bundle

Compile a group of assets.

```js
bud.bundle('app', [
  bud.src('app.js'),
  bud.src('app.css'),
])
```

**Parameters:**

Name | Type |
------ | ------ |
`this` | [Bud](_bud_util_types_.md#bud) |
`name` | string |
`entries` | object |

**Returns:** *[Bud](_bud_util_types_.md#bud)*
