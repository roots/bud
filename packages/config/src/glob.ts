import Bud from '@roots/bud-types'

export const glob: (
  name: string,
  files: string[],
  options: Bud.Config.Options.Glob,
) => Bud = function (name, files, options): Bud {
  /** Prep and run glob operation. */
  const glob = prepareGlob.bind(this)(files)

  /** Results */
  const results = this.fs.glob.sync(
    glob,
    options ?? {expandDirectories: true},
  )

  /** Merge results onto webpack entries. */
  this.options.merge(
    'webpack.entry',
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
function basedName(this: Bud, file: string): string {
  const ext = `.${file.split('.').pop()}`
  return this.fs.path.basename(file, ext)
}

/**
 * Prepare param for use with globbing function
 *
 * @see Bud.fs.glob
 */
function prepareGlob(
  this: Bud,
  search: string | string[],
): string[] {
  switch (typeof search) {
    case 'string':
      return [search]
    case 'object':
      return search.map(file => file)
  }
}
