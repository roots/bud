---
id: bud-hooks.hooks.filter
title: filter() method
sidebar_label: filter() method
hide_title: true
sidebar: "api"
slug: filter
---

## Hooks.filter() method

Hooks filter

Signature:

```typescript
filter<T = any>(id: `${Contract.Name & string}`, value?: T): T;
```

## Parameters

| Parameter | Type                              | Description |
| --------- | --------------------------------- | ----------- |
| id        | \`${Contract.Name &amp; string}\` |             |
| value     | T                                 |             |

Returns:

T

## Remarks

The other side of bud.hooks.on. Passes a key and a value. If any filters are registered on that key they will transform the output before it is returned.

## Example

```js
bud.hooks.filter("namespace.name.event", ["array", "of", "items"]);
```
