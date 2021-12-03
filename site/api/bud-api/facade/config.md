---
id: bud-api.facade.config
title: config property
sidebar_label: config property
hide_title: true
sidebar: "api"
slug: config
---

## Facade.config property

Modify the generated webpack config prior to compilation.

Signature:

```typescript
config: config;
```

## Remarks

Override generated webpack config with custom config.

## Example

```ts
app.config({ entry: "./src/index.js" });
```
