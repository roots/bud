import {readFile, realpath} from 'node:fs/promises'
import {join} from 'node:path'

export const getField = async (
  basedir: string,
  field: string,
): Promise<false | string> => {
  try {
    const path = await realpath(join(basedir, `package.json`))
    const manifest = await readFile(path)
    const data = JSON.parse(manifest.toString())

    return field in data ? data[field] : false
  } catch (error) {
    return false
  }
}
