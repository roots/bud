import Bud from '@roots/bud-types'

const filesystemSetup = function (this: Bud): void {
  if (this.fs.exists('package.json')) {
    this.store['package'].repository = this.fs.readJson(
      'package.json',
    )
  }

  this.fs.exists('babel.config.js') &&
    this.store['babel'].set(
      'options',
      this.fs.require('babel.config.js'),
    )

  this.fs.exists('postcss.config.js') &&
    this.store['postcss'].set(
      'options',
      this.fs.require('postcss.config.js'),
    )
}

export {filesystemSetup as default}
