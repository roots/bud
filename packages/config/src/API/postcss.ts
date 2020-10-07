export const postcss: API.Postcss = function ({
  plugins = null,
  syntax = null,
  map = null,
  parser = null,
  stringifier = null,
}) {
  this.store['features'].set('postcss', true)

  syntax && this.store['postcss'].set('syntax', syntax)
  map && this.store['postcss'].set('map', map)
  parser && this.store['postcss'].set('parser', parser)

  stringifier &&
    this.store['postcss'].set('stringifier', stringifier)

  plugins &&
    this.store['postcss'].set('plugins', [
      ...this.store['postcss'].get('plugins'),
      ...plugins,
    ])

  return this
}
