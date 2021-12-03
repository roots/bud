---
id: bud-api.facade.alias
title: alias property
sidebar_label: alias property
hide_title: true
sidebar: "api"
slug: alias
---

## Facade.alias property

Register shorthand for resolving modules using webpack aliases.

Signature:

```typescript
alias: alias.facade;
```

## Remarks

Useful for situations that may otherwise require brittle relative paths.

## Example

```js
app.alias({
  "@scripts": app.path("src", "scripts"),
});
```
