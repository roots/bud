import {readFile, realpath} from 'node:fs/promises'
import {join} from 'node:path'
import {cwd} from 'node:process'

type Path = string

export default async function (basedir: string = cwd()) {
  const packageField = await getPackageManagerField(basedir)

  if (packageField) {
    if (packageField.includes(`yarn`)) {
      if (await hasYarnBerryRc(basedir)) return `yarn berry`
      return `yarn`
    }

    if (packageField.includes(`npm`)) return `npm`
    if (packageField.includes(`pnpm`)) return `pnpm`
  }

  if (await hasYarnLockfile(basedir)) {
    if (await hasYarnBerryRc(basedir)) return `yarn berry`
    return `yarn`
  }

  if (await hasNpmLockfile(basedir)) return `npm`
  if (await hasPnpmLockfile(basedir)) return `pnpm`
}

export const hasYarnLockfile = async (basedir: string): Promise<boolean> =>
  await fileExists(join(basedir, `yarn.lock`))

export const hasYarnBerryRc = async (basedir: string): Promise<boolean> =>
  await fileExists(join(basedir, `.yarnrc.yml`))

export const hasNpmLockfile = async (basedir: string): Promise<boolean> =>
  await fileExists(join(basedir, `package-lock.json`))

export const hasPnpmLockfile = async (basedir: string): Promise<boolean> =>
  await fileExists(join(basedir, `pnpm-lock.yaml`))

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

const fileExists = async (path: string): Promise<boolean> =>
  isString(await realpath(path)) ? true : false
