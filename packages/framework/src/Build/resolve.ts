import Bud from '../Bud'

const resolve: Bud.Build.Resolve = function (build) {
  const alias = this.hooks.filter(
    'build.resolve.alias',
    build.resolve.alias,
  )

  return {
    resolve: {
      alias,
      extensions: this.hooks.filter(
        'build.resolve.extensions',
        build.resolve.extensions,
      ),

      modules: this.hooks.filter('build.resolve.modules', [
        build.resolve.modules ?? build.context,
        'node_modules',
      ]),
    },
  }
}

export {resolve as default}
