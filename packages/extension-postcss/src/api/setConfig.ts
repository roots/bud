import {lodash as _} from '@roots/bud-support'

/**
 * Set postcss options
 */
export const setConfig: PostCss.Config = function (
  postcssOptions,
) {
  const {options} = this.bud.build.getItem('postcss') as any

  this.bud.build.mergeItem('postcss', {
    options: {
      ...options,
      postcssOptions: {
        config: false,
        ...postcssOptions,
      },
    },
  })

  return this
}
