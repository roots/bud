[@roots/budpack](../README.md) › [Globals](../globals.md) › ["purge"](_purge_.md)

# Module: "purge"

## Index

### Functions

* [purge](_purge_.md#const-purge)

## Functions

### `Const` purge

▸ **purge**(`__namedParameters`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [purge.js:37](https://github.com/roots/bud-support/blob/91a13d1/src/budpack/builder/api/purge.js#L37)*

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

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud
