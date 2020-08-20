import type {BuilderConstructor} from './types'

const output: BuilderConstructor = bud => ({
  bud,

  name: 'webpack.output',

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
    this.target.output.publicPath = this.bud.hooks.filter(
      `${this.name}.publicPath.filter`,
      this.target.output.publicPath,
    )
    this.target.output.path = this.bud.hooks.filter(
      `${this.name}.path.filter`,
      this.target.output.path,
    )
    this.target.output.filename = this.bud.hooks.filter(
      `${this.name}.filename.filter`,
      this.target.output.filename,
    )

    this.target = this.bud.hooks.filter(`${this.name}.filter`, this.target)

    return this.target
  },
})

export {output}
