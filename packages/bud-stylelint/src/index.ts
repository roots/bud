import {Bud, Extension, ExtensionInterface} from '@roots/bud'
import {join, resolve} from 'path'
import stylelintPlugin from './adapter'
import api from './api'

/**
 * Bud extension: Stylelint support.
 */
const stylelint: Extension = (bud: Bud): ExtensionInterface => ({
  bud,
  name: 'stylelint',
  make: function (this: ExtensionInterface) {
    const config = join(this.bud.project('stylelint.config.js'))
    if (!this.bud.fs.existsSync(config)) {
      return
    }

    this.bud.apply('stylelint', api)
    this.bud.configs.set('stylelint', config)
    this.bud.features.set('stylelint', true)
    this.bud.plugins.push(stylelintPlugin)
  },
})

const preset = {
  roots: resolve(__dirname, './preset/index.js'),
}

export {stylelint}
export {preset}
