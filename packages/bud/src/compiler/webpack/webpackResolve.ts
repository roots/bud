import {join} from 'path'

const webpackResolve = bud => ({
  bud,

  target: {
    resolve: {
      extensions: ['.js', '.json'],
      modules: [
        bud.paths.get('src'),
        join(bud.paths.get('project'), 'node_modules'),
        join(bud.paths.get('framework'), 'node_modules'),
      ],
    },
  },

  extensions: ['js', 'jsx', 'ts', 'tsx'],

  make: function () {
    /**
     * Alias resolution
     */
    if (this.bud.options.has('alias')) {
      this.target.resolve.alias = this.bud.options.get('alias')
    }

    /**
     * Ensure bundle support
     */
    this.extensions.forEach(ext => this.ensureSupport(ext))

    /**
     * Filter, log & return
     */
    this.target = this.bud.hooks.filter('webpack.resolve', this.target)
    this.bud.logger.info(
      {name: 'webpack.resolve', value: this.target},
      `webpack.resolve has been generated`,
    )

    return this.target
  },

  /**
   * Ensure extensions supported
   */
  ensureSupport: function (ext) {
    if (!this.bud.features.enabled(ext)) {
      return
    }

    const missedExt =
      this.target.resolve.extensions.filter(supported => supported !== ext).length <
      1

    if (missedExt) {
      this.target.resolve.extensions.push(`.${ext}`)
      this.bud.logger.warn(
        {name: 'webpack.resolve'},
        `.${ext} support added by support check.`,
      )
    }
  },
})

export {webpackResolve}
