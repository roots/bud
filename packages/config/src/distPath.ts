import Bud from '@roots/bud-types'

export const distPath: Bud.Config.DistPath = function (segment) {
  !this.args.get('dist') &&
    this.paths.set(
      'dist',
      this.hooks.filter(
        'api.distPath',
        this.fs.path.resolve(this.paths.get('project'), segment),
      ),
    )

  return this
}
