---
description: Specify the root directory of the project's source files.
---

# bud.src

With no arguments, this function returns the project's src path.

Optionally, **bud.src** may be passed a path relative to the project src directory. In this case it returns the absolute path of whatever it was passed.

The root path used by this function is set by [bud.srcPath](config-srcPath.md).

## Usage

```js
bud.src('scripts/app.js')
```

## Arguments

Name | Type |
------ | ------ |
`path` | string |

## Related

- [bud.srcPath](config-srcPath.md)
