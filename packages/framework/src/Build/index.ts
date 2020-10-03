import Webpack from 'webpack'
import Bud from '../Bud'
import entry from './entry'
import general from './general'
import rulesets from './rulesets'
import externals from './externals'
import output from './output'
import plugins from './plugins'
import resolve from './resolve'

export const builders = {
  entry,
  general,
  rulesets,
  resolve,
  externals,
  output,
  plugins,
}

export function Build(): Webpack.Configuration {
  preflight.bind(this)()

  return Object.entries(builders).reduce(
    (config, [, builder]: [string, Bud.Build.Builders]) => ({
      ...(config ?? []),
      ...builder.bind(this)(this.store['webpack'].repository),
    }),
    {},
  )
}

function preflight() {
  this.store['webpack'].set(
    'context',
    this.store['paths'].get('src'),
  )
}
