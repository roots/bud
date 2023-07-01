import type {Bud} from '@roots/bud-framework'

import type {Records} from './types.js'

export function handleRecords(bud: Bud, records: Records) {
  return bud.hooks.async(`build.resolve.alias`, async (aliases = {}) => ({
    ...aliases,
    ...records,
  }))
}
