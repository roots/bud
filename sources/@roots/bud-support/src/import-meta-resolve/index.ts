import * as importMeta from 'import-meta-resolve'

export const resolve = async (specifier: string, from: string | URL) => {
  return importMeta.resolve(
    specifier,
    from instanceof URL ? from.toString() : from,
  )
}
