/**
 * Set postcss options
 */
export const setConfig: PostCss.Config = function (
  postcssOptions,
) {
  this.bud.build.items.set('postcss.options.postcssOptions', {
    config: false,
    ...postcssOptions,
  })

  return this
}
