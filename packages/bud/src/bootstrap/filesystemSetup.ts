import {BudInterface} from '../'

const filesystemSetup = (bud: BudInterface): BudInterface => {
  bud.updateDisk()

  /**
   * Set package.
   */
  if (bud.fs.exists('package.json')) {
    bud.package = bud.makeContainer(
      bud.fs.readJson('package.json'),
    )

    if (bud.package.has('name')) {
      bud.name = bud.package.get('name')
    }
  }

  /**
   * Set babel conf.
   */
  bud.fs.exists('babel.config.js') &&
    bud.loaders.set(
      'babel.options',
      bud.fs.require('babel.config.js'),
    )

  /**
   * Set postcss conf.
   */
  bud.fs.exists('postcss.config.js') &&
    bud.loaders.set(
      'postcss.options',
      bud.fs.require('postcss.config.js'),
    )

  return bud
}

export {filesystemSetup as default}
