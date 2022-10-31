import * as fs from 'fs-jetpack'
import * as json5 from 'json5'
import * as jsonStringify from 'safe-json-stringify'

export interface WriteOptions {
  replacer?: ((this: any, key: string, value: any) => any) | null
  space?: string | number | null
}

export const read = async (path: string): Promise<any> => {
  const source = await fs.readAsync(path, `utf8`)
  return json5.parse(source.trim())
}

export const {parse} = json5

export const write = async (
  path: string,
  data: any,
  options?: WriteOptions,
): Promise<void> => {
  const source = json5.stringify(data, options)
  await fs.writeAsync(path, source)
}

// @ts-ignore
export const stringify = jsonStringify.default

export default {
  read,
  parse,
  write,
  stringify,
}
