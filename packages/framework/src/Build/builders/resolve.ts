export const resolve: Framework.Build.Resolve = function ({
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
        this.disk.get('@roots').getBase(),
        this.fs.path.resolve(
          this.disk.get('@roots').getBase(),
          '../node_modules',
        ),
        'node_modules',
      ]),
    },
  }
}
