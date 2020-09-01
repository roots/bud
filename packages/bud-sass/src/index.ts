import {Bud} from '@roots/bud'
import {Plugin} from '@roots/bud-typings'

/**
 * Bud extension: sass
 *
 * Adds sass support to the Bud framework.
 */
const sass: Plugin = (bud: Bud) => ({
  bud,

  make: function () {
    this.bud.addExtensions(['sass', 'scss'])

    if (!this.bud.options.has('sass')) {
      this.bud.options.set('sass', {
        sourceMap: true,
      })
    }

    this.bud.uses.set('sass', bud => ({
      loader: require.resolve('sass-loader'),
      options: {
        ...bud.options.get('sass'),
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
    }))

    this.bud.rules.set('sass', bud => ({
      test: /\.s(c|a)ss$/,
      exclude: bud.patterns.get('vendor'),
      use: [
        ...bud.rules.get('css')(bud).use,
        bud.uses.get('sass')(bud),
      ],
    }))

    this.bud.apply('sass', function (options) {
      if (options) {
        this.options.set('sass', {
          ...(this.options.get('sass') ?? []),
          ...options,
        })
      }
    })
  },
})

export {sass}
