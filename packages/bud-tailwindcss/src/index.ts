import {Bud, Extension, ExtensionInterface} from '@roots/bud'
import tailwind from 'tailwindcss'
import configTailwind from './api'

const tailwindcss: Extension = (bud: Bud): ExtensionInterface => ({
  bud,

  name: 'tailwindcss',

  make: function (this: ExtensionInterface) {
    this.bud.apply('tailwind', configTailwind)

    this.bud.options.set('postcss.plugins', [
      ...this.bud.options.get('postcss.plugins'),
      tailwind({
        config: this.bud.project('tailwind.config.js'),
      }),
    ])

    this.bud.options.set('scss.sassOptions', {
      processCssUrls: false,
      ...this.bud.options.get('scss.sassOptions'),
    })
  },
})

export {tailwindcss}
