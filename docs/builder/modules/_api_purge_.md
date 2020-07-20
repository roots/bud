[@roots/budpack](../README.md) › [Globals](../globals.md) › ["api/purge"](_api_purge_.md)

# Module: "api/purge"

## Index

### Functions

* [purge](_api_purge_.md#const-purge)

## Functions

### `Const` purge

▸ **purge**(`__namedParameters`: object): *["index"](_index_.md)*

*Defined in [api/purge.js:37](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/api/purge.js#L37)*

## bud.purge

Purge unused CSS from compiled stylesheets

**`see`** https://purgecss.com/guides/wordpress.html

**`see`** https://purgecss.com/configuration.html

### Example

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
`enabled` | any | true |
`options` | any | - |

**Returns:** *["index"](_index_.md)*

bud
