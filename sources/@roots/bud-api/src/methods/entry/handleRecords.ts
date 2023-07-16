import type {
  EntryObject,
  ImportValue,
  Name,
} from '@roots/bud-api/methods/entry'
import type {Bud} from '@roots/bud-framework'

import isArray from '@roots/bud-support/lodash/isArray'
import isString from '@roots/bud-support/lodash/isString'

export async function handleRecords(
  bud: Bud,
  records: Record<Name, EntryObject | ImportValue>,
) {
  const current = bud.hooks.filter(`build.entry`, {})

  bud.hooks.on(`build.entry`, {
    ...current,
    ...normalizeRecords(records),
  })

  return bud
}

export const normalizeRecords = (
  records: Record<Name, EntryObject | ImportValue>,
): Record<Name, EntryObject> =>
  Object.entries(records).reduce((entries, [signifier, item]) => {
    if (isArray(item)) {
      return {...entries, [signifier]: {import: item}}
    }

    if (isString(item)) {
      return {
        ...entries,
        [signifier]: {import: [item]},
      }
    }

    return {...entries, [signifier]: item}
  }, {})
