import {Plugin} from '@roots/bud-typings'
import {Bud} from '@roots/bud'

const react: Plugin = (bud: Bud) => ({
  bud,

  make: function () {
    this.bud.options.set('babel.presets', [
      ...this.bud.options.get('babel.presets'),
      require.resolve('@babel/preset-react'),
    ])

    !this.bud.options
      .get('webpack.resolve.extensions')
      .includes('.jsx') && this.bud.addExtensions(['jsx'])
  },
})

export {react}
