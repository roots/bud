import type {BudInterface} from '../'
import type {WebpackOutput} from '@roots/bud-types'

type OutputBuilder = (bud: BudInterface) => WebpackOutput

const output: OutputBuilder = bud =>
  bud.hooks.filter('webpack.output', {
    output: {
      path: bud.hooks.filter(
        'webpack.output.path',
        bud.paths.get('dist'),
      ),

      publicPath: bud.hooks.filter(
        'webpack.output.publicPath',
        bud.paths.get('public'),
      ),

      filename: bud.hooks.filter(
        'webpack.output.filename',
        bud.features.enabled('hash')
          ? `${bud.options.get('filenameTemplate').hashed}.js`
          : `${bud.options.get('filenameTemplate').default}.js`,
      ),
    },
  })

export {output}
export type {OutputBuilder, WebpackOutput}
