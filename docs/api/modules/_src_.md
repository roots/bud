[@roots/budpack](../README.md) › [Globals](../globals.md) › ["src"](_src_.md)

# Module: "src"

## Index

### Functions

* [src](_src_.md#const-src)

## Functions

### `Const` src

▸ **src**(`relativePath`: string): *string*

*Defined in [src.js:16](https://github.com/roots/bud-support/blob/a7a0906/src/budpack/builder/api/src.js#L16)*

## bud.src

Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.

### Example

```js
bud.src('scripts/app.js') // absolute path to the source file
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relativePath` | string | relative path |

**Returns:** *string*

absolutePath
