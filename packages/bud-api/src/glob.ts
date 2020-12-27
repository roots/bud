import {Api} from '@roots/bud-typings'

export const glob: Api.Glob = function (name, files, options) {
  this.config.merge(
    'entry',
    this.fs.glob
      .sync(files, options ?? {expandDirectories: true})
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
