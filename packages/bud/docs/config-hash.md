---
description: Enable or disable filename hashing of built assets.
---

# bud.hash

Enable or disable filename hashing of built assets.

## Usage

Enable hashing:

```js
bud.hash()
```

Enable hashing only in production:

```js
bud.hash(bud.inProduction)
```

## Signature

```ts
function (
  enabled? = true
): Bud
```

## Arguments

Name | Type |
------ | ------ |
`enabled` | boolean |
