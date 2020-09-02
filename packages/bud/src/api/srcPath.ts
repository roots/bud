import {Api} from '@roots/bud-typings'

const srcPath: Api.SrcPath = function (dir: string) {
  /**
   * If set, CLI arguments take precendence over config.
   */
  !this.args.get('src') &&
    this.paths.set(
      'src',
      this.fs.resolve(
        this.paths.get('project'),
        dir.replace(/\/$/g, '').replace(/\/^/g, ''),
      ),
    )

  return this
}

export {srcPath}
