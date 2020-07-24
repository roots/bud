# Module: "bud/api/purge"

## Functions

### `Const` purge

▸ **purge**(`__namedParameters`: object): *[Bud](_bud_util_types_.md#bud)*

*Defined in [src/bud/api/purge.ts:20](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/purge.ts#L20)*

## bud.purge

Purge unused CSS from compiled stylesheets

**`see`** https://purgecss.com/guides/wordpress.html

**`see`** https://purgecss.com/configuration.html

```js
bud.purge({
  enabled: bud.inProduction,
  content: [bud.project('resources/views/**')],
  allow: require('purgecss-with-wordpress').whitelist,
  allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
})
```

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`options` | options | - |

**Returns:** *[Bud](_bud_util_types_.md#bud)*
