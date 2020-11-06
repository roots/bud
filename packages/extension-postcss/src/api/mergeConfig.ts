/**
 * Merge PostCss transformOptions
 */
export const mergeConfig: PostCss.Config = function (
  postcssOptions,
) {
  this.bud.build.items.merge(
    'postcss.options.postcssOptions.config',
    postcssOptions,
  )

  return this
}
