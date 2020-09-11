import {Api} from '@roots/bud-types'

const distPath: Api.DistPath = function (dir: string) {
  /**
   * If set, CLI arguments take precendence over dist in config.
   */
  !this.args.get('src') &&
    this.paths.set(
      'dist',
      this.hooks.filter(
        'api.distPath',
        this.fs.resolve(this.paths.get('project'), dir),
      ),
    )

  return this
}

export {distPath}
