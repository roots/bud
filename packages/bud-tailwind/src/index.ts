import {Bud, Extension, ExtensionInterface} from '@roots/bud'
import tailwind from 'tailwindcss'
import configTailwind from './api'

const tailwind: Extension = (bud: Bud): ExtensionInterface => ({
  bud,

  make: function (this: ExtensionInterface) {
    this.bud.tailwind = configTailwind
    this.twConfig &&
      this.addTailwind({
        config: bud.file.from('project').get('tailwind.config.js').path(),
      })
    this.configureSass()
  },

  addTailwind: function (this: ExtensionInterface, options) {
    this.bud.options.set('postcss.plugins', [
      ...this.bud.options.postcssPlugins,
      tailwind(options),
    ])
  },

  configureSass: function (this: ExtensionInterface) {
    const scss = this.bud.options.get('scss')

    scss.sassOptions = {
      processCssUrls: false,
      ...scss.sassOptions,
    }

    return scss
  },
})

export {tailwind}
