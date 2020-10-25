import {lodash as _} from '@roots/bud-support'

/**
 * Set postcss syntax
 */
export const setSyntax: PostCss.Config = function (
  syntax: PostCss.Syntax,
) {
  const {options} = this.bud.build.getItem('postcss') as any

  this.bud.build.mergeItem('postcss', {
    options: {
      ...options,
      postcssOptions: {
        ...options.postcssOptions,
        syntax,
      },
    },
  })

  return this
}
