import type {BuilderConstructor} from './types'

const output: BuilderConstructor = bud => ({
  bud,

  options: {
    output: {
      path: bud.paths.get('dist'),
      publicPath: bud.paths.get('public'),
      filename: bud.features.enabled('hash')
        ? `${bud.options.get('filenameTemplate').hashed}.js`
        : `${bud.options.get('filenameTemplate').default}.js`,
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
