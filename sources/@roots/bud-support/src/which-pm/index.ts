import {env} from 'node:process'

import cwd from './basedir.js'
import * as file from './file.js'
import * as manifest from './manifest.js'
import * as pmString from './pmString.js'

export default async function (
  basedir: string = cwd,
): Promise<`npm` | `pnpm` | `yarn-classic` | `yarn` | false> {
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

  /** This config file is only present in Yarn 3 projects. */
  if (await file.exists(basedir, `.yarnrc.yml`)) return `yarn`

  /** If there is a `yarn.lock` file and no `.yarnrc.yml`, it's a Yarn Classic project. */
  if (await file.exists(basedir, `yarn.lock`)) return `yarn-classic`

  /** If there is a `package-lock.json` file, it's an npm project. */
  if (await file.exists(basedir, `package-lock.json`)) return `npm`

  /** If there is a `pnpm-lock.yaml` file, it's a pnpm project. */
  if (await file.exists(basedir, `pnpm-lock.yaml`)) return `pnpm`

  return false
}
