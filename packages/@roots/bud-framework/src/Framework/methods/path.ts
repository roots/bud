import {join} from 'path'

import {Framework, Locations} from '../..'

interface path {
  (
    this: Framework,
    key: keyof Locations & string,
    ...path: string[]
  ): string
}

interface path {
  (key: keyof Locations & string, ...path: string[]): string
}

const path: path = function (
  key: keyof Locations & string,
  ...path: string[]
): string {
  const project = this.hooks.filter(`location.project`)
  const partial = this.hooks.filter(`location.${key}`)

  const useAbsolute =
    project === partial || partial.startsWith('/')

  return useAbsolute
    ? join(...[partial, ...(path ?? [])].filter(Boolean))
    : join(
        ...[project, partial, ...(path ?? [])].filter(Boolean),
      )
}

export {path}
