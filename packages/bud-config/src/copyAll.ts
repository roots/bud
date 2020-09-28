import Bud from '@roots/bud-types'

export const copyAll: Bud.Config.CopyAll = function (from, to?) {
  this.options.set('plugins.copy.patterns', [
    ...this.options.get('plugins.copy.patterns'),
    this.hooks.filter('api.copyAll', {
      from: '**/*',
      context: from,
      to: to
        ? to
        : this.fs.path.join(this.paths.get('dist'), from),
      globOptions: {
        ignore: '.*',
      },
      noErrorOnMissing: true,
    }),
  ])

  return this
}
