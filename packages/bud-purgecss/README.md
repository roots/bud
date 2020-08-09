# @roots/bud-purgecss

Adds purgecss support to @roots/bud projects.

## Usage

```js
const {purgecss} = require('@roots/bud-purgecss')

bud.use([purgecss])

// ...

bud.purgecss({
  enabled: bud.inProduction,
  options: {
    // ...purge options
  }
})
```

## Usage with WordPress presets

```js
const {
  purgecss,
  presets,
} = require('@roots/bud-purgecss')

bud.use([purgecss])

// ...

bud.purgecss({
  enabled: bud.inProduction,
  options: {
    ...presets.wordpress
    // ...additional purge options
  }
})
```
