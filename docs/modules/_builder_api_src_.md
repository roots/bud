[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/api/src"](_builder_api_src_.md)

# Module: "builder/api/src"

## Index

### Functions

* [src](_builder_api_src_.md#const-src)

## Functions

### `Const` src

▸ **src**(`relativePath`: string): *string*

Defined in src/builder/api/src.js:16

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
