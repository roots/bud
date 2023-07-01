import type {Bud} from '@roots/bud-framework'

import isArray from '@roots/bud-support/lodash/isArray'
import isString from '@roots/bud-support/lodash/isString'

import type {EntryObject, Name, Signifier} from './types.js'

export async function handleNamed(
  bud: Bud,
  name: Name,
  value: Array<Signifier> | EntryObject | Signifier,
) {
  const current = bud.hooks.filter(`build.entry`, {})

  if (isArray(value) || isString(value)) {
    return bud.hooks.on(`build.entry`, {
      ...current,
      [name]: {
        import: Array.isArray(value) ? value : [value],
      },
    })
  }

  if (`import` in value) {
    return bud.hooks.on(`build.entry`, {...current, [name]: value})
  }
  return bud.hooks.on(`build.entry`, {...current, [name]: value})
}
