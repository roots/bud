import Bud from '@roots/bud-types'

const filesystemSetup = function (this: Bud): void {
  /**
   * Set package.
   */
  if (this.fs.exists('package.json')) {
    this.package = this.makeContainer(
      this.fs.readJson('package.json'),
    )
  }

  /**
   * Set babel conf.
   */
  this.fs.exists('babel.config.js') &&
    this.loaders.set(
      'babel.options',
      this.fs.require('babel.config.js'),
    )

  /**
   * Set postcss conf.
   */
  this.fs.exists('postcss.config.js') &&
    this.loaders.set(
      'postcss.options',
      this.fs.require('postcss.config.js'),
    )
}

export {filesystemSetup as default}
