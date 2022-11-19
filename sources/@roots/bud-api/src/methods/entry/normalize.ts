import type {EntryObject} from './types.js'

export const normalizeRecord = (
  data: Record<string, string | [string, ...string[]]>,
): Record<string, EntryObject> =>
  Object.entries(data).reduce(
    (entries, [signifier, item]) => ({
      ...(entries ?? {}),
      [signifier]: {
        import: normalizeImport(item),
      },
    }),
    {},
  )

export const normalizeImport = (data: string | Array<string>) => {
  return Array.isArray(data) ? data : [data]
}
