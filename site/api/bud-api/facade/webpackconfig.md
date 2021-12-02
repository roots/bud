---
id: bud-api.facade.webpackconfig
title: webpackconfig property
sidebar_label: webpackconfig property
hide_title: true
sidebar: "api"
slug: webpackconfig
---

## Facade.webpackConfig property

Modify the generated webpack config prior to compilation.

Signature:

```typescript
webpackConfig: config;
```

## Remarks

Override generated webpack config with custom config.

## Example

```ts
app.config({ entry: "./src/index.js" });
```
