import {readFile, realpath} from 'node:fs/promises'
import {join} from 'node:path'
import {cwd} from 'node:process'

type Path = string

export default async function (basedir: string = cwd()) {
  const packageField = await getPackageManagerField(basedir)

  if (packageField) {
    if (packageField.includes(`yarn`)) {
      if (await hasYarnBerryConfig(basedir)) return `yarn`
      return `yarn-classic`
    }

    if (packageField.includes(`npm`)) return `npm`
    if (packageField.includes(`pnpm`)) return `pnpm`
  }

  if (await hasYarnLockfile(basedir)) {
    if (await hasYarnBerryConfig(basedir)) return `yarn`
    return `yarn-classic`
  }

  if (await hasNpmLockfile(basedir)) return `npm`
  if (await hasPnpmLockfile(basedir)) return `pnpm`
}

export const hasYarnLockfile = async (
  basedir: string,
): Promise<boolean> => {
  try {
    return await fileExists(join(basedir, `yarn.lock`))
  } catch (error) {
    return false
  }
}

export const hasYarnBerryConfig = async (
  basedir: string,
): Promise<boolean> => {
  try {
    return await fileExists(join(basedir, `.yarnrc.yml`))
  } catch (error) {
    return false
  }
}

export const hasNpmLockfile = async (
  basedir: string,
): Promise<boolean> => {
  try {
    return await fileExists(join(basedir, `package-lock.json`))
  } catch (error) {
    return false
  }
}

export const hasPnpmLockfile = async (
  basedir: string,
): Promise<boolean> => {
  try {
    return await fileExists(join(basedir, `pnpm-lock.yaml`))
  } catch (error) {
    return false
  }
}

export const getPackageManagerField = async (
  basedir: string,
): Promise<false | Path> => {
  try {
    const path = await realpath(join(basedir, `package.json`))
    const packageManager = await readFile(path)
    const data = JSON.parse(packageManager.toString())
    if (`packageManager` in data) return data.packageManager
    return false
  } catch (error) {
    return false
  }
}

const isString = (value: unknown): value is string =>
  typeof value === `string`

const fileExists = async (path: string): Promise<boolean> => {
  let resolvedPath: string
  try {
    resolvedPath = await realpath(path)
  } catch (error) {
    return false
  }

  return isString(resolvedPath) ? true : false
}
