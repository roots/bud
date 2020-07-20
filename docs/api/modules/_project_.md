[@roots/budpack](../README.md) › [Globals](../globals.md) › ["project"](_project_.md)

# Module: "project"

## Index

### Functions

* [project](_project_.md#const-project)

## Functions

### `Const` project

▸ **project**(`relativePath`: string): *string*

*Defined in [project.js:17](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/api/project.js#L17)*

## bud.project

Yield an absolute path from a path relative to the `bud.projectPath`.

### Example

```js
bud.project('package.json') // absolute path to package.json
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`relativePath` | string | relative path |

**Returns:** *string*

absolutePath
