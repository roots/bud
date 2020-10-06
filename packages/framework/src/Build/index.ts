import Webpack from 'webpack'
import Bud from '../Bud'

import entry from './entry'
import general from './general'
import module from './module'
import externals from './externals'
import output from './output'
import plugins from './plugins'
import resolve from './resolve'
import optimization from './optimization'

const builders = {
  entry,
  general,
  module,
  resolve,
  externals,
  output,
  plugins,
  optimization,
}

function Build(this: Bud): Webpack.Configuration {
  return Object.entries(builders).reduce(
    (config, [, builder]: [string, Bud.Build.Builders]) => ({
      ...config,
      ...builder.bind(this)(this.store['build'].all()),
    }),
    {},
  )
}

export default Build
