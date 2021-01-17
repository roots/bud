import {Api} from '@roots/bud-typings'

export const glob: Api.Glob = function (name, files, options) {
  this.hooks.on(`webpack.entry`, entry => ({
    ...entry,
    ...this.disk.glob
      .sync(files, options ?? {expandDirectories: true})
      .reduce((acc, curr) => {
        const basedName = (file: string): string => {
          const ext = `.${file.split('.').pop()}`
          return this.disk.path.basename(file, ext)
        }

        return {
          ...acc,
          [this.disk.path.join(
            name ? `${name}/` : '/',
            basedName(curr),
          )]: curr,
        }
      }, {}),
  }))

  return this
}
