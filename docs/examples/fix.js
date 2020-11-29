/**
 * Resolve node_modules within the bud monorepo directory
 *
 * This fix only pertains to the bud monorepo
 * You do not need to include it in your project
 */
module.exports = {
  modulePath: function (bud, path) {
    bud.hooks.on('webpack.resolve.modules', modules => [
      ...modules,
      bud.fs.path.join(bud.fs.base, path),
    ])

    return bud
  }
}
