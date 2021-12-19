---
id: bud-api.facade.publicpath
title: publicpath property
sidebar_label: publicpath property
hide_title: true
sidebar: "api"
slug: publicpath
---

## Facade.publicPath property

By default it is assumed that assets are served from webroot (`/`). You can use this method to replace this value for apps served from a subdirectory.

Signature:

```typescript
publicPath: publicPath;
```

## Example

Set the default path for a Sage project:

```js
bud.publicPath("/app/themes/sage/dist");
```
