<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<h1 align="center">
  <strong>@roots/bud-support</strong>
</h1>

## Overview

This repository provides supporting client and server-side utilities to the main Bud CLI and the output it generates. [You may be looking for the main repository](https://github.com/roots/bud).

## Budpack example

```js
const bud = require('@roots/budpack/src/budpack/bud')

bud.project(__dirname) // default process.cwd
bud.dist('compiled') // default dist

.dev({
  host: 'example.com', // default localhost
  port: 7000, // default 3000
})
.watchTimeout(5000) // default 3000

.alias({
  '@blocks': bud.resolve('src/blocks'),
  '@components': bud.resolve('src/components'),
  '@hooks': bud.resolve('src/hooks'),
})

.babel({
  react: true, // default false
  dynamicImport: false, // default true
  transformRuntime: false, // default true
  cacheDirectory: false, // default true
})

.entry('editor', [
  bud.resolve('/src/editor.js'),
  bud.resolve('/src/editor.css')
])

.eslint({enabled: false}) // default true
.postcss({enabled: false}) // default true

.hash(false) // default inProduction
.maps(false) // default inProduction
.mini(false) // default !inProduction
.hot(false) // default inDevelopment
.watch(false) // default inDevelopment

.wpManifest({
  outputFormat: 'php', // default json
})

module.exports = bud
```

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://kinsta.com/?kaid=OFDHAJIXUDIV"><img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="200" height="150"></a>
<a href="https://k-m.com/"><img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"></a>
<a href="https://carrot.com/"><img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150"></a>

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
