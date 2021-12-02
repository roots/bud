---
id: bud-hooks.hooks.promised
title: promised() method
sidebar_label: promised() method
hide_title: true
sidebar: "api"
slug: promised
---

## Hooks.promised() method

Asyncronous hook filter

Signature:

```typescript
promised<T = any>(id: `${Contract.Name & string}`, value?: T): Promise<T>;
```

Decorators:

`@bind`

## Parameters

| Parameter | Type                              | Description |
| --------- | --------------------------------- | ----------- |
| id        | \`${Contract.Name &amp; string}\` |             |
| value     | T                                 |             |

Returns:

Promise&lt;T&gt;

## Remarks

This method is used to filter a hook event.

## Example

```js
bud.hooks.filter("namespace.name.event", ["array", "of", "items"]);
```
