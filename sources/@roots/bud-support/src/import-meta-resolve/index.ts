import * as importMeta from 'import-meta-resolve'

export const resolve = async (id: string, from: string) => {
  return importMeta.resolve(id, from)
}
