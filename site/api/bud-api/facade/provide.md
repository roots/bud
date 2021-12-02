---
id: bud-api.facade.provide
title: provide property
sidebar_label: provide property
hide_title: true
sidebar: "api"
slug: provide
---

## Facade.provide property

Make a variable/module available throughout the entire application without needing to import it explicitly.

Signature:

```typescript
provide: provide;
```

## Example

```js
bud.provide({
  jquery: "$",
});
```
