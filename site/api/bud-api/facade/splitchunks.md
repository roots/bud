---
id: bud-api.facade.splitchunks
title: splitchunks property
sidebar_label: splitchunks property
hide_title: true
sidebar: "api"
slug: splitchunks
---

## Facade.splitChunks property

Bundle vendor modules separately from application code.

Signature:

```typescript
splitChunks: splitChunks;
```

## Example

```js
bud.splitChunks({
  chunks: "all",
});
```
