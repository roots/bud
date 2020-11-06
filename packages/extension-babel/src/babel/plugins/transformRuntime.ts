const target: babel.PluginTarget = require.resolve(
  '@babel/plugin-transform-runtime',
)

const options: babel.PluginOptions = {
  helpers: false,
}

export const transformRuntime: babel.PluginItem = [
  target,
  options,
]
