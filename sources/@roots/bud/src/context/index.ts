import * as Framework from '@roots/bud-framework'

import {Application} from './application'
import {Context} from './context'
import {Dir} from './dir'
import {Disk} from './disk'
import {Env} from './env'
import {Manifest} from './manifest'

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
  const env = new Env(dir.projectDir)
  const disk = await new Disk(dir.projectDir).findConfigs()
  const manifest = await new Manifest(disk).read()

  return new Context(
    application.name?.split(`@roots/`).pop() ?? 'bud',
    dir.cwd,
    dir.projectDir,
    manifest,
    disk,
    application,
    env,
  )
}

export {Application, Context, Dir, Env, Manifest}
export {makeContext}
