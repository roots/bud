[@roots/budpack](../globals.md) › ["purge"](_purge_.md)

# Module: "purge"

## Index

### Functions

* [purge](_purge_.md#const-purge)

## Functions

### `Const` purge

▸ **purge**(`options`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [purge.js:33](https://github.com/roots/bud-support/blob/5442f65/src/budpack/builder/api/purge.js#L33)*

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

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud
