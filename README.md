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
/**
 * Budpack configuration [bud.config.js]
 *
 * Default values noted below.
 *
 * If no additional configuration is needed
 * then you need only utilize bud.entry to have a
 * working config.
 *
 * Any deviation from default is only intended to
 * more clearly demonstrate the API and these deviations
 * are flagged with an inline comment.
 */

const bud = require('@roots/budpack/build/budpack/bud');

bud.projectPath(__dirname)
.publicPath('app/plugins/demo')
.srcPath('resources/assets')
.distPath('dist')

.dev({
  host: 'localhost',
  port: 3000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  disableHostCheck: true,
})

.watchTimeout(300)

.alias({
  '@scripts': bud.project('resources/assets/scripts')
})

.entry('app', [
  bud.src('scripts/app.js'),
  bud.src('styles/app.css'),
]) // default: no entrypoints

.copy('resources/assets/images'),

// @see @wordpress/dependency-extraction-manifest-plugin
.wpManifest({
  useDefaults: true,
  injectPolyfill: false,
  outputFormat: 'json',
})

.babel({
  react: false,
  dynamicImport: true,
  cacheDirectory: true,
  transformRuntime: false,
})

.eslint({enabled: true})
.postcss({enabled: true})

.vendor(true)
.splitting(true)
.maxChunks(3) // default void

.hash(bud.inProduction)
.maps(! bud.inProduction)
.mini(bud.inProduction)
.hot(! bud.inProduction)
.watch(! bud.inProduction)

.svg({
  use: [
    '@svgr/webpack',
    'url-loader',
  ],
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
