import {Api} from '@roots/bud-typings'

const srcPath: Api.SrcPath = function (segment: string) {
  /**
   * If set, CLI arguments take precendence over config.
   */
  if (this.args.get('src')) {
    return this
  }

  /**
   * Strip trailing and leading slashes and resolve the segment
   * against the project path.
   */
  const path = this.fs.resolve(
    this.paths.get('project'),
    segment.replace(/\/$/g, '').replace(/\/^/g, ''),
  )

  /**
   * Set path.
   */
  this.paths.set('src', path)

  /**
   * Return Bud
   */
  return this
}

export {srcPath}
