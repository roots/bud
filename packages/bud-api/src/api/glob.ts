export const glob: Framework.API.Glob = function (
  this: Framework.Bud,
  name,
  files,
  options,
) {
  this.config.merge(
    'entry',
    this.fs.glob
      .sync(
        (search => {
          switch (typeof search) {
            case 'string':
              return [search]
            case 'object':
              return search.map(file => file)
          }
        })(files),
        options ?? {expandDirectories: true},
      )
      .reduce((acc, curr) => {
        const basedName = (file: string): string => {
          const ext = `.${file.split('.').pop()}`

          return this.fs.path.basename(file, ext)
        }

        return {
          ...acc,
          [this.fs.path.join(
            name ? `${name}/` : '/',
            basedName(curr),
          )]: curr,
        }
      }, {}),
  )

  return this
}
