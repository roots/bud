---
description: Specify the root directory of the project's source files.
---

# bud.dist

With no arguments, this function returns the path where built assets will be written.

Optionally, **bud.dist** may be passed a path relative to the project dist directory. In this case it will return the absolute path by resolving that string against the dist path.

The root path used by this function is set by [bud.distPath](config-distPath.md).

## Usage

Absolute path to the dist directory:

```js
bud.dist()
```

Absolute path to `scripts/app.js` in the dist directory:

```js
bud.dist('scripts/app.js')
```

## Signature

```ts
function (
  path?: string,
): Bud
```

## Arguments

| Name    | Type   |
| ------- | ------ |
| `path?` | string |

## Related

- [bud.distPath](config-distPath.md) - Set the dist directory used by this function.
