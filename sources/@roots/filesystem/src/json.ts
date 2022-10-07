import fs from 'fs-jetpack'
import json5 from 'json5'
import jsonStringify from 'safe-json-stringify'

export const read = async (path: string): Promise<any> => {
  const source = await fs.readAsync(path)
  return json5.parse(source.trim())
}

export const {parse} = json5

export const write = async (
  path: string,
  data: any,
  options: {
    replacer?: ((this: any, key: string, value: any) => any) | null
    space?: string | number | null
  },
): Promise<void> => {
  const source = json5.stringify(data, options)
  await fs.writeAsync(path, source)
}

export const stringify = jsonStringify
