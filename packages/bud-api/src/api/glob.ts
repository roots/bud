import {Bud} from '@roots/bud-typings'
import {GlobTask} from 'globby'

export const glob: Glob = function(name, files, options) {
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

export type Glob = (
  this: Bud.Contract,
  name: string,
  files: GlobTask['pattern'],
  options: GlobTask['options'],
) => Bud.Contract
