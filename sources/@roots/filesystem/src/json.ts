import fs from 'fs-jetpack'
import json5 from 'json5'
import jsonStringify from 'safe-json-stringify'

export const read = async (path: string): Promise<any> => {
  const source = await fs.readAsync(path)
  return json5.parse(source.trim())
}

export const {parse} = json5

export const write = async (path: string, data: any): Promise<void> => {
  const source = json5.stringify(data)
  await fs.writeAsync(path, source)
}

export const stringify = jsonStringify
