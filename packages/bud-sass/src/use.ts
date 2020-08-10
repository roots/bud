import {Bud, Use} from '@roots/bud'

const use: Use = (bud: Bud) => ({
  loader: require.resolve('sass-loader'),
  options: {
    ...bud.options.get('sass'),
    sourceMap: true,
    implementation: (() => {
      try {
        if (require.resolve('sass')) {
          return require('sass')
        }
      } catch {
        return require('node-sass')
      }
    })(),
  },
})

export default use
