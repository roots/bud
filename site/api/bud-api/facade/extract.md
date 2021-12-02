---
id: bud-api.facade.extract
title: extract property
sidebar_label: extract property
hide_title: true
sidebar: "api"
slug: extract
---

## Facade.extract property

Bundle vendor modules separately from application code.

Signature:

```typescript
extract: splitChunks;
```

## Example

```js
bud.splitChunks({
  chunks: "all",
});
```
