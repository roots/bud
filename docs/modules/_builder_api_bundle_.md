[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/api/bundle"](_builder_api_bundle_.md)

# Module: "builder/api/bundle"

## Index

### Functions

* [bundle](_builder_api_bundle_.md#const-bundle)

## Functions

### `Const` bundle

▸ **bundle**(`name`: string, `entries`: any[]): *["builder/index"](_builder_index_.md)*

Defined in src/builder/api/bundle.js:17

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

**Returns:** *["builder/index"](_builder_index_.md)*

bud
