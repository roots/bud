import {lodash as _} from '@roots/bud-support'

/**
 * Set postcss parser
 */
export const setParser: PostCss.Config = function (
  parser: PostCss.Parser,
) {
  const {options} = this.bud.build.getItem('postcss') as any

  this.bud.build.mergeItem('postcss', {
    options: {
      ...options,
      postcssOptions: {
        ...options.postcssOptions,
        parser,
      },
    },
  })

  return this
}
