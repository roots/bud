---
description: Specify the URI where assets are served from.
---

# bud.publicPath

By default it is assumed that assets are served from webroot (`/`). For projects where assets are served from a subdirectory there is the `bud.publicPath` method.

## Usage

Set the default public path for a [@roots/sage project](https://github.com/roots/sage)

```js
bud.publicPath('/app/themes/sage/dist')
```

## Arguments

| Name   | Type   |
| ------ | ------ |
| `path` | string |
