import {realpath} from 'node:fs/promises'
import {join} from 'node:path'

export const exists = async (...path: Array<string>): Promise<boolean> => {
  let resolvedPath: string

  try {
    resolvedPath = await realpath(join(...path))
  } catch (error) {
    return false
  }

  return typeof resolvedPath === `string` ? true : false
}
