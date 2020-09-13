import {Api} from '@roots/bud-types'

const srcPath: Api.SrcPath = function (segment: string) {
  if (this.args.get('src')) {
    return this
  }

  this.paths.set(
    'src',
    this.fs.resolve(this.paths.get('project'), segment),
  )

  /**
   * Update the disk
   */
  this.fs.refresh()

  return this
}

export {srcPath}
