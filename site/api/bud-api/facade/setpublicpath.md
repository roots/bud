---
id: bud-api.facade.setpublicpath
title: setpublicpath property
sidebar_label: setpublicpath property
hide_title: true
sidebar: "api"
slug: setpublicpath
---

## Facade.setPublicPath property

By default it is assumed that assets are served from webroot (`/`). You can use this method to replace this value for apps served from a subdirectory.

Signature:

```typescript
setPublicPath: setPublicPath;
```

## Example 1

Set the default path using a string

```js
app.setPublicPath("/app/themes/sage/dist");
```

## Example 2

Set the publicPath using a function.

```js
app.setPublicPath((publicPath) => {
  return `web/assets/${publicPath}`;
});
```
