---
description: Specify the root directory of the project.
---

# bud.project

With no arguments, this function returns the project's root path.

Optionally, **bud.project** may be passed a path relative to the project root. In this case it returns the absolute path.

The root path used by this function is set by [bud.projectPath](config-projectPath.md).

## Usage

```js
bud.project('resources/views')
```

## Arguments

Name | Type |
------ | ------ |
`path` | string |

## Related

- [bud.projectPath](config-projectPath.md)
