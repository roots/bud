export const resolve: Build.Resolve = function ({
  resolve,
  context,
}) {
  const alias = this.hooks.filter(
    'build.resolve.alias',
    resolve.alias,
  )

  return {
    resolve: {
      alias,
      extensions: this.hooks.filter(
        'build.resolve.extensions',
        resolve.extensions,
      ),

      modules: this.hooks.filter('build.resolve.modules', [
        resolve.modules ?? context,
        'node_modules',
      ]),
    },
  }
}
