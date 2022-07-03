import type * as Framework from '@roots/bud-framework'

import {Application} from './application.js'
import {Context} from './context.js'
import {Dir} from './dir.js'
import {Disk} from './disk.js'
import {Env} from './env.js'
import {Manifest} from './manifest.js'

/**
 * Context factory
 *
 * @remarks
 * @see {@link https://mael.dev/clipanion/docs/contexts}
 *
 * @param rootDir - project directory
 * @returns {@link Context}
 *
 * @public
 */
const makeContext = async (
  rootDir = process.cwd(),
): Promise<Framework.Config.Context> => {
  const dir = await new Dir(rootDir).find()

  const application = await new Application().find()
  const env = new Env(dir.project)
  const disk = await new Disk(dir.project).findConfigs()
  const manifest = await new Manifest(disk).read()

  return new Context(
    application.name?.split(`@roots/`).pop() ?? 'bud',
    dir.project,
    dir.project,
    manifest,
    disk,
    application,
    env,
  )
}

export {Application, Context, Dir, Env, Manifest}
export {makeContext}
