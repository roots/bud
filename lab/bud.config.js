// @ts-check

/** @type {import('../packages/bud/lib/types').Bud} bud */
const bud = require('../packages/bud/lib')

/**
 * Critical local dev only
 *
 * If you're developing don't remove this or the builds
 * will get messed up. Node modules is not where it usually is.
 */
bud.hooks.on('webpack.resolve.module', modules => [
  ...modules,
  bud.fs.path.join(bud.fs.base, '../node_modules'),
])

bud.template
bud.use('@roots/bud-postcss')
bud.use('@roots/bud-babel')
bud.use('@roots/bud-react')

console.log(Object.keys(bud))

console.log(bud.serverConfig.getStore())

bud.extensions
  .getStore()
  .getValues()
  .forEach(ext => console.log(ext.getStore())),
  bud.build
    .make()
    .module.rules.pop()
    .oneOf.map(plugin => console.log(plugin))

bud
  .buildCache()
  .entry('foo', ['foo.js', 'foo.css'])
  .minify()
  .run()
