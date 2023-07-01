import type {Bud} from '@roots/bud-framework'

import type {Callback} from './types.js'

export function handleCallback(bud: Bud, callback: Callback) {
  return bud.hooks.async(`build.resolve.alias`, callback)
}
