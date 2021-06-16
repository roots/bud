---
sidebar_position: 3
---

# bud.isProduction

**Boolean** property which is `true` when [bud.mode](docs/config/bud.mode) is `production`

## Usage

Very useful in conditionals:

```js
bud.isProduction && bud.devtool('source-map')
```

Pairs well with [bud.when](docs/config/bud.when):

```js {2}
bud.when(
    bud.isProduction, 
    bud => bud.minify(),
)
```

## See also

- [bud.mode](docs/config/bud.mode)
- [bud.isDevelopment](docs/config/bud.isDevelopment)
