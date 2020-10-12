export const addExtensions: API.AddExtensions = function (
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

function mergeExt(ext: string): void {
  if (
    this.build.config
      .get('resolve.extensions')
      .includes(`.${ext}`)
  ) {
    return
  }

  this.build.config.merge('resolve.extensions', [`.${ext}`])
}
