---
id: bud-api.facade.externals
title: externals property
sidebar_label: externals property
hide_title: true
sidebar: "api"
slug: externals
---

## Facade.externals property

Specify a non-standard resolution strategy for modules with a matching name.

Signature:

```typescript
externals: externals;
```

## Example

```js
bud.externals({
  jQuery: "window.jquery",
});
```
