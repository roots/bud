[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/api/purge"](_builder_api_purge_.md)

# Module: "builder/api/purge"

## Index

### Functions

* [purge](_builder_api_purge_.md#const-purge)

## Functions

### `Const` purge

▸ **purge**(`__namedParameters`: object): *["builder/index"](_builder_index_.md)*

Defined in src/builder/api/purge.js:37

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

**Returns:** *["builder/index"](_builder_index_.md)*

bud
