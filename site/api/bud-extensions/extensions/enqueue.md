---
id: bud-extensions.extensions.enqueue
title: enqueue() method
sidebar_label: enqueue() method
hide_title: true
sidebar: "api"
slug: enqueue
---

## Extensions.enqueue() method

Queue an extension to be added to the container before the build process.

Signature:

```typescript
enqueue(extension: Framework.Extension.Module): Framework.Framework;
```

Decorators:

`@bind`

## Parameters

| Parameter | Type                       | Description |
| --------- | -------------------------- | ----------- |
| extension | Framework.Extension.Module |             |

Returns:

Framework.Framework

## Remarks

Useful for extensions which cannot be added in an awaitable context (like a user config)
