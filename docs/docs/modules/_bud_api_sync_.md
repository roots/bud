# Module: "bud/api/sync"

## Functions

### `Const` sync

▸ **sync**(`__namedParameters`: object): *[Bud](_bud_util_types_.md#bud)*

*Defined in [src/bud/api/sync.ts:17](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/sync.ts#L17)*

## bud.sync

Configure BrowserSync.

```js
bud.sync({
  enabled: !bud.inProduction,
  proxy: 'http://bud.test',
  host: 'localhost',
  port: 3000,
})
```

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`enabled` | boolean |
`options` | Options |

**Returns:** *[Bud](_bud_util_types_.md#bud)*
