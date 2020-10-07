export const copyAll: API.CopyAll = function (from, to?) {
  this.store['plugins'].set('copy.patterns', [
    ...this.store['plugins'].get('copy.patterns'),
    this.hooks.filter('api.copyAll', {
      from: '**/*',
      context: from,
      to: to ? to : this.distPath(from),
      globOptions: {
        ignore: '.*',
      },
      noErrorOnMissing: true,
    }),
  ])

  return this
}
