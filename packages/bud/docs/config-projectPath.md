---
description: Specify the root directory of the project.
---

# bud.projectPath

If Bud is being run outside of the project root, it may be necessary to specify the path of the project root explicitly.

For most builds this may be safely omitted.

## Usage

```js
bud.projectPath(__dirname)
```

## Arguments

Name | Type |
------ | ------ |
`path` | string |

## Related

- [bud.project](/docs/bud/config-project.md)
