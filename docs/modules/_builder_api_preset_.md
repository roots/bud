[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/api/preset"](_builder_api_preset_.md)

# Module: "builder/api/preset"

## Index

### Functions

* [preset](_builder_api_preset_.md#const-preset)

## Functions

### `Const` preset

▸ **preset**(`relativePath`: string): *string*

Defined in src/builder/api/preset.js:25

## bud.preset

Retrieve a Bud framework preset.

### Examples

```js
bud.preset('babel/postcss')
```

```js
bud.preset('babel/preset-react')
```

```js
bud.preset('tsconfig')
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relativePath` | string | relative path |

**Returns:** *string*

absolutePath
