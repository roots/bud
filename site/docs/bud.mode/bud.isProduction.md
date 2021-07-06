---
sidebar_position: 3
---

# bud.isProduction

**Boolean** property which is `true` when [bud.mode](/docs/bud.mode/index) is `production`

## Usage

Very useful in conditionals:

```js title='bud.config.js'
module.exports = bud => 
  bud.isProduction && bud.devtool('source-map')
```

Pairs well with [bud.when](/docs/bud.when):

```js {2} title='bud.config.js'
bud.when(
  bud.isProduction, 
  bud => bud.minify(),
)
```

## See also

- [bud.mode](/docs/bud.mode/index)
- [bud.isDevelopment](/docs/bud.mode/bud.isDevelopment)
