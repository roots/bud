---
description: Configure sourcemaps.
---

# bud.dev

Configure sourcemaps using [`webpack.devtool`](https://webpack.js.org/configuration/devtool/).

## Usage

```js
bud.devtool('inline-cheap-module-source-map')
```

## Signature

```ts
function (devtool: string): Framework.Bud
```

## Parameters

| Name      | Type    |
| --------- | ------- |
| `devtool` | Devtool |

## Returns

`Framework.Bud`: The Bud instance
