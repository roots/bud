import * as importMeta from 'import-meta-resolve'

export const resolve = async (id: string, from: string | URL) => {
  return importMeta.resolve(
    id,
    from instanceof URL ? from.toString() : from,
  )
}
