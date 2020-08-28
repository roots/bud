import {Plugin} from '@roots/bud-framework'

const react: Plugin = () => ({
  make: function () {
    this.bud.options.set('babel.presets', [
      ...this.bud.options.get('babel.presets'),
      require.resolve('@babel/preset-react'),
    ])

    !this.bud.options
      .get('webpack.resolve.extensions')
      .includes('.jsx') && this.addExtensions(['.jsx'])
  },
})

export {react}
