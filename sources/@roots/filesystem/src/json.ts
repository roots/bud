import fs from 'fs-jetpack'
import json5 from 'json5'
import stringify from 'safe-json-stringify'

export interface WriteOptions {
  replacer?: ((this: any, key: string, value: any) => any) | null
  space?: null | number | string
}

export const read = async (path: string): Promise<any> => {
  const source: string | undefined = await fs
    .readAsync(path, `utf8`)
    .catch((error: Error) => {
      error.name = `json read error: ${path}`
      throw error
    })

  if (!source) {
    const error = new Error(`File read returned no value to parse`)
    error.name = `json read error: ${path}`
    throw error
  }

  try {
    return parse(source.trim())
  } catch (error) {
    if (!(error instanceof Error)) {
      error = new Error(isString(error) ? error : stringify(error))
    }

    error.name = `json parse error: ${path}`
    throw error
  }
}

export const write = async (
  path: string,
  data: any,
  options?: WriteOptions,
): Promise<void> => {
  let source: string

  try {
    source = !isString(data)
      ? stringify(data, options?.replacer ?? null, options?.space ?? 2)
      : data
  } catch (error) {
    if (!(error instanceof Error)) {
      error = new Error(isString(error) ? error : stringify(error))
    }
    error.name = `json encode error: ${path}`
    throw error
  }

  if (!source) {
    const error = new Error(`No data provided`)
    error.name = `json write error: ${path}`
    throw error
  }

  await fs.writeAsync(path, source).catch((error: Error) => {
    error.name = `json write error: ${path}`
    throw error
  })
}

const {parse} = json5

const isString = (value: unknown): value is string =>
  typeof value === `string`

export {parse, stringify}
