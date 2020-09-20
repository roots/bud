import {BudInterface, Plugin} from '@roots/bud'

const sass: Plugin = (bud: BudInterface) => ({
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
        loader: this.bud.fs.from(
          this.bud.paths.get('project'),
          'sass-loader',
        ),
        options: this.bud.options.get('sass'),
      })

    /**
     * Module
     */
    this.bud.rules.set('sass', {
      test: this.bud.patterns.get('sass'),
      use: [
        this.bud.mode.is('production')
          ? this.bud.loaders.get('minicss')
          : this.bud.loaders.get('style'),
        {
          ...this.bud.loaders.get('css'),
          options: {
            ...this.bud.loaders.get('css').options,
            importLoaders: 2,
          },
        },
        {
          ...this.bud.loaders.get('postcss'),
          options: {
            ...this.bud.loaders.get('postcss.options'),
            postcssOptions: {
              syntax: require('postcss-scss'),
            },
          },
        },
        this.bud.loaders.get('sass'),
      ],
    })

    /**
     * ## bud.sass
     */
    this.bud.apply('sass', function (
      this: BudInterface,
      options,
    ) {
      if (!options) {
        return this
      }

      this.options.merge('sass', options)

      return this
    })
  },
})

export {sass as default}
module.exports = {sass}
