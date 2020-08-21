import {Bud, Extension, ExtensionInterface} from '@roots/bud'
import react from '@babel/preset-react'

const react: Extension = (bud: Bud): ExtensionInterface => ({
  bud,

  make: function (this: ExtensionInterface) {
    this.bud.options.set('babel.presets', [
      ...this.bud.options.get('babel.presets'),
      react,
    ])

    !this.bud.options.get('resolve.extensions').includes('.jsx') &&
      this.bud.options.set('resolve.extensions', [
        ...this.bud.options.get('resolve.extensions'),
        '.jsx',
      ])
  },
})

export {react}
