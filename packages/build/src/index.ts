import Bud from '@roots/bud-types'

import entry from './entry'
import general from './general'
import module from './module'
import externals from './externals'
import output from './output'
import plugins from './plugins'
import resolve from './resolve'

export const builders: Bud.Build.Index = {
  entry,
  general,
  module,
  resolve,
  externals,
  output,
  plugins,
}

const build: Bud['build'] = function (this: Bud) {
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

export default build
