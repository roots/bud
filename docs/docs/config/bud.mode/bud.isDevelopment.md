---
sidebar_position: 2
---

# bud.isDevelopment

**Boolean** property which is `true` when [bud.mode](docs/config/bud.mode) is `development`

## Usage

Very useful in conditionals:

```js
bud.isDevelopment && bud.devtool('source-map')
```

Pairs well with [bud.when](docs/config/bud.when):

```js {2}
bud.when(
    bud.isDevelopment, 
    bud => bud.devtool(),
)
```

## See also

- [bud.mode](docs/config/bud.mode)
- [bud.isProduction](docs/config/bud.isProduction)
