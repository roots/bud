import {Config} from '..'

export const glob: Config.Glob = function (
  name,
  files,
  options,
) {
  /** Prep and run glob operation. */
  const glob = prepareGlob.bind(this)(files)

  /** Results */
  const results = this.fs.glob.sync(
    glob,
    options ?? {expandDirectories: true},
  )

  this.store['build'].merge(
    'entry',
    results.reduce((acc, curr) => {
      const entryPath = name ? `${name}/` : '/'
      const entryName = basedName.bind(this)(curr)
      const entry = this.fs.path.join(entryPath, entryName)

      return {...acc, [entry]: curr}
    }, {}),
  )

  return this
}

/**
 * basedName
 *
 * Remove extension from path-like string
 */
function basedName(file: string): string {
  const ext = `.${file.split('.').pop()}`
  return this.fs.path.basename(file, ext)
}

/**
 * Prepare globbing fn props
 * @see Bud.fs.glob
 */
function prepareGlob(search: string | string[]): string[] {
  switch (typeof search) {
    case 'string':
      return [search]
    case 'object':
      return search.map(file => file)
  }
}
