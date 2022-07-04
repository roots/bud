import type * as Framework from '@roots/bud-framework'

import {Application} from './application.js'
import {Context} from './context.js'
import {Disk} from './disk.js'
import {Env} from './env.js'
import {Manifest} from './manifest.js'

/**
 * Context factory
 *
 * @remarks
 * @see {@link https://mael.dev/clipanion/docs/contexts}
 *
 * @param rootDirectory - project directory
 * @returns {@link Context}
 *
 * @public
 */
export const makeContext = async (
  rootDirectory = process.cwd(),
): Promise<Framework.Config.Context> => {
  const application = await new Application().find()
  const env = new Env(rootDirectory)
  const disk = await new Disk(rootDirectory).findConfigs()
  const manifest = await new Manifest(disk).read()

  return new Context(
    application.name?.split(`@roots/`).pop() ?? 'bud',
    rootDirectory,
    manifest,
    disk,
    application,
    env,
  )
}

export {Application, Context, Env, Manifest}
