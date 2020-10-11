const target: babel.PluginTarget = require.resolve(
  '@babel/preset-env',
)

const options: babel.PluginOptions = {
  modules: false,
  forceAllTransforms: true,
}

export const env:
  | babel.PluginItem
  | [babel.PluginTarget, babel.PluginOptions] = [target, options]
