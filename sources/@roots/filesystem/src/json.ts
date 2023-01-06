import fs from 'fs-jetpack'
import json5 from 'json5'
import stringify from 'safe-json-stringify'

export interface WriteOptions {
  replacer?: ((this: any, key: string, value: any) => any) | null
  space?: string | number | null
}

export const read = async (path: string): Promise<any> => {
  const source = await fs.readAsync(path, `utf8`)
  try {
    return await json5.parse(source.trim())
  } catch (err) {
    const error = new Error(err?.message ?? err.toString())
    error.name = `json error`
    error.message = `Error parsing JSON file: ${path}\n\n${error.message}`
    throw error
  }
}

export const {parse} = json5

export const write = async (
  path: string,
  data: any,
  options?: WriteOptions,
): Promise<void> => {
  const source =
    typeof data !== `string`
      ? stringify(data, options?.replacer ?? null, options?.space ?? 2)
      : data

  await fs.writeAsync(path, source)
}

export default {
  read,
  parse,
  write,
  stringify,
}

export {stringify}
