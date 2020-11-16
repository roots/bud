/**
 * Resolve node_modules in local development environment
 */
module.exports = bud =>
  bud.hooks.on('webpack.resolve.modules', modules => [
    ...modules,
    bud.fs.path.join(bud.fs.base, '../node_modules'),
  ])
