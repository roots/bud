---
description: Separate vendored code from application code.
---

# bud.vendor

Bundle vendored modules separately from application code.

## Usage

```js
bud.vendor()
```

Optionally, give the vendor bundle a specific name:

```js
bud.vendor('third-party')
```

## Signature

```ts
function (name?: string): Bud
```

## Returns

`Framework.Bud`: The Bud instance

## Related

- [bud.inlineManifest](config-inlineManifest.md)
