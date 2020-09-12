import {Bud, Plugin} from '@roots/bud-types'
import resolveFrom from 'resolve-from'

const sass: Plugin = (bud: Bud) => ({
  bud,

  make: function () {
    /**
     * Add sass/scss extension support
     */
    this.bud.addExtensions(['sass', 'scss'])

    /**
     * Loader options
     */
    if (!this.bud.options.has('sass')) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const implementation = require(resolveFrom.silent(
        this.bud.paths.get('project'),
        'sass',
      ) ??
        resolveFrom(this.bud.paths.get('project'), 'node-sass'))

      this.bud.options.set('sass.implementation', implementation)
    }

    /**
     * Loader
     */
    !this.bud.uses.has('sass') &&
      this.bud.uses.set('sass', bud => ({
        loader: bud.fs.from(
          bud.paths.get('project'),
          'sass-loader',
        ),
        options: bud.options.get('sass'),
      }))

    /**
     * Module
     */
    this.bud.rules.set('sass', bud => ({
      test: bud.patterns.get('sass'),
      use: [
        bud.mode.is('production')
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

    /**
     * bud.sass
     */
    this.bud.apply('sass', function (this: Bud, options) {
      if (!options) {
        return this
      }

      this.options.merge('sass', options)

      return this
    })
  },
})

module.exports = sass
