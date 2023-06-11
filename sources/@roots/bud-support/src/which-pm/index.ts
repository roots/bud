import type {PathOrFileDescriptor} from 'node:fs'

import {readFile, realpath} from 'node:fs'
import {join} from 'node:path'

type Path = PathOrFileDescriptor & string

const isString = (value: unknown): value is string =>
  typeof value === `string`

const resolveRealPath = async (path: string): Promise<false | Path> =>
  await new Promise((resolve, reject) => {
    realpath(path, (err, path) => {
      if (err) reject(err)
      resolve(path)
    })
  })

const fileExists = async (path: string): Promise<boolean> =>
  !!(await resolveRealPath(path))

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
  const path = await resolveRealPath(join(basedir, `package.json`))
  if (!path) return path

  const packageManager = await new Promise(resolve => {
    readFile(path, (err, buffer) => {
      if (err) resolve(false)
      const data = JSON.parse(buffer.toString())
      if (`packageManager` in data) {
        resolve(data.packageManager)
      }
      resolve(false)
    })
  })

  if (isString(packageManager)) return packageManager

  return false
}

export default async function (basedir: string = process.cwd()) {
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
