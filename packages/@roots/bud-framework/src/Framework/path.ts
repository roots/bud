import {join} from 'path'

import {Framework, Locations} from '..'

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
  return join(
    ...[
      key !== 'project'
        ? this.hooks.filter('location/project')
        : false,
      this.hooks.filter(`location/${key}`),
      ...(path ?? []),
    ].filter(Boolean),
  )
}

export {path}
