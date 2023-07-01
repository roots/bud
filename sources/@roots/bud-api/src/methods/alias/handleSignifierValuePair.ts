import type {Bud} from '@roots/bud-framework'

import type {Signifier, Value} from './types.js'

export function handleSignifierValuePair(
  bud: Bud,
  signifier: Signifier,
  value: Value,
) {
  return bud.hooks.async(`build.resolve.alias`, async (paths = {}) => ({
    ...paths,
    [signifier]: value,
  }))
}
