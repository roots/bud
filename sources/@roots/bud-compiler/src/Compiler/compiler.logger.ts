import {Signale} from '@roots/bud-support'

export const instance = app =>
  new Signale({
    scope: 'compiler',
  })
