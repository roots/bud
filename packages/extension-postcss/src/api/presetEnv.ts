import {Bud} from '@roots/bud-typings'

export const presetEnv: PresetEnv = function (options = {}) {
  const plugins = this.build.items.get(
    'postcss.options.postcssOptions.plugins',
  )

  // plugins[0]: flexbugs
  // plugins[1]: preset-env
  // plugins[2]: postcss-nested
  plugins[1][1] = options

  this.build.items.set(
    'postcss.options.postcssOptions.plugins',
    plugins,
  )

  return this
}

/**
 * ## bud.presetEnv
 *
 * Configure postcss preset-env
 *
 * ### Usage
 *
 * ```js
 * bud.presetEnv(MyPlugin, {plugin: 'options'})
 * ```
 */
export type PresetEnv = (this: Bud, options: any) => Bud
