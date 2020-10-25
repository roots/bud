import {lodash as _} from '@roots/bud-support'

/**
 * Add postcss plugin
 */
export const addPlugin: PostCss.Config = function (
  name: string,
  plugin: PostCss.PluginTuple,
) {
  const {options} = this.bud.build.getItem('postcss') as any // 😇

  this.bud.build.mergeItem('postcss', {
    options: {
      ...options,
      postcssOptions: {
        ...options.postcssOptions,
        plugins: {
          ...options.postcssOptions.plugins,
          [name]: plugin,
        },
      },
    },
  })

  return this
}
