---
id: bud-api.facade.override
title: override property
sidebar_label: override property
hide_title: true
sidebar: "api"
slug: override
---

## Facade.override property

Modify the generated webpack config prior to compilation.

Signature:

```typescript
override: config;
```

## Remarks

Override generated webpack config with custom config.

## Example

```ts
app.config({ entry: "./src/index.js" });
```
