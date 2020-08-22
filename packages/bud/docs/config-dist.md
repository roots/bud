---
description: Specify the root directory of the project's source files.
---

# bud.dist

With no arguments, this function returns the project's dist path.

Optionally, **bud.dist** may be passed a path relative to the project dist directory. In this case it returns the absolute path of whatever it was passed.

The root path used by this function is set by [bud.distPath](config-distPath.md).

## Usage

```js
bud.dist('scripts/app.js')
```

## Signature

```ts
function (
  name: string,
  entries: string[]
): Bud
```

## Arguments

Name | Type |
------ | ------ |
`path` | string |

## Related

- [bud.distPath](config-distPath.md)
