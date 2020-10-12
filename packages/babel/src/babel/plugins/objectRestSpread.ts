const target: babel.PluginTarget = require.resolve(
  '@babel/plugin-proposal-object-rest-spread',
)

export const objectRestSpread: babel.PluginItem = [target]
