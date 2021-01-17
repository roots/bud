import {Bud} from '@roots/bud'

export const presetEnv: Bud.PostCss.PresetEnv = function (
  options = {},
) {
  const plugins = this.build.get(
    'items.postcss.options.postcssOptions.plugins',
  )

  // plugins[0]: flexbugs
  // plugins[1]: preset-env
  // plugins[2]: postcss-nested

  plugins[1][1] = options

  this.build.set(
    'items.postcss.options.postcssOptions.plugins',
    plugins,
  )

  return this
}
