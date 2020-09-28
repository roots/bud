import Bud from '@roots/bud-types'

export const builders: Bud.Build.Index = {
  entry: require('./entry'),
  general: require('./general'),
  module: require('./module'),
  externals: require('./externals'),
  output: require('./output'),
  optimization: require('./optimization'),
  plugins: require('./plugins'),
  resolve: require('./resolve'),
}

const build: Bud['build'] = bud =>
  Object.entries(builders).reduce(
    (config, [, builder]: [string, Bud.Build.Builders]) => ({
      ...(config ?? []),
      ...builder(bud),
    }),
    {}, // feels bad, bad.
  )

export default build
