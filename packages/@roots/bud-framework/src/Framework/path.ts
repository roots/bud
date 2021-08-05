import {join} from 'path'

import {Framework} from '..'

interface path {
  (
    this: Framework,
    key: keyof Framework.Locations,
    ...path: string[]
  ): string
}

function path(
  key: keyof Framework.Locations,
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
