---
description: Extend Bud with additional packaged functionality.
---

# bud.use

Registers a [Bud extensions](guide-using-extensions.md).

## Usage

The string that identifies the extension should be match the extension's `name` field from the extension's package.json.

```js
bud.use('@roots/bud-sass')
```

## Arguments

| Name        | Type   |
| ----------- | ------ |
| `extension` | string |
