import Bud from '@roots/bud-types'

const sass: Bud.Plugin.Factory = (bud: Bud) => ({
  bud,
  loaders: bud.store['loaders'],
  rules: bud.store['rules'],

  make: function () {
    /**
     * Add sass/scss extension support
     */
    this.bud.addExtensions(['sass', 'scss'])

    /**
     * Loader options
     */
    if (!this.bud.store['sass']) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const implementation = require(this.bud.fs.from.silent(
        this.bud.paths.get('project'),
        'sass',
      ) ??
        this.bud.fs.from(
          this.bud.paths.get('project'),
          'node-sass',
        ))

      this.bud.store['sass'].set(
        'implementation',
        implementation,
      )
    }

    /**
     * Loader
     */
    !this.loaders.has('sass') &&
      this.loaders.set('sass', {
        loader: this.bud.fs.from(
          this.bud.paths.get('project'),
          'sass-loader',
        ),
        options: this.bud.store['sass'],
      })

    /**
     * Module
     */
    this.rules.set('sass', {
      test: this.bud.store['pattterns'].get('sass'),
      use: [
        this.bud.mode.is('production')
          ? this.loaders.get('minicss')
          : this.loaders.get('style'),
        {
          ...this.loaders.get('css'),
          options: {
            ...this.loaders.get('css.options'),
            importLoaders: 2,
          },
        },
        {
          ...this.loaders.get('postcss'),
          options: {
            ...this.loaders.get('postcss.options'),
            postcssOptions: {
              ...this.loaders.get(
                'postcss.options.postcssOptions',
              ),
              syntax: require('postcss-scss'),
            },
          },
        },
        this.loaders.get('sass'),
      ],
    })

    /**
     * ## bud.sass
     * @todo type opts
     */
    this.bud.config.sass = function (this: Bud, options: any) {
      if (!options) {
        return this
      }

      this.store['sass'].set({
        ...this.store['sass'].get(options),
        ...options,
      })

      return this
    }
  },
})

export {sass as default}
module.exports = {sass}
