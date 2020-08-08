# @roots/bud-dependency-extraction

Adds @wordpress/dependency-extraction-webpack-plugin support to @roots/bud projects.

## Usage

```js
const dependencyExtraction = require('@roots/bud-dependency-extraction')

bud.use([dependencyExtraction])

// Optionally configure.
bud.dependencyExtraction({
  injectPolyfill: true,
})

// ...
```
