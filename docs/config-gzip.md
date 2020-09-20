---
description: Compress static assets with gzip.
---

# bud.gzip

`bud.gzip` compresses static assets with gzip compression.

It's arguments are optional. For more information on what options are available consult [the official documentation](https://github.com/webpack-contrib/compression-webpack-plugin).

## Usage

```js
bud.gzip()
```

```js
bud.gzip({
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
| `options` | compression-plugin option |

## Returns

The Bud instance.

