import {join} from 'path'

const webpackResolve = bud => ({
  bud,

  target: {
    resolve: {
      extensions: bud.options.get('extensions'),
      modules: [bud.project('node_modules'), bud.src()],
    },
  },

  make: function () {
    /**
     * Alias resolution
     */
    if (this.bud.options.has('alias')) {
      this.target.resolve.alias = this.bud.options.get('alias')
    }

    /**
     * Resolve framework node_modules
     */
    this.target.resolve.modules.push(
      join(this.bud.paths.get('framework'), 'node_modules'),
    )

    /**
     * Ensure bundle support
     */
    const binding = this
    new Array('ts', 'tsx', 'jsx', 'vue', 'scss')
      .forEach(ext => binding.ensureSupport(ext))

    /**
     * Filter, log & return
     */
    this.target = this.bud.hooks.filter('webpack.resolve', this.target)
    this.bud.logger.info(
      {name: 'webpack.resolve', value: this.target}, `webpack.resolve has been generated`
    )
    return this.target
  },

  /**
   * Ensure extensions supported
   */
  ensureSupport: function (ext) {
    if (! this.bud.features.enabled(ext)) {
      return
    }

    const missedExt = this.target.resolve.extensions
      .filter(supported => supported !== ext)
      .length < 1

    if (missedExt) {
      this.target.resolve.extensions.push(`.${ext}`)
      this.bud.logger.warn(
        {name: 'webpack.resolve'}, `.${ext} support added by support check.`
      )
    }
  },
})

export {webpackResolve}
