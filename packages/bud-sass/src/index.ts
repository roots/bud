import {Bud, Plugin} from '@roots/bud-typings'
import resolveFrom from 'resolve-from'

const sass: Plugin = (bud: Bud) => ({
  bud,

  make: function () {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const implementation = require(resolveFrom.silent(
      this.bud.paths.get('project'),
      'sass',
    ) ?? resolveFrom(this.bud.paths.get('project'), 'node-sass'))

    this.bud.addExtensions(['sass', 'scss'])

    if (!this.bud.options.has('sass')) {
      this.bud.options.set('sass', {
        implementation,
      })
    }

    this.bud.uses.set('sass', bud => ({
      loader: bud.resolveFrom(
        this.bud.paths.get('project'),
        'sass-loader',
      ),
      options: bud.options.get('sass'),
    }))

    this.bud.rules.set('sass', bud => ({
      test: bud.patterns.get('sass'),
      use: [
        bud.mode == 'production'
          ? bud.uses.get('miniCss')(bud)
          : bud.loaders.get('style'),
        {
          ...bud.uses.get('css')(bud),
          options: {
            ...bud.uses.get('css')(bud).options,
            importLoaders: 2,
          },
        },
        {
          ...bud.uses.get('postCss')(bud),
          options: {
            ...bud.uses.get('postCss')(bud).options,
            postcssOptions: {
              syntax: require('postcss-scss'),
            },
          },
        },
        bud.uses.get('sass')(bud),
      ],
    }))

    this.bud.apply('sass', function (options) {
      if (!options) {
        return this
      }

      this.options.set('sass', {
        ...this.options.get('sass'),
        ...options,
      })

      return this
    })
  },
})

module.exports = sass
