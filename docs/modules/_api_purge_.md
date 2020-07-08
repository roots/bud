[@roots/budpack](../globals.md) › ["api/purge"](_api_purge_.md)

# Module: "api/purge"

## Index

### Functions

* [purge](_api_purge_.md#const-purge)

## Functions

### `Const` purge

▸ **purge**(`options`: object): *["index"](_index_.md)*

*Defined in [api/purge.js:34](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/api/purge.js#L34)*

Purge unused CSS from compiled stylesheets.

**`see`** https://purgecss.com/guides/wordpress.html

**`see`** https://purgecss.com/configuration.html

**`example`** 
bud.purge({
  enabled: bud.inProduction,
  content: [bud.project('resources/views/**')],
  allow: require('purgecss-with-wordpress').whitelist,
  allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
})

**Parameters:**

▪ **options**: *object*

purge options

Name | Type |
------ | ------ |
`content` | Object |
`css` | Object |
`defaultExtractor?` | Function |
`enabled` | boolean |
`extractors?` | array |
`fontFace` | boolean |
`keyframes` | boolean |
`output` | string |
`rejected` | boolean |
`stdin?` | boolean |
`stdout?` | boolean |
`variables?` | boolean |
`whitelist?` | string[] |
`whitelistPatterns?` | RegExp[] |
`whitelistPatternsChildren?` | RegExp[] |

**Returns:** *["index"](_index_.md)*

bud
