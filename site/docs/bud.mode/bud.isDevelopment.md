---
sidebar_position: 2
---

# bud.isDevelopment

**Boolean** property which is `true` when [bud.mode](/docs/bud.mode/index) is `development`

## Usage

Very useful in conditionals:

```js title='bud.config.js'
module.exports = bud => 
  bud.isDevelopment && bud.devtool('source-map')
```

Pairs well with [bud.when](/docs/bud.when):

```js {2} title='bud.config.js'
module.exports = bud =>
  bud.when(
    bud.isDevelopment, 
    bud => bud.devtool(),
  )
```

## See also

- [bud.mode](/docs/bud.mode/index)
- [bud.isProduction](/docs/bud.mode/bud.isProduction)
