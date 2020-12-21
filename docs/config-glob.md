---
description: Enable or disable filename hashing of built assets.
---

# bud.glob

Generate an entrypoint from assets matching a [fast-glob](https://github.com/mrmlnc/fast-glob) formatted string.

## Globbing

**Supported patterns:**

- `*` matches any number of characters, but not `/`
- `?` matches a single character, but not `/`
- `**` matches any number of characters, including `/`, as long as it's the only thing in a path part
- `{}` allows for a comma-separated list of "or" expressions
- `!` at the beginning of a pattern will negate the match

## Usage

Create an app bundle comprised of all js assets:

```js
bud.glob('app', '**/*.js')
```

## Signature

```ts
function (
  name: string,
  glob: string | string[]
): Bud
```

## Arguments

| Name      | Type     |
| --------- | -------- |
| `name`    | `string` |
| `pattern` | `string  | string[]` |
