import {paths} from '@repo/constants'
import fs from 'fs-jetpack'
import {join} from 'path'

const rf = {
  overwrite: true,
}

export const originalPath = (...parts: Array<string>) =>
  join(paths.root, `examples`, ...parts)

export const testPath = (...parts: Array<string>) =>
  join(paths.root, `storage`, `fixtures`, ...parts)

export const copyDir = async (dir: string) => {
  try {
    await fs.removeAsync(testPath(dir))
    await fs.copyAsync(originalPath(dir), testPath(dir), rf)
  } catch (error) {
    throw error
  }
}

export const copyOriginalSource = async (dir: string) => {
  try {
    await fs.copyAsync(originalPath(dir, `src`), testPath(dir, `src`), rf)
  } catch (error) {
    throw error
  }
}
