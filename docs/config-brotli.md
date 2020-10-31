---
description: Compress static assets with brotli compression.
---

# bud.brotli

`bud.brotli` compresses static assets with brotli compression.

It's arguments are optional. For more information on what options are available consult [the official documentation](https://github.com/webpack-contrib/compression-webpack-plugin).

## Usage

```js
bud.brotli()
```

```js
bud.brotli({
  minRatio: 0.8,
})
```

## Signature

```ts
function (
  {[key: string]: any[]}[]
): Bud
```

## Parameters

| Name   | Type   |
| ------ | ------ |
| `options` | compression-plugin options for brotli compression |

## Returns

The Bud instance.
