import * as importMeta from 'import-meta-resolve'

export const resolve = (specifier: string, from: string | URL) => {
  try {
    return importMeta.resolve(
      specifier,
      from instanceof URL ? from.toString() : from,
    )
  } catch (error) {
    return false
  }
}
