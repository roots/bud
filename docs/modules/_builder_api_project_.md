[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/api/project"](_builder_api_project_.md)

# Module: "builder/api/project"

## Index

### Functions

* [project](_builder_api_project_.md#const-project)

## Functions

### `Const` project

▸ **project**(`relativePath`: string): *string*

Defined in src/builder/api/project.js:17

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
