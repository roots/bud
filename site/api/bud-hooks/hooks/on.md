---
id: bud-hooks.hooks.on
title: on() method
sidebar_label: on() method
hide_title: true
sidebar: "api"
slug: on
---

## Hooks.on() method

Register a function to filter a value.

Signature:

```typescript
on<T extends keyof Contract.Map & string>(id: T, callback: Contract.Map[T] | ((value: Contract.Map[T]) => any)): Framework;
```

Decorators:

`@bind`

## Parameters

| Parameter | Type                                                            | Description |
| --------- | --------------------------------------------------------------- | ----------- |
| id        | T                                                               |             |
| callback  | Contract.Map\[T\] &#124; ((value: Contract.Map\[T\]) =&gt; any) |             |

Returns:

Framework

## Remarks

If a filter calls for this name the function is then run, passing whatever data along for modification. If more than one hook is registered to a name, they will be called sequentially in the order they were registered, with each hook's output used as the input for the next.

## Example

```js
app.hooks.on("namespace.key", (value) => "replaced by this string");
```
