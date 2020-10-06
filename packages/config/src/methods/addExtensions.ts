import {Config} from '..'

export const addExtensions: Config.AddExtensions = function (
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
  const build = this.store.use('build')

  if (build.get('resolve.extensions').includes(`.${ext}`)) {
    return
  }

  build.merge('resolve.extensions', [`.${ext}`])
}
