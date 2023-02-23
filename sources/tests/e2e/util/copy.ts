import {paths} from '@repo/constants'
import {copy, remove} from 'fs-extra'
import {join} from 'path'

const rf = {
  overwrite: true,
  recursive: true,
}

export const originalPath = (...parts: Array<string>) =>
  join(paths.root, `examples`, ...parts)

export const testPath = (...parts: Array<string>) =>
  join(paths.root, `storage`, `mocks`, `yarn`, `@examples`, ...parts)

export const copyDir = async (dir: string) => {
  try {
    await remove(testPath(dir))
    await copy(originalPath(dir), testPath(dir), rf)
  } catch (error) {
    throw error
  }
}

export const copyOriginalSource = async (dir: string) => {
  try {
    await copy(originalPath(dir, `src`), testPath(dir, `src`), rf)
  } catch (error) {
    throw error
  }
}
