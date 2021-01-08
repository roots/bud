import {Api} from '@roots/bud-typings'

export const glob: Api.Glob = function (name, files, options) {
  const project = this.disk.get('project')

  this.store.get('config').merge(
    'entry',
    project.glob
      .sync(files, options ?? {expandDirectories: true})
      .reduce((acc, curr) => {
        const basedName = (file: string): string => {
          const ext = `.${file.split('.').pop()}`
          return project.path.basename(file, ext)
        }

        return {
          ...acc,
          [project.path.join(
            name ? `${name}/` : '/',
            basedName(curr),
          )]: curr,
        }
      }, {}),
  )

  return this
}
