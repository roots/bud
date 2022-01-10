import {join} from 'path'

import {Framework, Locations} from '../..'

export interface path {
  (
    this: Framework,
    key: keyof Locations & string,
    ...path: string[]
  ): string
}

export interface path {
  (key: `${keyof Locations & string}`, ...path: string[]): string
}

export const path: path = function (key, ...path): string {
  const project = this.hooks.filter(`location.project`)
  const partial = this.hooks.filter(`location.${key}`)

  const useAbsolute = project === partial || partial.startsWith('/')

  return useAbsolute
    ? join(...[partial, ...(path ?? [])].filter(Boolean))
    : join(...[project, partial, ...(path ?? [])].filter(Boolean))
}
