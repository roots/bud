---
description: Specify the root directory of the project.
---

# bud.distPath

Sets the directory where assets will be built to. By default this directory is set as `dist`.

The root path used by this function is set by [bud.projectPath](config-projectPath.md).

In-kind, this function is utilitized by [bud.dist](config-dist.md).

## Usage

```js
bud.distPath('build')
```

## Arguments

| Name   | Type   |
| ------ | ------ |
| `path` | string |

## Related

- [bud.dist](config-dist.md)
