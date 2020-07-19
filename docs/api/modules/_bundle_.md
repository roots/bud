[@roots/budpack](../README.md) › [Globals](../globals.md) › ["bundle"](_bundle_.md)

# Module: "bundle"

## Index

### Functions

* [bundle](_bundle_.md#const-bundle)

## Functions

### `Const` bundle

▸ **bundle**(`name`: string, `entries`: any[]): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [bundle.js:17](https://github.com/roots/bud-support/blob/91a13d1/src/budpack/builder/api/bundle.js#L17)*

## bud.bundle

Compile a group of assets.

```js
bud.bundle('app', [
  bud.src('app.js'),
  bud.src('app.css'),
])
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | output name. |
`entries` | any[] | array of src assets to include in the bundle. |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

bud
