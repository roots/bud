[@roots/budpack](../README.md) › [Globals](../globals.md) › ["api/bundle"](_api_bundle_.md)

# Module: "api/bundle"

## Index

### Functions

* [bundle](_api_bundle_.md#const-bundle)

## Functions

### `Const` bundle

▸ **bundle**(`name`: string, `entries`: any[]): *["index"](_index_.md)*

*Defined in [api/bundle.js:17](https://github.com/roots/bud-support/blob/bc9161d/src/budpack/builder/api/bundle.js#L17)*

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

**Returns:** *["index"](_index_.md)*

bud
