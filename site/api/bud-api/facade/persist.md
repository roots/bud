---
id: bud-api.facade.persist
title: persist property
sidebar_label: persist property
hide_title: true
sidebar: "api"
slug: persist
---

## Facade.persist property

Cache webpack builds to the filesystem.

Signature:

```typescript
persist: persist;
```

## Example 1

```js
app.persist("memory");
```

## Example 2

```js
app.persist("filesystem");
```

## Example 3

```js
app.persist(false);
```
