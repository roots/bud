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
      const implementation = require(this.bud.fs.from.silent(
        this.bud.paths.get('project'),
        'sass',
      ) ??
        this.bud.fs.from(
          this.bud.paths.get('project'),
          'node-sass',
        ))

      this.bud.options.set('sass.implementation', implementation)
    }

    /**
     * Loader
     */
    !this.bud.loaders.has('sass') &&
      this.bud.loaders.set('sass', {
        loader: bud.fs.from(
          bud.paths.get('project'),
          'sass-loader',
        ),
        options: bud.options.get('sass'),
      })

    /**
     * Module
     */
    this.bud.rules.set('sass', bud => ({
      test: bud.patterns.get('sass'),
      use: [
        bud.mode.is('production')
          ? bud.loaders.get('minicss')
          : bud.loaders.get('style'),
        {
          ...bud.loaders.get('css'),
          options: {
            ...bud.loaders.get('css').options,
            importLoaders: 2,
          },
        },
        {
          ...bud.loaders.get('postcss'),
          options: {
            ...bud.loaders.get('postcss.options'),
            postcssOptions: {
              syntax: require('postcss-scss'),
            },
          },
        },
        bud.loaders.get('sass'),
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
