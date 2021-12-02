---
id: bud-api.facade.template
title: template property
sidebar_label: template property
hide_title: true
sidebar: "api"
slug: template
---

## Facade.template property

Enable and/or configure a generated HTML template

Signature:

```typescript
template: templateFacade;
```

## Example

```ts
app.template();
```

With configuration defaults:

```ts
app.template({
  enabled: true,
  template: "public/index.html",
  replace: {
    APP_NAME: name,
    APP_DESCRIPTION: description,
    PUBLIC_URL: app.env.get("PUBLIC_URL"),
  },
});
```
