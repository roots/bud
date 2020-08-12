import {Bud, Extension, ExtensionInterface} from '@roots/bud'
import tailwind from 'tailwindcss'
import configTailwind from './api'

const tailwind: Extension = (bud: Bud): ExtensionInterface => ({
  bud,
  options: {
    postCss: bud.options.get('postCss'),
    scss: bud.options.get('scss'),
  },
  twConfig: bud.file.from('project').get('tailwind.config.js').path(),

  make: function (this: ExtensionInterface) {
    this.bud.tailwind = configTailwind
    this.twConfig && this.addTailwind({config: this.twConfig})
    this.configureSass()
  },

  addTailwind: function (this: ExtensionInterface, options) {
    this.bud.options.set('postCss', {
      ...this.options.postCss,
      plugins: [...this.options.postCss.plugins, tailwind(options)],
    })
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

export = tailwind
