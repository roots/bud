import {Api} from '@roots/bud-types'

const distPath: Api.DistPath = function (segment: string) {
  /**
   * If set, CLI arguments take precendence over dist in config.
   */
  !this.args.get('dist') &&
    this.paths.set(
      'dist',
      this.hooks.filter(
        'api.distPath',
        this.fs.resolve(this.paths.get('project'), segment),
      ),
    )

  /**
   * Update the disk
   */
  this.fs.refresh()

  return this
}

export {distPath}
