import type {BuilderConstructor} from './types'

const output: BuilderConstructor = bud => ({
  bud,

  target: {
    output: {
      path: bud.paths.get('dist'),
      publicPath: bud.paths.get('public'),
      filename: bud.features.enabled('hash')
        ? `${bud.options.get('filenameTemplate').hashed}.js`
        : `${bud.options.get('filenameTemplate').default}.js`,
    },
  },

  make: function () {
    this.target.output.filename = this.bud.hooks.filter(
      'filter_output_filename',
      this.target.output.filename,
    )

    this.target = this.bud.hooks.filter('filter_output_final', this.target)

    this.bud.logger.info(
      {name: 'webpack_output', ...this.target}, `webpack.output has been generated`
    )

    return this.target
  },
})

export {output}
