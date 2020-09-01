import {join} from 'path'
import {Api} from '@roots/bud-typings'

const srcPath: Api.SrcPath = function (dir: string) {
  const setPath = join(
    this.paths.get('project'),
    dir.replace(/\/$/g, '').replace(/\/^/g, ''),
  )

  /**
   * If set, CLI arguments take precendence over config.
   */
  !this.args.get('src') && this.paths.set('src', setPath)

  return this
}

export {srcPath}
