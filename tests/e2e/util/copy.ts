import {path} from '@repo/constants'
import fs from 'fs-jetpack'

export const originalPath = (...parts: Array<string>) =>
  path(`examples`, ...parts)

export const testPath = (...parts: Array<string>) =>
  path(`storage`, `fixtures`, ...parts)

export const copyDir = async (dir: string) => {
  try {
    await fs.removeAsync(testPath(dir))
    await fs.copyAsync(originalPath(dir), testPath(dir), {overwrite: true})
  } catch (error) {
    throw error
  }
}

export const copyOriginalSource = async (dir: string) => {
  try {
    await fs.copyAsync(originalPath(dir, `src`), testPath(dir, `src`), {
      overwrite: true,
    })
  } catch (error) {
    throw error
  }
}
