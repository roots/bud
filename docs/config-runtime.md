---
description: Generate a runtime chunk.
---

# bud.runtime

Generate a runtime chunk intended to be inlined on the page. Useful for code splitting and dynamic imports.

## Usage

```js
bud.runtime()
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
