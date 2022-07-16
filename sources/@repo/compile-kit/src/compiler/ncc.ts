import vercelImport from '@vercel/ncc'

export interface Options {
  externals: Array<string>
  cache: boolean
  minify: boolean
  sourceMap: boolean
  sourceMapRegister: boolean
  watch: boolean
  v8cache: boolean
  debugLog: boolean
}

export interface ncc {
  (entry: string, options: Partial<Options>): Promise<any>
}

export const ncc: ncc = vercelImport as ncc
