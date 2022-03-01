import {readFile, writeFile} from 'fs-extra'
import json5 from 'json5'
import jsonStringify from 'safe-json-stringify'

export const read = async (file: string): Promise<any> => {
  const source = await readFile(file, 'utf8')
  return json5.parse(source.trim())
}

export const write = async (file: string, data: any): Promise<void> => {
  const source = json5.stringify(data)
  await writeFile(file, source)
}

export const stringify = jsonStringify
