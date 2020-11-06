/**
 * Set postcss parser
 */
export const setParser: PostCss.Config = function (
  parser: PostCss.Parser,
) {
  this.bud.build.items.set(
    'postcss.options.postcssOptions.parser',
    parser,
  )

  return this
}
