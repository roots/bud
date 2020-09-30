import Bud from '@roots/bud-types'

export const postcss: Bud.Config.PostCss = function ({
  plugins = null,
  syntax = null,
  map = null,
  parser = null,
  stringifier = null,
}) {
  this.features.set('postcss', true)

  syntax && this.options.set('postcss.syntax', syntax)
  map && this.options.set('postcss.map', map)
  parser && this.options.set('postcss.parser', parser)

  stringifier &&
    this.options.set('postcss.stringifier', stringifier)

  plugins &&
    this.options.set('postcss.plugins', [
      ...this.options.get('postcss.plugins'),
      ...plugins,
    ])

  return this
}
