/* eslint-disable no-console */
import type * as Bud from '@roots/bud-framework'
import {resolve} from 'node:path'

import Context from './context.js'

/**
 * Context factory
 *
 * @remarks
 * @see {@link https://mael.dev/clipanion/docs/contexts}
 *
 * @param basedir - project directory
 * @returns {@link Context}
 *
 * @public
 */
export const get = async (
  basedir: string,
): Promise<Bud.Config.Context> => {
  basedir = resolve(process.cwd(), basedir)
  const context = await Context.make(basedir)
  return context.data
}
