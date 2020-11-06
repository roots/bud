/**
 * Set postcss syntax
 */
export const setSyntax: PostCss.Config = function (
  syntax: PostCss.Syntax,
) {
  this.bud.build.items.set(
    'postcss.options.postcssOptions.syntax',
    syntax,
  )

  return this
}
