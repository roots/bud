import {env} from 'node:process'

import cwd from './basedir.js'
import * as file from './file.js'
import * as manifest from './manifest.js'
import * as pmString from './pmString.js'

export type PackageManager =
  | `bun`
  | `npm`
  | `pnpm`
  | `yarn-classic`
  | `yarn`
export type Responses = false | PackageManager

export default async function (basedir: string = cwd): Promise<Responses> {
  /**
   * If set, it will be something like: `npm/7.20.3 node/v14.17.3 darwin x64`
   */
  if (env?.npm_config_user_agent) {
    const manager = pmString.parse(env.npm_config_user_agent)
    if (manager) return manager
  }

  /**
   * If set, it will be something like: `npm@7.20.3`
   */
  const manifestString = await manifest.getField(basedir, `packageManager`)
  if (manifestString) {
    const manager = pmString.parse(manifestString)
    if (manager) return manager
  }

  /** This config file is only present in bun projects */
  if (await file.exists(basedir, `bun.lockb`)) return `bun`

  /** This config file is only present in pnpm projects */
  if (await file.exists(basedir, `pnpm-lock.yaml`)) return `pnpm`

  /** This config file is only present in Yarn 3 projects. */
  if (await file.exists(basedir, `.yarnrc.yml`)) return `yarn`

  /** If there is a `yarn.lock` file it's a Yarn Classic project. */
  if (await file.exists(basedir, `yarn.lock`)) return `yarn-classic`

  /** If there is a `package-lock.json` file, it's an npm project. */
  if (await file.exists(basedir, `package-lock.json`)) return `npm`

  return false
}
