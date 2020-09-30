import Bud from '@roots/bud-types'

export const copyAll: Bud.Config.CopyAll = function (from, to?) {
  this.store['plugins'].set('copy.patterns', [
    ...this.store['plugins'].get('copy.patterns'),
    this.hooks.filter('api.copyAll', {
      from: '**/*',
      context: from,
      to: to
        ? to
        : this.fs.path.join(
            this.store['paths'].get('dist'),
            from,
          ),
      globOptions: {
        ignore: '.*',
      },
      noErrorOnMissing: true,
    }),
  ])

  return this
}
