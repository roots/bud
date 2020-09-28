import Bud from '@roots/bud-types'

export const addExtensions: Bud.Config.AddExtensions = function (
  extensions,
) {
  const normalize: (ext: string) => string = ext =>
    ext.replace(/^(\.)([^ .]+)?/, '$2')

  if (typeof extensions == 'string') {
    mergeExt.bind(this)(normalize(extensions))
  } else {
    extensions
      .map(normalize)
      .map((ext: string) => mergeExt.bind(this)(ext))
  }

  return this
}

function mergeExt(this: Bud, ext: string): void {
  if (
    this.options
      .get('webpack.resolve.extensions')
      .includes(`.${ext}`)
  ) {
    return
  }

  this.options.merge('webpack.resolve.extensions', [
    ...this.options.get('webpack.resolve.extensions'),
    `.${ext}`,
  ])
}
