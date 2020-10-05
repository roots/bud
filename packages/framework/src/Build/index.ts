import Webpack from 'webpack'
import Bud from '../Bud'

import entry from './entry'
import general from './general'
import module from './module'
import externals from './externals'
import output from './output'
import plugins from './plugins'
import resolve from './resolve'

const builders = {
  entry,
  general,
  module,
  resolve,
  externals,
  output,
  plugins,
}

function Build(this: Bud): Webpack.Configuration {
  return Object.entries(builders).reduce(
    (config, [, builder]: [string, Bud.Build.Builders]) => ({
      ...(config ?? []),
      ...builder.bind(this)(this.store['build'].repository),
    }),
    {},
  )
}

export default Build
