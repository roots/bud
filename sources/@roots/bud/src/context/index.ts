/* eslint-disable no-console */
import type {Bud} from '@roots/bud-framework'
import {omit} from 'lodash-es'

import {Application} from './application.js'
import cache from './cache.js'
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
export const get = async (
  rootDirectory = process.cwd(),
): Promise<Partial<Bud['context']>> => {
  const application = await new Application().find()

  const env = new Env(rootDirectory)
  const disk = await new Disk().findConfigs(rootDirectory)
  const manifest = await new Manifest(disk).read()

  if (
    cache.has('context.basedir') &&
    cache.get('context.basedir') === rootDirectory &&
    cache.get('context.env') == env &&
    cache.get('context.manifest') == manifest
  ) {
    return cache.get('context') as Context
  } else {
    cache.clear()
  }

  const ctx = new Context(
    application.label,
    rootDirectory,
    manifest,
    disk,
    application,
    env,
  )

  cache.set('context', omit(ctx, 'stdout', 'stdin', 'stderr'))

  return cache.get('context')
}

export {Application, Context, Env, Manifest}
