import type {Bud, BuilderConstructor, OutputBuilder} from './types'

/**
 * Webpack output
 *
 * @param {Bud} bud
 * @return {OutputBuilder}
 */
const output: BuilderConstructor = (bud: Bud): OutputBuilder => ({
  bud,

  options: {
    output: {
      path: bud.state.paths.dist,
      publicPath: bud.state.paths.public,
      filename: bud.features.enabled('hash')
        ? '[name].[hash:8].js'
        : '[name].js',
    },
  },

  make: function () {
    this.options.output.filename = this.bud.hooks.filter(
      'filter_output_filename',
      this.options.output.filename,
    )

    return this.bud.hooks.filter('filter_output_final', this.options)
  },
})

export {output}
