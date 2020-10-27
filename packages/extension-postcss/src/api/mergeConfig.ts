import {lodash as _} from '@roots/bud-support'

/**
 * Merge PostCss transformOptions
 */
export const mergeConfig: PostCss.Config = function (
  postcssOptions,
) {
  const {options} = this.bud.build.getItem('postcss') as any

  this.bud.build.mergeItem('postcss', {
    options: {
      ...options,
      postcssOptions: {
        ...options.postcssOptions,
        config: false,
        ...postcssOptions,
      },
    },
  })

  return this
}
