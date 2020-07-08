[@roots/budpack](../globals.md) › ["api/dependencyManifest"](_api_dependencymanifest_.md)

# Module: "api/dependencyManifest"

## Index

### Functions

* [dependencyManifest](_api_dependencymanifest_.md#const-dependencymanifest)

## Functions

### `Const` dependencyManifest

▸ **dependencyManifest**(`settings`: object): *["index"](_index_.md)*

*Defined in [api/dependencyManifest.js:17](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/api/dependencyManifest.js#L17)*

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

**Returns:** *["index"](_index_.md)*

bud
