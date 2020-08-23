import {Bud, Extension, ExtensionInterface} from '@roots/bud'

const react: Extension = (bud: Bud): ExtensionInterface => ({
  bud,

  name: 'react',

  make: function (this: ExtensionInterface) {
    this.bud.options.set('babel.presets', [
      ...this.bud.options.get('babel.presets'),
      require.resolve('@babel/preset-react'),
    ])

    !this.bud.options
      .get('webpack.resolve.extensions')
      .includes('.jsx') &&
      this.bud.options.set('webpack.resolve.extensions', [
        ...this.bud.options.get('webpack.resolve.extensions'),
        '.jsx',
      ])
  },
})

export {react}
