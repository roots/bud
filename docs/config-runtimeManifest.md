---
description: Generate a runtime chunk.
---

# bud.runtimeManifest

Generate a runtime chunk intended to be inlined on the page. Useful for dynamic imports.

## Usage

```js
bud.runtimeManifest()
```

## Signature

```ts
function (name: string): Bud
```

## Parameters

| Name    | Type   |
| ------- | ------ |
| `name?` | string |

## Returns

The Bud instance

## Related

- [bud.vendor](config-vendor.md)
