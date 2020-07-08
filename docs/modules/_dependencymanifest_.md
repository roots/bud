[@roots/budpack](../globals.md) › ["dependencyManifest"](_dependencymanifest_.md)

# Module: "dependencyManifest"

## Index

### Functions

* [dependencyManifest](_dependencymanifest_.md#const-dependencymanifest)

## Functions

### `Const` dependencyManifest

▸ **dependencyManifest**(`settings`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [dependencyManifest.js:17](https://github.com/roots/bud-support/blob/5442f65/src/budpack/builder/api/dependencyManifest.js#L17)*

Make a manifest of @wordpress dependencies utilized by entrypoints.

**`see`** https://git.io/JJLxM

**`example`** bud.dependencyManifest({outputFormat: 'js', injectPolyfill: false})

**Parameters:**

▪`Default value`  **settings**: *object*= {enabled: true}

Name | Type |
------ | ------ |
`combineAssets` | boolean |
`combinedOutputFile` | string |
`enabled?` | boolean |
`injectPolyfill` | boolean |
`outputFormat` | string |
`requestToExternal` | Function |
`requestToHandle` | Function |
`useDefaults` | boolean |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud
