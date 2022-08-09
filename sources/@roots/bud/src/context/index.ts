/* eslint-disable no-console */
import type * as Bud from '@roots/bud-framework'

import BudContext from './bud.js'
import cache from './cache.js'
import Config from './config.js'
import Context from './context.js'
import Env from './env.js'
import Extensions from './extensions.js'
import Manifest from './manifest.js'

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
export const get = async (
  basedir: string,
): Promise<Partial<Bud.Config.Context>> => {
  try {
    const bud = await new BudContext().find()
    const env = new Env(basedir)

    const config = await new Config().find(basedir)
    const manifest = await new Manifest(config.data).read()

    if (
      cache.has('context.bud.version') &&
      cache.get('context.bud.version') == bud.data.version &&
      cache.has('context.config') &&
      cache.get('context.config') == config.data &&
      cache.has('context.env') &&
      cache.get('context.env') == env.data &&
      cache.has('context.manifest') &&
      cache.get('context.manifest') == manifest.data
    ) {
      return cache.get('context')
    } else {
      cache.clear()
    }

    const extensions = await new Extensions(manifest.data).find()

    const ctx = new Context(
      basedir,
      manifest.data,
      config.data,
      bud.data,
      env.data,
      extensions.data,
    )

    cache.set('context', ctx)

    return ctx
  } catch (error) {
    throw new Error(error)
  }
}
